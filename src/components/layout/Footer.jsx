import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
                    Portfolio
                </h2>

                <div className="flex justify-center gap-6 mb-8">
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <Github size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <Linkedin size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <Mail size={24} />
                    </a>
                </div>

                <p className="text-gray-500 flex items-center justify-center gap-2">
                    Made with <Heart size={16} className="text-red-500 fill-red-500" /> by You © {new Date().getFullYear()}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
