import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiYoutube } from 'react-icons/fi';

// Custom Codolio icon (owl logo image)
const CodolioIcon = () => (
    <img src="/images/codolio.png" alt="Codolio" style={{ width: '1.4em', height: '1.4em', objectFit: 'contain', display: 'block' }} />
);

const cpLinks = [
    { icon: CodolioIcon, href: 'https://codolio.com/profile/Sarthakjanrao07', label: 'Codolio' },
    { icon: FiYoutube, href: 'https://www.youtube.com/@Ky-rao', label: 'YouTube' },
];

interface CpSidebarProps {
    isHeroVisible: boolean;
    isMobile: boolean;
}

export const CpSidebar: React.FC<CpSidebarProps> = ({ isHeroVisible, isMobile }) => {
    // Show only when hero is visible — on both desktop and mobile.
    const shouldShow = isHeroVisible;

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    key="cp-sidebar"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        right: isMobile ? '14px' : '30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 110,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: isMobile ? '20px' : '24px',
                    }}
                >
                    {cpLinks.map((s, i) => (
                        <motion.a
                            key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            whileHover={{ scale: 1.2, color: 'var(--gold)' }}
                            style={{
                                color: 'rgba(255,255,255,0.6)',
                                fontSize: isMobile ? '1.2rem' : '1.4rem',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            <s.icon />
                        </motion.a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
