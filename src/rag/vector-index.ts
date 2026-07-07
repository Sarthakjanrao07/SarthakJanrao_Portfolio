/**
 * Vector Index — FAISS-like in-browser cosine similarity store.
 * Persists embeddings in localStorage so reloads don't re-embed everything.
 *
 * Supports two document types:
 *   - "static"  — the hard-coded knowledge-base.ts chunks
 *   - "pdf"     — uploaded PDF chunks
 *   - "custom"  — manually added text chunks from admin panel
 */

import { cosineSimilarity, embed, bm25Embed, isEmbedderReady } from './embedder';
import { knowledgeBase } from './knowledge-base';

export type DocType = 'static' | 'pdf' | 'custom';

export interface IndexedDoc {
    id: string;
    type: DocType;
    text: string;
    tags?: string[];           // for static chunks
    embedding: number[];
    meta?: Record<string, unknown>; // extra info (page, filename, etc.)
}

const STORAGE_KEY = 'rag_vector_index_v2';
const INDEX_HASH_KEY = 'rag_index_hash_v2';

// ─── In-memory index ──────────────────────────────────────────────────────────
let _index: IndexedDoc[] = [];
let _initialized = false;

// ─── Persistence helpers ──────────────────────────────────────────────────────
function saveIndex() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(_index));
    } catch {
        console.warn('[vector-index] localStorage quota exceeded, not persisting.');
    }
}

function loadIndex(): IndexedDoc[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as IndexedDoc[];
    } catch { return []; }
}

function hashKB(): string {
    // Simple hash of knowledge-base content to detect staleness
    const content = knowledgeBase.map(c => c.id + c.text).join('|');
    let h = 0;
    for (let i = 0; i < content.length; i++) h = (h * 31 + content.charCodeAt(i)) >>> 0;
    return String(h);
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Initialize the index.
 * - Loads persisted embeddings from localStorage.
 * - Re-embeds static knowledge-base chunks if they've changed.
 * - Initiates background embedding of MiniLM model.
 */
export async function initVectorIndex(): Promise<void> {
    if (_initialized) return;
    _initialized = true;

    const stored = loadIndex();
    const currentHash = hashKB();
    const savedHash = localStorage.getItem(INDEX_HASH_KEY);

    if (stored.length > 0 && savedHash === currentHash) {
        // Reuse persisted index — static chunks still valid
        _index = stored;
        console.log('[vector-index] Loaded from cache:', _index.length, 'docs');
        return;
    }

    // Rebuild static chunks
    console.log('[vector-index] Building static index...');
    const staticDocs: IndexedDoc[] = knowledgeBase
        .filter(c => c.tags.length > 0)
        .map(chunk => ({
            id: chunk.id,
            type: 'static' as DocType,
            text: chunk.text,
            tags: chunk.tags,
            embedding: bm25Embed(chunk.text), // fast sync embed for boot
        }));

    // Keep any pdf/custom docs from stored index
    const nonStatic = stored.filter(d => d.type !== 'static');
    _index = [...staticDocs, ...nonStatic];
    saveIndex();
    localStorage.setItem(INDEX_HASH_KEY, currentHash);

    // In background, upgrade static embeddings with real model
    upgradeStaticEmbeddings().catch(() => { });
}

async function upgradeStaticEmbeddings() {
    // Wait for model to be ready (may trigger download)
    const { initEmbedder } = await import('./embedder');
    const ok = await initEmbedder();
    if (!ok) return;

    let changed = false;
    for (const doc of _index) {
        if (doc.type === 'static') {
            doc.embedding = await embed(doc.text);
            changed = true;
        }
    }
    if (changed) { saveIndex(); console.log('[vector-index] Static embeddings upgraded.'); }
}

/** Add or replace PDF chunks in the index */
export async function addPdfChunks(
    chunks: Array<{ text: string; page: number }>,
    filename: string
): Promise<void> {
    // Remove old chunks from same file
    _index = _index.filter(d => !(d.type === 'pdf' && d.meta?.filename === filename));

    for (let i = 0; i < chunks.length; i++) {
        const text = chunks[i].text;
        const embedding = isEmbedderReady() ? await embed(text) : bm25Embed(text);
        _index.push({
            id: `pdf-${filename}-${i}`,
            type: 'pdf',
            text,
            embedding,
            meta: { filename, page: chunks[i].page },
        });
    }
    saveIndex();
}

/** Add a custom text chunk from the admin panel */
export async function addCustomChunk(text: string, tags: string[]): Promise<string> {
    const id = `custom-${Date.now()}`;
    const embedding = isEmbedderReady() ? await embed(text) : bm25Embed(text);
    _index.push({ id, type: 'custom', text, tags, embedding });
    saveIndex();
    return id;
}

/** Update text of an existing chunk (re-embeds) */
export async function updateChunk(id: string, newText: string): Promise<void> {
    const doc = _index.find(d => d.id === id);
    if (!doc) return;
    doc.text = newText;
    doc.embedding = isEmbedderReady() ? await embed(newText) : bm25Embed(newText);
    saveIndex();
}

/** Remove a chunk by id */
export function removeChunk(id: string): void {
    _index = _index.filter(d => d.id !== id);
    saveIndex();
}

/** Get all indexed docs */
export function getAllDocs(): IndexedDoc[] { return _index; }

/** Get PDF filenames currently indexed */
export function getIndexedPdfs(): string[] {
    const files = new Set(_index
        .filter(d => d.type === 'pdf')
        .map(d => d.meta?.filename as string));
    return Array.from(files);
}

/** Remove all chunks from a specific PDF */
export function removePdf(filename: string): void {
    _index = _index.filter(d => !(d.type === 'pdf' && d.meta?.filename === filename));
    saveIndex();
}

/**
 * Semantic retrieval — returns top-N most relevant docs for a query.
 * Uses cosine similarity on embeddings.
 */
export async function semanticRetrieve(query: string, topN = 5): Promise<IndexedDoc[]> {
    if (_index.length === 0) return [];

    const qVec = isEmbedderReady() ? await embed(query) : bm25Embed(query);

    const scored = _index.map(doc => ({
        doc,
        score: cosineSimilarity(qVec, doc.embedding),
    }));

    // Also boost chunks whose tags mention query words (hybrid retrieval)
    const queryWords = query.toLowerCase().split(/\s+/);
    for (const s of scored) {
        if (s.doc.tags) {
            for (const tag of s.doc.tags) {
                if (queryWords.some(w => tag.includes(w) || w.includes(tag))) {
                    s.score += 0.15; // tag-match boost
                }
            }
        }
    }

    return scored
        .filter(s => s.score > 0.05)
        .sort((a, b) => b.score - a.score)
        .slice(0, topN)
        .map(s => s.doc);
}
