import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';
import { educationData } from '../data/education';

export const Education: React.FC = () => {
    return (
        <SectionWrapper id="education">
            <AnimatedHeading sub="What Qualifications I Have" title="My Education" />

            <div style={{
                marginTop: '60px',
                width: '100%',
                maxWidth: '780px',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                position: 'relative',
            }}>
                {/* Vertical timeline line */}
                <div style={{
                    position: 'absolute',
                    left: '28px',
                    top: '36px',
                    bottom: '36px',
                    width: '2px',
                    background: 'linear-gradient(to bottom, var(--gold), rgba(212,166,79,0.1))',
                    zIndex: 0,
                }} />

                {educationData.map((edu, i) => (
                    <motion.div
                        className="section-card edu-card"
                        key={edu.id}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                        style={{
                            display: 'flex',
                            gap: '24px',
                            alignItems: 'flex-start',
                            marginBottom: i < educationData.length - 1 ? '32px' : '0',
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        {/* Timeline dot */}
                        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, rgba(212,166,79,0.2), rgba(212,166,79,0.05))',
                                    border: '2px solid var(--gold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--gold)',
                                    fontSize: '1.2rem',
                                    boxShadow: '0 0 20px rgba(212,166,79,0.25)',
                                    flexShrink: 0,
                                }}
                            >
                                <FiAward />
                            </motion.div>
                        </div>

                        {/* Card */}
                        <div className="edu-card-body" style={{
                            flex: 1,
                            background: 'rgba(255,255,255,0.04)',
                            backdropFilter: 'blur(12px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(212,166,79,0.2)',
                            padding: '24px 28px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Card left accent bar */}
                            <div style={{
                                position: 'absolute',
                                left: 0, top: 0, bottom: 0,
                                width: '4px',
                                background: 'linear-gradient(to bottom, var(--gold), rgba(212,166,79,0.2))',
                                borderRadius: '16px 0 0 16px',
                            }} />

                            {/* Top row: period + score badge */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '10px',
                                marginBottom: '10px',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    color: 'var(--gold)',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                }}>
                                    <FiCalendar style={{ fontSize: '0.8rem' }} />
                                    {edu.period}
                                </div>

                                {/* Score badge */}
                                <div style={{
                                    background: 'rgba(212,166,79,0.12)',
                                    border: '1px solid rgba(212,166,79,0.35)',
                                    borderRadius: '20px',
                                    padding: '4px 14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}>
                                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        {edu.scoreLabel}
                                    </span>
                                    <span style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 800 }}>
                                        {edu.score}
                                    </span>
                                </div>
                            </div>

                            {/* Degree */}
                            <h3 style={{
                                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                                fontWeight: 800,
                                color: '#fff',
                                margin: '0 0 8px',
                                lineHeight: 1.3,
                            }}>
                                {edu.degree}
                            </h3>

                            {/* Institution + location */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'rgba(160,160,190,0.8)',
                                fontSize: '0.85rem',
                                marginBottom: '20px',
                                flexWrap: 'wrap',
                            }}>
                                <FiMapPin style={{ fontSize: '0.8rem', flexShrink: 0, color: 'var(--gold)', opacity: 0.7 }} />
                                <span>{edu.institution}</span>
                                <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>
                                <span style={{ color: 'rgba(160,160,190,0.6)' }}>{edu.location}</span>
                            </div>

                            {/* Progress bar — full width */}
                            <div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '6px',
                                }}>
                                    <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                        Score
                                    </span>
                                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', fontWeight: 600 }}>
                                        {edu.scorePercent}%
                                    </span>
                                </div>
                                <div style={{
                                    height: '6px',
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.06)',
                                    borderRadius: '100px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(212,166,79,0.08)',
                                }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${edu.scorePercent}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.4 + i * 0.15 }}
                                        style={{
                                            height: '100%',
                                            background: 'linear-gradient(90deg, rgba(212,166,79,0.6), var(--gold))',
                                            borderRadius: '100px',
                                            boxShadow: '0 0 10px rgba(212,166,79,0.4)',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile responsive styles */}
            <style>{`
                @media (max-width: 600px) {
                    #education .edu-timeline-line { display: none; }
                }
            `}</style>
        </SectionWrapper>
    );
};
