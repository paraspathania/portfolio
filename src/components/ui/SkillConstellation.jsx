import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Skill data: each skill has x/y%, size (1-3), and optional label offset ── */
const constellations = [
    {
        id: 'languages', label: 'LANGUAGES', color: '#22d3ee', labelX: 4, labelY: 4,
        skills: [
            { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', x: 12, y: 10, size: 3 },
            { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', x: 28, y: 18, size: 3 },
            { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', x: 6, y: 26, size: 2 },
            { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', x: 22, y: 32, size: 2 },
            { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', x: 38, y: 8, size: 2 },
        ],
        edges: [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4]],
    },
    {
        id: 'frameworks', label: 'FRAMEWORKS', color: '#f97316', labelX: 56, labelY: 4,
        skills: [
            { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', x: 62, y: 10, size: 3 },
            { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', x: 78, y: 16, size: 2 },
            { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true, x: 90, y: 10, size: 2 },
            { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', x: 68, y: 28, size: 2 },
            { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', x: 84, y: 28, size: 2 },
        ],
        edges: [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4]],
    },
    {
        id: 'backend', label: 'BACKEND', color: '#34d399', labelX: 30, labelY: 38,
        skills: [
            { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', x: 38, y: 44, size: 3 },
            { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', x: 54, y: 42, size: 2 },
            { name: 'RESTful APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', x: 44, y: 56, size: 2 },
            { name: 'Middleware', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg', x: 60, y: 54, size: 2 },
        ],
        edges: [[0, 1], [0, 2], [1, 3], [2, 3]],
    },
    {
        id: 'database', label: 'DATABASE', color: '#a855f7', labelX: 4, labelY: 66,
        skills: [
            { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', x: 14, y: 74, size: 3 },
            { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', x: 30, y: 80, size: 2 },
            { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', x: 10, y: 88, size: 2 },
        ],
        edges: [[0, 1], [0, 2]],
    },
    {
        id: 'tools', label: 'TOOLS & PLATFORMS', color: '#eab308', labelX: 54, labelY: 66,
        skills: [
            { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', x: 62, y: 74, size: 3 },
            { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true, x: 78, y: 70, size: 2 },
            { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', x: 56, y: 86, size: 2 },
            { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', x: 72, y: 86, size: 2 },
            { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', x: 90, y: 80, size: 2 },
        ],
        edges: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4]],
    },
];

/* Star dot size by importance level */
const DOT_SIZE = { 1: 32, 2: 40, 3: 50 };
const GLOW_SIZE = { 1: 10, 2: 14, 3: 18 };

/* ── Hoverable / clickable star node ── */
const StarNode = ({ skill, color, delay }) => {
    const [hovered, setHovered] = useState(false);
    const [pinned, setPinned] = useState(false);
    const dotPx = DOT_SIZE[skill.size];
    const glowPx = GLOW_SIZE[skill.size];
    const showCard = hovered || pinned;

    return (
        <motion.div
            style={{ position: 'absolute', left: `${skill.x}%`, top: `${skill.y}%`, zIndex: showCard ? 40 : 10 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4, type: 'spring' }}
        >
            {/* Always-visible name label — sits just below the icon bottom */}
            <div style={{
                position: 'absolute',
                top: dotPx / 2 + 2,
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                fontSize: 9,
                fontFamily: 'monospace',
                color,
                opacity: 1,
                letterSpacing: '0.05em',
                fontWeight: 500,
                pointerEvents: 'none',
                transition: 'opacity 0.25s',
            }}>
                {skill.name}
            </div>

            {/* Outer solid ring around the icon instead of blur */}
            <motion.div
                style={{
                    position: 'absolute',
                    border: `1px solid ${color}40`,
                    opacity: 0.15,
                    borderRadius: '50%',
                    width: dotPx * 1.8,
                    height: dotPx * 1.8,
                    top: -(dotPx * 0.4),
                    left: -(dotPx * 0.4),
                    pointerEvents: 'none',
                }}
                animate={showCard
                    ? { scale: 1.5, opacity: 0.4 }
                    : { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }
                }
                transition={showCard
                    ? { duration: 0.2 }
                    : { duration: 3, repeat: Infinity, delay }
                }
            />

            {/* Icon node */}
            <motion.div
                style={{
                    position: 'relative',
                    width: dotPx,
                    height: dotPx,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    translate: `-${dotPx / 2}px -${dotPx / 2}px`,
                    background: 'rgba(8, 12, 24, 0.98)',
                    border: `2px solid ${color}`,
                    boxShadow: `0 0 ${dotPx * 0.5}px ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                    outline: pinned ? `2px solid ${color}` : 'none',
                    outlineOffset: 3,
                }}
                animate={showCard ? { scale: 1.25, boxShadow: `0 0 ${dotPx * 1.2}px ${color}80` } : { scale: [1, 1.05, 1] }}
                transition={showCard ? { duration: 0.15 } : { duration: 2.2, repeat: Infinity, delay }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setPinned(p => !p)}
            >
                <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{
                        width: dotPx * 0.62,
                        height: dotPx * 0.62,
                        objectFit: 'contain',
                        filter: skill.invert ? 'brightness(0) invert(1)' : 'none',
                        pointerEvents: 'none',
                    }}
                />
            </motion.div>


            {/* Pinned ring indicator */}
            {pinned && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{
                        position: 'absolute',
                        width: dotPx * 2.5,
                        height: dotPx * 2.5,
                        borderRadius: '50%',
                        border: `1.5px solid ${color}`,
                        top: -(dotPx * 0.75),
                        left: -(dotPx * 0.75),
                        pointerEvents: 'none',
                    }}
                />
            )}

            {/* Popup card (hover OR pinned) */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                            position: 'absolute',
                            bottom: dotPx + 16,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 50,
                            minWidth: 100,
                            pointerEvents: 'none',
                        }}
                    >
                        <div style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                            padding: '12px 16px',
                            background: 'rgba(10,15,30,0.97)',
                            border: `1px solid ${color}60`,
                            borderRadius: 16,
                            backdropFilter: 'blur(18px)',
                            boxShadow: `0 0 28px ${color}35, 0 12px 40px rgba(0,0,0,0.6)`,
                        }}>
                            <img src={skill.icon} alt={skill.name} width={36} height={36}
                                style={{ objectFit: 'contain', filter: skill.invert ? 'brightness(0) invert(1)' : 'none' }} />
                            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>{skill.name}</span>
                            {/* Category color bar */}
                            <div style={{ width: '100%', height: 2, borderRadius: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
                            {pinned && (
                                <span style={{ fontSize: 9, color: color, fontFamily: 'monospace', opacity: 0.8 }}>📌 pinned · click to unpin</span>
                            )}
                        </div>
                        {/* Arrow */}
                        <div style={{
                            width: 0, height: 0,
                            borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
                            borderTop: `8px solid ${color}60`,
                            margin: '0 auto',
                        }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/* ── Shooting star arc ── */
const ShootingStar = ({ x1, y1, angle, delay }) => (
    <motion.div
        style={{
            position: 'absolute', left: `${x1}%`, top: `${y1}%`,
            width: 70, height: 2, borderRadius: 4,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.3), transparent)',
            transformOrigin: 'left center',
            transform: `rotate(${angle}deg)`,
            pointerEvents: 'none', zIndex: 9,
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 1, 0.8, 0], scaleX: [0, 1, 0.4, 0], x: [0, 90], y: [0, 45] }}
        transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 7 + delay, delay, ease: 'easeOut' }}
    />
);

/* ── Radar sweep ── */
const RadarSweep = () => (
    <motion.div
        style={{
            position: 'absolute',
            left: '42%', top: '38%',
            width: 380, height: 380,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 3,
            overflow: 'hidden',
            opacity: 0.18,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
    >
        <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(34,211,238,0.5) 20deg, rgba(34,211,238,0.05) 60deg, transparent 90deg)',
        }} />
    </motion.div>
);

/* ── Main constellation component ── */
const SkillConstellation = () => {
    const containerRef = useRef(null);
    const tiltRef = useRef(null);
    /* animated dash offset for marching-ants effect */
    const [dashOffset, setDashOffset] = useState(0);

    useEffect(() => {
        let frame;
        let val = 0;
        const tick = () => {
            val = (val - 0.4) % 16; // 16 = dasharray + dashgap (4+4 repeated)
            setDashOffset(val);
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, []);

    const handleMouseMove = useCallback((e) => {
        const el = containerRef.current;
        if (!el || !tiltRef.current) return;
        const rect = el.getBoundingClientRect();
        const rotX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
        const rotY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
        tiltRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (tiltRef.current)
            tiltRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full select-none"
            style={{ height: 700 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Radar sweep behind everything */}
            <RadarSweep />

            {/* Star chart edge markers */}
            <div className="absolute inset-0 pointer-events-none z-1" style={{ opacity: 0.12 }}>
                {['5%', '25%', '50%', '75%', '95%'].map(pos => (
                    <React.Fragment key={pos}>
                        {/* Horizontal tick */}
                        <div style={{ position: 'absolute', top: pos, left: 0, width: 6, height: 1, background: '#22d3ee' }} />
                        <div style={{ position: 'absolute', top: pos, right: 0, width: 6, height: 1, background: '#22d3ee' }} />
                        {/* Vertical tick */}
                        <div style={{ position: 'absolute', left: pos, top: 0, width: 1, height: 6, background: '#22d3ee' }} />
                        <div style={{ position: 'absolute', left: pos, bottom: 0, width: 1, height: 6, background: '#22d3ee' }} />
                    </React.Fragment>
                ))}
                {/* Corner marks */}
                {[['0%', '0%'], ['100%', '0%'], ['0%', '100%'], ['100%', '100%']].map(([l, t], i) => (
                    <div key={i} style={{
                        position: 'absolute', left: l, top: t, width: 12, height: 12,
                        borderTop: l === '0%' ? '1px solid #22d3ee' : 'none',
                        borderBottom: l !== '0%' || t !== '0%' ? '1px solid #22d3ee' : 'none',
                        borderLeft: l === '0%' ? '1px solid #22d3ee' : 'none',
                        borderRight: l !== '0%' ? '1px solid #22d3ee' : 'none',
                    }} />
                ))}
            </div>

            {/* Tilt wrapper */}
            <div
                ref={tiltRef}
                className="relative w-full h-full"
                style={{ transition: 'transform 0.12s ease', transformStyle: 'preserve-3d' }}
            >
                {/* Shooting stars */}
                <ShootingStar x1={5} y1={10} angle={25} delay={0} />
                <ShootingStar x1={60} y1={5} angle={30} delay={3.5} />
                <ShootingStar x1={80} y1={50} angle={20} delay={7} />
                <ShootingStar x1={20} y1={70} angle={15} delay={11} />

                {/* SVG constellation lines with marching-ant animation */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ zIndex: 5 }}>
                    <defs>
                        {constellations.map(c => (
                            <linearGradient key={c.id} id={`grad-${c.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={c.color} stopOpacity="0.7" />
                                <stop offset="100%" stopColor={c.color} stopOpacity="0.2" />
                            </linearGradient>
                        ))}
                        {/* Sharpened lines, removed filter to avoid blur conflict */}
                    </defs>

                    {constellations.map(c =>
                        c.edges.map(([a, b], i) => {
                            const sA = c.skills[a], sB = c.skills[b];
                            return (
                                <motion.line
                                    key={`${c.id}-${i}`}
                                    x1={`${sA.x}%`} y1={`${sA.y}%`}
                                    x2={`${sB.x}%`} y2={`${sB.y}%`}
                                    stroke={`url(#grad-${c.id})`}
                                    strokeWidth="2.5"
                                    strokeDasharray="6 5"
                                    strokeDashoffset={dashOffset}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 0.8 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                                />
                            );
                        })
                    )}
                </svg>

                {/* Constellation labels */}
                {constellations.map(c => (
                    <motion.div key={c.id}
                        className="absolute pointer-events-none"
                        style={{
                            left: `${c.labelX}%`, top: `${c.labelY}%`,
                            color: c.color, zIndex: 8,
                            fontSize: 10, fontFamily: 'monospace',
                            letterSpacing: '0.15em', fontWeight: 600,
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.65 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 }}
                    >
                        ✦ {c.label}
                    </motion.div>
                ))}

                {/* Star nodes */}
                {constellations.map((c, ci) =>
                    c.skills.map((skill, si) => (
                        <StarNode
                            key={`${c.id}-${si}`}
                            skill={skill}
                            color={c.color}
                            delay={0.4 + ci * 0.15 + si * 0.08}
                        />
                    ))
                )}

                {/* Pulsing nebula glows */}
                {[
                    { l: '8%', t: '8%', c: '#22d3ee', w: 200 },
                    { l: '58%', t: '6%', c: '#f97316', w: 200 },
                    { l: '34%', t: '38%', c: '#34d399', w: 180 },
                    { l: '4%', t: '66%', c: '#a855f7', w: 180 },
                    { l: '54%', t: '64%', c: '#eab308', w: 200 },
                ].map((n, i) => (
                    <motion.div key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: n.l, top: n.t, width: n.w, height: n.w,
                            background: `radial-gradient(circle, ${n.c}15 0%, transparent 70%)`,
                            zIndex: 2,
                        }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
                        transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
                    />
                ))}
            </div>

            {/* Legend + instructions */}
            <div className="absolute bottom-2 left-0 right-0 flex items-end justify-between px-4 z-20 pointer-events-none">
                <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#475569', letterSpacing: '0.05em' }}>
                    Click a star to pin · Move mouse to tilt
                </span>
                <div className="flex flex-wrap justify-end gap-x-4 gap-y-1">
                    {constellations.map(c => (
                        <div key={c.id} className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
                            <span style={{ fontSize: 9, fontFamily: 'monospace', color: c.color, opacity: 0.7 }}>{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillConstellation;
