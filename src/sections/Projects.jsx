import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star, Zap, TrendingUp, Shield } from 'lucide-react';

const projects = [
    {
        num: '01',
        title: 'Job Tracker',
        category: 'Full Stack Web App',
        description: 'A full-stack job tracking platform connecting recruiters and job seekers. Built end-to-end: authentication, job posting, applications, admin dashboard, and paginated search. Resulted in measurable user engagement improvements.',
        tags: [
            { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        ],
        metrics: [
            { icon: <TrendingUp size={13} />, label: '8% bounce rate ↓' },
            { icon: <Star size={13} />, label: 'Auth + Admin' },
            { icon: <Zap size={13} />, label: 'Pagination' },
        ],
        github: 'https://github.com/paraspathania/project_job_recruit', demo: '#',
        accent: '#6366f1',
        gradientFrom: '#1e1b4b', gradientTo: '#1e293b',
        emoji: '💼',
        // Fake UI rows for mockup preview
        mockupRows: [
            { w: '60%', c: '#6366f1' }, { w: '80%', c: '#818cf8' },
            { w: '45%', c: '#6366f1' }, { w: '70%', c: '#c7d2fe' },
            { w: '55%', c: '#818cf8' },
        ],
        mockupBadges: ['React', 'Jobs', 'Auth'],
    },
    {
        num: '02',
        title: 'Govt. Documentation Portal',
        category: 'Enterprise e-District Hub',
        description: 'Centralized e-District submission hub for high-volume document processing covering MSME, Taxation, and Identity workflows. Architected optimized MySQL queries that boosted retrieval speed by 25% and maintained 99.9% uptime.',
        tags: [
            { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
            { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        ],
        metrics: [
            { icon: <TrendingUp size={13} />, label: '25% faster queries' },
            { icon: <Shield size={13} />, label: '99.9% uptime' },
            { icon: <Zap size={13} />, label: 'High volume' },
        ],
        github: 'https://github.com/paraspathania/smartdoors_indfes', demo: '#',
        accent: '#10b981',
        gradientFrom: '#064e3b', gradientTo: '#1e293b',
        emoji: '🏛️',
        mockupRows: [
            { w: '75%', c: '#10b981' }, { w: '55%', c: '#34d399' },
            { w: '85%', c: '#10b981' }, { w: '65%', c: '#6ee7b7' },
            { w: '50%', c: '#34d399' },
        ],
        mockupBadges: ['Docs', 'MSME', 'Tax'],
    },
];

/* ── Mouse shimmer overlay — pointer-events-none so back-face buttons work ── */
const Shimmer = React.forwardRef((_, ref) => (
    <div ref={ref} className="absolute inset-0 z-5 pointer-events-none rounded-2xl" />
));

/* ── Inline app mockup preview ── */
const AppMockup = ({ project }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
            width: '90%', borderRadius: 12,
            background: 'rgba(5, 13, 20, 0.95)',
            border: `1px solid ${project.accent}30`,
            overflow: 'hidden',
            boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}15, inset 0 1px 1px rgba(255,255,255,0.05)`,
            backdropFilter: 'blur(10px)'
        }}>
        {/* Mini browser chrome */}
        <div style={{ background: 'rgba(15,23,42,0.9)', borderBottom: `1px solid ${project.accent}20`, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
            {['#ef4444', '#eab308', '#22c55e'].map(c => <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />)}
            <div style={{ flex: 1, height: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 4, margin: '0 10px', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                <span className="text-[7px] text-slate-500 font-mono tracking-wider">localhost:3000</span>
            </div>
        </div>
        {/* Fake content rows */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Header row */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
                {project.mockupBadges.map(b => (
                    <div key={b} style={{ fontSize: 9, padding: '3px 8px', borderRadius: 4, background: `${project.accent}15`, color: project.accent, fontFamily: 'monospace', fontWeight: 600 }}>{b}</div>
                ))}
            </div>
            {project.mockupRows.map((r, i) => (
                <motion.div key={i} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                    style={{ height: 8, borderRadius: 4, background: r.c, width: r.w, opacity: 0.6, transformOrigin: 'left' }} />
            ))}
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <div style={{ flex: 1, height: 26, borderRadius: 6, background: project.accent, opacity: 0.8 }} />
                <div style={{ width: 70, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.05)' }} />
            </div>
        </div>
    </motion.div>
);

/* ── Neon animated border ── */
const NeonBorder = ({ accent }) => (
    <div className="absolute inset-0 rounded-2xl pointer-events-none z-10" style={{
        background: `linear-gradient(90deg, ${accent}, #a855f7, #22d3ee, ${accent}) border-box`,
        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'destination-out',
        maskComposite: 'exclude',
        border: '1.5px solid transparent',
        backgroundSize: '300% 100%',
        animation: 'gradient-shift 3.5s linear infinite',
    }} />
);

/* ── Project Card ── */
const ProjectCard = ({ project, index }) => {
    const shimmerRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const el = shimmerRef.current;
        if (!el) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.09) 0%, transparent 60%)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (shimmerRef.current) shimmerRef.current.style.background = 'none';
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.7, type: 'spring', stiffness: 80 }}
            className="flip-card"
            style={{ height: 520 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flip-inner h-full">

                <div className="flip-front rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: `linear-gradient(145deg, ${project.gradientFrom}, ${project.gradientTo})`, border: `1px solid ${project.accent}20`, pointerEvents: 'none' }}>
                    <NeonBorder accent={project.accent} />
                    <Shimmer ref={shimmerRef} />

                    {/* Ghost project number watermark */}
                    <div className="absolute top-0 right-0 pointer-events-none select-none z-0" style={{
                        fontSize: 160, fontWeight: 900, lineHeight: 1,
                        color: `${project.accent}08`,
                        fontFamily: 'Inter, sans-serif',
                        userSelect: 'none',
                    }}>
                        {project.num}
                    </div>

                    {/* Top bar with category */}
                    <div className="flex items-center justify-between px-6 pt-6 pb-4 relative z-10">
                        <span style={{
                            fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em',
                            color: project.accent, background: `${project.accent}15`,
                            padding: '4px 12px', borderRadius: 24, fontWeight: 700,
                            border: `1px solid ${project.accent}30`,
                            boxShadow: `0 0 10px ${project.accent}20`
                        }}>
                            {project.category.toUpperCase()}
                        </span>
                        <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }} />
                            <span className="text-xs text-slate-300 font-mono">live</span>
                        </div>
                    </div>

                    {/* App mockup preview */}
                    <div className="flex-1 flex items-center justify-center relative z-10 px-6 mt-2 mb-4">
                        <AppMockup project={project} />
                    </div>

                    {/* Project title + emoji */}
                    <div className="px-6 pt-3 pb-3 relative z-10 bg-gradient-to-t from-slate-900 via-slate-900/90 to-transparent flex-1 flex flex-col justify-end">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl filter drop-shadow-lg">{project.emoji}</span>
                            <h3 className="text-2xl font-black text-white tracking-tight">{project.title}</h3>
                        </div>

                        {/* Metric badges */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.metrics.map((m, i) => (
                                <div key={i} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-md"
                                    style={{ background: 'rgba(5,13,18,0.6)', color: project.accent, border: `1px solid ${project.accent}30` }}>
                                    {m.icon} {m.label}
                                </div>
                            ))}
                        </div>

                        {/* Tech icons strip */}
                        <div className="flex items-center gap-2.5 pb-2">
                            {project.tags.map(t => (
                                <div key={t.name} className="flex items-center justify-center w-8 h-8 rounded-lg transition-transform hover:scale-110"
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                    title={t.name}>
                                    <img src={t.icon} alt={t.name} width={16} height={16} style={{ objectFit: 'contain' }} />
                                </div>
                            ))}
                            <span className="ml-auto text-[11px] text-teal-400/80 font-mono tracking-wide flex items-center gap-1">
                                hover to flip <span className="animate-bounce-x">→</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* ══ BACK ══ */}
                <div className="flip-back rounded-2xl overflow-hidden flex flex-col p-6 relative"
                    style={{ background: `linear-gradient(145deg, ${project.gradientFrom}ee, #0f172a)`, border: `1px solid ${project.accent}30` }}>
                    <NeonBorder accent={project.accent} />

                    {/* Top glow */}
                    <div className="absolute top-0 right-0 w-60 h-60 pointer-events-none"
                        style={{ background: `radial-gradient(circle at top right, ${project.accent}18, transparent 70%)` }} />

                    {/* Ghost number on back too */}
                    <div className="absolute bottom-0 left-0 pointer-events-none select-none" style={{
                        fontSize: 120, fontWeight: 900, lineHeight: 1,
                        color: `${project.accent}06`, fontFamily: 'Inter, sans-serif',
                    }}>
                        {project.num}
                    </div>

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4 relative z-10">
                        <span className="text-3xl mt-0.5">{project.emoji}</span>
                        <div>
                            <p className="text-[10px] font-mono tracking-widest mb-0.5" style={{ color: project.accent }}>{project.category.toUpperCase()}</p>
                            <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed flex-1 relative z-10">{project.description}</p>

                    {/* Metrics highlight bar */}
                    <div className="flex gap-2 mt-4 mb-4 relative z-10">
                        {project.metrics.map((m, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl text-center"
                                style={{ background: `${project.accent}12`, border: `1px solid ${project.accent}25` }}>
                                <span style={{ color: project.accent }}>{m.icon}</span>
                                <span className="text-[9px] text-slate-400 font-mono leading-tight">{m.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech icons */}
                    <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                        {project.tags.map(t => (
                            <div key={t.name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <img src={t.icon} alt={t.name} width={14} height={14} style={{ objectFit: 'contain' }} />
                                <span className="text-xs text-slate-300 font-medium">{t.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex gap-3 relative z-[100]">
                        <button
                            onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank', 'noopener,noreferrer'); }}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                            <Github size={15} /> Source Code
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); window.open(project.demo, '_blank', 'noopener,noreferrer'); }}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white hover:scale-105 transition-transform cursor-pointer"
                            style={{ background: `linear-gradient(135deg, ${project.accent}, #6366f1)`, boxShadow: `0 0 20px ${project.accent}35` }}>
                            <ExternalLink size={15} /> Live Demo
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => (
    <section id="projects" className="py-24 relative overflow-hidden">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 w-fit" style={{ background: 'rgba(20,184,166,0.1)', borderColor: 'rgba(20,184,166,0.2)', color: '#14b8a6' }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#14b8a6' }}></span>
                    <span className="text-xs font-mono tracking-widest">PORTFOLIO</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">Works</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto">Highlights from my journey building real-world digital solutions.</p>
                <p className="text-slate-500 text-sm font-mono mt-2">Click a card to flip and read the full case study →</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {projects.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
            </div>
        </div>
    </section>
);

export default Projects;
