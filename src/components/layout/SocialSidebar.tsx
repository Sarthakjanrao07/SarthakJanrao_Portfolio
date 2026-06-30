import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter } from 'react-icons/fi';

const socials = [
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sarthak-janrao/', label: 'LinkedIn' },
    { icon: FiGithub, href: 'https://github.com/Sarthakjanrao07', label: 'GitHub' },
    { icon: FiInstagram, href: 'https://instagram.com/', label: 'Instagram' },
    { icon: FiTwitter, href: 'https://twitter.com/', label: 'Twitter' },
];

interface SocialSidebarProps {
    isHeroVisible: boolean;
    isMobile: boolean;
}

export const SocialSidebar: React.FC<SocialSidebarProps> = ({ isHeroVisible, isMobile }) => {
    // Show only when hero is visible — on both desktop and mobile.
    const shouldShow = isHeroVisible;

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    key="social-sidebar"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        left: isMobile ? '14px' : '30px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 110,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: isMobile ? '20px' : '24px',
                    }}
                >
                    {socials.map((s, i) => (
                        <motion.a
                            key={i}
                            href={s.href}
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
