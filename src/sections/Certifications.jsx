import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck, X, Eye, Sparkles } from 'lucide-react';

import devopsOracle from '../assets/certs/OCI 2025 Certified DevOps Professional.png';
import networkComm from '../assets/certs/Computer Communications.png';
import datasciOracle from '../assets/certs/OCI 2025 Certified Data Science Professional.png';
import cloudComp from '../assets/certs/Cloud Computing.png';

const certifications = [
    {
        title: 'Cloud Computing',
        issuer: 'NPTEL',
        icon: '☁️',
        color: '#38bdf8',
        accent: '#0ea5e9',
        gradient: 'from-sky-500/20 to-cyan-500/20',
        image: cloudComp,
        num: '01',
    },
    {
        title: 'DevOps Professional',
        issuer: 'Oracle',
        icon: '⚙️',
        color: '#f97316',
        accent: '#ea580c',
        gradient: 'from-orange-500/20 to-amber-500/20',
        image: devopsOracle,
        num: '02',
    },
    {
        title: 'Network Communication',
        issuer: 'Coursera',
        icon: '🌐',
        color: '#14b8a6',
        accent: '#0d9488',
        gradient: 'from-teal-500/20 to-emerald-500/20',
        image: networkComm,
        num: '03',
    },
    {
        title: 'Data Science',
        issuer: 'Oracle',
        icon: '📊',
        color: '#6366f1',
        accent: '#4f46e5',
        gradient: 'from-indigo-500/20 to-violet-500/20',
        image: datasciOracle,
        num: '04',
    },
];

const DRIVE_LINK = 'https://drive.google.com/drive/folders/15-bqpeh99-MqdtlQGh1lcRCnGAI9tFAM?usp=drive_link';

