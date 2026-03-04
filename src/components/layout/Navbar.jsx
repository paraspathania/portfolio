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
        { title: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-0' : 'py-2'}`}>
            <div className="max-w-4xl mx-auto px-4">
                <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full px-6 py-3 shadow-lg flex items-center justify-between transition-all ${scrolled ? 'bg-slate-900/90' : ''}`}>

                    {/* Logo */}
                    <a href="#" className="text-xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                        &lt;P/&gt;
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.title}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors relative group"
                            >
                                {link.title}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
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
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 left-4 right-4 bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-700 md:hidden"
                    >
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors font-medium text-center"
                                >
                                    {link.title}
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
