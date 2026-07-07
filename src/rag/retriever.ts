/**
 * RAG Retriever — Hybrid semantic + keyword retrieval
 *
 * Priority:
 *   1. Vector similarity (MiniLM embeddings or BM25 fallback)
 *   2. Tag-keyword boost for static chunks
 *   3. Strict scope guard (off-topic detection)
 */

import { initVectorIndex, semanticRetrieve } from './vector-index';
import { knowledgeBase } from './knowledge-base';

// ─── Boot: init index on module load ──────────────────────────────────────────
initVectorIndex().catch(() => { });

// ─── Keyword tokenizer (for off-topic detection only) ─────────────────────────
function tokenize(text: string): string[] {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s+#.]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
}

// ─── Synonym map — expands query words to tag equivalents ─────────────────────
const SYNONYMS: Record<string, string[]> = {
    mobile: ['phone', 'contact', 'mobile'],
    cell: ['phone', 'contact'],
    number: ['phone', 'mobile', 'contact'],
    reach: ['contact', 'phone'],
    call: ['phone', 'contact'],
    whatsapp: ['phone', 'contact'],
    mail: ['email', 'contact'],
    address: ['location', 'contact'],
    city: ['location'],
    linkedin: ['contact', 'profile'],
    github: ['contact', 'profile'],
    gpa: ['cgpa', 'education'],
    grade: ['cgpa', 'education'],
    marks: ['cgpa', 'education'],
    percentage: ['cgpa', 'education'],
    college: ['university', 'education'],
    degree: ['education', 'graduation'],
    cert: ['certification', 'achievement'],
    hack: ['hackathon', 'achievement'],
    award: ['achievement', 'certification'],
    intern: ['internship', 'experience'],
    job: ['experience', 'internship'],
    company: ['experience'],
    build: ['project'],
    made: ['project'],
    created: ['project'],
    tech: ['skill', 'technology'],
    stack: ['skill', 'technology'],
    language: ['skill', 'programming'],
    framework: ['skill', 'frontend'],
    ml: ['ai', 'machine learning'],
};

function expandTokens(tokens: string[]): string[] {
    const expanded = new Set<string>(tokens);
    for (const token of tokens) {
        (SYNONYMS[token] || []).forEach(s => expanded.add(s));
    }
    return Array.from(expanded);
}

function tagScore(queryTokens: string[]): number {
    let maxScore = 0;
    for (const chunk of knowledgeBase.filter(c => c.tags.length > 0)) {
        let score = 0;
        for (const tag of chunk.tags) {
            const tagTokens = tokenize(tag);
            if (tagTokens.length > 1 && queryTokens.join(' ').includes(tag.toLowerCase())) {
                score += tagTokens.length * 2;
            } else {
                for (const qt of queryTokens) {
                    if (tag.toLowerCase().includes(qt) || qt.includes(tag.toLowerCase())) score += 1;
                }
            }
        }
        if (score > maxScore) maxScore = score;
    }
    return maxScore;
}

/** Returns true if the query is clearly off-topic */
export function isOffTopic(query: string): boolean {
    const rawTokens = tokenize(query);
    const expandedTokens = expandTokens(rawTokens);
    return tagScore(expandedTokens) === 0;
}


/**
 * Retrieve the most relevant context for a query.
 * Returns a formatted string ready to inject into the LLM prompt.
 */
export async function retrieveContext(query: string, topN = 5): Promise<string> {
    const docs = await semanticRetrieve(query, topN);
    if (docs.length === 0) return '';

    return docs.map(d => {
        const src = d.type === 'pdf'
            ? `[PDF: ${d.meta?.filename} | p.${d.meta?.page}]`
            : d.type === 'custom' ? '[Custom]' : '';
        return src ? `${src}\n${d.text}` : d.text;
    }).join('\n\n---\n\n');
}

/**
 * Synchronous lightweight fallback (used pre-init for structured intents)
 */
export function retrieveContextSync(query: string, topN = 3): string {
    const queryTokens = expandTokens(tokenize(query));
    const scored = knowledgeBase
        .filter(c => c.tags.length > 0)
        .map(c => {
            let score = 0;
            for (const tag of c.tags) {
                const tagTokens = tokenize(tag);
                if (tagTokens.length > 1 && queryTokens.join(' ').includes(tag.toLowerCase())) score += tagTokens.length * 2;
                else for (const qt of queryTokens) if (tag.toLowerCase().includes(qt) || qt.includes(tag.toLowerCase())) score += 1;
            }
            return { chunk: c, score };
        })
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);

    return scored.map(x => x.chunk.text).join('\n\n');
}

