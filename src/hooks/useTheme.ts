import { useState, useEffect } from 'react';

export type ThemeType = 'gold' | 'aqua' | 'purple' | 'emerald';

interface ThemeColors {
    gold: string;
    glow: string;
    bg: string;
    bg2: string;
    bg3: string;
    border: string;
}

const themes: Record<ThemeType, ThemeColors> = {
    gold: {
        gold: '#d4a64f',
        glow: 'rgba(212, 166, 79, 0.2)',
        bg: '#0a0a14',
        bg2: '#121220',
        bg3: '#18182a',
        border: 'rgba(212, 166, 79, 0.1)',
    },
    aqua: {
        gold: '#00f2ff',
        glow: 'rgba(0, 242, 255, 0.2)',
        bg: '#050c10',
        bg2: '#0a161d',
        bg3: '#0f222d',
        border: 'rgba(0, 242, 255, 0.1)',
    },
    purple: {
        gold: '#bc13fe',
        glow: 'rgba(188, 19, 254, 0.2)',
        bg: '#08040d',
        bg2: '#140a1d',
        bg3: '#1d0f2b',
        border: 'rgba(188, 19, 254, 0.1)',
    },
    emerald: {
        gold: '#00ff88',
        glow: 'rgba(0, 255, 136, 0.2)',
        bg: '#040d08',
        bg2: '#0a1d14',
        bg3: '#0f2b1d',
        border: 'rgba(0, 255, 136, 0.1)',
    },
};

export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeType>('gold');

    useEffect(() => {
        const root = document.documentElement;
        const colors = themes[theme];

        root.style.setProperty('--gold', colors.gold);
        root.style.setProperty('--gold-glow', colors.glow);
        root.style.setProperty('--bg', colors.bg);
        root.style.setProperty('--bg-2', colors.bg2);
        root.style.setProperty('--bg-3', colors.bg3);
        root.style.setProperty('--glass-border', colors.border);
    }, [theme]);

    const toggleTheme = () => {
        const types: ThemeType[] = ['gold', 'aqua', 'purple', 'emerald'];
        const nextIndex = (types.indexOf(theme) + 1) % types.length;
        setTheme(types[nextIndex]);
    };

    return { theme, toggleTheme };
};
