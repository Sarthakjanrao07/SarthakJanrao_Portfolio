import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiLock, FiCode, FiChevronDown, FiZap, FiTag, FiCalendar, FiUser } from 'react-icons/fi';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';
import { projectsData } from '../data/projects';
import type { Project } from '../data/projects';

// ──────────────────────────────────────────────
// PERSONAL PROJECT CARD
// ──────────────────────────────────────────────
const PersonalCard: React.FC<{ proj: Project; i: number }> = ({ proj, i }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            style={{
                background: 'rgba(20,20,30,0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            whileHover={{
                borderColor: 'rgba(212,166,79,0.6)',
                boxShadow: '0 0 28px rgba(212,166,79,0.15), 0 8px 32px rgba(0,0,0,0.3)',
            }}
        >
            {/* Thumbnail — always visible */}
            <div style={{ position: 'relative', flexShrink: 0, height: 'clamp(140px, 40vw, 200px)', width: '100%', overflow: 'hidden' }}>
                {proj.thumbnail && (proj.thumbnail.endsWith('.png') || proj.thumbnail.endsWith('.jpg') || proj.thumbnail.endsWith('.jpeg') || proj.thumbnail.endsWith('.webp') || proj.thumbnail.startsWith('/')) ? (
                    <img
                        src={proj.thumbnail.startsWith('public/') ? proj.thumbnail.replace('public/', '/') : proj.thumbnail}
                        alt={proj.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                ) : (
                    <div
                        className={`bg-gradient-to-br ${proj.thumbnail ?? 'from-slate-900 to-zinc-800'}`}
                        style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <FiCode style={{ color: 'rgba(255,255,255,0.08)', fontSize: '4rem' }} />
                    </div>
                )}
                {/* subtle inner vignette */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, transparent 60%, rgba(20,20,30,0.75) 100%)',
                    pointerEvents: 'none',
                }} />
            </div>

            {/* Title + More button — always visible */}
            <div style={{ padding: 'clamp(12px, 3vw, 16px) clamp(14px, 3vw, 18px) 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <h3 style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                    {proj.title}
                </h3>
                <button
                    onClick={() => setExpanded(v => !v)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        background: 'transparent',
                        border: 'none',
                        padding: '5px 13px',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.8rem', fontWeight: 600,
                        cursor: 'pointer', flexShrink: 0,
                        transition: 'color 0.2s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                    <div style={{
                        width: '17px', height: '17px', borderRadius: '50%',
                        border: '1.5px solid currentColor',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex' }}>
                            <FiChevronDown size={10} />
                        </motion.span>
                    </div>
                    {expanded ? 'Less' : 'More'}
                </button>
            </div>

            {/* Expandable detail */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: 'clamp(10px, 2.5vw, 14px) clamp(14px, 3vw, 18px)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>
                                {proj.description}
                            </p>

                            <div>
                                <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                    Tools &amp; Technologies
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {proj.tech.map(t => (
                                        <span key={t} style={{
                                            fontSize: '0.72rem', padding: '4px 10px', borderRadius: '6px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: 'rgba(255,255,255,0.7)',
                                            background: 'rgba(255,255,255,0.04)',
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {proj.features && (
                                <div>
                                    <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                                        Features
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                        {proj.features.map((f, j) => (
                                            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', marginTop: '7px', flexShrink: 0 }} />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Github + Live — always visible at bottom */}
            <div style={{
                padding: 'clamp(10px, 2.5vw, 14px) clamp(14px, 3vw, 18px) clamp(14px, 3.5vw, 18px)',
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                marginTop: 'auto'
            }}>
                {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{
                        flex: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: 'clamp(8px, 2vw, 11px)', borderRadius: '8px',
                        border: '1.5px solid rgba(212,166,79,0.45)',
                        background: 'transparent', color: 'var(--gold)',
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: 700,
                        textDecoration: 'none', letterSpacing: '0.03em',
                        transition: 'background 0.2s, border-color 0.2s',
                    }}
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(212,166,79,0.12)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(212,166,79,0.45)'; }}
                    >
                        <FiGithub size={16} /> Github
                    </a>
                )}
                {proj.live && (
                    <a href={proj.live} target="_blank" rel="noopener noreferrer" style={{
                        flex: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        padding: 'clamp(8px, 2vw, 11px)', borderRadius: '8px',
                        border: '1.5px solid rgba(255,255,255,0.12)',
                        background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.75)',
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', fontWeight: 700,
                        textDecoration: 'none', letterSpacing: '0.03em',
                        transition: 'all 0.2s',
                    }}
                        onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#fff'; }}
                        onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
                    >
                        <FiExternalLink size={16} /> Live
                    </a>
                )}
            </div>
        </motion.div>
    );
};

// ──────────────────────────────────────────────
// ORGANIZATIONAL PROJECT CARD
// ──────────────────────────────────────────────
const OrgCard: React.FC<{ proj: Project; i: number }> = ({ proj, i }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            style={{
                background: 'rgba(20,20,30,0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: 'clamp(14px, 3vw, 20px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            whileHover={{
                borderColor: 'rgba(212,166,79,0.55)',
                boxShadow: '0 0 24px rgba(212,166,79,0.12), 0 8px 28px rgba(0,0,0,0.3)',
            }}
        >
            {/* Tags + Private */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
                {(proj.tags ?? []).map(tag => (
                    <span key={tag} style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '0.65rem', fontWeight: 600,
                        padding: '4px 10px', borderRadius: '20px',
                        background: 'rgba(212,166,79,0.1)',
                        border: '1px solid rgba(212,166,79,0.3)',
                        color: 'var(--gold)',
                    }}>
                        <FiTag size={10} /> {tag}
                    </span>
                ))}
                {proj.isPrivate && (
                    <span style={{
                        marginLeft: 'auto',
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        fontSize: '0.65rem', fontWeight: 700,
                        padding: '4px 10px', borderRadius: '20px',
                        background: 'rgba(212,166,79,0.12)',
                        border: '1px solid rgba(212,166,79,0.4)',
                        color: 'var(--gold)',
                    }}>
                        <FiLock size={10} /> Private
                    </span>
                )}
            </div>

            {/* Title + More/Less */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                    {proj.title}
                </h3>
                <button
                    onClick={() => setExpanded(v => !v)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        background: 'transparent',
                        border: 'none',
                        padding: '5px 13px',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.8rem', fontWeight: 600,
                        cursor: 'pointer', flexShrink: 0,
                        transition: 'color 0.2s',
                    }}
                    onMouseOver={e => { e.currentTarget.style.color = 'var(--gold)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                    <div style={{
                        width: '17px', height: '17px', borderRadius: '50%',
                        border: '1.5px solid currentColor',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ display: 'flex' }}>
                            <FiChevronDown size={10} />
                        </motion.span>
                    </div>
                    {expanded ? 'Less' : 'More'}
                </button>
            </div>

            {/* Company / Year / Role */}
            {(proj.company || proj.year || proj.role) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px' }}>
                    {proj.company && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600 }}>
                            <FiUser size={12} style={{ color: 'var(--gold)' }} /> {proj.company}
                        </span>
                    )}
                    {proj.year && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                            <FiCalendar size={12} style={{ color: 'var(--gold)' }} /> {proj.year}
                        </span>
                    )}
                    {proj.role && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>
                            <FiZap size={12} style={{ color: 'var(--gold)' }} /> {proj.role}
                        </span>
                    )}
                </div>
            )}

            {/* Short description */}
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                {proj.description}
            </p>

            {/* Expandable detail */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="org-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {proj.about && (
                                <div>
                                    <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>
                                        About the Project
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.65, margin: 0 }}>
                                        {proj.about}
                                    </p>
                                </div>
                            )}

                            {proj.contribution && proj.contribution.length > 0 && (
                                <div>
                                    <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>
                                        My Contribution
                                    </div>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                        {proj.contribution.map((c, j) => (
                                            <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', marginTop: '7px', flexShrink: 0 }} />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div>
                                <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>
                                    Tech Stack
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                    {proj.tech.map(t => (
                                        <span key={t} style={{
                                            fontSize: '0.72rem', padding: '4px 10px', borderRadius: '6px',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: 'rgba(255,255,255,0.7)',
                                            background: 'rgba(255,255,255,0.04)',
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {proj.impact && (
                                <div style={{
                                    background: 'rgba(212,166,79,0.05)',
                                    border: '1px solid rgba(212,166,79,0.2)',
                                    borderRadius: '10px',
                                    padding: '12px 16px',
                                }}>
                                    <div style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                                        Impact
                                    </div>
                                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}>
                                        {proj.impact}
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div style={{
                paddingTop: '10px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: '6px',
                color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', fontStyle: 'italic',
            }}>
                <FiLock size={11} />
                Organisational — Confidential
            </div>
        </motion.div>
    );
};

// ──────────────────────────────────────────────
// MAIN SECTION
// ──────────────────────────────────────────────
export const Portfolio: React.FC = () => {
    const personal = projectsData.filter(p => p.category === 'personal');
    const org = projectsData.filter(p => p.category === 'organizational');

    return (
        <SectionWrapper id="projects">
            <AnimatedHeading sub="My Recent Works" title="Portfolio" />

            <div style={{
                marginTop: '40px',
                width: '100%',
                maxWidth: '1100px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
            }}>
                {/* Personal Projects */}
                <div style={{
                    border: '1px solid rgba(212,166,79,0.25)',
                    borderRadius: '16px',
                    padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)',
                    background: 'rgba(255,255,255,0.01)',
                }}>
                    <h3 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '28px', letterSpacing: '0.02em' }}>
                        My Personal Projects
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 80vw, 290px), 1fr))',
                        gap: 'clamp(12px, 3vw, 20px)',
                        alignItems: 'start',
                    }}>
                        {personal.map((proj, i) => <PersonalCard key={proj.id} proj={proj} i={i} />)}
                    </div>
                </div>

                {/* Organizational Projects */}
                <div style={{
                    border: '1px solid rgba(212,166,79,0.25)',
                    borderRadius: '16px',
                    padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)',
                    background: 'rgba(255,255,255,0.01)',
                }}>
                    <h3 style={{ textAlign: 'center', fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '8px', letterSpacing: '0.02em' }}>
                        Organizational Projects
                    </h3>
                    <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', marginBottom: '24px' }}>
                        Projects built during organizational engagements — shared for reference only, no source code or live links.
                    </p>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                        gap: 'clamp(12px, 3vw, 20px)',
                        alignItems: 'start',
                    }}>
                        {org.map((proj, i) => <OrgCard key={proj.id} proj={proj} i={i} />)}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
