import React from 'react';
import { motion } from 'framer-motion';
import SkillConstellation from '../components/ui/SkillConstellation';

const Skills = () => {
    return (
        <section id="skills" className="py-24 overflow-hidden relative">
            {/* Darker radial center to separate skills from the moving 3D background without using blur */}
            <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, rgba(2, 6, 12, 0.7) 0%, rgba(3, 8, 12, 0.3) 40%, transparent 85%)'
            }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        My <span className="text-teal-400">Tech Universe</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        The technologies I use — mapped as constellations.
                    </p>
                    <p className="text-slate-500 text-sm mt-1">✦ Hover a star to identify · Move mouse to tilt the map</p>
                </motion.div>

                <SkillConstellation />
            </div>
        </section>
    );
};

export default Skills;
