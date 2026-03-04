import React from 'react';
import { motion } from 'framer-motion';

const OrbitRing = ({ skills, radius, duration, clockwise }) => {
    return (
        <>
            {/* The Ring Path */}
            <div
                className="absolute rounded-full border border-indigo-900/30"
                style={{ width: `${radius * 2}%`, height: `${radius * 2}%` }}
            ></div>

            {/* The Orbiting Container */}
            <motion.div
                className="absolute w-full h-full pointer-events-none"
                animate={{ rotate: clockwise ? 360 : -360 }}
                transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
            >
                {skills.map((skill, index) => {
                    const angle = (index / skills.length) * 2 * Math.PI;
                    // Position calculations based on % (0 to 100)
                    // Center is 50%, Radius is passed as %
                    // x = 50 + r * cos(a)
                    // y = 50 + r * sin(a)
                    // But we are in a container that rotates. 
                    // Use simpler logic: place at top center of a rotated wrapper? 
                    // No, standard trig placement is better for static distribution inside a rotating parent.

                    const top = 50 - radius * Math.cos(angle); // -cos starts at top (12 o'clock)
                    const left = 50 + radius * Math.sin(angle); // +sin goes clockwise

                    return (
                        <motion.div
                            key={skill.name}
                            className="absolute w-10 h-10 -ml-5 -mt-5 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center shadow-lg hover:border-teal-400 hover:scale-125 transition-all cursor-pointer z-20 pointer-events-auto group"
                            style={{ top: `${top}%`, left: `${left}%` }}
                            // Counter-rotate items so they stay upright
                            animate={{ rotate: clockwise ? -360 : 360 }}
                            transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className={`w-full h-full object-contain ${skill.invert ? 'brightness-0 invert' : ''}`}
                                />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute opacity-0 group-hover:opacity-100 -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded border border-indigo-900 whitespace-nowrap transition-opacity">
                                {skill.name}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </>
    );
};

const SkillOrbit = ({ innerRing, middleRing, outerRing }) => {
    return (
        <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center mx-auto my-12 translate-x-[-5%] overflow-visible">

            {/* Central Star */}
            <div className="absolute z-10 w-20 h-20 rounded-full bg-gradient-to-br from-teal-300 to-red-500 shadow-[0_0_50px_rgba(45,212,191,0.6)] flex items-center justify-center">
                <span className="text-4xl">☀️</span>
            </div>

            {/* Inner Ring */}
            <OrbitRing skills={innerRing} radius={18} duration={25} clockwise={true} />

            {/* Middle Ring */}
            <OrbitRing skills={middleRing} radius={32} duration={35} clockwise={false} />

            {/* Outer Ring */}
            <OrbitRing skills={outerRing} radius={48} duration={45} clockwise={true} />

        </div>
    );
};

export default SkillOrbit;
