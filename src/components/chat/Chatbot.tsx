import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiExternalLink, FiGithub } from 'react-icons/fi';
import { generateChatResponse } from '../../utils/gemini';
import { personal } from '../../data/personal';

interface SkillCategory { name: string; icon: string; items: string[]; }
interface ProjectItem { title: string; description: string; tech: string[]; github?: string | null; live?: string | null; }
interface JobItem { role: string; company: string; duration: string; type: string; summary: string; highlights: string[]; tech: string[]; }
interface ContactInfo { phone: string; email: string; location: string; }
interface ProofInfo { linkedin: string; github: string; codolio: string; }

type StructuredPayload =
    | { type: 'skills'; data: { categories: SkillCategory[] } }
    | { type: 'projects'; data: { projects: ProjectItem[] } }
    | { type: 'experience'; data: { jobs: JobItem[] } }
    | { type: 'contact'; data: ContactInfo }
    | { type: 'proofs'; data: ProofInfo };

interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    structured?: StructuredPayload;
}

// ─── Try parsing structured response ─────────────────────────────────────────
function tryParseStructured(text: string): StructuredPayload | null {
    try {
        // Strip any accidental markdown fences
        const clean = text.replace(/^```json\s*|^```\s*|\s*```$/gm, '').trim();
        const parsed = JSON.parse(clean);
        if (parsed?.__structured__ && parsed.type && parsed.data) {
            return { type: parsed.type, data: parsed.data } as StructuredPayload;
        }
    } catch { /* not JSON */ }
    return null;
}

// ─── Skills renderer ──────────────────────────────────────────────────────────
const SkillsCard: React.FC<{ data: { categories: SkillCategory[] } }> = ({ data }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: 600, color: 'var(--gold, #f5c518)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            🛠️ Technical Skills
        </p>
        {data.categories.map((cat) => (
            <p key={cat.name} style={{ margin: 0, fontSize: '11.5px', lineHeight: 1.6, color: '#e9edef' }}>
                <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>{cat.name}:</span>
                {' '}{cat.items.join(', ')}
            </p>
        ))}
    </div>
);

// ─── Projects renderer ────────────────────────────────────────────────────────
const ProjectsCard: React.FC<{ data: { projects: ProjectItem[] } }> = ({ data }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--gold, #f5c518)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            🚀 Top Projects
        </p>
        {data.projects.map((proj, i) => (
            <div key={proj.title} style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '10px',
                padding: '9px 11px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#e9edef' }}>
                        <span style={{ color: 'var(--gold, #f5c518)', marginRight: '5px' }}>{i + 1}.</span>{proj.title}
                    </span>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        {proj.github && (
                            <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1 }} title="GitHub">
                                <FiGithub size={13} />
                            </a>
                        )}
                        {proj.live && (
                            <a href={proj.live} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1 }} title="Live Demo">
                                <FiExternalLink size={13} />
                            </a>
                        )}
                    </div>
                </div>
                <p style={{ margin: 0, fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{proj.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                    {proj.tech.map((t) => (
                        <span key={t} style={{
                            fontSize: '9.5px',
                            fontWeight: 600,
                            color: 'var(--gold, #f5c518)',
                            backgroundColor: 'rgba(245,197,24,0.1)',
                            border: '1px solid rgba(245,197,24,0.2)',
                            borderRadius: '5px',
                            padding: '1px 6px',
                            letterSpacing: '0.02em',
                        }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

// ─── Experience renderer ──────────────────────────────────────────────────────
const ExperienceCard: React.FC<{ data: { jobs: JobItem[] } }> = ({ data }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--gold, #f5c518)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            💼 Work Experience
        </p>
        {data.jobs.map((job) => (
            <div key={job.company} style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '10px',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
            }}>
                {/* Header */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#e9edef' }}>{job.role}</span>
                        <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--gold, #f5c518)', backgroundColor: 'rgba(245,197,24,0.1)', border: '1px solid rgba(245,197,24,0.2)', borderRadius: '4px', padding: '1px 6px', letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>
                            {job.type}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#00a884' }}>@ {job.company}</span>
                        <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.4)' }}>· {job.duration}</span>
                    </div>
                </div>

                {/* Summary */}
                <p style={{ margin: 0, fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{job.summary}</p>

                {/* Highlights */}
                <ul style={{ margin: 0, padding: '0 0 0 14px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {job.highlights.map((h, i) => (
                        <li key={i} style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{h}</li>
                    ))}
                </ul>

                {/* Tech badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '2px' }}>
                    {job.tech.map((t) => (
                        <span key={t} style={{
                            fontSize: '9.5px',
                            fontWeight: 600,
                            color: 'rgba(255,255,255,0.7)',
                            backgroundColor: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '5px',
                            padding: '1px 6px',
                        }}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

// ─── Contact renderer ─────────────────────────────────────────────────────────
const ContactCard: React.FC<{ data: ContactInfo }> = ({ data }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--gold, #f5c518)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            📞 Contact Details
        </p>
        <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <p style={{ margin: 0, fontSize: '11px', color: '#e9edef' }}>
                <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>📱 Phone:</span> {data.phone}
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: '#e9edef' }}>
                <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>📧 Email:</span> {data.email}
            </p>
            <p style={{ margin: 0, fontSize: '11px', color: '#e9edef' }}>
                <span style={{ fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>📍 Location:</span> {data.location}
            </p>
        </div>
    </div>
);

// ─── Profiles renderer ────────────────────────────────────────────────────────
const ProfilesCard: React.FC<{ data: ProofInfo }> = ({ data }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--gold, #f5c518)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            🔗 Proof of Work
        </p>
        <div style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '10px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <p style={{ margin: 0, fontSize: '10.5px', color: 'rgba(255,255,255,0.55)' }}>Check out my profiles below:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#60a5fa', textDecoration: 'none', background: 'rgba(96,165,250,0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    LinkedIn <FiExternalLink size={11} />
                </a>
                <a href={data.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#f2f4f5', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    GitHub <FiExternalLink size={11} />
                </a>
                <a href={data.codolio} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#34d399', textDecoration: 'none', background: 'rgba(52,211,153,0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                    Codolio <FiExternalLink size={11} />
                </a>
            </div>
        </div>
    </div>
);

// ─── Main Chatbot ─────────────────────────────────────────────────────────────
export const Chatbot: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { text: `Hi there! I'm ${personal.name}'s AI assistant. Ask me anything about Sarthak!`, sender: 'bot', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showChips, setShowChips] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 30;
        setShowChips(isAtBottom);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => { scrollToBottom(); }, [messages]);

    const handleSend = async (customText?: string) => {
        const userMsg = (customText || input).trim();
        if (!userMsg) return;

        if (!customText) setInput('');

        const newMessages = [...messages, { text: userMsg, sender: 'user' as const, timestamp: new Date() }];
        setMessages(newMessages);
        setIsLoading(true);

        const history = messages.map(m => ({
            role: m.sender === 'bot' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }));

        const rawResponse = await generateChatResponse(userMsg, history);
        const structured = tryParseStructured(rawResponse);

        setMessages(prev => [...prev, {
            text: structured ? '' : rawResponse,
            sender: 'bot',
            timestamp: new Date(),
            structured: structured ?? undefined,
        }]);
        setIsLoading(false);
    };

    const formatTime = (date: Date) =>
        date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const renderBotContent = (msg: Message) => {
        if (msg.structured) {
            if (msg.structured.type === 'skills')
                return <SkillsCard data={msg.structured.data as { categories: SkillCategory[] }} />;
            if (msg.structured.type === 'projects')
                return <ProjectsCard data={msg.structured.data as { projects: ProjectItem[] }} />;
            if (msg.structured.type === 'experience')
                return <ExperienceCard data={msg.structured.data as { jobs: JobItem[] }} />;
            if (msg.structured.type === 'contact')
                return <ContactCard data={msg.structured.data as ContactInfo} />;
            if (msg.structured.type === 'proofs')
                return <ProfilesCard data={msg.structured.data as ProofInfo} />;
        }
        return (
            <span style={{
                display: 'block',
                fontSize: '11.5px',
                lineHeight: '1.5',
                letterSpacing: '0.02em',
                fontWeight: 300,
                fontFamily: '"Inter", "Outfit", system-ui, -apple-system, sans-serif',
                color: msg.text.toLowerCase().includes('offline') || msg.text.toLowerCase().includes('missing') || msg.text.startsWith('⚠️') ? '#fca5a5' : '#e9edef',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
            }}>
                {msg.text}
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'flex-end',
                    float: 'right',
                    marginLeft: '8px',
                    marginTop: '3px',
                    fontSize: '9.5px',
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    lineHeight: 1.1,
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                }}>
                    {formatTime(msg.timestamp)}
                </span>
            </span>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
                    style={{ transformOrigin: 'bottom right' }}
                    className="fixed top-[74px] sm:top-24 lg:top-28 bottom-[92px] sm:bottom-[96px] lg:bottom-28 right-4 sm:right-8 lg:right-10 z-[120] w-[calc(100%-32px)] sm:w-[360px] flex flex-col bg-[#0b141a] rounded-3xl shadow-2xl overflow-hidden font-sans antialiased border border-[#2a3942]"
                >
                    {/* Header */}
                    <div style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 16px', background: 'linear-gradient(135deg, #1a1f2e 0%, #202c33 100%)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, zIndex: 20,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src="/images/chatbot.png" alt="Chatbot Avatar" style={{ width: '42px', height: '42px', objectFit: 'contain', flexShrink: 0 }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <h3 style={{ margin: 0, padding: 0, fontSize: '14px', fontWeight: 600, color: '#f2f4f5', letterSpacing: '0.02em', lineHeight: 1 }}>My Assistant</h3>
                                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(255,200,0,0.12)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,200,0,0.3)' }}>RAG</span>
                                </div>
                                <p style={{ margin: 0, padding: 0, fontSize: '10px', color: 'rgba(255,255,255,0.45)', fontWeight: 400, letterSpacing: '0.03em' }}>· Ask me anything</p>
                            </div>
                        </div>
                        <button onClick={onClose} style={{
                            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
                            color: 'rgba(255,255,255,0.6)', width: '28px', height: '28px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', cursor: 'pointer', fontSize: '16px', lineHeight: 1, flexShrink: 0,
                        }} aria-label="Close chat">×</button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 w-full overflow-x-hidden overflow-y-auto flex flex-col scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent bg-[#0b141a] relative z-0"
                        onScroll={handleScroll}
                        style={{
                            padding: '16px 18px', gap: '12px',
                            backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
                            backgroundSize: '400px', backgroundBlendMode: 'overlay', backgroundColor: 'rgba(11, 20, 26, 0.94)',
                        }}
                    >
                        <div className="text-center w-full flex justify-center" style={{ marginBottom: '6px' }}>
                            <span className="inline-block text-xs font-bold tracking-widest text-gray-400 bg-[#182229] px-4 py-1.5 rounded-lg shadow-sm">TODAY</span>
                        </div>

                        {messages.map((msg, idx) => {
                            const isUser = msg.sender === 'user';
                            const isStructured = !!msg.structured;

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    key={idx}
                                    style={{ display: 'flex', width: '100%', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
                                >
                                    <div style={{
                                        maxWidth: isStructured ? '100%' : '82%',
                                        width: isStructured ? '100%' : undefined,
                                        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                                        padding: isStructured ? '12px 13px' : '8px 12px',
                                        backgroundColor: isUser ? '#005c4b' : '#202c33',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word',
                                    }}>
                                        {isUser ? (
                                            <span style={{
                                                display: 'block', fontSize: '11.5px', lineHeight: '1.5',
                                                letterSpacing: '0.02em', fontWeight: 300,
                                                fontFamily: '"Inter", "Outfit", system-ui, -apple-system, sans-serif',
                                                color: '#e9edef', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                                            }}>
                                                {msg.text}
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'flex-end', float: 'right',
                                                    marginLeft: '8px', marginTop: '3px', fontSize: '9.5px',
                                                    color: 'rgba(255,255,255,0.45)', fontWeight: 500,
                                                    letterSpacing: '0.03em', lineHeight: 1.1, userSelect: 'none', whiteSpace: 'nowrap',
                                                }}>
                                                    {formatTime(msg.timestamp)}
                                                </span>
                                            </span>
                                        ) : (
                                            <>
                                                {renderBotContent(msg)}
                                                {isStructured && (
                                                    <div style={{
                                                        marginTop: '6px', textAlign: 'right', fontSize: '9.5px',
                                                        color: 'rgba(255,255,255,0.35)', letterSpacing: '0.03em',
                                                    }}>
                                                        {formatTime(msg.timestamp)}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {isLoading && (
                            <div className="flex w-full justify-start animate-fade-in">
                                <div className="bg-[#202c33] px-3.5 py-2.5 rounded-xl rounded-tl-sm flex items-center justify-center gap-1.5 shadow-sm border border-[#2a3942]/30">
                                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3.5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 }} />
                                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3.5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 }} />
                                    <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={{ y: [0, -3.5, 0] }} transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestion Chips */}
                    <AnimatePresence>
                        {showChips && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ overflow: 'hidden', backgroundColor: '#202c33', flexShrink: 0, zIndex: 21 }}
                            >
                                <div style={{
                                    width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', padding: '6px 12px 10px',
                                }}>
                                    {/* Top Row (3) */}
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                        {[
                                            { label: '💻 Technical Skills', query: 'What are your technical skills?' },
                                            { label: '🚀 Top Projects', query: 'Tell me about your top projects.' },
                                            { label: '💼 Work Experience', query: 'What is your work experience?' }
                                        ].map((chip) => (
                                            <button
                                                key={chip.label}
                                                onClick={() => handleSend(chip.query)}
                                                disabled={isLoading}
                                                style={{
                                                    fontSize: '11px', fontWeight: 400, color: '#e9edef', backgroundColor: '#2a3942',
                                                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '4px 10px',
                                                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s',
                                                    opacity: isLoading ? 0.6 : 1, fontFamily: 'inherit',
                                                }}
                                                onMouseEnter={e => { if (!isLoading) e.currentTarget.style.backgroundColor = '#384d59'; }}
                                                onMouseLeave={e => { if (!isLoading) e.currentTarget.style.backgroundColor = '#2a3942'; }}
                                            >
                                                {chip.label}
                                            </button>
                                        ))}
                                    </div>
                                    {/* Bottom Row (2) */}
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                        {[
                                            { label: '📞 Contact Details', query: 'What are your contact details?' },
                                            { label: '🔗 Proof of Work', query: 'Show your proof of work' }
                                        ].map((chip) => (
                                            <button
                                                key={chip.label}
                                                onClick={() => handleSend(chip.query)}
                                                disabled={isLoading}
                                                style={{
                                                    fontSize: '11px', fontWeight: 400, color: '#e9edef', backgroundColor: '#2a3942',
                                                    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '4px 10px',
                                                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.2s',
                                                    opacity: isLoading ? 0.6 : 1, fontFamily: 'inherit',
                                                }}
                                                onMouseEnter={e => { if (!isLoading) e.currentTarget.style.backgroundColor = '#384d59'; }}
                                                onMouseLeave={e => { if (!isLoading) e.currentTarget.style.backgroundColor = '#2a3942'; }}
                                            >
                                                {chip.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input Area */}
                    <div style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 12px', backgroundColor: '#202c33', flexShrink: 0, zIndex: 20,
                    }}>
                        <div style={{
                            flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#2a3942',
                            borderRadius: '18px', padding: '8px 14px', minHeight: '38px', boxSizing: 'border-box',
                        }}>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
                                }}
                                placeholder="Type a message..."
                                rows={1}
                                style={{
                                    width: '100%', background: 'transparent', border: 'none', outline: 'none',
                                    color: '#e9edef', fontSize: '13.5px', fontWeight: 400, lineHeight: '20px',
                                    letterSpacing: '0.01em', fontFamily: 'inherit', resize: 'none', maxHeight: '80px',
                                    margin: 0, padding: 0, display: 'block', overflowY: 'auto',
                                }}
                                className="scrollbar-thin scrollbar-thumb-gray-600 placeholder-shown:text-gray-400"
                            />
                        </div>
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            style={{
                                width: '48px', height: '48px', flexShrink: 0, borderRadius: '50%',
                                backgroundColor: '#00a884', color: '#fff', display: 'flex', alignItems: 'center',
                                justifyContent: 'center', border: 'none', cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)', transition: 'background 0.2s',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#00c59b')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#00a884')}
                        >
                            <FiSend size={20} style={{ marginRight: '1px', marginTop: '1px' }} />
                        </button>
                    </div>
                </motion.div >
            )}
        </AnimatePresence >
    );
};
