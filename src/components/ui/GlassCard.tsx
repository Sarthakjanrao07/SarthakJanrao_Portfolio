import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={className}
            style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
        >
            {children}
        </motion.div>
    );
};
