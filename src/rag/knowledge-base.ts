/**
 * RAG Knowledge Base — Portfolio of Sarthak Janrao
 * Each chunk is a self-contained fact block with keyword tags for retrieval.
 */

export interface KnowledgeChunk {
    id: string;
    tags: string[];   // keywords for retrieval matching
    text: string;     // the actual text sent to the LLM
}

export const knowledgeBase: KnowledgeChunk[] = [
    // ── PERSONAL ──────────────────────────────────────────────────────────────
    {
        id: 'personal-bio',
        tags: ['who', 'about', 'sarthak', 'bio', 'introduction', 'background', 'profile', 'name', 'contact', 'email', 'location', 'phone', 'mobile', 'number', 'cell', 'whatsapp', 'reach', 'call'],
        text: `Sarthak Janrao is a final-year B.E. student (Information Technology) passionate about building intelligent, scalable digital products at the intersection of AI, Cloud, and modern web engineering. He turns complex ideas into elegant, production-ready systems.
He is originally from Andarsul village, taluka Yeola, district Nashik, Maharashtra.
Email: sarthakjanrav@gmail.com | Phone: +91 93220 46379 | Location: Pune, Maharashtra
Title: AI Engineer & Full Stack Developer`,
    },

    // ── CONTACT (dedicated chunk for all contact query variants) ────────────────
    {
        id: 'contact-info',
        tags: ['contact', 'phone', 'mobile', 'number', 'cell', 'whatsapp', 'call', 'reach', 'email', 'mail', 'address', 'location', 'city', 'sarthak'],
        text: `Sarthak Janrao's Contact Information:
Phone / Mobile: +91 93220 46379
Email: sarthakjanrav@gmail.com
Location: Pune, Maharashtra, India
LinkedIn: linkedin.com/in/sarthakjanrao
GitHub: github.com/Sarthakjanrao07`,
    },

    // ── EDUCATION ─────────────────────────────────────────────────────────────
    {
        id: 'education',
        tags: ['education', 'degree', 'college', 'university', 'cgpa', 'score', 'marks', 'study', 'student', 'academic', 'graduation', 'engineering', 'hsc', 'ssc', 'school'],
        text: `Education:
• B.E. in Information Technology — International Institute of Information Technology, Pune (Aug 2022 – Jun 2026) | CGPA: 8.35
• H.S.C — Matoshri Shantabai Govindrao Sonawane Jr. College, Nashik (2019–2021) | 86.50%
• S.S.C — Matoshri Shantabai Govindrao Sonawane School, Nashik (2018–2019) | 89%`,
    },

    // ── SKILLS ────────────────────────────────────────────────────────────────
    {
        id: 'skills-languages',
        tags: ['skill', 'language', 'programming', 'code', 'c++', 'java', 'python', 'javascript', 'typescript', 'sql', 'tech', 'technology', 'know', 'expertise'],
        text: `Programming Languages: C++, Java, JavaScript, TypeScript, Python, SQL`,
    },
    {
        id: 'skills-frontend',
        tags: ['skill', 'frontend', 'react', 'nextjs', 'next.js', 'html', 'css', 'tailwind', 'ui', 'interface', 'web', 'tech'],
        text: `Frontend Technologies: React.js, Next.js, HTML5, CSS3, Tailwind CSS`,
    },
    {
        id: 'skills-backend',
        tags: ['skill', 'backend', 'node', 'express', 'api', 'rest', 'server', 'tech'],
        text: `Backend Technologies: Node.js, Express.js, REST APIs`,
    },
    {
        id: 'skills-database',
        tags: ['skill', 'database', 'mongodb', 'postgresql', 'supabase', 'db', 'data', 'storage', 'tech'],
        text: `Databases: MongoDB, PostgreSQL, Supabase`,
    },
    {
        id: 'skills-ai',
        tags: ['skill', 'ai', 'ml', 'machine learning', 'artificial intelligence', 'rag', 'llm', 'langchain', 'n8n', 'ocr', 'faiss', 'automation', 'vector', 'embedding', 'tech', 'genai', 'generative'],
        text: `AI & Automation: RAG (Retrieval-Augmented Generation), LLM Integration, LangChain, n8n Workflow Automation, OCR (Tesseract, EasyOCR), Vector Databases (FAISS)`,
    },
    {
        id: 'skills-tools',
        tags: ['skill', 'tool', 'git', 'github', 'vscode', 'vercel', 'render', 'postman', 'cloudinary', 'deploy', 'devops', 'tech'],
        text: `Tools & Platforms: Git, GitHub, VS Code, Vercel, Render, Postman, Cloudinary`,
    },

    // ── WORK EXPERIENCE ───────────────────────────────────────────────────────
    {
        id: 'exp-vara-tech',
        tags: ['experience', 'internship', 'work', 'job', 'vara', 'vara tech', 'company', 'role', 'n8n', 'crm', 'saas', 'automation', 'supabase'],
        text: `Work Experience 1 — Software Engineering Intern @ Vara Tech (Nov 2025 – May 2026, Internship, Pune)
Summary: Built and deployed a full-stack SaaS application with n8n automation, processing 50,000+ CRM records and reducing manual data handling by 70%.
Highlights:
• Built full-stack SaaS using Lovable, Supabase, and n8n
• Integrated 10+ third-party APIs for CRM, email, and workflow automation
• Automated 20+ business workflows, reducing manual effort by 70%
• Processed 50,000+ records through scalable data pipelines
Tech Stack: React, TypeScript, Vite, Tailwind CSS, Supabase, PostgreSQL, n8n, REST APIs`,
    },
    {
        id: 'exp-hanumatrix',
        tags: ['experience', 'internship', 'work', 'job', 'hanumatrix', 'company', 'role', 'frontend', 'react', 'nextjs', 'performance'],
        text: `Work Experience 2 — Frontend Developer Intern @ Hanumatrix (July 2025 – Dec 2025, Internship, Remote-Pune)
Summary: Developed responsive web applications using React.js and Next.js, improving frontend performance by 30%.
Highlights:
• Built 10+ reusable UI components using React.js, Next.js, and Tailwind CSS
• Integrated 10+ REST API endpoints for dynamic data rendering
• Reduced page load time by 30% through code optimization and lazy loading
• Resolved 40+ frontend bugs in an Agile development environment
Tech Stack: React.js, Next.js, JavaScript, TypeScript, Tailwind CSS, REST APIs`,
    },

    // ── PROJECTS ──────────────────────────────────────────────────────────────
    {
        id: 'proj-lms',
        tags: ['project', 'lms', 'learning', 'management', 'mern', 'online', 'course', 'student', 'instructor', 'education', 'razorpay', 'jwt'],
        text: `Project: Online Learning System (LMS)
Description: Full-stack Learning Management System built with MERN stack. Role-based access for students and instructors. Students can enroll, purchase, and track learning progress.
Tech: React, Node.js, Express.js, MongoDB, JWT Authentication, Razorpay, Gemini API
GitHub: https://github.com/Sarthakjanrao07/Online-learning-Platform.git
Live: https://virtual-course-gray.vercel.app`,
    },
    {
        id: 'proj-agrimitra',
        tags: ['project', 'agrimitra', 'agriculture', 'farm', 'crop', 'ai', 'gis', 'disease', 'weather', 'flask', 'gemini', 'ocr', 'nlp', 'smart india hackathon'],
        text: `Project: AgriMitra — AI-Powered Agriculture Assistant
Description: Helps farmers analyze crop health, detect diseases, and get AI recommendations using 3D GIS mapping.
Features: 3D GIS-based crop monitoring, leaf scanning via OCR, disease prediction via NLP, AI recommendations via Gemini 2.0 Flash API, real-time weather integration.
Tech: React, Flask, PostgreSQL, 3D GIS Mapping, Gemini 2.0 Flash API, OCR/NCR, NLP, Weather API
GitHub: https://github.com/Sarthakjanrao07/AgriMitra07.git
Demo: https://youtu.be/bDyHGnQ92kk`,
    },
    {
        id: 'proj-research-summariser',
        tags: ['project', 'research', 'paper', 'summariser', 'summarizer', 'rag', 'langchain', 'openai', 'pinecone', 'streamlit', 'academic', 'ai', 'publication'],
        text: `Project: Autonomous Research Paper Summariser
Description: AI agent that autonomously reads, summarizes, and cross-references academic papers using LLMs and RAG pipeline for intelligent Q&A.
Features: Automated PDF ingestion, RAG-based Q&A with semantic search, cross-paper citation graph, summarization with GPT-4.
Tech: Python, LangChain, OpenAI, Pinecone, Streamlit, PyMuPDF
Published: https://ijcope.org/article/a-hybrid-transformer-architecture-for-academic-summarization-with-tabular-and-narrative-outputs`,
    },
    {
        id: 'proj-ecommerce',
        tags: ['project', 'ecommerce', 'e-commerce', 'shopping', 'mern', 'mongodb', 'cart', 'product', 'auth', 'jwt', 'tailwind'],
        text: `Project: E-Commerce Full-Stack Shopping Website
Description: Full-stack MERN e-commerce platform with secure authentication, product management, and online shopping.
Features: 15+ responsive pages, JWT auth with role-based access, 100+ products with search/filter, shopping cart and order management.
Tech: React.js, Node.js, Express.js, MongoDB, JWT, Tailwind CSS
GitHub: https://github.com/Sarthakjanrao07/Ecommerce-Fullstack-Shopping-Website.git
Live: https://ecommerce-fullstack-shopping-website-1.onrender.com/`,
    },
    {
        id: 'proj-mentorship',
        tags: ['project', 'mentorship', 'mentor', 'mentee', 'real-time', 'socket', 'chat', 'mern', 'messaging'],
        text: `Project: Real-Time Mentorship System
Description: Full-stack MERN application for real-time one-to-one communication between mentors and mentees via Socket.io.
Features: JWT-based auth, real-time messaging, mentorship request management, responsive dashboard.
Tech: React.js, Node.js, Express.js, MongoDB, Socket.io, JWT
GitHub: https://github.com/Sarthakjanrao07/Real_time_mentoship_system.git`,
    },
    {
        id: 'proj-weather',
        tags: ['project', 'weather', 'forecast', 'openweather', 'api', 'react'],
        text: `Project: Live Weather Forecast System
Description: Responsive weather app with real-time data using OpenWeather API. Shows temperature, humidity, wind speed.
Tech: React.js, Tailwind CSS, OpenWeather API, JavaScript
Live: https://sarthakjanrao07.github.io/WeatherApp`,
    },
    {
        id: 'proj-chrome-extension',
        tags: ['project', 'chrome', 'extension', 'browser', 'ai', 'openai', 'gpt', 'highlight', 'q&a', 'qa'],
        text: `Project: AI Chrome Extension for Q&A
Description: Chrome extension that allows users to highlight text on any webpage and get AI-powered answers inline.
Features: Context-aware Q&A, inline tooltip UI, conversation history per tab, OpenAI GPT-4o integration.
Tech: JavaScript, Chrome Extensions API, OpenAI, HTML, CSS
GitHub: https://github.com/Sarthakjanrao07/AI-BOT.git`,
    },
    {
        id: 'proj-code-editor',
        tags: ['project', 'code editor', 'browser', 'html', 'css', 'javascript', 'live preview', 'react'],
        text: `Project: Online Code Editor
Description: Browser-based code editor for writing and previewing HTML, CSS, and JavaScript in real time.
Tech: React.js, HTML, CSS, JavaScript, Tailwind CSS
Live: https://code-editor-gamma-indol.vercel.app/`,
    },

    // ── ACHIEVEMENTS ──────────────────────────────────────────────────────────
    {
        id: 'achievements',
        tags: ['achievement', 'award', 'certification', 'hackathon', 'winner', 'finalist', 'seed', 'sih', 'mhtcet', 'deeplearning', 'certificate', 'honor', 'recognition', 'percentile'],
        text: `Achievements & Certifications:
• Professional Data Analytics Certification — DeepLearning.AI (May 2026) | URL: https://learn.deeplearning.ai/certificates/98db2294-8180-4847-af62-241db525ba54
• TFWS Seat — MHTCET with 95.56 percentile (Oct 2022)
• Finalist — Seed Hackathon 2025 (SEED Global Education, Boston University, George Washington University, Dec 2025)
• Smart India Hackathon 2024 (SIH 2024) — AgriMitra Project (Government of India)`,
    },

    // ── ORGANIZATIONAL ROLES ──────────────────────────────────────────────────
    {
        id: 'responsibilities',
        tags: ['responsibility', 'volunteer', 'acm', 'nss', 'leadership', 'club', 'web team', 'head', 'committee'],
        text: `Organizational Roles:
• Web Team Head — I2IT ACM Chapter (Sep 2023 – Present): Maintained WordPress pages, published 20+ ACM posts and events, led a team of 5+.
• Technical & Support Team Member — NSS (National Service Scheme) (Nov 2024 – Present): Coordinated technical requirements for 10+ social initiatives and camps.`,
    },

    // ── OOB (out-of-bounds) ───────────────────────────────────────────────────
    {
        id: 'scope',
        tags: [],  // never retrieved; used as fallback instruction reminder in system prompt only
        text: `This assistant ONLY answers questions about Sarthak Janrao's portfolio, skills, projects, experience, education, and achievements. For any other topic, politely decline.`,
    },
];
