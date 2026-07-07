import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';
import { extractPdfText } from '../rag/pdf-parser';
import {
    initVectorIndex,
    getAllDocs,
    addPdfChunks,
    addCustomChunk,
    updateChunk,
    removeChunk,
    removePdf,
    getIndexedPdfs,
    type IndexedDoc,
} from '../rag/vector-index';

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'pdf' | 'custom' | 'index';

// ─── Secret Upload Panel ──────────────────────────────────────────────────────
const SecretUploadPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [tab, setTab] = useState<Tab>('pdf');
    const [docs, setDocs] = useState<IndexedDoc[]>([]);
    const [pdfs, setPdfs] = useState<string[]>([]);
    const [toast, setToast] = useState('');

    // PDF state
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfProcessing, setPdfProcessing] = useState(false);
    const [pdfProgress, setPdfProgress] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Custom chunk state
    const [newText, setNewText] = useState('');
    const [newTags, setNewTags] = useState('');
    const [addingChunk, setAddingChunk] = useState(false);

    // Editing state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const refresh = useCallback(() => {
        setDocs(getAllDocs());
        setPdfs(getIndexedPdfs());
    }, []);

    useEffect(() => {
        initVectorIndex().then(refresh);
    }, [refresh]);

    // ── PDF Upload ─────────────────────────────────────────────────────────────
    const handlePdfUpload = async () => {
        if (!pdfFile) return;
        setPdfProcessing(true);
        setPdfProgress('📄 Extracting text from PDF...');
        try {
            const chunks = await extractPdfText(pdfFile);
            setPdfProgress(`🔍 Indexing ${chunks.length} chunks...`);
            await addPdfChunks(chunks, pdfFile.name);
            refresh();
            setPdfFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            showToast(`✅ ${pdfFile.name} indexed (${chunks.length} chunks)`);
        } catch (e: any) {
            showToast(`❌ Error: ${e.message}`);
        } finally {
            setPdfProcessing(false);
            setPdfProgress('');
        }
    };

    const handleRemovePdf = (filename: string) => {
        removePdf(filename);
        refresh();
        showToast(`🗑️ Removed ${filename}`);
    };

    // ── Custom Chunk ───────────────────────────────────────────────────────────
    const handleAddChunk = async () => {
        if (!newText.trim()) return;
        setAddingChunk(true);
        const tags = newTags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
        await addCustomChunk(newText.trim(), tags);
        setNewText('');
        setNewTags('');
        refresh();
        showToast('✅ Chunk added to knowledge base');
        setAddingChunk(false);
    };

    // ── Edit Chunk ─────────────────────────────────────────────────────────────
    const handleSaveEdit = async () => {
        if (!editingId || !editText.trim()) return;
        await updateChunk(editingId, editText.trim());
        setEditingId(null);
        refresh();
        showToast('✅ Chunk updated');
    };

    const handleRemoveChunk = (id: string) => {
        removeChunk(id);
        refresh();
        showToast('🗑️ Chunk removed');
    };

    // ── Render ─────────────────────────────────────────────────────────────────
    const pdfDocs = docs.filter(d => d.type === 'pdf');
    const customDocs = docs.filter(d => d.type === 'custom');
    const staticDocs = docs.filter(d => d.type === 'static');

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '16px',
        }} onClick={onClose}>
            <div
                style={{
                    background: '#0d1117', border: '1px solid rgba(245,197,24,0.2)',
                    borderRadius: '18px', width: '100%', maxWidth: '720px',
                    maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.9)',
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '16px 20px', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    flexShrink: 0, background: 'linear-gradient(135deg,#0d1117,#141b22)',
                }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#f5c518' }}>
                            🧠 RAG Knowledge Base Manager
                        </h2>
                        <p style={{ margin: '3px 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.38)' }}>
                            {staticDocs.length} static · {pdfDocs.length} PDF chunks · {customDocs.length} custom — persisted in localStorage
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {toast && (
                            <span style={{ fontSize: '11px', color: toast.startsWith('❌') ? '#f87171' : '#4ade80', fontWeight: 600, maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {toast}
                            </span>
                        )}
                        <button onClick={onClose} style={{
                            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '8px', color: 'rgba(255,255,255,0.6)', width: '30px', height: '30px',
                            cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>×</button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    background: '#0d1117', flexShrink: 0, padding: '0 20px',
                }}>
                    {([
                        { id: 'pdf' as Tab, label: '📄 Upload PDF', count: pdfs.length },
                        { id: 'custom' as Tab, label: '✏️ Add Text', count: customDocs.length },
                        { id: 'index' as Tab, label: '📚 View Index', count: docs.length },
                    ] as const).map(t => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: tab === t.id ? '2px solid #f5c518' : '2px solid transparent',
                                color: tab === t.id ? '#f5c518' : 'rgba(255,255,255,0.45)',
                                fontSize: '12px', fontWeight: tab === t.id ? 700 : 400,
                                padding: '10px 16px', cursor: 'pointer', transition: 'all 0.2s',
                                fontFamily: 'inherit',
                            }}
                        >
                            {t.label}
                            {t.count > 0 && (
                                <span style={{
                                    marginLeft: '5px', background: tab === t.id ? 'rgba(245,197,24,0.2)' : 'rgba(255,255,255,0.08)',
                                    borderRadius: '10px', fontSize: '10px', padding: '0 6px', fontWeight: 700,
                                    color: tab === t.id ? '#f5c518' : 'rgba(255,255,255,0.45)',
                                }}>
                                    {t.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Body */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {/* ── PDF Tab ──────────────────────────────────────────── */}
                    {tab === 'pdf' && (
                        <>
                            {/* Upload Zone */}
                            <div style={{
                                border: `2px dashed ${pdfFile ? 'rgba(245,197,24,0.5)' : 'rgba(255,255,255,0.12)'}`,
                                borderRadius: '12px', padding: '20px',
                                background: pdfFile ? 'rgba(245,197,24,0.04)' : 'rgba(255,255,255,0.02)',
                                transition: 'all 0.2s',
                            }}>
                                <p style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: 700, color: '#f5c518', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    Upload PDF to Knowledge Base
                                </p>
                                <p style={{ margin: '0 0 12px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                                    PDF text will be extracted, split into chunks (~400 chars), embedded using MiniLM semantic vectors, and stored in the FAISS-like in-browser index. The chatbot will retrieve relevant chunks using cosine similarity.
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf"
                                        onChange={e => setPdfFile(e.target.files?.[0] || null)}
                                        style={{ display: 'none' }}
                                        id="pdf-upload-input"
                                    />
                                    <label
                                        htmlFor="pdf-upload-input"
                                        style={{
                                            ...btnStyle,
                                            cursor: 'pointer',
                                            background: 'rgba(255,255,255,0.06)',
                                            color: 'rgba(255,255,255,0.7)',
                                            border: '1px solid rgba(255,255,255,0.12)',
                                        }}
                                    >
                                        {pdfFile ? `📄 ${pdfFile.name.length > 28 ? pdfFile.name.slice(0, 28) + '…' : pdfFile.name}` : '📁 Choose PDF file'}
                                    </label>

                                    {pdfFile && !pdfProcessing && (
                                        <button onClick={handlePdfUpload} style={btnStyle}>
                                            🚀 Index PDF
                                        </button>
                                    )}

                                    {pdfProcessing && (
                                        <span style={{ fontSize: '11px', color: '#f5c518', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', border: '2px solid #f5c518', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                                            {pdfProgress}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Indexed PDFs */}
                            {pdfs.length > 0 ? (
                                <div>
                                    <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        Indexed PDFs ({pdfs.length})
                                    </p>
                                    {pdfs.map(name => {
                                        const count = docs.filter(d => d.type === 'pdf' && d.meta?.filename === name).length;
                                        return (
                                            <div key={name} style={{
                                                background: '#161b22', border: '1px solid rgba(255,255,255,0.07)',
                                                borderRadius: '10px', padding: '10px 14px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
                                                marginBottom: '6px',
                                            }}>
                                                <div>
                                                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#e9edef' }}>📄 {name}</span>
                                                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginLeft: '8px' }}>{count} chunks indexed</span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemovePdf(name)}
                                                    style={{ ...smallBtnStyle, color: '#f87171' }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', paddingTop: '12px' }}>
                                    No PDFs indexed yet. Upload one above.
                                </p>
                            )}
                        </>
                    )}

                    {/* ── Custom Chunk Tab ──────────────────────────────── */}
                    {tab === 'custom' && (
                        <>
                            <div style={{
                                background: 'rgba(245,197,24,0.04)', border: '1px solid rgba(245,197,24,0.15)',
                                borderRadius: '12px', padding: '14px',
                            }}>
                                <p style={{ margin: '0 0 10px', fontSize: '11px', fontWeight: 700, color: '#f5c518', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    + Add Custom Knowledge Chunk
                                </p>
                                <p style={{ margin: '0 0 10px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
                                    Add any text (like your phone number, new project, or achievement) that the chatbot should know. It will be embedded and stored in the vector index immediately.
                                </p>
                                <input
                                    value={newTags}
                                    onChange={e => setNewTags(e.target.value)}
                                    placeholder="Tags (comma-separated): contact, phone, mobile"
                                    style={inputStyle}
                                />
                                <textarea
                                    value={newText}
                                    onChange={e => setNewText(e.target.value)}
                                    placeholder="Knowledge text (e.g., 'Sarthak's mobile number is +91 XXXXX XXXXX')"
                                    rows={4}
                                    style={{ ...inputStyle, resize: 'vertical', marginTop: '8px' }}
                                />
                                <button
                                    onClick={handleAddChunk}
                                    disabled={!newText.trim() || addingChunk}
                                    style={{ ...btnStyle, marginTop: '8px', opacity: addingChunk ? 0.6 : 1 }}
                                >
                                    {addingChunk ? '⏳ Embedding...' : '+ Add to Knowledge Base'}
                                </button>
                            </div>

                            {/* Existing custom chunks */}
                            {customDocs.length > 0 && (
                                <div>
                                    <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                        Custom Chunks ({customDocs.length})
                                    </p>
                                    {customDocs.map(doc => (
                                        <ChunkCard
                                            key={doc.id}
                                            doc={doc}
                                            editingId={editingId}
                                            editText={editText}
                                            setEditingId={setEditingId}
                                            setEditText={setEditText}
                                            onSave={handleSaveEdit}
                                            onRemove={handleRemoveChunk}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* ── Index Tab ───────────────────────────────────────── */}
                    {tab === 'index' && (
                        <>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                                {[
                                    { label: 'Static', count: staticDocs.length, color: '#818cf8' },
                                    { label: 'PDF', count: pdfDocs.length, color: '#34d399' },
                                    { label: 'Custom', count: customDocs.length, color: '#f5c518' },
                                ].map(s => (
                                    <div key={s.label} style={{
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '8px',
                                    }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, flexShrink: 0, display: 'inline-block' }} />
                                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{s.label}: <strong style={{ color: s.color }}>{s.count}</strong></span>
                                    </div>
                                ))}
                            </div>

                            {docs.map(doc => (
                                <ChunkCard
                                    key={doc.id}
                                    doc={doc}
                                    editingId={editingId}
                                    editText={editText}
                                    setEditingId={setEditingId}
                                    setEditText={setEditText}
                                    onSave={handleSaveEdit}
                                    onRemove={doc.type !== 'static' ? handleRemoveChunk : undefined}
                                    showType
                                />
                            ))}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div style={{ padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                    <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                        🔒 Admin panel · Changes persist in localStorage · Embeddings via MiniLM (Transformers.js) + BM25 fallback
                    </p>
                </div>
            </div>

            {/* Spinner animation */}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
};

// ─── Chunk Card ───────────────────────────────────────────────────────────────
interface ChunkCardProps {
    doc: IndexedDoc;
    editingId: string | null;
    editText: string;
    setEditingId: (id: string | null) => void;
    setEditText: (t: string) => void;
    onSave: () => void;
    onRemove?: (id: string) => void;
    showType?: boolean;
}

const typeColors: Record<string, string> = { static: '#818cf8', pdf: '#34d399', custom: '#f5c518' };

const ChunkCard: React.FC<ChunkCardProps> = ({
    doc, editingId, editText, setEditingId, setEditText, onSave, onRemove, showType,
}) => (
    <div style={{
        background: '#161b22', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '10px', padding: '10px 12px', marginBottom: '6px',
    }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '6px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    {showType && (
                        <span style={{
                            fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                            color: typeColors[doc.type] || '#fff',
                            background: `${typeColors[doc.type] || '#fff'}18`,
                            border: `1px solid ${typeColors[doc.type] || '#fff'}40`,
                            borderRadius: '4px', padding: '1px 5px',
                        }}>
                            {doc.type}
                        </span>
                    )}
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em', textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                        {doc.id}
                    </span>
                </div>
                {doc.tags && doc.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                        {doc.tags.slice(0, 8).map(t => (
                            <span key={t} style={{ fontSize: '9px', color: '#f5c518', background: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.2)', borderRadius: '4px', padding: '1px 5px' }}>{t}</span>
                        ))}
                        {doc.tags.length > 8 && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>+{doc.tags.length - 8}</span>}
                    </div>
                )}
                {doc.meta?.filename && (
                    <span style={{ fontSize: '10px', color: '#34d399', marginTop: '2px', display: 'block' }}>
                        📄 {doc.meta.filename as string} · p.{doc.meta.page as number}
                    </span>
                )}
            </div>
            <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                {editingId !== doc.id && doc.type !== 'static' && (
                    <button onClick={() => { setEditingId(doc.id); setEditText(doc.text); }} style={{ ...smallBtnStyle, color: '#60a5fa' }}>Edit</button>
                )}
                {onRemove && (
                    <button onClick={() => onRemove(doc.id)} style={{ ...smallBtnStyle, color: '#f87171' }}>Remove</button>
                )}
            </div>
        </div>

        {editingId === doc.id ? (
            <>
                <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                />
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                    <button onClick={onSave} style={btnStyle}>Save & Re-embed</button>
                    <button onClick={() => setEditingId(null)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>Cancel</button>
                </div>
            </>
        ) : (
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {doc.text.substring(0, 240)}{doc.text.length > 240 ? '…' : ''}
            </p>
        )}
    </div>
);

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0d1117', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '7px', color: '#e9edef', fontSize: '11.5px', padding: '7px 10px',
    outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
};
const btnStyle: React.CSSProperties = {
    background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.25)',
    borderRadius: '7px', color: '#f5c518', fontSize: '11px', fontWeight: 600,
    padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit',
};
const smallBtnStyle: React.CSSProperties = {
    background: 'transparent', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '6px', fontSize: '10px', fontWeight: 600,
    padding: '3px 8px', cursor: 'pointer', fontFamily: 'inherit',
};

// ─── About Section ────────────────────────────────────────────────────────────
export const About: React.FC = () => {
    const [showPanel, setShowPanel] = useState(false);
    const clickCountRef = useRef(0);
    const clickTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Triple-click on the secret dot opens the panel
    const handleSecretClick = useCallback(() => {
        clickCountRef.current += 1;
        clearTimeout(clickTimerRef.current);

        if (clickCountRef.current >= 3) {
            clickCountRef.current = 0;
            setShowPanel(true);
        } else {
            clickTimerRef.current = setTimeout(() => {
                clickCountRef.current = 0;
            }, 600);
        }
    }, []);

    return (
        <SectionWrapper id="about">
            <AnimatedHeading sub="Introduction" title="About Me" />
            <div style={{ maxWidth: '800px', margin: '40px auto 0', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8, position: 'relative' }}>
                <p>
                    I am a passionate <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Software Developer</span> with a strong foundation in <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Full Stack Development</span>, <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Artificial Intelligence</span>, and <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Machine Learning</span>. I enjoy building scalable, user-friendly applications and solving real-world problems through technology. My experience includes developing web applications using the <span style={{ color: 'var(--gold)', fontWeight: 600 }}>MERN stack</span>, creating AI-powered solutions with <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Python</span>, and working with cloud technologies and <span style={{ color: 'var(--gold)', fontWeight: 600 }}>n8n automation tools</span>. I am always eager to learn new technologies, improve my problem-solving skills, and contribute to innovative software projects that create meaningful impact.
                </p>

                {/* 🔒 Secret trigger — tiny dot, triple-click to open admin panel */}
                <span
                    onClick={handleSecretClick}
                    title=""
                    style={{
                        position: 'absolute',
                        bottom: '-18px',
                        right: '0',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'rgba(245,197,24,0.15)',
                        cursor: 'default',
                        userSelect: 'none',
                        transition: 'background 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,197,24,0.35)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,197,24,0.15)')}
                />
            </div>

            {showPanel && <SecretUploadPanel onClose={() => setShowPanel(false)} />}
        </SectionWrapper>
    );
};
