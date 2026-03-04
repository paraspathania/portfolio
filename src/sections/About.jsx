import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

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
    { label: '<FullStack />', x: '105%', y: '20%', delay: 0.6 },
    { label: 'git commit -m "🚀"', x: '-22%', y: '72%', delay: 1.1 },
    { label: 'npm run start', x: '102%', y: '68%', delay: 0.3 },
];

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
        <section id="about" className="py-20 relative overflow-hidden" style={{ background: '#050d12' }}>
            {/* Animated grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
                backgroundImage: 'linear-gradient(rgba(20,184,166,1) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,1) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
            }} />

            {/* Aurora orbs */}
            <div className="absolute top-10 right-20 w-56 h-56 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ background: 'rgba(20,184,166,0.07)' }} />
            <div className="absolute bottom-10 left-20 w-72 h-72 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ background: 'rgba(99,102,241,0.06)', animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ background: 'rgba(167,139,250,0.04)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <div className="flex flex-col md:flex-row items-center gap-12">

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

                                    {/* Inner glowing window */}
                                    <div className="absolute inset-2 flex items-center justify-center pointer-events-none z-10">
                                        <div className="w-[85%] h-[85%] rounded-xl flex items-center justify-center relative overflow-hidden" style={{
                                            background: 'linear-gradient(135deg, rgba(20,184,166,0.15) 0%, rgba(99,102,241,0.15) 100%)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            boxShadow: 'inset 0 0 30px rgba(255,255,255,0.02)',
                                        }}>
                                            <Code2 size={64} className="text-white/80 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]" />
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
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-mono mb-6 w-fit"
                            >
                                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                                Developer Identity
                            </motion.div>

                            <motion.h2
                                className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Designing <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Logic</span>,<br />
                                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Experiences</span>.
                            </motion.h2>

                            <motion.p
                                className="text-slate-400 text-lg mb-8 leading-relaxed font-light"
                                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Hello! I'm a passionate full-stack developer obsessed with creating pixel-perfect,
                                highly performant web applications. I bridge the gap between complex backend architecture
                                and intuitive frontend design, turning complex problems into elegant solutions.
                            </motion.p>

                            {/* Bento-style Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: '4+', label: 'Projects Completed', color: '#14b8a6', glow: 'rgba(20,184,166,0.15)' },
                                    { value: '8+', label: 'Tech Stack', color: '#8b5cf6', glow: 'rgba(139,92,246,0.15)' },
                                    { value: '100%', label: 'Passion', color: '#34d399', glow: 'rgba(52,211,153,0.15)' },
                                    { value: '∞', label: 'Curiosity', color: '#f59e0b', glow: 'rgba(245,158,11,0.15)' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        className="p-5 rounded-2xl relative overflow-hidden group"
                                        style={{
                                            background: 'rgba(5, 13, 18, 0.4)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                                            background: `radial-gradient(circle at center, ${stat.glow} 0%, transparent 70%)`
                                        }} />

                                        {/* Top accent line */}
                                        <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />

                                        <div className="relative z-10">
                                            <h3 className="text-3xl font-black mb-1 tracking-tight" style={{ color: stat.color }}>{stat.value}</h3>
                                            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
