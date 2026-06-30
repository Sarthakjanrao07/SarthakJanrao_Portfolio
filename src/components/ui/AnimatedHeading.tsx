import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
    sub: string;
    title: string;
    center?: boolean;
    delay?: number;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
    sub,
    title,
    center = true,
    delay = 0,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
        className={center ? 'text-center' : ''}
    >
        <p className="text-[var(--gold)] text-xs font-semibold tracking-[0.2em] uppercase mb-2 opacity-80">
            {sub}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] leading-tight">
            {title}
        </h2>
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-4 h-[2px] w-16 bg-gradient-to-r from-[var(--gold)] to-transparent rounded-full ${center ? 'mx-auto' : ''}`}
            style={{ transformOrigin: center ? 'center' : 'left' }}
        />
    </motion.div>
);
