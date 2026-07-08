import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiSend, FiPhone, FiGithub, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import { personal } from '../data/personal';

/* ── Contact info tiles ── */
const contactItems = [
    {
        icon: FiMail,
        label: 'Email Me',
        value: personal.email,
        action: 'Send a Mail',
        href: `mailto:${personal.email}`,
        color: '#d4a64f',
    },
    {
        icon: FaWhatsapp,
        label: 'WhatsApp Me',
        value: personal.whatsapp,
        action: 'Send a Message',
        href: `https://wa.me/${personal.whatsapp.replace(/\D/g, '')}`,
        color: '#25d366',
    },
    {
        icon: FiPhone,
        label: 'Call Me',
        value: personal.phone,
        action: 'Call Now',
        href: `tel:${personal.phone.replace(/\s/g, '')}`,
        color: '#7c6af7',
    }
];

// Codolio icon (owl logo image)
const CodolioIcon = ({ size }: { size?: number }) => (
    <img src="/images/codolio.png" alt="Codolio" style={{ width: size ? `${size}px` : '1.2em', height: size ? `${size}px` : '1.2em', objectFit: 'contain', display: 'inline-block', verticalAlign: 'middle' }} />
);

const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/Sarthakjanrao07', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/sarthak-janrao/', label: 'LinkedIn' },
    { icon: CodolioIcon, href: 'https://codolio.com/profile/Sarthakjanrao07', label: 'Codolio' },
    { icon: FiYoutube, href: 'https://www.youtube.com/@Ky-rao', label: 'YouTube' },
];

/* ── Input style helper ── */
const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,166,79,0.18)',
    borderRadius: '12px',
    padding: '14px 18px',
    color: '#fff',
    fontSize: '0.92rem',
    outline: 'none',
    transition: 'border-color 0.25s',
    boxSizing: 'border-box',
};

export const Contact: React.FC = () => {
    const [focused, setFocused] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const fieldStyle = (name: string): React.CSSProperties => ({
        ...inputStyle,
        borderColor: focused === name ? 'var(--gold)' : 'rgba(212,166,79,0.18)',
        boxShadow: focused === name ? '0 0 0 3px rgba(212,166,79,0.07)' : 'none',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3500);
    };

    return (
        <SectionWrapper id="contact">
            {/* ── Section Heading ── */}
            <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Get In Touch
                </p>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: 0 }}>
                    Contact <span style={{ color: 'var(--gold)' }}>Me</span>
                </h2>

            </div>

            {/* ── Two-column Layout ── */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
                gap: '32px',
                maxWidth: '1100px',
                margin: '0 auto',
                alignItems: 'start',
            }}>
                {/* ── LEFT: Info Panel ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Intro blurb card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: 'rgba(20,20,30,0.85)',
                            border: '1px solid rgba(212,166,79,0.2)',
                            borderRadius: '20px',
                            padding: '28px',
                        }}
                    >
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: '0 0 10px 0' }}>
                            Let's Build Something Together
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
                            Drop a message and I'll respond within 24 hours.
                        </p>

                        {/* Availability dot */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '18px' }}>
                            <span style={{
                                width: '9px', height: '9px', borderRadius: '50%',
                                background: '#22c55e',
                                boxShadow: '0 0 8px #22c55e',
                                display: 'inline-block',
                            }} />
                            <span style={{ color: '#22c55e', fontSize: '0.8rem', fontWeight: 700 }}>
                                Available for opportunities
                            </span>
                        </div>
                    </motion.div>

                    {/* Contact tiles */}
                    {contactItems.map((item, i) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.08 * (i + 1) }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                background: 'rgba(20,20,30,0.75)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '16px',
                                padding: '18px 20px',
                                textDecoration: 'none',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                cursor: 'pointer',
                            }}
                            whileHover={{
                                borderColor: item.color + '88',
                                boxShadow: `0 0 20px ${item.color}22, 0 4px 16px rgba(0,0,0,0.3)`,
                            }}
                        >
                            {/* Icon bubble */}
                            <div style={{
                                width: '46px', height: '46px', borderRadius: '14px', flexShrink: 0,
                                background: item.color + '18',
                                border: `1.5px solid ${item.color}55`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: item.color, fontSize: '1.2rem',
                            }}>
                                <item.icon />
                            </div>
                            {/* Text */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 3px 0' }}>
                                    {item.label}
                                </p>
                                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {item.value}
                                </p>
                            </div>
                            {/* Action pill */}
                            <span style={{
                                fontSize: '0.7rem', fontWeight: 700,
                                color: item.color, flexShrink: 0,
                                padding: '4px 12px', borderRadius: '20px',
                                border: `1px solid ${item.color}55`,
                                background: item.color + '10',
                            }}>
                                {item.action}
                            </span>
                        </motion.a>
                    ))}

                    {/* Social row */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        style={{ display: 'flex', gap: '12px', marginTop: '4px' }}
                    >
                        {socialLinks.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={s.label}
                                style={{
                                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: '8px', padding: '12px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '14px',
                                    background: 'rgba(20,20,30,0.7)',
                                    color: 'rgba(255,255,255,0.55)',
                                    textDecoration: 'none',
                                    transition: 'all 0.25s',
                                    fontWeight: 600,
                                    fontSize: '0.8rem',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.borderColor = 'var(--gold)';
                                    e.currentTarget.style.color = 'var(--gold)';
                                    e.currentTarget.style.background = 'rgba(212,166,79,0.06)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                                    e.currentTarget.style.background = 'rgba(20,20,30,0.7)';
                                }}
                            >
                                <s.icon size={16} />
                                {s.label}
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* ── RIGHT: Contact Form ── */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    style={{
                        background: 'rgba(20,20,30,0.85)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(212,166,79,0.18)',
                        borderRadius: '24px',
                        padding: '36px 32px',
                    }}
                >
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: '0 0 6px 0' }}>
                        Send a Message
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.82rem', margin: '0 0 28px 0' }}>
                        Fill out the form below and I'll get back to you shortly.
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                        {/* Name + Email row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Sarthak Janrao"
                                    required
                                    style={fieldStyle('name')}
                                    onFocus={() => setFocused('name')}
                                    onBlur={() => setFocused(null)}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    style={fieldStyle('email')}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused(null)}
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Subject
                            </label>
                            <input
                                type="text"
                                placeholder="Freelance project / Collaboration / Job offer..."
                                style={fieldStyle('subject')}
                                onFocus={() => setFocused('subject')}
                                onBlur={() => setFocused(null)}
                            />
                        </div>

                        {/* Message */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                Message
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Tell me about your project or opportunity..."
                                required
                                style={{ ...fieldStyle('message'), resize: 'none' }}
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused(null)}
                            />
                        </div>

                        {/* Submit button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02, boxShadow: '0 8px 28px rgba(212,166,79,0.3)' }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                marginTop: '6px',
                                padding: '15px 28px',
                                borderRadius: '14px',
                                background: sent ? '#22c55e' : 'var(--gold)',
                                border: 'none',
                                color: '#000',
                                fontSize: '0.95rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'background 0.3s',
                            }}
                        >
                            {sent ? (
                                <>✓ Message Sent!</>
                            ) : (
                                <><FiSend size={16} /> Send Message</>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
