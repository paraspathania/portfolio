import React from 'react';
import { motion } from 'framer-motion';
import SkillConstellation from '../components/ui/SkillConstellation';

const Skills = () => {
    return (
        <section id="skills" className="py-24 overflow-hidden relative" style={{ background: '#050d12' }}>
            {/* Aurora blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ background: 'rgba(20,184,166,0.07)' }} />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ background: 'rgba(99,102,241,0.07)' }} />

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
