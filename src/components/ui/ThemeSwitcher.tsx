import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdFormatPaint } from 'react-icons/md';
import { useTheme } from '../../hooks/useTheme';

export const ThemeSwitcher: React.FC = () => {
    const { toggleTheme } = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div style={{ position: 'fixed', right: '20px', top: '120px', zIndex: 300 }}>
            <motion.button
                onClick={toggleTheme}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.1, color: 'var(--gold)' }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    background: 'transparent',
                    color: 'rgba(255,255,255,0.4)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: 'none',
                    position: 'relative',
                    transition: 'color 0.3s ease',
                }}
            >
                <MdFormatPaint size={22} />

                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            style={{
                                position: 'absolute',
                                right: '50px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(10, 10, 15, 0.9)',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                whiteSpace: 'nowrap',
                                border: '1px solid rgba(255,255,255,0.1)',
                                pointerEvents: 'none',
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            Change theme
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
