import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiUser, FiBriefcase, FiCode, FiAward, FiMail } from 'react-icons/fi';
import { MdOutlineSchool } from 'react-icons/md';
import { personal } from '../../data/personal';

const navItems = [
    { id: 'hero', label: 'Home', Icon: FiHome },
    { id: 'about', label: 'About', Icon: FiUser },
    { id: 'education', label: 'Education', Icon: MdOutlineSchool },
    { id: 'experience', label: 'Experience', Icon: FiBriefcase },
    { id: 'projects', label: 'Portfolio', Icon: FiCode },
    { id: 'achievements', label: 'Achievements', Icon: FiAward },
    { id: 'contact', label: 'Contact', Icon: FiMail },
];

interface NavbarProps {
    activeSection: string;
    onSectionChange: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const iconSize = isMobile ? 18 : 18;
    const btnSize = isMobile ? 'clamp(32px, 11vw, 42px)' : '42px';
    const gap = isMobile ? 'clamp(2px, 1vw, 4px)' : '4px';

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
                position: 'fixed',
                top: '0',
                left: 0,
                right: 0,
                zIndex: 200,
                padding: isMobile ? '10px 12px' : '16px 24px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'center' : 'space-between',
                    width: '100%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: isMobile ? '6px 8px' : '8px 12px 8px 24px',
                    borderRadius: isMobile ? '20px' : '16px',
                    backgroundColor: 'rgba(10, 10, 15, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                {/* Logo - hidden on mobile */}
                {!isMobile && (
                    <button
                        onClick={() => onSectionChange('hero')}
                        style={{
                            fontSize: '1.4rem',
                            fontWeight: 900,
                            color: 'var(--gold)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            flexShrink: 0,
                        }}
                    >
                        {personal.initials}
                    </button>
                )}

                {/* Nav Items */}
                <nav
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap,
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        width: isMobile ? '100%' : 'auto',
                    }}
                >
                    {navItems.map(({ id, label, Icon }) => {
                        const isActive = activeSection === id;
                        const isHovered = hovered === id;

                        return (
                            <button
                                key={id}
                                onClick={() => onSectionChange(id)}
                                onMouseEnter={() => setHovered(id)}
                                onMouseLeave={() => setHovered(null)}
                                title={label}
                                style={{
                                    width: btnSize,
                                    height: btnSize,
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    background: isActive
                                        ? 'rgba(255, 255, 255, 0.07)'
                                        : isHovered
                                            ? 'rgba(255, 255, 255, 0.04)'
                                            : 'transparent',
                                    color: (isActive || isHovered) ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                                    position: 'relative',
                                }}
                            >
                                <Icon size={iconSize} />
                                {isActive && (
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '4px',
                                        width: '4px',
                                        height: '4px',
                                        borderRadius: '50%',
                                        background: 'var(--gold)',
                                        boxShadow: '0 0 8px var(--gold)',
                                    }} />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </motion.header>
    );
};
