import React from 'react';
import { personal } from '../../data/personal';

export const Footer: React.FC = () => {
    return (
        <footer style={{
            padding: '40px 20px',
            textAlign: 'center',
            background: 'var(--gold)',
            marginTop: 'auto',
        }}>
            <p style={{
                fontSize: '1.3rem',
                fontWeight: 900,
                color: 'rgba(0,0,0,0.85)',
                letterSpacing: '0.2em',
                marginBottom: '12px',
            }}>
                {personal.initials}
            </p>
            <p style={{
                color: 'rgba(0,0,0,0.55)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
            }}>
                © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
        </footer>
    );
};
