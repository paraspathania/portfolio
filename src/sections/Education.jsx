import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

const educationData = [
    {
        id: 1,
        institution: 'Lovely Professional University',
        degree: 'Bachelor of Technology',
        field: 'Computer Science and Engineering',
        location: 'Phagwara, Punjab',
        period: "Aug '24 – Present",
        score: '',
        icon: '🎓',
        color: '#14b8a6', // teal
    },
    {
        id: 2,
        institution: 'Lovely Professional University',
        degree: 'Diploma',
        field: 'Computer Science and Engineering',
        location: 'Kapurthala, Punjab',
        period: "Aug '22 – Jul '24",
        score: '',
        icon: '💻', // maybe a different icon for diploma
        color: '#6366f1', // indigo
    },
    {
        id: 3,
        institution: 'Anand Public Sr. Sec. School',
        degree: 'Intermediate',
        field: '', // General
        location: 'Kapurthala, Punjab',
        period: "Apr '21 – Mar '22",
        score: '',
        icon: '🏫',
        color: '#8b5cf6', // violet
    }
];

const EducationCard = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative pl-8 md:pl-0 w-full group/timeline"
        >
            {/* ── Timeline Center Node (Desktop) ── */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 w-14 h-14 rounded-full items-center justify-center z-20 transition-all duration-500 group-hover/timeline:scale-110"
                style={{
                    background: 'rgba(5, 13, 20, 0.95)',
                    border: `2px solid ${item.color}`,
                    boxShadow: `0 0 25px ${item.color}50, inset 0 0 10px ${item.color}30`,
                    backdropFilter: 'blur(10px)',
                }}
            >
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{item.icon}</span>
            </div>

            {/* ── Timeline Node (Mobile) ── */}
            <div className="md:hidden absolute left-0 top-6 w-8 h-8 rounded-full flex items-center justify-center z-20 transition-all duration-300 group-hover/timeline:scale-125"
                style={{
                    background: 'rgba(5, 13, 20, 0.95)',
                    border: `2px solid ${item.color}`,
                    boxShadow: `0 0 20px ${item.color}60`,
                }}
            >
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
            </div>

            {/* ── The Card ── */}
            <div className={`md:w-[45%] ${index % 2 === 0 ? 'md:ml-auto md:pl-14' : 'md:mr-auto md:pr-14'} mb-14 relative group`}>

                {/* Horizontal connector line (Desktop) */}
                <div className={`hidden md:block absolute top-[2.75rem] h-[2px] w-14 ${index % 2 === 0 ? '-left-14' : '-right-14'} opacity-50 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{ background: `linear-gradient(${index % 2 === 0 ? '90deg' : '270deg'}, ${item.color}, transparent)` }}
                />

                <div className="rounded-3xl p-8 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                    style={{
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(5, 13, 20, 0.8) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(16px)',
                    }}
                >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        style={{ background: `radial-gradient(circle at top ${index % 2 === 0 ? 'right' : 'left'}, ${item.color}15 0%, transparent 80%)` }} />

                    {/* Glowing animated border lines */}
                    <div className="absolute top-0 left-0 w-full h-[2px] opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, ${index % 2 === 0 ? 'transparent' : item.color}, ${index % 2 === 0 ? item.color : 'transparent'})` }} />
                    <div className="absolute bottom-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{ background: `linear-gradient(90deg, ${index % 2 === 0 ? item.color : 'transparent'}, ${index % 2 === 0 ? 'transparent' : item.color})` }} />


                    {/* Content */}
                    <div className="relative z-10 flex flex-col gap-5">

                        {/* Header: Degree & Period */}
                        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 border-b border-slate-700/50 pb-5">
                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight leading-tight group-hover:to-white transition-colors">
                                {item.degree}
                            </h3>
                            <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-300 bg-slate-800/80 px-4 py-2 rounded-full w-fit border border-slate-700 shadow-inner whitespace-nowrap"
                                style={{ boxShadow: `inset 0 0 10px ${item.color}10` }}>
                                <Calendar size={14} style={{ color: item.color }} />
                                {item.period}
                            </div>
                        </div>

                        {/* Middle: Institution & Field */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
                                    <GraduationCap size={20} style={{ color: item.color }} className="drop-shadow-lg" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-100 tracking-wide">{item.institution}</h4>
                            </div>

                            {item.field && (
                                <p className="text-base text-slate-300 pl-4 border-l-2 ml-4 py-1" style={{ borderColor: `${item.color}50` }}>
                                    {item.field}
                                </p>
                            )}
                        </div>

                        {/* Footer: Location & Score */}
                        <div className="flex flex-wrap items-center gap-4 pt-4 mt-2 border-t border-slate-800/30">
                            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800">
                                <MapPin size={16} className="text-rose-400" />
                                {item.location}
                            </div>

                            {item.score && (
                                <div className="flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-lg border shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-all group-hover:scale-105"
                                    style={{ color: item.color, background: `${item.color}15`, borderColor: `${item.color}40`, textShadow: `0 0 10px ${item.color}50` }}>
                                    <Award size={16} />
                                    {item.score}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Education = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="education" className="py-24 relative overflow-hidden">

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={containerRef}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 w-fit"
                        style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#818cf8' }}></span>
                        <span className="text-xs font-mono tracking-widest">ACADEMICS</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Education</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-light">
                        My academic background and qualifications.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Vertical Line Background */}
                    <div className="absolute left-[16px] md:left-1/2 top-4 bottom-4 w-px bg-slate-800/80 -translate-x-1/2" />

                    {/* Animated Vertical Line Progress */}
                    <motion.div
                        className="absolute left-[16px] md:left-1/2 top-4 w-0.5 -translate-x-1/2 rounded-full glow-shadow"
                        style={{
                            height: lineHeight,
                            background: 'linear-gradient(to bottom, #14b8a6, #6366f1, #8b5cf6)',
                            boxShadow: '0 0 10px rgba(99,102,241,0.5)'
                        }}
                    />

                    {/* Timeline Items */}
                    <div className="flex flex-col relative z-10 pt-8 pb-8">
                        {educationData.map((item, index) => (
                            <EducationCard key={item.id} item={item} index={index} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Education;
