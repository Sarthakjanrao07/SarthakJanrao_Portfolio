/**
 * Client-side Embedding Engine
 * Uses @xenova/transformers (MiniLM, runs fully in-browser via WASM).
 * Falls back to a fast TF-IDF-like bag-of-words if the model hasn't loaded yet.
 */

// Lazy-loaded pipeline — only downloaded on first use
let _pipeline: any | null = null;
let _pipelineLoading = false;
let _pipelineReady = false;

export type EmbedVector = number[];

/** Cosine similarity between two equal-length float vectors */
export function cosineSimilarity(a: EmbedVector, b: EmbedVector): number {
    if (a.length !== b.length || a.length === 0) return 0;
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    return na === 0 || nb === 0 ? 0 : dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/** Load the MiniLM model once — returns whether it loaded successfully */
export async function initEmbedder(): Promise<boolean> {
    if (_pipelineReady) return true;
    if (_pipelineLoading) {
        // Wait for ongoing load
        await new Promise<void>(resolve => {
            const t = setInterval(() => { if (!_pipelineLoading) { clearInterval(t); resolve(); } }, 300);
        });
        return _pipelineReady;
    }
    _pipelineLoading = true;
    try {
        const { pipeline, env } = await import('@xenova/transformers');
        // Use local cache, no remote calls for already-cached model
        env.allowRemoteModels = true;
        env.useBrowserCache = true;
        _pipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        _pipelineReady = true;
    } catch (e) {
        console.warn('[embedder] Model load failed, will use BM25 fallback:', e);
        _pipelineReady = false;
    } finally {
        _pipelineLoading = false;
    }
    return _pipelineReady;
}

/** Embed a single string → float32 array */
export async function embed(text: string): Promise<EmbedVector> {
    if (!_pipelineReady) await initEmbedder();
    if (!_pipeline) return bm25Embed(text);

    try {
        const output = await _pipeline(text, { pooling: 'mean', normalize: true });
        return Array.from(output.data as Float32Array);
    } catch {
        return bm25Embed(text);
    }
}

// ─── BM25-like sparse fallback (no model needed) ─────────────────────────────
const STOP = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'its', 'our', 'their', 'of', 'for', 'on', 'with', 'at', 'by', 'from', 'to', 'in', 'that', 'this', 'and', 'but', 'or', 'so', 'if', 'as', 'do', 'did', 'have', 'has', 'had', 'not', 'no', 'can', 'will', 'would', 'could', 'should']);

export function bm25Embed(text: string): EmbedVector {
    const tokens = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 1 && !STOP.has(t));
    const freq: Map<string, number> = new Map();
    for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
    // Return as sparse-ish array keyed by hash (dim=512)
    const vec = new Array<number>(512).fill(0);
    for (const [term, cnt] of freq) {
        const h = hashStr(term) % 512;
        vec[h] += cnt / tokens.length;
    }
    return vec;
}

function hashStr(s: string): number {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
    return Math.abs(h);
}

export function isEmbedderReady() { return _pipelineReady; }
