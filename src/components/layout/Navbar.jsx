import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { title: 'Home', href: '#hero' },
        { title: 'About', href: '#about' },
        { title: 'Skills', href: '#skills' },
        { title: 'Projects', href: '#projects' },
        { title: 'Education', href: '#education' },
        { title: 'Certifications', href: '#certifications' },
        { title: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-4 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-0' : 'py-2'}`}>
            <div className="max-w-4xl mx-auto px-4">
                <div className={`relative px-6 py-3.5 flex items-center justify-between transition-all duration-500 ${scrolled ? 'rounded-2xl' : 'rounded-full'}`}
                    style={{
                        background: scrolled ? 'rgba(5, 13, 20, 0.85)' : 'rgba(5, 13, 20, 0.5)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)' : 'none',
                    }}>

                    {/* Logo */}
                    <a href="#" className="relative group">
                        <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 group-hover:from-indigo-400 group-hover:to-teal-400 transition-all duration-500">
                            &lt;P/&gt;
                        </span>
                        <div className="absolute -inset-2 bg-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.title}
                                href={link.href}
                                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-all relative group rounded-full overflow-hidden"
                            >
                                <span className="relative z-10">{link.title}</span>
                                {/* Hover background glow */}
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* Bottom active line */}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-teal-400 to-indigo-400 transition-all duration-300 group-hover:w-1/2 rounded-t-full shadow-[0_-2px_10px_rgba(20,184,166,0.5)]"></span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white p-1"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[80px] left-4 right-4 rounded-2xl p-3 shadow-2xl md:hidden overflow-hidden"
                        style={{
                            background: 'rgba(5, 13, 20, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)'
                        }}
                    >
                        <div className="flex flex-col space-y-1 relative z-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3.5 text-slate-300 hover:text-teal-400 hover:bg-white/5 rounded-xl transition-all font-medium text-center relative group overflow-hidden"
                                >
                                    <span className="relative z-10 tracking-wide">{link.title}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
