import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { Button } from '../components/ui/Button';
import { personal } from '../data/personal';
import profilePhoto from '../assets/profile.jpg';

export const Hero: React.FC = () => {
    const typed = useTypingEffect(['AI Engineer', 'Full Stack Developer', 'Web Developer', 'n8n automation engineer'], 100);

    return (
        <section
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '0 20px',
            }}
        >
            {/* Ambient Background Glows */}
            <div style={{ position: 'absolute', top: '20%', right: '10%', width: '400px', height: '400px', background: 'var(--gold-glow)', borderRadius: '50%', filter: 'blur(130px)', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '350px', height: '350px', background: 'var(--gold-glow)', borderRadius: '50%', filter: 'blur(130px)', zIndex: 0 }} />

            <div className="hero-inner">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hero-text"
                >
                    <span className="hero-eyebrow">Hey, I'm</span>
                    <h1 className="hero-name">{personal.name}</h1>
                    <div className="hero-typing">
                        I'm good with&nbsp;
                        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{typed}</span>
                        <span className="hero-cursor" />
                    </div>
                    <p className="hero-bio">
                        Passionate about building intelligent systems and scalable full-stack applications that make a real-world impact.
                    </p>
                    <div className="hero-buttons">
                        <Button
                            variant="gold"
                            leftIcon={<FiDownload />}
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = '/images/Janrao_Sarthak_py.pdf';
                                link.download = 'Janrao_Sarthak_py.pdf';
                                link.click();
                            }}
                        >
                            Download CV
                        </Button>
                        <Button
                            variant="outline"
                            rightIcon={<FiArrowRight />}
                            onClick={() => window.location.href = 'mailto:sarthakjanrav@gmail.com'}
                        >
                            Let's Talk
                        </Button>
                    </div>
                </motion.div>

                {/* Right: Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-photo-wrapper"
                >
                    <motion.div
                        animate={{ y: [0, -14, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ position: 'relative' }}
                    >
                        <div className="hero-ring-outer" />
                        <div className="hero-ring-inner" />
                        <div className="hero-photo-frame">
                            <img
                                src={profilePhoto}
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <style>{`
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes spin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                .hero-inner {
                    position: relative;
                    z-index: 1;
                    max-width: 1100px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    gap: 60px;
                    padding: 80px 0 40px;
                }
                .hero-text {
                    flex: 1 1 350px;
                    min-width: 280px;
                    text-align: left;
                }
                .hero-eyebrow {
                    color: var(--gold);
                    font-size: 0.9rem;
                    font-weight: 600;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    display: block;
                    margin-bottom: 16px;
                }
                .hero-name {
                    font-size: clamp(2.5rem, 6vw, 4.5rem);
                    font-weight: 900;
                    color: #fff;
                    line-height: 1.1;
                    margin: 0;
                }
                .hero-typing {
                    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
                    color: rgba(255,255,255,0.75);
                    margin-top: 20px;
                    min-height: 2em;
                }
                .hero-cursor {
                    display: inline-block;
                    width: 2px;
                    height: 1.2em;
                    background: var(--gold);
                    margin-left: 3px;
                    vertical-align: middle;
                    animation: blink 1s step-end infinite;
                }
                .hero-bio {
                    color: rgba(255,255,255,0.5);
                    font-size: 0.92rem;
                    line-height: 1.65;
                    margin-top: 30px;
                    max-width: 480px;
                }
                .hero-buttons {
                    margin-top: 36px;
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .hero-photo-wrapper {
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .hero-ring-outer {
                    position: absolute;
                    inset: -6px;
                    border-radius: 50%;
                    background: conic-gradient(from 0deg, var(--gold), transparent 40%, var(--gold) 70%, transparent);
                    animation: spin 6s linear infinite;
                    z-index: 0;
                }
                .hero-ring-inner {
                    position: absolute;
                    inset: -3px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--gold) 0%, rgba(212,175,55,0.2) 50%, var(--gold) 100%);
                    z-index: 1;
                }
                .hero-photo-frame {
                    position: relative;
                    z-index: 2;
                    width: clamp(220px, 28vw, 320px);
                    height: clamp(220px, 28vw, 320px);
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid #0a0a0a;
                    box-shadow: 0 0 60px rgba(212,175,55,0.35), 0 20px 60px rgba(0,0,0,0.6);
                }

                /* ── Mobile ≤ 768px ── */
                @media (max-width: 768px) {
                    .hero-inner {
                        flex-direction: column-reverse;
                        align-items: center;
                        justify-content: center;
                        gap: 28px;
                        padding: 100px 0 60px;
                    }
                    .hero-text {
                        flex: 0 0 auto;
                        min-width: unset;
                        width: 100%;
                        text-align: center;
                    }
                    .hero-eyebrow {
                        font-size: 0.8rem;
                        margin-bottom: 12px;
                    }
                    .hero-name {
                        font-size: clamp(2rem, 7.5vw, 3rem);
                    }
                    .hero-typing {
                        font-size: clamp(1rem, 3.5vw, 1.3rem);
                        margin-top: 14px;
                        min-height: 1.6em;
                    }
                    .hero-bio {
                        font-size: 0.84rem;
                        line-height: 1.6;
                        margin-top: 14px;
                        max-width: 100%;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    .hero-buttons {
                        justify-content: center;
                        margin-top: 24px;
                        gap: 12px;
                    }
                    .hero-photo-frame {
                        width: clamp(160px, 50vw, 220px);
                        height: clamp(160px, 50vw, 220px);
                    }
                }

                /* ── Mobile ≤ 480px ── */
                @media (max-width: 480px) {
                    .hero-inner {
                        padding: 85px 0 40px;
                        gap: 20px;
                    }
                    .hero-name {
                        font-size: 1.85rem;
                    }
                    .hero-eyebrow {
                        font-size: 0.75rem;
                        margin-bottom: 8px;
                    }
                    .hero-typing {
                        font-size: 1rem;
                        margin-top: 10px;
                    }
                    .hero-bio {
                        font-size: 0.8rem;
                        margin-top: 10px;
                    }
                    .hero-buttons {
                        margin-top: 20px;
                        flex-direction: column;
                        width: 100%;
                        gap: 10px;
                    }
                    .hero-buttons > button {
                        width: 100% !important;
                        justify-content: center;
                    }
                }
            `}</style>
        </section>
    );
};
