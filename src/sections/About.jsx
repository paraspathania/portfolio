import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, Zap, Server, Layout, Coffee, Music, Gamepad2, Heart, Rocket, Star, Lightbulb } from 'lucide-react';

/* ── Orbiting ring that wraps around the tilt card ── */
const OrbitRing = ({ size, duration, color, tilt = 0 }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: size, height: size,
            border: `1px solid ${color}`,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: `rotateX(${tilt}deg)`,
            boxShadow: `0 0 8px ${color}40`,
            top: '50%', left: '50%',
            marginTop: -(size / 2), marginLeft: -(size / 2),
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
    />
);

/* ── Floating code badges ── */
const floatingBadges = [
    { label: 'const dev = true', x: '-18%', y: '15%', delay: 0 },
    { label: '<MERN />', x: '105%', y: '20%', delay: 0.6 },
    { label: 'git commit -m "🚀"', x: '-22%', y: '72%', delay: 1.1 },
    { label: 'npm run build', x: '102%', y: '68%', delay: 0.3 },
    { label: 'REST API ✓', x: '40%', y: '-15%', delay: 1.5 },
];

/* ── Section divider ── */
const SectionLabel = ({ label, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay }}
        className="flex items-center gap-3 mb-6"
    >
        <span className="h-px flex-1 bg-gradient-to-r from-teal-500/40 to-transparent" />
        <span className="text-xs font-mono text-teal-400 tracking-widest uppercase">{label}</span>
    </motion.div>
);

