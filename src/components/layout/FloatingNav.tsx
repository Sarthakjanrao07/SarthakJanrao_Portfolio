import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiBriefcase, FiCode, FiAward, FiMail } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';

const sections = [
    { id: 'hero', label: 'Home', Icon: FiHome },
    { id: 'about', label: 'About', Icon: FiUser },
    { id: 'education', label: 'Education', Icon: MdOutlineSchool },
    { id: 'experience', label: 'Experience', Icon: FiBriefcase },
    { id: 'projects', label: 'Portfolio', Icon: FiCode },
    { id: 'achievements', label: 'Achievements', Icon: FiAward },
    { id: 'contact', label: 'Contact', Icon: FiMail },
];

interface FloatingNavProps {
    activeSection: string;
    onSectionChange: (id: string) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ activeSection, onSectionChange }) => {
    return (
        <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
                position: 'fixed',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
            }}
            className="hidden lg:flex"
        >
            {sections.map(({ id, label, Icon }, i) => {
                const isActive = activeSection === id;
                return (
                    <motion.button
                        key={id}
                        onClick={() => onSectionChange(id)}
                        title={label}
                        aria-label={`Go to ${label}`}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + i * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                        className="group relative"
                        style={{
                            background: isActive ? 'rgba(255,255,255,0.03)' : 'transparent',
                            border: isActive ? '1px solid var(--gold)' : '1px solid transparent',
                            borderRadius: '12px',
                            width: '44px',
                            height: '44px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: isActive ? 'var(--gold)' : '#ffffff', // White by default
                            transition: 'all 0.3s ease',
                            boxShadow: isActive ? '0 0 15px var(--gold-glow)' : 'none',
                        }}
                    >
                        <Icon size={18} />

                        {/* Tooltip */}
                        <span
                            style={{
                                position: 'absolute',
                                right: '54px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '11px',
                                color: 'var(--gold)',
                                whiteSpace: 'nowrap',
                                background: 'var(--bg-2)',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                border: '1px solid var(--glass-border)',
                                pointerEvents: 'none',
                                opacity: 0,
                                transition: 'all 0.25s ease',
                                fontWeight: 600,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                            }}
                            className="group-hover:opacity-100 group-hover:right-[50px]"
                        >
                            {label}
                        </span>
                    </motion.button>
                );
            })}
        </motion.nav>
    );
};
