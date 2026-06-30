import React from 'react';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { AnimatedHeading } from '../components/ui/AnimatedHeading';

export const About: React.FC = () => {
    return (
        <SectionWrapper id="about">
            <AnimatedHeading sub="Introduction" title="About Me" />
            <div style={{ maxWidth: '800px', margin: '40px auto 0', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                <p>
                    I am a passionate <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Software Developer</span> with a strong foundation in <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Full Stack Development</span>, <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Artificial Intelligence</span>, and <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Machine Learning</span>. I enjoy building scalable, user-friendly applications and solving real-world problems through technology. My experience includes developing web applications using the <span style={{ color: 'var(--gold)', fontWeight: 600 }}>MERN stack</span>, creating AI-powered solutions with <span style={{ color: 'var(--gold)', fontWeight: 600 }}>Python</span>, and working with cloud technologies and <span style={{ color: 'var(--gold)', fontWeight: 600 }}>n8n automation tools</span>. I am always eager to learn new technologies, improve my problem-solving skills, and contribute to innovative software projects that create meaningful impact.
                </p>
            </div>
        </SectionWrapper>
    );
};
