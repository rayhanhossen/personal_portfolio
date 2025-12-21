import React from 'react';
import { personalInfo } from '../data/content';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    // 🚨 UPDATED: Added 'rounded-2xl', 'mb-8', and changed 'border-t' to 'border'
    <footer className="relative mt-20 mb-8 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md overflow-hidden">
      
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
                        Full Stack Engineer
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
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 hover:border-accent/30 transition-colors">
                <span className="text-text-muted font-mono tracking-wider uppercase">
                    Designed & Built with
                </span>
                <i className="fas fa-heart text-accent text-xs animate-pulse"></i>
            </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Icons
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
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-text-muted 
                   hover:bg-accent hover:text-bg hover:border-accent hover:shadow-neon hover:-translate-y-1 
                   transition-all duration-300 group"
        aria-label={label}
    >
        <i className={`${icon} text-lg group-hover:scale-110 transition-transform`}></i>
    </a>
);

export default Footer;