/* ── 3D Tilt Card with holographic effect ── */
const CertCard = ({ cert, index }) => {
    const [showPreview, setShowPreview] = useState(false);
    const cardRef = useRef(null);

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
    const glareX = useTransform(mouseX, [0, 1], [0, 100]);
    const glareY = useTransform(mouseY, [0, 1], [0, 100]);

    const handleMouseMove = useCallback((e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, duration: 0.7, type: 'spring', stiffness: 70 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{
                    perspective: 1000,
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setShowPreview(true)}
            >
                {/* Outer glow on hover */}
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl"
                    style={{ background: `radial-gradient(circle, ${cert.color}30 0%, transparent 70%)` }} />

                <div className="relative rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(145deg, rgba(12, 20, 35, 0.9) 0%, rgba(5, 10, 20, 0.95) 100%)',
                        border: `1px solid rgba(255,255,255,0.06)`,
                        boxShadow: `0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
                    }}
                >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-3xl pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-600" style={{
                        background: `linear-gradient(90deg, ${cert.color}, #a855f7, #22d3ee, ${cert.color}) border-box`,
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'destination-out',
                        maskComposite: 'exclude',
                        border: '2px solid transparent',
                        backgroundSize: '300% 100%',
                        animation: 'gradient-shift 3s linear infinite',
                    }} />

                    {/* Holographic glare overlay */}
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: useTransform(
                                [glareX, glareY],
                                ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)`
                            ),
                        }}
                    />

                    {/* Iridescent color sweep */}
                    <motion.div
                        className="absolute inset-0 z-10 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay"
                        style={{
                            background: useTransform(
                                [glareX, glareY],
                                ([x, y]) => `conic-gradient(from ${(x * 3.6)}deg at ${x}% ${y}%, ${cert.color}40, #a855f740, #22d3ee40, ${cert.color}40)`
                            ),
                        }}
                    />

                    {/* Ghost watermark */}
                    <div className="absolute top-0 right-2 pointer-events-none select-none z-0" style={{
                        fontSize: 140, fontWeight: 900, lineHeight: 1,
                        color: `${cert.color}05`, fontFamily: 'Inter, sans-serif',
                    }}>
                        {cert.num}
                    </div>

                    {/* Certificate image */}
                    <div className="relative w-full h-52 overflow-hidden">
                        <motion.img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-cover object-top"
                            style={{ filter: 'brightness(0.65) saturate(1.2) contrast(1.05)' }}
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />

                        {/* Multi-layer gradient */}
                        <div className="absolute inset-0" style={{
                            background: `linear-gradient(to top, rgba(5,10,20,1) 0%, rgba(5,10,20,0.7) 30%, rgba(5,10,20,0.2) 60%, transparent 100%)`
                        }} />
                        <div className="absolute inset-0" style={{
                            background: `linear-gradient(135deg, ${cert.color}15 0%, transparent 40%)`
                        }} />

                        {/* Floating eye hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 z-10">
                            <motion.div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                style={{
                                    background: 'rgba(0,0,0,0.5)',
                                    border: `2px solid ${cert.color}`,
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: `0 0 30px ${cert.color}40, inset 0 0 20px ${cert.color}10`,
                                }}
                                initial={{ scale: 0, rotate: -20 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                whileHover={{ scale: 1.15 }}
                            >
                                <Eye size={22} style={{ color: cert.color }} />
                            </motion.div>
                        </div>

                        {/* Top badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                            <motion.div
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-widest"
                                style={{
                                    background: 'rgba(5,10,20,0.75)',
                                    color: cert.color,
                                    border: `1px solid ${cert.color}35`,
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: `0 4px 15px rgba(0,0,0,0.3), 0 0 10px ${cert.color}10`,
                                }}
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <Award size={12} />
                                {cert.issuer.toUpperCase()}
                            </motion.div>

                            <motion.div
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-mono font-bold tracking-wider"
                                style={{
                                    background: 'rgba(5,10,20,0.75)',
                                    color: '#34d399',
                                    border: '1px solid rgba(52,211,153,0.25)',
                                    backdropFilter: 'blur(12px)',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                }}
                                initial={{ x: 20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                            >
                                <ShieldCheck size={12} />
                                VERIFIED
                            </motion.div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-4 p-6 pt-5">
                        {/* Title row with animated icon */}
                        <div className="flex items-start gap-3">
                            <motion.div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 relative"
                                style={{
                                    background: `linear-gradient(135deg, ${cert.color}18, ${cert.accent}10)`,
                                    border: `1px solid ${cert.color}30`,
                                    boxShadow: `0 0 20px ${cert.color}10`,
                                }}
                                whileHover={{ rotate: [0, -12, 12, -6, 0], scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                {cert.icon}
                                {/* Pulse ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-2xl"
                                    style={{ border: `1px solid ${cert.color}` }}
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                                />
                            </motion.div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-white leading-snug tracking-tight group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500"
                                    style={{ backgroundImage: `linear-gradient(135deg, #fff, ${cert.color})`, WebkitBackgroundClip: 'text' }}>
                                    {cert.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cert.color, boxShadow: `0 0 6px ${cert.color}` }} />
                                    <p className="text-[11px] text-slate-500 font-mono tracking-wider">CERT #{cert.num}</p>
                                </div>
                            </div>
                        </div>

                        {/* Animated divider with glow */}
                        <div className="relative w-full h-px overflow-hidden rounded-full">
                            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent, ${cert.color}40, transparent)` }} />
                            <motion.div
                                className="absolute top-0 h-full w-12 rounded-full"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
                                    boxShadow: `0 0 8px ${cert.color}`,
                                }}
                                animate={{ left: ['-15%', '115%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
                            />
                        </div>

                        {/* View button */}
                        <motion.button
                            onClick={(e) => { e.stopPropagation(); setShowPreview(true); }}
                            className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white cursor-pointer relative overflow-hidden group/btn"
                            style={{
                                background: `linear-gradient(135deg, ${cert.accent}, ${cert.color})`,
                                boxShadow: `0 4px 25px ${cert.color}25`,
                            }}
                            whileHover={{ scale: 1.03, boxShadow: `0 8px 40px ${cert.color}40` }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {/* Shimmer sweep */}
                            <motion.div
                                className="absolute inset-0 opacity-60"
                                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)' }}
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                            />
                            <Sparkles size={14} className="relative z-10" />
                            <span className="relative z-10">View Certificate</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Fullscreen preview modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {showPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(16px)' }}
                        onClick={() => setShowPreview(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                            className="relative w-[92vw] max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden md:h-[70vh] md:max-h-[600px]"
                            style={{
                                background: 'linear-gradient(145deg, rgba(12, 20, 35, 0.98) 0%, rgba(5, 10, 20, 0.99) 100%)',
                                border: `1px solid ${cert.color}25`,
                                boxShadow: `0 0 80px ${cert.color}15, 0 30px 60px rgba(0,0,0,0.6)`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Animated border */}
                            <div className="absolute inset-0 rounded-3xl pointer-events-none z-50" style={{
                                background: `linear-gradient(90deg, ${cert.color}, #a855f7, #22d3ee, ${cert.color}) border-box`,
                                WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'destination-out',
                                maskComposite: 'exclude',
                                border: '2px solid transparent',
                                backgroundSize: '300% 100%',
                                animation: 'gradient-shift 3s linear infinite',
                            }} />

                            {/* Close button */}
                            <motion.button
                                onClick={() => setShowPreview(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center text-white cursor-pointer z-[60]"
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    backdropFilter: 'blur(10px)',
                                }}
                                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={18} />
                            </motion.button>

                            {/* Left — Certificate image */}
                            <div className="md:flex-[3] relative flex items-center justify-center p-4 md:p-6 h-[40vh] md:h-auto overflow-hidden"
                                style={{ background: 'rgba(0,0,0,0.3)' }}>
                                <div className="absolute top-0 left-0 w-60 h-60 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at top left, ${cert.color}15, transparent 70%)` }} />

                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="max-w-full max-h-full object-contain rounded-xl relative z-10"
                                    style={{ boxShadow: `0 10px 40px rgba(0,0,0,0.4)` }}
                                />
                            </div>

                            {/* Right — Details panel */}
                            <motion.div
                                className="md:flex-[2] flex flex-col justify-center gap-5 p-6 md:p-8 md:border-l relative overflow-y-auto"
                                style={{ borderColor: `${cert.color}15` }}
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.15, duration: 0.4 }}
                            >
                                <div className="absolute -bottom-20 -right-20 w-60 h-60 pointer-events-none"
                                    style={{ background: `radial-gradient(circle, ${cert.color}10, transparent 70%)` }} />

                                {/* Issuer badge */}
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl w-fit"
                                    style={{ background: `${cert.color}10`, border: `1px solid ${cert.color}30` }}>
                                    <Award size={16} style={{ color: cert.color }} />
                                    <span className="text-sm font-mono font-bold tracking-wider" style={{ color: cert.color }}>
                                        {cert.issuer.toUpperCase()}
                                    </span>
                                </div>

                                {/* Title */}
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl">{cert.icon}</span>
                                        <h3 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight">
                                            {cert.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                                        Professional certification validating expertise in {cert.title.toLowerCase()}, issued by {cert.issuer}.
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="relative w-full h-px">
                                    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${cert.color}50, transparent)` }} />
                                    <motion.div
                                        className="absolute top-0 h-full w-10"
                                        style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`, boxShadow: `0 0 6px ${cert.color}` }}
                                        animate={{ left: ['-10%', '110%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                                    />
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                                        style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)' }}>
                                        <ShieldCheck size={16} className="text-emerald-400" />
                                        <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">VERIFIED</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                                        style={{ background: `${cert.color}08`, border: `1px solid ${cert.color}25` }}>
                                        <Sparkles size={16} style={{ color: cert.color }} />
                                        <span className="text-xs font-mono font-bold tracking-wider" style={{ color: cert.color }}>AUTHENTIC</span>
                                    </div>
                                </div>

                                {/* Cert number */}
                                <p className="text-[11px] text-slate-600 font-mono tracking-widest">CREDENTIAL #{cert.num}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

/* ── Floating particle dots ── */
const FloatingDots = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: ['#38bdf8', '#f97316', '#14b8a6', '#6366f1', '#a855f7'][i % 5],
                    opacity: 0.2,
                }}
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.4, 0.1],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: 'easeInOut',
                }}
            />
        ))}
    </div>
);

