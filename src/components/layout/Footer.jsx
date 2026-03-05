import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative overflow-hidden pt-8 pb-4" style={{ background: '#03080c' }}>
            {/* Top glowing line */}
            <div className="absolute top-0 left-0 w-full h-px opacity-20" style={{ background: 'linear-gradient(90deg, transparent, #14b8a6, #6366f1, transparent)' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
                {/* Subtle refined message */}
                <h2 className="text-lg md:text-xl font-light text-slate-400 mb-4 tracking-wide text-center">
                    Let's build something <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">extraordinary</span>.
                </h2>

                <div className="flex justify-center gap-5 mb-4">
                    {[
                        { icon: <Github size={22} />, href: 'https://github.com/paraspathania', color: '#a855f7' },
                        { icon: <Linkedin size={22} />, href: 'https://www.linkedin.com/in/paras-pathania', color: '#6366f1' },
                        { icon: <Mail size={22} />, href: 'mailto:paraspathania705@gmail.com', color: '#14b8a6' },
                    ].map((item, i) => (
                        <a
                            key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                            className="p-2.5 rounded-full transition-all group"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                            onMouseEnter={e => { e.currentTarget.style.background = `${item.color}15`; e.currentTarget.style.borderColor = `${item.color}40`; e.currentTarget.style.color = item.color; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#94a3b8'; }}
                        >
                            <span className="text-slate-400 group-hover:scale-110 transition-transform block">
                                {item.icon}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="w-full max-w-md h-px mb-4 opacity-10" style={{ background: 'linear-gradient(90deg, transparent, #fff, transparent)' }} />

                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl gap-4 text-sm text-slate-500 font-medium">
                    <p className="flex items-center gap-1.5 transition-colors hover:text-slate-300">
                        Designed & Built by Paras Pathania
                    </p>
                    <p className="text-[11px] font-mono tracking-widest uppercase opacity-60">
                        © {new Date().getFullYear()} All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
