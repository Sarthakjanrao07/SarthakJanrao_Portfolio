import { useState, useEffect } from 'react';

export const useScrollSpy = (ids: string[], offset = 80): string => {
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: `-${offset}px 0px -60% 0px`, threshold: 0 }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids, offset]);

    return active;
};
