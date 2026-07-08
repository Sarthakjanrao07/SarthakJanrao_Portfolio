import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'gold' | 'outline' | 'ghost';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'gold', leftIcon, rightIcon, children, ...props }) => {
    const isGold = variant === 'gold';
    const isOutline = variant === 'outline';

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: isGold ? 'var(--gold)' : 'transparent',
                color: isGold ? '#0a0a14' : 'var(--gold)',
                border: isOutline ? '2px solid var(--gold)' : 'none',
                opacity: props.disabled ? 0.5 : 1,
                boxShadow: isGold ? '0 4px 15px var(--gold-glow)' : 'none',
            }}
            {...(props as any)}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </motion.button>
    );
};
