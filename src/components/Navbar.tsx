import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { personalInfo } from '../data/content';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
    ];

    return (
        <header className="py-4 md:py-[16px]">
            <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-3 glass-card mx-auto">

                <Link
                    to="/"
                    className="flex items-center gap-2 font-bold text-text-main text-xl md:text-2xl select-none cursor-pointer hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)} // Close mobile menu if open
                >
                    {/* Simplified, modern logo text */}
                    <span className='text-accent'>{personalInfo.name.toUpperCase()}</span>
                </Link>

                {/* 💻 Desktop Nav */}
                <nav className="hidden md:flex gap-6 font-medium text-text-muted">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative transition-colors py-1 hover:text-text-main 
                                ${isActive ? 'text-text-main font-semibold' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {/* 1. NavLink Text */}
                                    <span>{link.name}</span>

                                    {/* 2. Custom Underline for Active State */}
                                    {isActive && (
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform transition-transform duration-300 scale-x-100 shadow-[0_0_8px_#22d3ee]"
                                        ></span>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden text-2xl text-text-main hover:text-accent transition-colors" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>


            {/* 📱 Mobile Menu (Fixed Glass Panel) */}
            {isOpen && (
                <div
                    // 🚨 UPDATED: Mobile Menu fixed panel
                    className="fixed inset-0 z-[60] p-6 flex flex-col gap-6 md:hidden glass-card bg-bg/95"
                    style={{ backdropFilter: 'blur(30px)' }}
                >
                    <div className='flex justify-between items-center'>
                        {/* Mobile Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-bold text-text-main text-2xl"
                        >
                            <span className='text-accent'>{personalInfo.name.toUpperCase()}</span>
                        </Link>

                        {/* Close Button */}
                        <button className="text-3xl text-text-muted hover:text-red-500 transition-colors" onClick={() => setIsOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `text-xl font-medium p-3 rounded-lg transition-all 
                                    ${isActive
                                        ? 'bg-accent/10 text-accent font-semibold border border-accent/20' // Active link style
                                        : 'text-text-muted hover:bg-white/5 hover:text-text-main' // Inactive link style
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;