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

    const navLinksMobile = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
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
                    {/* --- THE "QUANTUM" NAV BAR --- */}
                    <nav className="hidden md:flex items-center gap-10">
                        {/* Navigation Links (with your requested Mini Line) */}
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative text-base uppercase tracking-widest font-medium transition-all duration-300 pt-2 pb-[2px]
                                    ${isActive ? 'text-white' : 'text-text-muted hover:text-white/80'}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        {/* The Mini Line */}
                                        <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 
                                        h-[2.5px] w-5 rounded-full bg-accent shadow-[0_0_10px_var(--accent-color)]
                                        transition-all duration-300 ease-out
                                        ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}

                        <Link
                            to="/contact"
                            className="btn-primary ml-6 hidden md:inline-flex"
                        >
                            <span>Contact</span>
                            <i className="fas fa-paper-plane text-xs transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                        </Link>
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
                className={`fixed inset-0 z-[90] bg-glass-overlay/90 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col
                    ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            >
                {/* Animated background element for extra depth */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[30%] bg-accent/10 blur-[120px] rounded-full animate-pulse" />

                <div className="relative z-10 flex flex-col justify-center items-center h-full px-8">
                    <nav className="flex flex-col gap-4 w-full max-w-sm">
                        {navLinksMobile.map((link, index) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                // Delay each link slightly for a staggered "reveal" effect
                                style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
                                className={({ isActive }) =>
                                    `text-2xl font-black uppercase tracking-tighter transition-all duration-500 flex items-center justify-between group
                                    ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                                    ${isActive ? 'text-accent' : 'text-white/20 hover:text-white'}`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{link.name}</span>
                                        {/* A mini line that grows on active/hover */}
                                        <div className={`h-[2px] bg-accent transition-all duration-500 
                                        ${isActive ? 'w-12' : 'w-0 group-hover:w-8'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* --- SOCIALS --- */}
                    <div className={`mt-16 pt-8 border-t border-white/10 w-full max-w-sm flex justify-around transition-all duration-700 delay-300
                        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <a href={personalInfo.github} className="p-4 rounded-full glass-card hover:bg-white/10 text-white hover:text-accent transition-all group">
                            <i className="fab fa-github text-2xl group-hover:scale-110 transition-transform"></i>
                        </a>
                        <a href={personalInfo.linkedin} className="p-4 rounded-full glass-card hover:bg-white/10 text-white hover:text-accent transition-all group">
                            <i className="fab fa-linkedin text-2xl group-hover:scale-110 transition-transform"></i>
                        </a>
                        <a href={`mailto:${personalInfo.email}`} className="p-4 rounded-full glass-card hover:bg-white/10 text-white hover:text-accent transition-all group">
                            <i className="fas fa-envelope text-2xl group-hover:scale-110 transition-transform"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;