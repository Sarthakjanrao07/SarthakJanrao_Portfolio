import { personal } from '../data/personal';
import { retrieveContext, retrieveContextSync, isOffTopic } from '../rag/retriever';

// ─── Static structured JSON payloads ─────────────────────────────────────────
const SKILLS_JSON = JSON.stringify({
    __structured__: true,
    type: 'skills',
    data: {
        categories: [
            { name: 'Programming Languages', icon: '', items: ['C++', 'Java', 'JavaScript', 'TypeScript', 'Python', 'SQL'] },
            { name: 'Frontend', icon: '', items: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
            { name: 'Backend', icon: '', items: ['Node.js', 'Express.js', 'REST APIs'] },
            { name: 'Databases', icon: '', items: ['MongoDB', 'PostgreSQL', 'Supabase'] },
            { name: 'AI & Automation', icon: '', items: ['RAG', 'LLM Integration', 'LangChain', 'n8n', 'OCR', 'FAISS'] },
            { name: 'Tools & Platforms', icon: '', items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Render', 'Postman', 'Cloudinary'] },
        ],
    },
});

const PROJECTS_JSON = JSON.stringify({
    __structured__: true,
    type: 'projects',
    data: {
        projects: [
            { title: 'Online Learning System', description: 'Full-stack LMS with role-based access for students and instructors.', tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Razorpay'], github: 'https://github.com/Sarthakjanrao07/Online-learning-Platform.git', live: 'https://virtual-course-gray.vercel.app' },
            { title: 'AgriMitra', description: 'AI agriculture assistant with 3D GIS crop monitoring, disease prediction, weather integration.', tech: ['React', 'Flask', 'PostgreSQL', '3D GIS', 'Gemini 2.0 Flash API', 'OCR'], github: 'https://github.com/Sarthakjanrao07/AgriMitra07.git', live: 'https://youtu.be/bDyHGnQ92kk?si=84IoFbqYtO_1v6AV' },
            { title: 'Research Paper Summariser', description: 'AI agent that reads, summarizes, and cross-references academic papers via RAG pipeline.', tech: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'Streamlit'], github: 'https://ijcope.org/article/a-hybrid-transformer-architecture-for-academic-summarization-with-tabular-and-narrative-outputs', live: null },
            { title: 'E-Commerce Shopping Website', description: 'Full-stack MERN e-commerce platform with auth, product management, and shopping cart.', tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS'], github: 'https://github.com/Sarthakjanrao07/Ecommerce-Fullstack-Shopping-Website.git', live: 'https://ecommerce-fullstack-shopping-website-1.onrender.com/' },
            { title: 'Real-Time Mentorship System', description: 'MERN app with Socket.io for real-time one-to-one mentor-mentee communication.', tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'], github: 'https://github.com/Sarthakjanrao07/Real_time_mentoship_system.git', live: null },
        ],
    },
});

const EXPERIENCE_JSON = JSON.stringify({
    __structured__: true,
    type: 'experience',
    data: {
        jobs: [
            {
                role: 'Software Engineering Intern', company: 'Vara Tech',
                duration: 'Nov 2025 – May 2026', type: 'Internship',
                summary: 'Built a full-stack SaaS app with n8n automation, processing 50,000+ CRM records and reducing manual effort by 70%.',
                highlights: [
                    'Built full-stack SaaS using Lovable, Supabase, and n8n',
                    'Integrated 10+ third-party APIs (CRM, email, workflow)',
                    'Automated 20+ business workflows, cutting manual effort by 70%',
                    'Processed 50,000+ records through scalable data pipelines',
                ],
                tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'n8n', 'REST APIs'],
            },
            {
                role: 'Frontend Developer Intern', company: 'Hanumatrix',
                duration: 'July 2025 – Dec 2025', type: 'Internship',
                summary: 'Developed responsive React/Next.js web apps, improving frontend performance by 30%.',
                highlights: [
                    'Built 10+ reusable components with React.js, Next.js, Tailwind CSS',
                    'Integrated 10+ REST API endpoints for dynamic data rendering',
                    'Reduced page load time by 30% via optimization and lazy loading',
                    'Resolved 40+ bugs in an Agile environment',
                ],
                tech: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
            },
        ],
    },
});

const CONTACT_JSON = JSON.stringify({
    __structured__: true,
    type: 'contact',
    data: {
        phone: '+91 93220 46379',
        email: 'sarthakjanrav@gmail.com',
        location: 'Pune, Maharashtra, India',
    },
});

const WORK_PROOFS_JSON = JSON.stringify({
    __structured__: true,
    type: 'proofs',
    data: {
        linkedin: 'https://www.linkedin.com/in/sarthak-janrao/',
        github: 'https://github.com/Sarthakjanrao07',
        codolio: 'https://codolio.com/profile/SarthakJanrao',
    },
});



// ─── Intent detection ─────────────────────────────────────────────────────────
type Intent = 'skills' | 'projects' | 'experience' | 'contact' | 'proofs' | 'general';

function detectIntent(msg: string): Intent {
    const m = msg.toLowerCase();
    if (/\b(skill|tech stack|technolog|programming language|framework|tools? you use)\b/.test(m)) return 'skills';
    if (/\b(top project|your project|what (have|did) you build|show.*project|portfolio project)\b/.test(m)) return 'projects';
    if (/\b(work experience|internship|where (have|did) you work|your job|your role|company)\b/.test(m)) return 'experience';
    if (/\b(proof of work|social profile|linkedin|codolio|github.*profile|links)\b/.test(m)) return 'proofs';
    if (/\b(contact|reach you|phone number|email address)\b/.test(m)) return 'contact';
    return 'general';
}

// ─── Response cache ───────────────────────────────────────────────────────────
const responseCache = new Map<string, string>();

function getCacheKey(msg: string): string {
    return msg.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Pre-seed chip button queries
responseCache.set('what are your technical skills?', SKILLS_JSON);
responseCache.set('tell me about your top projects.', PROJECTS_JSON);
responseCache.set('what is your work experience?', EXPERIENCE_JSON);
responseCache.set('what are your contact details?', CONTACT_JSON);
responseCache.set('show your proof of work', WORK_PROOFS_JSON);

// ─── System prompt ────────────────────────────────────────────────────────────
const SYSTEM_HEADER = `You are the portfolio AI assistant for ${personal.name} (${personal.title}).
STRICT RULES:
1. Answer ONLY using the CONTEXT provided below. Do NOT use any knowledge from outside the context.
2. If the answer is not in the context, say: "I don't have that information in Sarthak's portfolio."
3. Never answer general programming, science, math, or unrelated questions.
4. Be concise — 1 to 3 sentences maximum.
5. Do not make up facts or hallucinate locations. If asked where he is "originally from", and it is not in the text, DO NOT guess.
6. If asked about contact/phone/email/mobile, use ONLY what is explicitly in the context.`;

// ─── Main export ──────────────────────────────────────────────────────────────
export const generateChatResponse = async (
    message: string,
    history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {

    const cacheKey = getCacheKey(message);

    // 1. Cache hit
    if (responseCache.has(cacheKey)) return responseCache.get(cacheKey)!;

    const intent = detectIntent(message);

    // 2. Structured intents — return instantly, zero API call
    if (intent === 'skills') { responseCache.set(cacheKey, SKILLS_JSON); return SKILLS_JSON; }
    if (intent === 'projects') { responseCache.set(cacheKey, PROJECTS_JSON); return PROJECTS_JSON; }
    if (intent === 'experience') { responseCache.set(cacheKey, EXPERIENCE_JSON); return EXPERIENCE_JSON; }
    if (intent === 'contact') { responseCache.set(cacheKey, CONTACT_JSON); return CONTACT_JSON; }
    if (intent === 'proofs') { responseCache.set(cacheKey, WORK_PROOFS_JSON); return WORK_PROOFS_JSON; }

    // 3. Off-topic guard — quick keyword check
    if (isOffTopic(message)) {
        const reply = "I can only answer questions about Sarthak Janrao. Please ask something related!";
        responseCache.set(cacheKey, reply);
        return reply;
    }


    // 4. Semantic RAG retrieval (async — uses vector index)
    const context = await retrieveContext(message, 5);

    // Fallback to sync if async returned empty
    const finalContext = context || retrieveContextSync(message, 3);

    if (!finalContext) {
        const reply = "I don't have that specific information in Sarthak's portfolio.";
        responseCache.set(cacheKey, reply);
        return reply;
    }

    const groqKey = import.meta.env.VITE_GROK_API_KEY;
    if (!groqKey) return 'Please define VITE_GROK_API_KEY in your .env file.';

    // Trim history to last 6 messages (3 exchanges)
    const trimmedHistory = history.slice(-6).map(item => ({
        role: item.role === 'model' ? 'assistant' : 'user',
        content: item.parts[0]?.text || '',
    }));

    const systemContent = `${SYSTEM_HEADER}\n\nCONTEXT:\n${finalContext}`;

    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                stream: false,
                temperature: 0.1,
                max_tokens: 250,
                messages: [
                    { role: 'system', content: systemContent },
                    ...trimmedHistory,
                    { role: 'user', content: message },
                ],
            }),
        });

        if (res.ok) {
            const data = await res.json();
            const result = data.choices?.[0]?.message?.content || 'No response content.';
            responseCache.set(cacheKey, result);
            return result;
        }

        const errText = await res.text();
        if (errText.includes('credits') || errText.includes('permission-denied') || res.status === 403) {
            return 'sorry credits Over now. come next day';
        }
        return `⚠️ Groq API issue: HTTP ${res.status}`;

    } catch (err: any) {
        return `⚠️ Network error: ${err.message}`;
    }
};
