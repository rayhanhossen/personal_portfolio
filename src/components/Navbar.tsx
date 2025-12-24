import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { personalInfo } from '../data/content';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock Body Scroll when Mobile Menu is open
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
            {/* --- HEADER WRAPPER --- */}
            <header
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b
                ${scrolled
                        ? 'bg-[#020617]/80 backdrop-blur-xl border-white/5 py-4 shadow-lg'
                        : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="max-w-5xl mx-auto px-4 md:px-0 flex justify-between items-center">

                    {/* --- LOGO --- */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 group select-none"
                        onClick={() => setIsOpen(false)}
                    >
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                            <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <i className="fas fa-terminal text-accent text-base relative z-10"></i>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-bold text-xl uppercase md:text-2xl tracking-tight text-white leading-none group-hover:text-accent transition-colors">
                                {personalInfo.name}
                            </span>
                        </div>
                    </Link>

                    {/* --- DESKTOP NAV --- */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative text-base font-medium tracking-wide transition-all duration-300 py-1
                                    ${isActive
                                        ? 'text-accent'
                                        : 'text-text-muted hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent transition-all duration-300 
                                            ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}

                        {/* --- CONTACT BUTTON (Desktop) --- */}
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => `
                                group ml-4 px-6 py-2.5 rounded-full border text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2 overflow-hidden
                                ${isActive
                                    ? 'bg-accent text-bg border-accent shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-accent/50'
                                }
                            `}
                        >
                            <span>Contact</span>
                            {/* Animated Icon Container */}
                            <div className="relative w-2 h-3 flex items-center justify-center">
                                {/* Chevron (>): Visible by default, slides out right on hover */}
                                <i className="fas fa-chevron-right text-[10px] absolute transition-all duration-300 transform group-hover:translate-x-full group-hover:opacity-0"></i>

                                {/* Arrow (->): Hidden left by default, slides in to center on hover */}
                                <i className="fas fa-arrow-right text-[10px] absolute transition-all duration-300 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"></i>
                            </div>
                        </NavLink>
                    </nav>

                    {/* --- MOBILE TOGGLE --- */}
                    <button
                        className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-lg text-white hover:bg-white/5 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl transition-all duration-300 ${isOpen ? 'rotate-90' : ''}`}></i>
                    </button>
                </div>
            </header>

            {/* --- MOBILE MENU OVERLAY --- */}
            <div
                className={`fixed inset-0 z-[90] bg-[#020617]/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            >
                <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

                <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 gap-8">
                    <nav className="flex flex-col gap-6 w-full max-w-xs text-center">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `text-2xl font-bold tracking-tight transition-colors duration-300 flex items-center justify-center gap-3
                                    ${isActive ? 'text-accent' : 'text-white/40 hover:text-white'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* --- CONTACT BUTTON (Mobile) --- */}
                        <NavLink
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) => `
                                    group mt-6 px-10 py-3
                                    rounded-full border text-base /* <-- Reduced text size for better proportion */
                                    font-medium transition-all flex items-center justify-center gap-3
                                    ${isActive
                                    ? 'bg-accent text-bg border-accent shadow-neon'
                                    : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                                }
                            `}
                        >
                            <span>Contact</span>
                            <div className="relative w-3 h-4 flex items-center justify-center">
                                <i className="fas fa-chevron-right text-sm absolute transition-all duration-300 transform group-hover:translate-x-full group-hover:opacity-0"></i>
                                <i className="fas fa-arrow-right text-sm absolute transition-all duration-300 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"></i>
                            </div>
                        </NavLink>
                    </nav>

                    <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-xs flex justify-center gap-10">
                        <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-white/40 hover:text-accent transition-colors">
                            <i className="fab fa-github text-3xl"></i>
                        </a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-accent transition-colors">
                            <i className="fab fa-linkedin text-3xl"></i>
                        </a>
                        <a href={`mailto:${personalInfo.email}`} className="text-white/40 hover:text-accent transition-colors">
                            <i className="fas fa-envelope text-3xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;