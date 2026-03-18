import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import CodeDisplay from '../components/ui/CodeDisplay';

const stats = [
    { value: '2+', label: 'Years Exp.' },
    { value: '10+', label: 'Projects' },
    { value: '8+', label: 'Technologies' },
];

const techPills = [
    { label: 'React', color: '#38bdf8' },
    { label: 'Node.js', color: '#4ade80' },
    { label: 'Java', color: '#fb923c' },
    { label: 'PHP', color: '#a78bfa' },
    { label: 'MySQL', color: '#34d399' },
    { label: 'Docker', color: '#60a5fa' },
    { label: 'Python', color: '#facc15' },
    { label: 'Git', color: '#f87171' },
];

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-14">

                    {/* ── Left Column ── */}
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Available badge */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium"
                            style={{
                                background: 'rgba(20,184,166,0.1)',
                                border: '1px solid rgba(20,184,166,0.3)',
                                color: '#14b8a6',
                            }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#14b8a6' }} />
                                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#14b8a6' }} />
                            </span>
                            Available for opportunities
                        </motion.div>

                        {/* Greeting */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-xl text-slate-400 font-medium mb-2"
                        >
                            Hi there, I'm
                        </motion.p>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight"
                            style={{
                                background: 'linear-gradient(135deg, #2dd4bf 0%, #34d399 45%, #a78bfa 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Paras Pathania
                        </motion.h1>

                        {/* Typewriter */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl font-semibold mb-5 h-10 flex justify-center lg:justify-start"
                            style={{ color: '#2dd4bf' }}
                        >
                            <Typewriter
                                options={{
                                    strings: ['Software Developer Engineer', 'Full Stack Developer', 'Problem Solver'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="text-base text-slate-400 max-w-xl mx-auto lg:mx-0 mb-7 leading-relaxed"
                        >
                            I transform ideas into digital reality — building scalable, accessible, and
                            pixel-perfect web experiences with a passion for clean architecture.
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center lg:justify-start gap-6 mb-8"
                        >
                            {[{ value: '4+', label: 'Projects' }, { value: '8+', label: 'Technologies' }].map((s, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-2xl font-black" style={{ color: '#2dd4bf' }}>{s.value}</div>
                                    <div className="text-xs text-slate-500 font-medium tracking-wide">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }}
                            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
                        >
                            <a
                                href="/CV.pdf"
                                download="Paras_Pathania_Resume.pdf"
                                className="px-7 py-3 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2 hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #0d9488, #6366f1)',
                                    boxShadow: '0 0 28px rgba(13,148,136,0.4)',
                                }}
                            >
                                Download Resume <Download size={18} />
                            </a>
                            <a
                                href="#contact"
                                className="px-7 py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 hover:scale-105"
                                style={{
                                    border: '1px solid rgba(20,184,166,0.4)',
                                    color: '#2dd4bf',
                                    background: 'rgba(20,184,166,0.06)',
                                }}
                            >
                                Contact Me
                            </a>
                        </motion.div>

                        {/* Social + tech pills */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55 }}
                            className="flex flex-col items-center lg:items-start gap-4"
                        >
                            {/* Social icons */}
                            <div className="flex gap-5">
                                {[
                                    { href: 'https://github.com/paraspathania', Icon: Github },
                                    { href: 'https://www.linkedin.com/in/paras-pathania', Icon: Linkedin },
                                    { href: 'mailto:paraspathania705@gmail.com', Icon: Mail },
                                ].map(({ href, Icon }, i) => (
                                    <motion.a
                                        key={i}
                                        href={href}
                                        target={href.startsWith('http') ? '_blank' : undefined}
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.2, y: -2 }}
                                        className="p-2.5 rounded-xl transition-colors"
                                        style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.2)', color: '#94a3b8' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#14b8a6'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                ))}
                            </div>

                            {/* Floating tech pills */}
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {techPills.map((pill, i) => (
                                    <motion.span
                                        key={pill.label}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 + i * 0.05 }}
                                        className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                                        style={{
                                            background: `${pill.color}12`,
                                            border: `1px solid ${pill.color}30`,
                                            color: pill.color,
                                        }}
                                    >
                                        {pill.label}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* ── Right Column: Animated IDE ── */}
                    <motion.div
                        className="flex-1 w-full max-w-lg lg:max-w-xl flex flex-col gap-4 relative z-10"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <CodeDisplay />
                    </motion.div>

                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <span className="text-[10px] font-mono text-slate-600 tracking-widest">SCROLL</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-[1px] h-8"
                    style={{ background: 'linear-gradient(to bottom, rgba(20,184,166,0.7), transparent)' }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