const Certifications = () => (
    <section id="certifications" className="py-28 relative overflow-hidden">

        {/* Background effects */}
        <div className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse pointer-events-none"
            style={{ background: 'rgba(99,102,241,0.06)' }} />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full blur-3xl animate-pulse pointer-events-none"
            style={{ background: 'rgba(20,184,166,0.05)', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(168,85,247,0.03)' }} />

        <FloatingDots />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
            >
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
                    style={{ background: 'rgba(168,85,247,0.08)', borderColor: 'rgba(168,85,247,0.2)', color: '#c084fc' }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#c084fc', boxShadow: '0 0 8px #c084fc' }}></span>
                    <span className="text-xs font-mono tracking-widest font-semibold">CREDENTIALS</span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-teal-400 to-indigo-400">Certifications</span>
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
                    Professional certifications validating my skills and knowledge.
                </p>
                <motion.p
                    className="text-slate-500 text-sm font-mono mt-3 flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <Sparkles size={14} className="text-purple-400" />
                    Hover to explore &middot; Click to view full certificate
                </motion.p>
            </motion.div>

            {/* Cards grid — 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {certifications.map((cert, i) => (
                    <CertCard key={cert.title} cert={cert} index={i} />
                ))}
            </div>

            {/* Bottom stat line */}
            <motion.div
                className="flex items-center justify-center gap-8 mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
            >
                {[
                    { label: 'Certifications', value: '4+', color: '#c084fc' },
                    { label: 'Platforms', value: '3', color: '#14b8a6' },
                    { label: 'Verified', value: '100%', color: '#34d399' },
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-2xl font-black" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}>
                            {stat.value}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono tracking-widest">{stat.label.toUpperCase()}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    </section>
);

export default Certifications;
