import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCalendar, FiChevronDown, FiExternalLink } from 'react-icons/fi';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';
import { experienceData, responsibilityData } from '../data/experience';
import type { Experience as ExperienceType } from '../data/experience';

export const Experience: React.FC = () => {
    const [expandedId, setExpandedId] = useState<string | null>(experienceData[0].id);

    const renderCategory = (title: string, data: ExperienceType[]) => {
        return (
            <div className="section-box exp-section-box" style={{
                background: 'transparent',
                border: '1px solid rgba(212,166,79,0.3)',
                borderRadius: '16px',
                padding: '30px 24px',
                marginBottom: '32px',
                position: 'relative',
            }}>
                <h3 style={{
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: '24px',
                    letterSpacing: '0.02em'
                }}>
                    {title}
                </h3>

                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    {data.map((exp, i) => {
                        const isExpanded = expandedId === exp.id;

                        return (
                            <motion.div
                                className="section-card exp-card"
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                                style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    padding: '20px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'background 0.3s ease, border-color 0.3s ease',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                            >
                                {/* Card Header (Always Visible) */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '8px',
                                }}>
                                    {/* Date */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        color: 'var(--gold)',
                                        fontSize: '0.8rem',
                                        fontWeight: 700,
                                    }}>
                                        <FiCalendar style={{ fontSize: '0.9rem' }} />
                                        {exp.duration}
                                    </div>

                                    {/* "More/Less" Toggle */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        color: 'rgba(255,255,255,0.6)',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                    }}>
                                        <span>{isExpanded ? 'Less' : 'More'}</span>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{ color: 'var(--gold)' }}
                                        >
                                            <FiChevronDown />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Role and Location Row */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    gap: '10px'
                                }}>
                                    <div>
                                        <h3 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            color: '#fff',
                                            margin: '0 0 4px',
                                        }}>
                                            {exp.role}
                                            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 500 }}>, {exp.type}</span>
                                        </h3>
                                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {exp.company}
                                            {exp.link && (
                                                <a
                                                    href={exp.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    style={{
                                                        color: 'rgba(255,255,255,0.3)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        transition: 'color 0.2s ease'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--gold)'}
                                                    onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                                                >
                                                    <FiExternalLink size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        color: 'var(--gold)',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        marginTop: '4px'
                                    }}>
                                        <FiMapPin style={{ opacity: 0.8 }} />
                                        {exp.location}
                                    </div>
                                </div>

                                {/* Collapsible Details */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <div style={{
                                                paddingTop: '20px',
                                                marginTop: '16px',
                                                borderTop: '1px solid rgba(255,255,255,0.05)',
                                            }}>
                                                {/* Summary */}
                                                <p style={{
                                                    color: 'rgba(255,255,255,0.6)',
                                                    fontSize: '0.85rem',
                                                    lineHeight: 1.6,
                                                    marginBottom: '16px',
                                                }}>
                                                    {exp.summary}
                                                </p>

                                                {/* Highlights */}
                                                <ul style={{
                                                    listStyle: 'none',
                                                    padding: 0,
                                                    margin: '0 0 20px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px',
                                                }}>
                                                    {exp.highlights.map((h, j) => (
                                                        <li key={j} style={{
                                                            display: 'flex',
                                                            alignItems: 'flex-start',
                                                            gap: '8px',
                                                            color: 'rgba(255,255,255,0.7)',
                                                            fontSize: '0.85rem',
                                                            lineHeight: 1.5,
                                                        }}>
                                                            <span style={{
                                                                width: '5px',
                                                                height: '5px',
                                                                borderRadius: '50%',
                                                                background: 'var(--gold)',
                                                                marginTop: '7px',
                                                                flexShrink: 0,
                                                            }} />
                                                            {h}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Tech Stack */}
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '8px',
                                                }}>
                                                    {exp.tech.map((t, idx) => (
                                                        <span key={idx} style={{
                                                            background: 'rgba(212,166,79,0.1)',
                                                            border: '1px solid rgba(212,166,79,0.2)',
                                                            borderRadius: '4px',
                                                            padding: '4px 8px',
                                                            color: 'var(--gold)',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 600,
                                                        }}>
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <SectionWrapper id="experience">
            <AnimatedHeading sub="Professional Journey" title="Experience" />

            <div style={{
                marginTop: '40px',
                width: '100%',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                {renderCategory('Industrial Experience', experienceData)}
                {renderCategory('Position of Responsibility', responsibilityData)}
            </div>
        </SectionWrapper>
    );
};
