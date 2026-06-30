import { useState, useEffect, useRef } from 'react';

export const useTypingEffect = (words: string[], speed = 80, pause = 1800) => {
    const [displayed, setDisplayed] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const current = words[wordIndex];

        const tick = () => {
            if (!deleting) {
                if (charIndex < current.length) {
                    setDisplayed(current.slice(0, charIndex + 1));
                    setCharIndex((c) => c + 1);
                    timeoutRef.current = setTimeout(tick, speed);
                } else {
                    timeoutRef.current = setTimeout(() => setDeleting(true), pause);
                }
            } else {
                if (charIndex > 0) {
                    setDisplayed(current.slice(0, charIndex - 1));
                    setCharIndex((c) => c - 1);
                    timeoutRef.current = setTimeout(tick, speed / 2);
                } else {
                    setDeleting(false);
                    setWordIndex((w) => (w + 1) % words.length);
                    timeoutRef.current = setTimeout(tick, 300);
                }
            }
        };

        timeoutRef.current = setTimeout(tick, 120);
        return () => clearTimeout(timeoutRef.current);
    }, [charIndex, deleting, wordIndex, words, speed, pause]);

    return displayed;
};