const About = () => {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        card.style.transform = `perspective(800px) rotateX(${-((y - cy) / cy) * 14}deg) rotateY(${((x - cx) / cx) * 14}deg) scale3d(1.03,1.03,1.03)`;
        const glare = card.querySelector('.card-glare');
        if (glare) glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.14) 0%, transparent 65%)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (card) card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }, []);

    return (
        <section id="about" className="py-20 relative overflow-hidden">

            {/* Aurora orbs */}
            <div className="absolute top-10 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ background: 'rgba(20,184,166,0.07)' }} />
            <div className="absolute bottom-10 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ background: 'rgba(99,102,241,0.06)', animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ background: 'rgba(167,139,250,0.04)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>

                    {/* ═══════════════════════ TOP ROW — Card + Intro ═══════════════════════ */}
                    <div className="flex flex-col md:flex-row items-center gap-12 mb-20">

                        {/* ── 3D Tilt Card with orbiting rings ── */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, type: 'spring' }}
                                className="w-full max-w-sm relative"
                            >
                                {/* Floating code badges */}
                                {floatingBadges.map((b, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute z-20 whitespace-nowrap font-mono text-[10px] px-2.5 py-1 rounded-md pointer-events-none"
                                        style={{
                                            left: b.x, top: b.y,
                                            background: 'rgba(3,13,16,0.9)',
                                            border: '1px solid rgba(20,184,166,0.25)',
                                            color: '#14b8a6',
                                            boxShadow: '0 0 12px rgba(20,184,166,0.12)',
                                        }}
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: b.delay }}
                                    >
                                        {b.label}
                                    </motion.div>
                                ))}

                                {/* Orbiting rings */}
                                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 0 }}>
                                    <OrbitRing size={340} duration={10} color="#14b8a6" tilt={70} />
                                    <OrbitRing size={300} duration={14} color="#a78bfa" tilt={60} />
                                    <OrbitRing size={260} duration={18} color="#a855f7" tilt={75} />
                                </div>

                                {/* 3D tilt card */}
                                <div
                                    ref={cardRef}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    style={{ transition: 'transform 0.1s ease', transformStyle: 'preserve-3d', position: 'relative', zIndex: 5 }}
                                    className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-slate-800 to-orange-500/20 animate-gradient-shift" />

                                    {/* Scanline overlay */}
                                    <div className="absolute inset-0 pointer-events-none z-10" style={{
                                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
                                    }} />

                                    {/* Morphing blob */}
                                    <div className="absolute inset-4 flex items-center justify-center">
                                        <div className="blob-shape w-48 h-48 bg-gradient-to-br from-cyan-400/20 to-orange-400/20 border border-cyan-400/30 flex items-center justify-center">
                                            <span className="text-6xl select-none">👨‍💻</span>
                                        </div>
                                    </div>

                                    {/* Floating geometric decorations */}
                                    {[
                                        { shape: <circle cx="14" cy="14" r="12" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 3" />, w: 28, h: 28, pos: 'top-4 right-4', delay: '0s' },
                                        { shape: <polygon points="11,2 20,18 2,18" stroke="#f97316" strokeWidth="1.5" fill="none" />, vb: "0 0 22 22", w: 22, h: 22, pos: 'bottom-6 left-6', delay: '0.8s' },
                                        { shape: <rect x="2" y="2" width="14" height="14" rx="3" stroke="#a855f7" strokeWidth="1.5" fill="none" />, vb: "0 0 18 18", w: 18, h: 18, pos: 'top-1/2 left-4', delay: '1.4s' },
                                    ].map((item, i) => (
                                        <div key={i} className={`absolute ${item.pos} float-anim z-20`} style={{ animationDelay: item.delay }}>
                                            <svg width={item.w} height={item.h} viewBox={item.vb || `0 0 ${item.w} ${item.h}`} fill="none">{item.shape}</svg>
                                        </div>
                                    ))}

                                    <div className="card-glare absolute inset-0 pointer-events-none rounded-2xl transition-all duration-75 z-10" />

                                    {/* Animated neon border */}
                                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-20" style={{
                                        background: 'linear-gradient(90deg,#22d3ee,#f97316,#a855f7,#22d3ee) border-box',
                                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                                        WebkitMaskComposite: 'destination-out',
                                        maskComposite: 'exclude',
                                        border: '1px solid transparent',
                                        backgroundSize: '300% 100%',
                                        animation: 'gradient-shift 4s linear infinite',
                                    }} />
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Text + stat cards ── */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center lg:pl-8">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-mono mb-8 w-fit shadow-[0_0_15px_rgba(20,184,166,0.15)]"
                            >
                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
                                Full Stack Developer
                            </motion.div>

                            <motion.h2
                                className="text-4xl lg:text-5xl xl:text-6xl font-black mb-6 text-white tracking-tight leading-[1.1]"
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]">Scalable</span><br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.3)]">Web Apps</span>.
                            </motion.h2>

                            <motion.p
                                className="text-slate-300 text-lg mb-4 leading-relaxed font-light max-w-xl"
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                I am a <strong>Full Stack Web Developer</strong> passionate about building scalable web applications and solving real-world problems through technology.
                            </motion.p>
                            <motion.p
                                className="text-slate-400 text-base mb-4 leading-relaxed font-light max-w-xl"
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
                            >
                                I specialize in the <strong className="text-teal-400">MERN stack</strong> and enjoy designing{' '}
                                <strong className="text-teal-400">efficient backend systems</strong>,{' '}
                                <strong className="text-teal-400">responsive user interfaces</strong>, and{' '}
                                <strong>reliable full-stack architectures</strong> that feel fast and intuitive.
                            </motion.p>
                            <motion.p
                                className="text-slate-400 text-base mb-4 leading-relaxed font-light max-w-xl"
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                My work focuses on building modern applications with <strong className="text-teal-400">React.js</strong>, <strong className="text-teal-400">Node.js</strong>, <strong className="text-teal-400">Express.js</strong>, and <strong className="text-teal-400">MongoDB</strong>, while also working with relational databases like <strong>MySQL</strong> and <strong>PostgreSQL</strong>. I build secure <strong>REST APIs</strong> with authentication using <strong className="text-teal-400">JWT</strong> and lean on <strong>Docker</strong>, <strong>Git</strong>, and <strong>Linux</strong> to ship production-ready systems.
                            </motion.p>
                            <motion.p
                                className="text-slate-400 text-base mb-8 leading-relaxed font-light max-w-xl"
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }}
                            >
                                I'm currently focused on <strong>scalable system design</strong>,{' '}
                                <strong className="text-teal-400">cloud native architectures</strong>, and shipping products that feel as good to maintain as they are to use.
                            </motion.p>

                            {/* Core Expertise Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    { icon: <Server size={18} />, title: 'Backend Systems', text: 'Building secure REST APIs with Node.js, Express, JWT auth, and production-ready deployments.' },
                                    { icon: <Layout size={18} />, title: 'Full-Stack Architecture', text: 'Designing end-to-end MERN apps with clean UI, scalable APIs, and reliable databases.' },
                                    { icon: <Globe size={18} />, title: 'API Integration', text: 'Connecting third-party services, webhooks, and external APIs into seamless data flows.' },
                                    { icon: <Cpu size={18} />, title: 'Performance & DevOps', text: 'Optimizing queries, containerizing with Docker, and deploying on Linux servers.' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.1 }}
                                        className="flex gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-teal-500/30 transition-colors"
                                    >
                                        <div className="text-teal-400 mt-1">{item.icon}</div>
                                        <div>
                                            <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                                            <p className="text-slate-400 text-xs leading-relaxed">{item.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Premium Bento-style Stats */}
                            <div className="grid grid-cols-2 gap-5 lg:gap-6">
                                {[
                                    { value: '10+', label: 'Projects Completed', color: '#14b8a6', glow: 'rgba(20,184,166,0.2)' },
                                    { value: '12+', label: 'Tech Stack', color: '#8b5cf6', glow: 'rgba(139,92,246,0.2)' },
                                    { value: '2+', label: 'Years Coding', color: '#34d399', glow: 'rgba(52,211,153,0.2)' },
                                    { value: '∞', label: 'Curiosity', color: '#f59e0b', glow: 'rgba(245,158,11,0.2)' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -4 }}
                                        className="p-6 rounded-3xl relative overflow-hidden group/stat cursor-default shadow-lg"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(5, 13, 20, 0.8) 100%)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                            backdropFilter: 'blur(16px)',
                                        }}
                                    >
                                        <div className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500" style={{
                                            background: `radial-gradient(120px circle at top right, ${stat.glow} 0%, transparent 100%)`
                                        }} />
                                        <div className="absolute top-0 left-0 w-full h-[2px] opacity-10 group-hover/stat:opacity-100 transition-all duration-500 origin-left scale-x-0 group-hover/stat:scale-x-100" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, ${stat.color})` }} />
                                        <div className="absolute left-0 top-0 h-full w-[2px] opacity-10 group-hover/stat:opacity-100 transition-all duration-500 origin-top scale-y-0 group-hover/stat:scale-y-100" style={{ background: `linear-gradient(180deg, transparent, ${stat.color}, transparent)` }} />
                                        <div className="relative z-10">
                                            <h3 className="text-4xl font-black mb-2 tracking-tight transition-all duration-300 group-hover/stat:translate-x-1" style={{ color: stat.color, textShadow: `0 2px 10px ${stat.glow}` }}>
                                                {stat.value}
                                            </h3>
                                            <p className="text-sm md:text-base text-slate-400 font-medium transition-colors duration-300 group-hover/stat:text-slate-200">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ═══════════════════════ PROFESSIONAL HIGHLIGHTS ═══════════════════════ */}
                    <SectionLabel label="Professional Highlights" delay={0.1} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                        {[
                            {
                                icon: <Rocket size={22} />,
                                color: '#14b8a6',
                                glow: 'rgba(20,184,166,0.15)',
                                title: 'What I Build',
                                points: [
                                    'Full-stack web apps with MERN stack',
                                    'RESTful APIs with JWT & OAuth2 auth',
                                    'Admin dashboards & data portals',
                                    'Real-time features with WebSockets',
                                    'Responsive, mobile-first UIs',
                                ],
                            },
                            {
                                icon: <Code2 size={22} />,
                                color: '#8b5cf6',
                                glow: 'rgba(139,92,246,0.15)',
                                title: 'How I Work',
                                points: [
                                    'Clean, modular, commented code',
                                    'Git branching & PR-based workflow',
                                    'Agile / iterative development cycles',
                                    'Test-driven where it matters most',
                                    'Continuous learning & self-improvement',
                                ],
                            },
                            {
                                icon: <Star size={22} />,
                                color: '#f59e0b',
                                glow: 'rgba(245,158,11,0.15)',
                                title: 'Career Goals',
                                points: [
                                    'Land a strong SDE-1 role post-graduation',
                                    'Contribute to open-source projects',
                                    'Master system design & DSA',
                                    'Build SaaS products independently',
                                    'Grow into a tech lead / architect',
                                ],
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.12 }}
                                whileHover={{ y: -6 }}
                                className="p-6 rounded-2xl relative overflow-hidden group"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(5,13,20,0.85) 100%)',
                                    border: `1px solid rgba(255,255,255,0.06)`,
                                    backdropFilter: 'blur(16px)',
                                }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(200px circle at top left, ${card.glow}, transparent)` }} />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="p-2.5 rounded-xl" style={{ background: `${card.glow}`, color: card.color }}>{card.icon}</div>
                                        <h3 className="text-white font-bold text-base">{card.title}</h3>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {card.points.map((pt, j) => (
                                            <li key={j} className="flex items-start gap-2 text-slate-400 text-sm leading-snug">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: card.color }} />
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ═══════════════════════ BEYOND THE CODE ═══════════════════════ */}
                    <SectionLabel label="Beyond the Code" delay={0.1} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">

                        {/* Who I Am */}
                        <motion.div
                            initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            className="p-7 rounded-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(5,13,20,0.85) 100%)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                backdropFilter: 'blur(16px)',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <Heart size={20} className="text-pink-400" />
                                <h3 className="text-white font-bold text-base">Who I Am</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                Beyond the terminal, I'm a curious thinker who enjoys zooming out from code to understand the bigger picture — why systems work the way they do, why products succeed or fail, and how technology shapes real lives.
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                I'm a <strong className="text-slate-300">problem-first person</strong>. Before writing a single line of code, I try to deeply understand what I'm solving and for whom. That mindset keeps my work purposeful rather than mechanical.
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                I believe in building things that last — code that's readable six months from now, APIs that degrade gracefully, and UIs that don't need a tutorial. Quality over cleverness, always.
                            </p>
                        </motion.div>

                        {/* Personality traits */}
                        <motion.div
                            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
                            className="p-7 rounded-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(5,13,20,0.85) 100%)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                backdropFilter: 'blur(16px)',
                            }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <Lightbulb size={20} className="text-yellow-400" />
                                <h3 className="text-white font-bold text-base">Personality & Traits</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { emoji: '🎯', trait: 'Goal-oriented', desc: 'I set clear targets and reverse-engineer the path.' },
                                    { emoji: '🤝', trait: 'Team player', desc: 'Better results come from better collaboration.' },
                                    { emoji: '🔍', trait: 'Detail-driven', desc: 'Small things add up to big quality differences.' },
                                    { emoji: '⚡', trait: 'Fast learner', desc: "New stack? Give me a weekend and I'm dangerous." },
                                    { emoji: '💬', trait: 'Communicator', desc: 'I document clearly and speak up when stuck.' },
                                    { emoji: '🧘', trait: 'Calm under pressure', desc: "Deadlines sharpen focus, they don't break it." },
                                ].map((t, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07 }}
                                        className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/50 hover:border-teal-500/20 transition-colors"
                                    >
                                        <div className="text-lg mb-1">{t.emoji}</div>
                                        <div className="text-white text-xs font-semibold mb-0.5">{t.trait}</div>
                                        <div className="text-slate-500 text-[11px] leading-snug">{t.desc}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ═══════════════════════ HOBBIES & INTERESTS ═══════════════════════ */}
                    <SectionLabel label="Hobbies & Interests" delay={0.1} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
                        {[
                            { icon: <Coffee size={24} />, label: 'Coffee & Code', detail: 'Best ideas arrive at 2 AM with a strong cup', color: '#f59e0b', glow: 'rgba(245,158,11,0.12)' },
                            { icon: <Gamepad2 size={24} />, label: 'Gaming', detail: 'Strategy games & the occasional open-world adventure', color: '#a855f7', glow: 'rgba(168,85,247,0.12)' },
                            { icon: <Music size={24} />, label: 'Music', detail: 'Lo-fi hip-hop while debugging, EDM while building', color: '#34d399', glow: 'rgba(52,211,153,0.12)' },
                        ].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }}
                                whileHover={{ y: -8, scale: 1.03 }}
                                className="p-5 rounded-2xl flex flex-col items-center text-center cursor-default group relative overflow-hidden"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15,23,42,0.7) 0%, rgba(5,13,20,0.85) 100%)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    backdropFilter: 'blur(16px)',
                                }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(120px circle at center, ${h.glow}, transparent)` }} />
                                <div className="relative z-10">
                                    <div className="mb-3 p-3 rounded-full" style={{ background: h.glow, color: h.color }}>{h.icon}</div>
                                    <h4 className="text-white font-bold text-sm mb-1">{h.label}</h4>
                                    <p className="text-slate-500 text-xs leading-snug">{h.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ═══════════════════════ FUN FACTS STRIP ═══════════════════════ */}
                    <SectionLabel label="Fun Facts" delay={0.1} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { emoji: '☕', fact: 'Powered by coffee', sub: 'At least 2 cups before serious coding begins' },
                            { emoji: '🌙', fact: 'Night owl', sub: 'Most productive between 10 PM and 2 AM' },
                            { emoji: '🐛', fact: 'Bug whisperer', sub: 'I actually enjoy debugging — it\'s like detective work' },
                            { emoji: '📦', fact: 'npm addict', sub: 'If there\'s a package for it, I\'ve probably installed it' },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.08 }}
                                whileHover={{ scale: 1.04 }}
                                className="flex items-start gap-4 p-5 rounded-2xl"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(5,13,20,0.75) 100%)',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    backdropFilter: 'blur(12px)',
                                }}
                            >
                                <span className="text-3xl">{f.emoji}</span>
                                <div>
                                    <div className="text-white font-semibold text-sm mb-0.5">{f.fact}</div>
                                    <div className="text-slate-500 text-xs leading-snug">{f.sub}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
