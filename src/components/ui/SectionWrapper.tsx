import React from 'react';

interface SectionWrapperProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children, className }) => {
    return (
        <section
            id={id}
            className={className}
            style={{
                padding: '100px 24px',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Dynamic Perspective Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120%',
                    height: '400px',
                    background: 'radial-gradient(ellipse at center, var(--gold-glow) 0%, transparent 70%)',
                    opacity: 0.15,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px' }}>
                {children}
            </div>
        </section>
    );
};
