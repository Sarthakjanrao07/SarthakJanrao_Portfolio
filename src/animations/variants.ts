import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
        opacity: 1,
        transition: { duration: 0.5, delay },
    }),
};

export const fadeLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (delay = 0) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

export const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: (delay = 0) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

export const floatAnim = {
    y: [0, -12, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
};

export const glowPulse = {
    boxShadow: [
        '0 0 0px rgba(212,166,79,0)',
        '0 0 30px rgba(212,166,79,0.4)',
        '0 0 0px rgba(212,166,79,0)',
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
};
