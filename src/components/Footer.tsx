import React from 'react';
import { personalInfo } from '../data/content';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 mb-8 border-t border-white/5 pt-12 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-4 mb-10">

                {/* --- LEFT: Brand Identity --- */}
                <div className="flex flex-col items-center md:items-start gap-4 flex-1">
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

                    <p className="text-slate-400 font-light text-sm max-w-xs leading-relaxed text-center md:text-left mt-1">
                        Building scalable, intelligent systems for the modern web.
                    </p>
                </div>

                {/* --- Separator (mobile only) --- */}
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent md:hidden"></div>

                {/* --- RIGHT: Social Icons --- */}
                <div className="grid grid-cols-3 gap-3 md:flex md:flex-wrap md:justify-end md:gap-4 flex-1">
                    <SocialLink href={personalInfo.linkedin} icon="fab fa-linkedin" label="LinkedIn" />
                    <SocialLink href={personalInfo.github} icon="fab fa-github" label="GitHub" />
                    <SocialLink href={personalInfo.whatsapp} icon="fab fa-whatsapp" label="WhatsApp" />
                    <SocialLink href={`mailto:${personalInfo.email}`} icon="fas fa-envelope" label="Email" />
                    <SocialLink href={personalInfo.facebook} icon="fa-brands fa-facebook" label="Facebook" />
                    <SocialLink href={personalInfo.instagram} icon="fa-brands fa-instagram" label="Instagram" />
                </div>
            </div>

            {/* --- BOTTOM BAR --- */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 pt-6 border-t border-white/5 text-xs text-slate-500 font-mono tracking-wide">
                {/* Copyright */}
                <p>
                    &copy; {currentYear} <strong className="text-slate-300 font-semibold">{personalInfo.name}</strong>. All rights reserved.
                </p>

                {/* Designed Badge */}
                <div className="flex items-center uppercase text-[10px] tracking-widest font-semibold mt-1 md:mt-0">
                    <span>Designed with</span>
                    <i className="fas fa-heart text-accent/80 animate-pulse mx-1.5"></i>
                    <span>by {personalInfo.name}</span>
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
        className="group relative flex items-center justify-center 
                   w-12 h-12 rounded-full
                   glass-card !p-0 bg-glass-overlay border-white/10
                   hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:-translate-y-1 hover:border-accent/30
                   transition-all duration-300"
        aria-label={label}
    >
        {/* Icon */}
        <i className={`${icon} text-lg text-slate-400 group-hover:text-accent group-hover:scale-110 transition-all duration-300`}></i>

        {/* Tooltip — hidden on touch/mobile devices */}
        <div className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 
                       bg-slate-900 border border-white/10 rounded-md 
                       opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                       translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out 
                       whitespace-nowrap z-50 shadow-xl pointer-events-none">
            <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase">
                {label}
            </span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 
                          bg-slate-900 border-r border-b border-white/10 rotate-45 transform"></div>
        </div>
    </a>
);

export default Footer;