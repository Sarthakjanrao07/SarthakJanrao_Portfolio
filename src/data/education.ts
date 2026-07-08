export interface Education {
    id: string;
    period: string;
    degree: string;
    institution: string;
    location: string;
    score: string;
    scoreLabel: string;
    scorePercent: number; // 0-100 for progress bar
}

export const educationData: Education[] = [
    {
        id: 'edu-1',
        period: '2022 – 2026',
        degree: "Bachelor's in Engineering (Information Technology)",
        institution: 'International Institute of Information Technology',
        location: 'Pune, Maharashtra',
        score: '8.35',
        scoreLabel: 'CGPA',
        scorePercent: 8.35 * 10,
    },
    {
        id: 'edu-2',
        period: '2019 – 2021',
        degree: 'H.S.C (Higher Secondary Certificate)',
        institution: 'Matoshri Shantabai Govindrao Sonawane Junior College',
        location: 'Andarsul, Nashik, Maharashtra',
        score: '86.50%',
        scoreLabel: 'Percentage',
        scorePercent: 86.50,
    },
    {
        id: 'edu-3',
        period: '2018 – 2019',
        degree: 'S.S.C (Secondary School Certificate)',
        institution: 'Matoshri Shantabai Govindrao Sonawane School',
        location: 'Andarsul, Nashik, Maharashtra',
        score: '89%',
        scoreLabel: 'Percentage',
        scorePercent: 89,
    },
];
