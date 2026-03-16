import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Send, Zap, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ── 3D floating shape ── */
const FloatShape = ({ children, style, delay = 0 }) => (
    <motion.div
        className="absolute pointer-events-none select-none"
        style={style}
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
        {children}
    </motion.div>
);

/* ── Glowing input field ── */
const GlowInput = ({ label, id, type = 'text', value, onChange, placeholder, rows }) => {
    const [focused, setFocused] = useState(false);
    const Tag = rows ? 'textarea' : 'input';
    return (
        <div className="relative group">
            <label htmlFor={id} className="block text-xs font-mono tracking-widest text-slate-400 mb-2 uppercase">{label}</label>
            <div className="relative">
                {/* Animated glow border */}
                <div className="absolute -inset-px rounded-lg pointer-events-none transition-opacity duration-300"
                    style={{
                        background: 'linear-gradient(90deg,#14b8a6,#6366f1,#34d399)',
                        opacity: focused ? 0.7 : 0,
                        filter: 'blur(1px)',
                    }} />
                <Tag
                    id={id} name={id} type={type} required value={value} onChange={onChange}
                    placeholder={placeholder} rows={rows}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="relative w-full px-4 py-3 rounded-lg outline-none text-white placeholder-slate-600 resize-none transition-all"
                    style={{
                        background: 'rgba(3,13,16,0.85)',
                        border: `1px solid ${focused ? 'rgba(20,184,166,0.5)' : 'rgba(51,65,85,0.5)'}`,
                        backdropFilter: 'blur(8px)',
                        boxShadow: focused ? '0 0 20px rgba(20,184,166,0.10)' : 'none',
                    }}
                />
            </div>
        </div>
    );
};

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        emailjs.init({ publicKey: PUBLIC_KEY });
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(false);
        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                name: form.name,
                email: form.email,
                message: form.message,
                reply_to: form.email,
                title: 'Portfolio Contact',
            }, { publicKey: PUBLIC_KEY });
            setSent(true);
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 4000);
        } catch (err) {
            const msg = err?.text || err?.message || JSON.stringify(err);
            console.error('EmailJS error:', err);
            setErrorMsg(`Error ${err?.status}: ${msg}`);
            setError(true);
            setTimeout(() => { setError(false); setErrorMsg(''); }, 6000);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">

            {/* Floating 3D shapes */}
            <FloatShape style={{ top: '8%', left: '4%', opacity: 0.3 }} delay={0}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <polygon points="24,4 44,40 4,40" stroke="#22d3ee" strokeWidth="1.5" fill="none" />
                </svg>
            </FloatShape>
            <FloatShape style={{ top: '15%', right: '6%', opacity: 0.25 }} delay={1}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="17" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="5 3" />
                </svg>
            </FloatShape>
            <FloatShape style={{ bottom: '12%', left: '8%', opacity: 0.2 }} delay={2}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect x="4" y="4" width="28" height="28" rx="6" stroke="#f97316" strokeWidth="1.5" fill="none" />
                </svg>
            </FloatShape>
            <FloatShape style={{ bottom: '20%', right: '5%', opacity: 0.25 }} delay={0.5}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" stroke="#34d399" strokeWidth="1.5" fill="none" />
                </svg>
            </FloatShape>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 w-fit" style={{ background: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.2)', color: '#14b8a6' }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#14b8a6' }}></span>
                        <span className="text-xs font-mono tracking-widest">CONTACT</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Connect</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
                        Have a project in mind? Let's build something extraordinary together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

                    {/* ── Left info panel ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="lg:col-span-2 flex flex-col gap-6"
                    >
                        {/* Info card */}
                        <div className="rounded-2xl p-8 relative overflow-hidden group"
                            style={{ background: 'rgba(5, 13, 20, 0.6)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: 'radial-gradient(circle at top right, rgba(20,184,166,0.15) 0%, transparent 70%)' }} />
                            <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, #14b8a6, transparent)` }} />

                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)' }}>
                                <Zap size={24} className="text-teal-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">Open to Opportunities</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                I'm currently looking for full-time Software Engineering roles. If you have an exciting project or a matching position, I'd love to chat.
                            </p>
                        </div>

                        {/* Contact links */}
                        <div className="flex flex-col gap-3">
                            {[
                                { icon: <Phone size={18} />, label: '+91 9878105976', href: 'tel:+919878105976', color: '#10b981' },
                                { icon: <Mail size={18} />, label: 'paraspathania705@gmail.com', href: 'mailto:paraspathania705@gmail.com', color: '#14b8a6' },
                                { icon: <Linkedin size={18} />, label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/paras-pathania', color: '#6366f1' },
                                { icon: <Github size={18} />, label: 'GitHub Projects', href: 'https://github.com/paraspathania', color: '#a855f7' },
                                { icon: <MapPin size={18} />, label: 'India', color: '#f59e0b', disableHover: true },
                            ].map((item, i) => (
                                <motion.a
                                    key={i} href={item.href || '#'} target={item.href ? "_blank" : undefined} rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                                    whileHover={{ x: 6, background: 'rgba(255,255,255,0.03)' }}
                                    className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-slate-700/50"
                                    style={{ background: 'rgba(5, 13, 20, 0.4)' }}
                                >
                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                                        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                                        {item.icon}
                                    </div>
                                    <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                        className="lg:col-span-3 rounded-2xl p-8 relative overflow-hidden"
                        style={{ background: 'rgba(5, 13, 20, 0.8)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)' }}
                    >
                        {/* Corner glow accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                            style={{ background: 'radial-gradient(circle at top right, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
                        <div className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
                            style={{ background: 'radial-gradient(circle at bottom left, rgba(20,184,166,0.08) 0%, transparent 70%)' }} />

                        <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">
                            Send a <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Message</span>
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <GlowInput label="Name" id="name" value={form.name} onChange={handleChange} placeholder="Name" />
                                <GlowInput label="Email" id="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
                            </div>
                            <GlowInput label="Message" id="message" value={form.message} onChange={handleChange} placeholder="Message" rows={5} />

                            <motion.button
                                type="submit"
                                disabled={submitting || sent || error}
                                whileHover={{ scale: 1.01, boxShadow: '0 0 40px rgba(20,184,166,0.3)' }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 rounded-xl font-bold text-white relative overflow-hidden flex items-center justify-center gap-2 transition-all mt-6"
                                style={{
                                    background: sent
                                        ? 'linear-gradient(135deg,#10b981,#059669)'
                                        : error
                                            ? 'linear-gradient(135deg,#ef4444,#b91c1c)'
                                            : 'linear-gradient(135deg,#14b8a6,#6366f1)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                }}
                            >
                                {/* Shimmer */}
                                <div className="absolute inset-0 pointer-events-none" style={{
                                    background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)',
                                    animation: 'shimmer 2.5s infinite',
                                }} />
                                {sent ? '✓ Message Sent!' : error ? '✗ Failed — Try Again' : submitting ? (
                                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
                                ) : (
                                    <><Send size={16} /> Send Message</>
                                )}
                            </motion.button>
                            {errorMsg && (
                                <p className="text-red-400 text-xs text-center mt-2 font-mono">{errorMsg}</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
