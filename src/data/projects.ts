export type ProjectCategory = 'personal' | 'organizational';

export interface Project {
    id: string;
    category: ProjectCategory;
    title: string;
    description: string;

    // Personal project fields
    features?: string[];

    // Organizational project fields
    tags?: string[];        // e.g. ['Data Engineering / GIS', 'Geospatial Analytics']
    company?: string;
    year?: string;
    role?: string;
    about?: string;
    contribution?: string[];
    impact?: string;

    tech: string[];
    github?: string;
    live?: string;
    isPrivate?: boolean;
    thumbnail?: string;   // gradient class for personal projects
}

export const projectsData: Project[] = [
    // ─── PERSONAL PROJECTS ───────────────────────────────────────────
    {
        id: 'proj-1',
        category: 'personal',
        title: 'Online Learning System',
        description: 'A full-stack Learning Management System (LMS) built using the MERN stack with role-based access for students and instructors.',
        features: [
            'Skin condition classification using CNN models',
            'Real-time image capture and analysis',
            'Treatment recommendation engine',
            'Confidence scoring and differential diagnosis display',
            'Doctor referral integration module',
        ],
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Razorpay', 'Gemini API'],
        github: 'https://github.com/Sarthakjanrao07/Online-learning-Platform.git',
        live: 'https://virtual-course-gray.vercel.app',
        thumbnail: '/images/online.png',
    },
    {
        id: 'proj-2',
        category: 'personal',
        title: 'AgriMitra',
        description: 'An AI-powered agriculture assistant that helps farmers analyze crop health, detect diseases, and get intelligent recommendations using GIS mapping and AI models.',
        features: [
            '3D GIS-based crop monitoring and visualization',
            'Leaf and crop scanning using OCR/NCR techniques',
            'Disease prediction using advanced NLP models',
            'AI-based recommendations using Gemini API',
            'Real-time weather integration for farming insights',
            'Full-stack architecture with React frontend and Flask backend',
        ],
        tech: ['React', 'Flask', 'PostgreSQL', '3D GIS Mapping', 'Gemini 2.0 Flash API', 'OCR/NCR', 'NLP', 'Weather API'],
        github: 'https://github.com/Sarthakjanrao07/AgriMitra07.git',
        live: 'https://youtu.be/bDyHGnQ92kk?si=84IoFbqYtO_1v6AV',
        thumbnail: '/images/agrimtra.png',
    },
    {
        id: 'proj-3',
        category: 'personal',
        title: 'Autonomous Research Paper Summariser',
        description: 'An AI agent that autonomously reads, summarizes, and cross-references academic papers using LLMs and a RAG pipeline for intelligent Q&A.',
        features: [
            'Automated PDF ingestion and chunking pipeline',
            'RAG-based Q&A with semantic search over paper corpus',
            'Cross-paper citation and reference graph generation',
            'Summarization using GPT-4 and custom prompt templates',
            'Interactive Streamlit frontend for researchers',
        ],
        tech: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'Streamlit', 'PyMuPDF'],
        github: 'https://ijcope.org/article/a-hybrid-transformer-architecture-for-academic-summarization-with-tabular-and-narrative-outputs',
        live: 'https://ijcope.org/article/a-hybrid-transformer-architecture-for-academic-summarization-with-tabular-and-narrative-outputs',
        thumbnail: '/images/auto.png',
    },
    {
        id: 'proj-4',
        category: 'personal',
        title: 'E-Commerce Full-Stack Shopping Website',
        description: 'A full-stack MERN e-commerce platform supporting secure authentication, product management, and online shopping.',
        features: [
            'Developed 15+ responsive pages for product browsing, cart, checkout, and user authentication',
            'Implemented JWT-based authentication with role-based access for customers and administrators',
            'Built CRUD functionality to manage 100+ products with search, filtering, and category support',
            'Integrated shopping cart and order management, enabling a complete end-to-end purchasing workflow'
        ],
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
        github: 'https://github.com/Sarthakjanrao07/Ecommerce-Fullstack-Shopping-Website.git',
        live: 'https://ecommerce-fullstack-shopping-website-1.onrender.com/',
        thumbnail: '/images/ecom.png',
    },
    {
        id: 'proj-5',
        category: 'personal',
        title: 'Real-Time Mentorship System',
        description: 'A full-stack MERN application that enables seamless real-time communication between mentors and mentees.',
        features: [
            'Secure JWT-based authentication with mentor and mentee roles',
            'Real-time one-to-one messaging using Socket.io',
            'Mentorship request, acceptance, and session management',
            'Responsive dashboard for managing mentors, mentees, and chat history'
        ],
        tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
        github: 'https://github.com/Sarthakjanrao07/Real_time_mentoship_system.git',
        live: 'https://github.com/Sarthakjanrao07/Real_time_mentoship_system.git',
        thumbnail: '/images/rms.png',
    },
    {
        id: 'proj-6',
        category: 'personal',
        title: 'Live Weather Forecast System',
        description: 'A responsive weather application that provides real-time weather information using a public weather API.',
        features: [
            'Real-time weather data retrieval using Weather API',
            'Search weather conditions by city name',
            'Displays temperature, humidity, wind speed, and weather conditions',
            'Responsive and modern UI with dynamic weather icons'
        ],
        tech: ['React.js', 'Tailwind CSS', 'OpenWeather API', 'JavaScript'],
        github: 'https://github.com/Sarthakjanrao07/WeatherApp.git',
        live: 'https://sarthakjanrao07.github.io/WeatherApp',
        thumbnail: '/images/weather.png',
    },
    {
        id: 'proj-7',
        category: 'personal',
        title: 'AI Chrome Extension for Q&A',
        description: 'A Chrome extension that allows users to highlight text on any webpage and get AI-powered answers, summaries, and explanations inline.',
        features: [
            'Context-aware Q&A using highlighted text',
            'Inline tooltip UI injected into any webpage',
            'Conversation history per tab session',
            'OpenAI GPT-4o API integration',
        ],
        tech: ['JavaScript', 'Chrome Extensions API', 'OpenAI', 'HTML', 'CSS'],
        github: 'https://github.com/Sarthakjanrao07/AI-BOT.git',
        thumbnail: '/images/aibot.png',
    },
    {
        id: 'proj-8',
        category: 'personal',
        title: 'Responsive Book Selling Website',
        description: 'A responsive book-selling website built with HTML, CSS for browsing and exploring books.',
        features: [
            'Browse and search books by title and category',
            'Responsive layout optimized for desktop, tablet, and mobile devices',
            'Interactive product pages with book details and pricing'
        ],
        tech: ['HTML', 'CSS'],
        github: 'https://github.com/Sarthakjanrao07/Responsive-Book-Shopping-Frontend.git',
        live: 'https://sarthakjanrao07.github.io/Responsive-Book-Shopping-Frontend/',
        thumbnail: '/images/book.png',
    },
    {
        id: 'proj-9',
        category: 'personal',
        title: 'Online Code Editor',
        description: 'A browser-based code editor for writing and previewing HTML, CSS, and JavaScript in real time.',
        features: [
            'Built a live code editor with real-time HTML, CSS, and JavaScript preview',
            'Developed 3 dedicated editor panels with instant output rendering',
            'Implemented auto-refresh functionality for immediate code execution and preview',
            'Designed a responsive interface optimized for desktop and mobile devices'
        ],
        tech: ['React.js', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
        github: 'https://github.com/Sarthakjanrao07/Code-Editor.git',
        live: 'https://code-editor-gamma-indol.vercel.app/',
        thumbnail: '/images/code.png',
    },
    // {
    //     id: 'proj-10',
    //     category: 'personal',
    //     title: 'School Profile Website',
    //     description: 'A responsive, modern school website featuring event management, admissions, gallery, and admin dashboard.',
    //     features: [
    //         'Dynamic event and news management system',
    //         'Online admissions form with email integration',
    //         'Photo gallery with lazy loading',
    //         'Responsive design for all devices',
    //     ],
    //     tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Nodemailer'],
    //     github: '#',
    //     live: '#',
    //     thumbnail: 'from-amber-950 to-yellow-900',
    // },

    // ─── ORGANIZATIONAL PROJECTS ──────────────────────────────────────
    {
        id: 'org-1',
        category: 'organizational',
        title: 'CRM Process Automation Platform',
        tags: ['Lead Generation', 'CRM', 'Workflow Automation'],
        company: 'Vara Tech',
        year: 'Nov 2025 – May 2026',
        role: 'Software Developer Intern',
        description: 'Built and maintained CRM automation workflows by integrating Zoho CRM, Google Sheets, Cloudinary, and REST APIs using n8n. Automated lead processing, reporting, notifications, and data synchronization to improve operational efficiency and reduce manual effort.',

        contribution: [
            'Developed 20+ n8n workflows for lead generation and CRM automation',
            'Integrated Zoho CRM, Google Sheets, Cloudinary, and REST APIs',
            'Built automated lead processing, reporting, and notification workflows',
            'Reduced manual reporting effort by up to 70% through workflow optimization'
        ],

        impact: 'Improved lead management and sales operations by automating CRM workflows and business processes.',

        tech: ['n8n', 'JavaScript', 'Zoho CRM', 'REST APIs', 'Google Sheets API', 'Cloudinary', 'HTML', 'CSS'],

        isPrivate: true,
    },
    {
        id: 'org-2',
        category: 'organizational',
        title: 'AI Legal Case Management Assistant',
        tags: ['Agentic AI', 'Legal Automation', 'Workflow Automation'],
        company: 'Vara Tech',
        year: '2025 – 2026',
        role: 'Software Developer Intern',
        description: 'Developed an Agentic AI legal assistant using n8n to automate case updates, reminders, summaries, and WhatsApp notifications.',
        about: 'Built an AI-driven legal workflow that monitors case activities, generates daily and monthly summaries, schedules upcoming tasks, and sends automated WhatsApp alerts to lawyers using the eNotify node.',
        contribution: [
            'Developed 15+ n8n workflows for legal case automation',
            'Automated daily case updates, tomorrow’s schedule, and monthly case summaries using AI',
            'Integrated WhatsApp notifications through the eNotify node for hearing reminders and task alerts',
            'Reduced manual case tracking and follow-up effort by up to 75%'
        ],
        impact: 'Enabled proactive case management by delivering AI-generated summaries and real-time WhatsApp reminders, improving lawyer productivity and reducing missed deadlines.',
        tech: ['n8n', 'Webhooks', 'REST APIs', 'Google Sheets API', 'OpenAI API', 'JavaScript', 'eNotify', 'WhatsApp'],
        isPrivate: true,
    },
    {
        id: 'org-3',
        category: 'organizational',
        title: 'AI Invoice Processing & Automation System',
        tags: ['AI Automation', 'Document Processing'],
        company: 'Vara Tech',
        year: '2025 – 2026',
        role: 'Software Developer Intern',
        description: 'Developed an intelligent invoice processing system using n8n, OCR, and REST APIs to automate invoice validation and document workflows.',
        contribution: [
            'Developed n8n workflows for invoice extraction and processing',
            'Integrated OCR, AI models, and REST APIs for automated data extraction',
            'Automated invoice validation, PDF generation, and notification workflows',
            'Reduced manual invoice processing effort by up to 80%'
        ],
        impact: 'Streamlined invoice processing by automating extraction, validation, and document generation, significantly improving operational efficiency.',
        tech: [
            'n8n', 'JavaScript', 'OCR', 'OpenAI API', 'REST APIs', 'PDF Generation', 'Webhook', 'Google Drive'
        ],
        isPrivate: true,
    },
    {
        id: 'org-4',
        category: 'organizational',
        title: 'Enterprise Web Application Development',
        tags: ['Frontend Development', 'Web Application'],
        company: 'Hanumatrix',
        year: '2025',
        role: 'Frontend Developer Intern',
        description: 'Developed and enhanced responsive web applications using React.js and Next.js for enterprise clients.',
        about: 'Contributed to the development of scalable frontend applications by building reusable UI components, improving application performance, and implementing responsive user interfaces. Collaborated with the development team to deliver production-ready features and optimize the overall user experience.',
        contribution: [
            'Developed 20+ reusable React and Next.js components',
            'Built responsive user interfaces compatible with desktop, tablet, and mobile devices',
            'Improved page load performance through component optimization and code reuse',
            'Collaborated with cross-functional teams to deliver new features and resolve UI issues'
        ],
        impact: 'Enhanced application usability, improved frontend performance, and accelerated feature delivery through reusable component development.',
        tech: ['React.js', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Git'],
        isPrivate: true,
    },
];
