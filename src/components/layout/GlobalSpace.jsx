import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from '../ui/HeroCanvas';

const GlobalSpace = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#03080c]">
            <HeroCanvas />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)' }}
                />
                <motion.div
                    animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                    className="absolute top-[30%] -right-20 w-[600px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)' }}
                />
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, 50, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                    className="absolute bottom-[-10%] left-1/3 w-[700px] h-[700px] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)' }}
                />
            </div>

            {/* Global scanline overlay for texture */}
            <div className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay opacity-30" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)'
            }} />
        </div>
    );
};

export default GlobalSpace;
