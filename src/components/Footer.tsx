import React from 'react';
import { personalInfo } from '../data/content';

const Footer: React.FC = () => {
  return (
    // 🚨 REDESIGNED: Converted to a proper Glass Card with consistent padding and rounding
    <footer className="glass-card mt-0 p-6 md:p-8 border border-white/10 relative overflow-hidden">
      
      {/* Decorative Glow (Optional, adds depth) */}
      <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 relative z-10">
        
        {/* --- LEFT COLUMN: Brand & Info --- */}
        <div className="flex flex-col gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 font-bold text-text-main text-xl">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent">
               <i className="fas fa-code text-sm"></i>
            </span>
            <span>{personalInfo.name}</span>
          </div>

          {/* Role & Email */}
          <div className="flex flex-col gap-1 mt-1">
             <p className="text-text-muted text-sm font-medium">{personalInfo.title}</p>
             <a 
                href={`mailto:${personalInfo.email}`} 
                className="text-text-muted text-sm hover:text-accent transition-colors w-max opacity-80 hover:opacity-100"
             >
                {personalInfo.email}
             </a>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Social Connect --- */}
        <div>
            <h3 className="text-text-main font-semibold text-sm uppercase tracking-wider mb-4 opacity-90">Connect</h3>
            
            <div className="flex gap-3">
                <SocialLink href={personalInfo.linkedin} icon="fab fa-linkedin" label="LinkedIn" />
                <SocialLink href={personalInfo.github} icon="fab fa-github" label="GitHub" />
                <SocialLink href={personalInfo.whatsapp} icon="fab fa-whatsapp" label="WhatsApp" />
                <SocialLink href={personalInfo.facebook} icon="fa-brands fa-facebook" label="Facebook" />
                <SocialLink href={personalInfo.instagram} icon="fa-brands fa-instagram" label="Instagram" />
            </div>
        </div>
      </div>
      
      {/* --- COPYRIGHT --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted pt-6 border-t border-white/10 relative z-10">
        <p>
            &copy; {new Date().getFullYear()} <span className='font-semibold text-text-main'>{personalInfo.name}</span>. All rights reserved.
        </p>
        <p className="opacity-60 hover:opacity-100 transition-opacity">
            Designed & Built with <i className="fas fa-heart text-accent mx-1 text-[10px]"></i>
        </p>
      </div>
    </footer>
  );
};

// Helper Component for Social Icons (Cleaner Code)
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
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-text-muted 
                   hover:bg-accent hover:text-bg hover:border-accent hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:-translate-y-1 
                   transition-all duration-300"
        aria-label={label}
    >
        <i className={`${icon} text-lg`}></i>
    </a>
);

export default Footer;