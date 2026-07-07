/**
 * PDF Parser — extracts text from a PDF File object using pdf.js,
 * then splits it into overlapping chunks for RAG indexing.
 */

export interface TextChunk {
    text: string;
    page: number;
    chunkIndex: number;
}

const CHUNK_SIZE = 400;     // characters per chunk
const CHUNK_OVERLAP = 80;   // overlap between chunks

export async function extractPdfText(file: File): Promise<TextChunk[]> {
    // Dynamic import so pdf.js is only loaded when needed
    const pdfjsLib = await import('pdfjs-dist');

    // Set worker source — use unpkg CDN matching installed version
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://unpkg.com/pdfjs-dist@6.1.200/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const allChunks: TextChunk[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items
            .map((item: any) => item.str)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!pageText) continue;

        // Split page text into overlapping chunks
        let start = 0;
        let chunkIndex = 0;
        while (start < pageText.length) {
            const end = Math.min(start + CHUNK_SIZE, pageText.length);
            const text = pageText.slice(start, end).trim();
            if (text.length > 40) { // skip very small chunks
                allChunks.push({ text, page: pageNum, chunkIndex: chunkIndex++ });
            }
            if (end >= pageText.length) break;
            start += CHUNK_SIZE - CHUNK_OVERLAP;
        }
    }

    return allChunks;
}
