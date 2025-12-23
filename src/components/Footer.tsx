import React from 'react';
import { personalInfo } from '../data/content';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 mb-3 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden">
            
            {/* Decorative Top Highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

            <div className="px-6 py-10 md:px-10 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                    {/* --- LEFT: Brand Identity --- */}
                    <div className="flex flex-col gap-4">
                        <Link to="/" className="flex items-center gap-2.5 group w-max">
                            {/* Logo Icon */}
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <i className="fas fa-terminal text-accent text-sm relative z-10"></i>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-bold text-lg text-text-main tracking-tight group-hover:text-white transition-colors">
                                    {personalInfo.name.toUpperCase()}
                                </span>
                                <span className="text-xs text-text-muted font-mono group-hover:text-accent transition-colors">
                                    {personalInfo.title}
                                </span>
                            </div>
                        </Link>

                        <p className="text-text-muted text-sm max-w-xs leading-relaxed">
                            Building scalable, intelligent systems for the modern web.
                        </p>
                    </div>

                    {/* --- RIGHT: Social Grid --- */}
                    <div className="flex flex-col md:items-end gap-4">
                        <span className="text-xs font-mono text-accent/70 uppercase tracking-widest">Connect_With_Me</span>

                        <div className="flex gap-3">
                            <SocialLink href={personalInfo.linkedin} icon="fab fa-linkedin" label="LinkedIn" />
                            <SocialLink href={personalInfo.github} icon="fab fa-github" label="GitHub" />
                            <SocialLink href={personalInfo.whatsapp} icon="fab fa-whatsapp" label="WhatsApp" />
                            <SocialLink href={`mailto:${personalInfo.email}`} icon="fas fa-envelope" label="Email" />
                            <SocialLink href={personalInfo.facebook} icon="fa-brands fa-facebook" label="Facebook" />
                            <SocialLink href={personalInfo.instagram} icon="fa-brands fa-instagram" label="Instagram" />
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 mt-10 pt-6 border-t border-white/5 text-xs text-text-muted font-mono">

                    {/* Copyright */}
                    <p>
                        © {currentYear} <span className="text-gray-300 font-semibold">{personalInfo.name}</span>. All rights reserved.
                    </p>

                    {/* Designed Badge */}
                    <div className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase">
                        <span className="text-accent/50 font-bold mr-2">[</span>
                        <span className="text-text-muted">Designed & Engineered with</span>
                        <span className="mx-2 flex items-center justify-center">
                            <i className="fas fa-heart text-accent animate-pulse scale-90"></i>
                        </span>
                        <span className="text-accent/50 font-bold ml-2">]</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// --- Helper Components ---

interface SocialLinkProps {
    href: string;
    icon: string;
    label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-accent/10 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1"
        aria-label={label}
    >
        {/* Icon */}
        <i className={`${icon} text-lg text-gray-400 group-hover:text-accent transition-colors duration-300`}></i>

        {/* Tooltip Container */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out whitespace-nowrap z-50 shadow-xl">
            
            {/* Tooltip Text */}
            <span className="text-[10px] font-mono tracking-wider text-accent uppercase">
                {label}
            </span>
            
            {/* Tiny Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/90 border-r border-b border-white/10 rotate-45 transform"></div>
        </div>
    </a>
);

export default Footer;