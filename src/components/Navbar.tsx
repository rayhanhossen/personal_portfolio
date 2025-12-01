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
        <header className="py-4 md:py-5">
            <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-3 glass-card mx-auto">
                
                <Link
                    to="/"
                    className="flex items-center gap-2 font-bold text-gray-800 text-xl md:text-2xl select-none cursor-pointer hover:text-accent transition-colors"
                    onClick={() => setIsOpen(false)} // Close mobile menu if open
                >
                    {/* Simplified, modern logo text, can add a minimal icon if desired */}
                    <span className='text-accent'>{personalInfo.name.toUpperCase()}</span> 
                    <span className="font-light text-gray-500 hidden sm:inline">Portfolio</span>
                </Link>

                {/* 💻 Desktop Nav (Cleaned up, using accent color and underline effect) */}
                <nav className="hidden md:flex gap-6 font-medium text-gray-600">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative transition-colors py-1 hover:text-gray-900 
                                ${isActive ? 'text-gray-900 font-semibold' : ''}`
                            }
                        >
                            {/* 1. NavLink Text */}
                            <span>{link.name}</span>

                            {/* 2. Custom Underline for Active State (Clean Look) */}
                            {({ isActive }) => (
                                isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent transform transition-transform duration-300 scale-x-100"></span>
                                )
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Toggle (Cleaned up, using dark colors) */}
                <button className="md:hidden text-2xl text-gray-700 hover:text-accent transition-colors" onClick={() => setIsOpen(!isOpen)}>
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>


            {/* 📱 Mobile Menu (Fixed Glass Panel) */}
            {isOpen && (
                <div 
                    // 🚨 UPDATED: Mobile Menu is now a fixed, full-screen glass panel
                    className="fixed inset-0 z-[60] p-6 flex flex-col gap-6 md:hidden glass-card"
                    style={{ backdropFilter: 'blur(30px)' }} // Ensure strong blur on mobile overlay
                >
                    <div className='flex justify-between items-center'>
                        {/* Mobile Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-bold text-gray-800 text-2xl"
                        >
                            <span className='text-accent'>{personalInfo.name.toUpperCase()}</span> 
                        </Link>
                        
                        {/* Close Button */}
                        <button className="text-3xl text-gray-700 hover:text-red-500 transition-colors" onClick={() => setIsOpen(false)}>
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
                                    `text-xl font-medium p-2 rounded-lg transition-all 
                                    ${isActive
                                        ? 'bg-accent/10 text-accent font-semibold' // Active link style
                                        : 'text-gray-700 hover:bg-gray-100' // Inactive link style
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