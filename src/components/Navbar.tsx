import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { personalInfo } from '../data/content';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // 1. Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Lock Body Scroll when Mobile Menu is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
    ];

    return (
        <>
            {/* --- MAIN NAVBAR CONTAINER --- */}
            {/* Reduced outer vertical padding (py-2) */}
            <header 
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex justify-center px-4 md:px-6
                ${scrolled ? 'py-2' : 'py-3'}`} 
            >
                <div 
                    className={`
                        w-full max-w-5xl flex justify-between items-center 
                        px-3 py-1.5 md:px-4 md:py-2  /* <-- REDUCED PADDING HERE */
                        bg-glass-overlay/80 backdrop-blur-xl 
                        border border-white/10 rounded-xl /* Reduced rounding slightly for compact look */
                        transition-all duration-300
                        ${scrolled ? 'shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-white/5' : 'shadow-xl'}
                    `}
                >
                    {/* --- LOGO --- */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group select-none"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Logo Icon: Reduced to w-8 h-8 */}
                        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <i className="fas fa-terminal text-accent text-xs relative z-10"></i>
                        </div>
                        
                        {/* Logo Text: Reduced size */}
                        <span className="font-bold text-base md:text-lg tracking-tight text-text-main group-hover:text-white transition-colors">
                            {personalInfo.name.toUpperCase()}
                        </span>
                    </Link>

                    {/* --- DESKTOP NAVIGATION (Pill Style) --- */}
                    <nav className="hidden md:flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative px-4 py-1.5 rounded-md text-xs md:text-sm font-medium transition-all duration-300
                                    ${isActive 
                                        ? 'text-accent bg-white/10 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)] border border-white/5' 
                                        : 'text-text-muted hover:text-white hover:bg-white/5 border border-transparent'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* --- MOBILE TOGGLE BUTTON --- */}
                    {/* Adjusted size to match new height */}
                    <button 
                        className="md:hidden relative w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-accent hover:bg-white/5 transition-colors border border-transparent hover:border-white/10" 
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-base transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}></i>
                    </button>
                </div>
            </header>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div 
                className={`fixed inset-0 z-[90] bg-bg/60 backdrop-blur-xl transition-opacity duration-300 md:hidden
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            >
                <div 
                    className={`absolute top-0 left-0 w-full bg-[#020617] border-b border-white/10 shadow-2xl transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="pt-20 pb-8 px-6 flex flex-col gap-3"> {/* Adjusted top padding since header is smaller */}
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300
                                    ${isActive
                                        ? 'bg-accent/10 border-accent/30 text-accent shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                                        : 'bg-white/5 border-white/5 text-text-muted hover:bg-white/10 hover:border-white/10 hover:text-white'
                                    }`
                                }
                            >
                                <span className="text-base font-medium tracking-wide flex items-center gap-3">
                                    <i className={`fas fa-${link.name === 'Home' ? 'home' : link.name === 'Projects' ? 'code-branch' : link.name === 'Contact' ? 'envelope' : 'user'} w-5 text-center opacity-70`}></i>
                                    {link.name}
                                </span>
                                <i className="fas fa-chevron-right text-xs opacity-50 group-hover:translate-x-1 transition-transform"></i>
                            </NavLink>
                        ))}
                        
                        <div className="mt-4 pt-6 border-t border-white/5 flex justify-center gap-6">
                            <a href={personalInfo.github} target="_blank" className="text-text-muted hover:text-accent transition-colors"><i className="fab fa-github text-lg"></i></a>
                            <a href={personalInfo.linkedin} target="_blank" className="text-text-muted hover:text-accent transition-colors"><i className="fab fa-linkedin text-lg"></i></a>
                            <a href={`mailto:${personalInfo.email}`} className="text-text-muted hover:text-accent transition-colors"><i className="fas fa-envelope text-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;