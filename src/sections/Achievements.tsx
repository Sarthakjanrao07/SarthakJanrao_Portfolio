import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { achievementsData } from '../data/achievements';
import type { AchievementCategory, Achievement } from '../data/achievements';

const tabs: { id: AchievementCategory; label: string; icon: React.ReactNode }[] = [
    {
        id: 'certification',
        label: 'Certifications',
        icon: <FiAward style={{ fontSize: '13px' }} />
    },
    {
        id: 'award',
        label: 'Awards & Competitions',
        icon: <FiAward style={{ fontSize: '13px' }} />
    },
];

const AchievementCard: React.FC<{ item: Achievement; i: number }> = ({ item, i }) => {
    const hasLink = item.credentialUrl && item.credentialUrl !== '#';

    const cardContent = (
        <>
            {/* Header row: Icon & Type Tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                {/* Visual Icon (Trophy/Certificate circle) */}
                <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(212,166,79,0.08)',
                    border: '1.5px solid var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold)',
                }}>
                    <FiAward size={16} />
                </div>

                {/* Upper Right Pill */}
                <div style={{
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    border: '1px solid rgba(212,166,79,0.4)',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.05em',
                    background: 'rgba(212,166,79,0.03)',
                }}>
                    {item.category === 'award' ? 'Competition' : 'Certification'}
                </div>
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#fff',
                margin: '18px 0 10px 0',
                lineHeight: 1.4,
                letterSpacing: '0.01em',
            }}>
                {item.title}
            </h3>

            {/* Organizer Info */}
            <div style={{ fontSize: '0.82rem', lineHeight: 1.5, margin: '2px 0' }}>
                <span style={{ color: 'var(--gold)', fontWeight: 700 }}>
                    {item.category === 'award' ? 'Organizer: ' : 'Issuer: '}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {item.issuer}
                </span>
            </div>

            {/* Date */}
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>
                {item.date}
            </div>

            {/* Optional Description */}
            {item.description && (
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.5, margin: '10px 0 0 0' }}>
                    {item.description}
                </p>
            )}

            {/* Certificate Available Label Pill */}
            {hasLink && (
                <div style={{
                    alignSelf: 'flex-start',
                    marginTop: '20px',
                    background: 'rgba(16,185,129,0.08)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    color: '#10b981',
                    borderRadius: '20px',
                    padding: '5px 12px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(16,185,129,0.15)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(16,185,129,0.08)'}
                >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    Certificate Available
                    <FiExternalLink size={11} style={{ marginLeft: '2px' }} />
                </div>
            )}
        </>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
            style={{
                background: 'rgba(20,20,30,0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                border: '1px solid rgba(212,166,79,0.18)',
                padding: 'clamp(16px, 3.5vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            whileHover={{
                borderColor: 'rgba(212,166,79,0.5)',
                boxShadow: '0 0 24px rgba(212,166,79,0.12), 0 8px 24px rgba(0,0,0,0.3)',
                y: -4,
            }}
        >
            {hasLink ? (
                <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
                >
                    {cardContent}
                </a>
            ) : (
                cardContent
            )}
        </motion.div>
    );
};

export const Achievements: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AchievementCategory>('certification');

    const filtered = achievementsData.filter(a => a.category === activeTab);

    return (
        <SectionWrapper id="achievements">
            {/* Header section designed to match the mockup and prevent overlap */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{
                    fontSize: '2.4rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    margin: '0 0 12px 0',
                    letterSpacing: '0.02em',
                }}>
                    Achievements
                </h2>
                <p style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '0.95rem',
                    margin: 0,
                    lineHeight: 1.5,
                }}>
                    Certifications, awards, and recognitions earned along the journey.
                </p>
            </div>

            {/* Tabs Selector Navigation Row */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '44px',
                flexWrap: 'wrap',
            }}>
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: isActive ? 'var(--gold)' : 'transparent',
                                border: isActive ? '1.5px solid var(--gold)' : '1.5px solid rgba(255,255,255,0.15)',
                                borderRadius: '30px',
                                padding: '10px 24px',
                                color: isActive ? '#000000' : 'rgba(255,255,255,0.6)',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                            }}
                            onMouseOver={e => {
                                if (!isActive) {
                                    e.currentTarget.style.borderColor = 'var(--gold)';
                                    e.currentTarget.style.color = '#fff';
                                }
                            }}
                            onMouseOut={e => {
                                if (!isActive) {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                                }
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Grid of Active Category Cards */}
            <div style={{
                width: '100%',
                maxWidth: '1100px',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                <motion.div
                    layout
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                        gap: 'clamp(12px, 3vw, 20px)',
                        alignItems: 'stretch',
                    }}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filtered.map((item, i) => (
                            <AchievementCard key={item.id} item={item} i={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
