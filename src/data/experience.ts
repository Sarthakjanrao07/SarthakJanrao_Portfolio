export interface Experience {
    id: string;
    role: string;
    company: string;
    link?: string;
    type: string; // 'Internship' | 'Full-time' | 'Contract'
    duration: string;
    location: string;
    summary: string;
    highlights: string[];
    tech: string[];
    logo?: string;
}

export const experienceData: Experience[] = [
    {
        id: 'exp-1',
        role: 'Software Engineering Intern',
        company: 'Vara Tech',
        link: 'https://vara-tech.com',
        type: 'Internship',
        duration: 'Nov 2025 – May 2026',
        location: 'Pune, Maharashtra',
        summary:
            'Built and deployed a full-stack SaaS application with n8n automation, processing 50,000+ CRM records through automated workflows and reducing manual data handling by 70%.',
        highlights: [
            'Built a full-stack SaaS application using Lovable, Supabase, and n8n',
            'Integrated 10+ third-party APIs for CRM, email, and workflow automation',
            'Automated 20+ business workflows, reducing manual effort by 70% using n8n',
            'Processed 50,000+ records through scalable data automation pipelines',
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'n8n', 'REST APIs'],
    },
    {
        id: 'exp-2',
        role: 'Frontend Developer Intern',
        company: 'Hanumatrix',
        link: 'https://www.hanumatrix.com',
        type: 'Internship',
        duration: 'July 2025 – Dec 2025',
        location: 'Remote - Pune, Maharashtra',
        summary:
            'Developed responsive web applications using React.js and Next.js, delivering 8+ UI screens and improving frontend performance by 30%.',
        highlights: [
            'Built 10+ reusable UI components using React.js, Next.js, and Tailwind CSS',
            'Integrated 10+ REST API endpoints to enable dynamic data rendering across multiple modules',
            'Reduced page load time by 30% through code optimization and lazy loading techniques',
            'Resolved 40+ frontend bugs and implemented feature enhancements in an Agile development environment',
        ],
        tech: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    },
];

export const responsibilityData: Experience[] = [
    {
        id: 'resp-1',
        role: 'Web Team Head',
        company: 'I2IT ACM Chapter',
        link: 'https://i2it.acm.org/',
        type: 'Head',
        duration: 'Sep 2023 – Present',
        location: 'Pune, India',
        summary: 'Led the maintenance of WordPress pages, ensuring timely updates for 20+ ACM posts, events and student activities.',
        highlights: [
            'Published and managed content for 20+ technical events and workshops, improving information accessibility for students',
            'Collaborated with a team of 5+ members to implement website updates and resolve content-related issues'
        ],
        tech: ['WordPress', 'Leadership', 'Website Maintenance', 'Content Management', 'Team Coordination'],
    },
    {
        id: 'resp-2',
        role: 'Technical & Support Team Member',
        company: 'National Service Scheme (NSS)',
        link: 'https://www.isquareit.edu.in/national-service-scheme-nss/',
        type: 'Volunteer',
        duration: 'Nov 2024 – Present',
        location: 'Pune, India',
        summary: 'Led the technical and support team for NSS events, managing volunteer coordination and technical setup.',
        highlights: [
            'Coordinated technical requirements for 10+ social initiatives and camps',
            'Managed a team of volunteers for seamless event execution and support'
        ],
        tech: ['Leadership', 'Event Management', 'Team Coordination'],
    }
];
