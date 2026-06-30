export type AchievementCategory = 'certification' | 'award';

export interface Achievement {
    id: string;
    category: AchievementCategory;
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
    badge?: string; // emoji or icon label
    description?: string;
}

export const achievementsData: Achievement[] = [
    // Certifications
    // {
    //     id: 'cert-1',
    //     category: 'certification',
    //     title: 'AWS Certified Cloud Practitioner',
    //     issuer: 'Amazon Web Services',
    //     date: 'March 2025',
    //     credentialUrl: '#',
    //     badge: '☁️',
    //     description: 'Foundational cloud concepts, AWS services, security, and pricing.',
    // },
    {
        id: 'cert-1',
        category: 'certification',
        title: 'Professional Data Analytics Certification',
        issuer: 'DeepLearning.AI',
        date: 'May 2026',
        credentialUrl: 'https://learn.deeplearning.ai/certificates/98db2294-8180-4847-af62-241db525ba54',
        badge: '🥇',
        // description: 'Completed a professional certificate in Data Analytics covering Python, SQL, statistics, data preprocessing, and data storytelling through hands-on projects.',
    },
    // {
    //     id: 'cert-3',
    //     category: 'certification',
    //     title: 'Full Stack Web Development',
    //     issuer: 'Meta (Coursera)',
    //     date: 'October 2024',
    //     credentialUrl: '#',
    //     badge: '💻',
    //     description: 'React, Node.js, REST APIs, databases, and deployment.',
    // },
    // {
    //     id: 'cert-4',
    //     category: 'certification',
    //     title: 'Deep Learning Specialization',
    //     issuer: 'DeepLearning.AI (Coursera)',
    //     date: 'August 2024',
    //     credentialUrl: '#',
    //     badge: '🧠',
    //     description: 'Neural networks, CNNs, RNNs, and AI system design.',
    // },
    // Awards
    {
        id: 'award-1',
        category: 'award',
        title: 'TFWS Seat — MHTCET with 95.56 percentile',
        issuer: 'MHTCET',
        date: 'OCT 2022',
        // badge: '🥇',
        // description: 'Built an AI-powered code review tool ranked top 10 globally.',
    },
    {
        id: 'award-2',
        category: 'award',
        title: 'Finalist — Seed Hackathon 2025',
        issuer: 'SEED Global Education, Boston University, and The George Washington University',
        date: 'December 2025',
        // badge: '🏆',
        // description: 'Won national-level hackathon with an AI-based disaster response system.',
    },
    {
        id: 'award-3',
        category: 'award',
        title: 'Smart India Hackathon 2024 (SIH 2024) - Agrimitra Project',
        issuer: 'Government of India 2024',
        date: 'OCT 2022',
        // badge: '🥇',
        // description: 'Built an AI-powered code review tool ranked top 10 globally.',
    },
    // {
    //     id: 'award-3',
    //     category: 'award',
    //     title: 'LeetCode Knight Badge',
    //     issuer: 'LeetCode',
    //     date: '2024',
    //     badge: '⚔️',
    //     credentialUrl: '#',
    //     description: '400+ problems solved, consistently in top 5% globally.',
    // },
];
