import React from 'react';
import { motion } from 'framer-motion';

/* ── Skill data split into 3 rows for the marquee ── */
const row1 = [
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
];

const row2 = [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', invert: true },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
];

const row3 = [
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
    { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

/* ── Single skill pill card ── */
const SkillCard = ({ skill }) => (
    <div className="skill-pill group">
        <div className="skill-pill-inner">
            <img
                src={skill.icon}
                alt={skill.name}
                className={`w-7 h-7 object-contain shrink-0 ${skill.invert ? 'brightness-0 invert' : ''}`}
            />
            <span className="text-sm font-medium text-teal-300 group-hover:text-white transition-colors whitespace-nowrap">
                {skill.name}
            </span>
        </div>
    </div>
);

/* ── Infinite marquee row ── */
const MarqueeRow = ({ skills, reverse = false, speed = 30 }) => {
    // Duplicate 4x for a fully seamless loop
    const items = [...skills, ...skills, ...skills, ...skills];
    return (
        <div className="overflow-hidden whitespace-nowrap" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div
                className="inline-flex gap-4"
                style={{
                    animation: `marquee-${reverse ? 'right' : 'left'} ${speed}s linear infinite`,
                }}
            >
                {items.map((skill, i) => (
                    <SkillCard key={`${skill.name}-${i}`} skill={skill} />
                ))}
            </div>
        </div>
    );
};

/* ── Exported marquee board ── */
const SkillMarquee = () => (
    /* 3D perspective tilt gives the "conveyor belt coming at you" feel */
    <div
        className="relative w-full"
        style={{
            perspective: '900px',
        }}
    >
        {/* Tilt the board */}
        <motion.div
            initial={{ opacity: 0, rotateX: 30 }}
            whileInView={{ opacity: 1, rotateX: 18 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top' }}
            className="flex flex-col gap-5 py-6"
        >
            <MarqueeRow skills={row1} reverse={false} speed={28} />
            <MarqueeRow skills={row2} reverse={true} speed={22} />
            <MarqueeRow skills={row3} reverse={false} speed={32} />
        </motion.div>

        {/* Bottom fade so it blends into section bg */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0f172a] to-transparent pointer-events-none" />
    </div>
);

export default SkillMarquee;
