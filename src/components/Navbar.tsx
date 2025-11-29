import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { personalInfo } from '../data/content';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'home', path: '/' },
        { name: 'projects', path: '/projects' },
        { name: 'about-me', path: '/about' },
        { name: 'experience', path: '/experience' },
        { name: 'education', path: '/education' },
        { name: 'contacts', path: '/contacts' },
    ];

    return (
        <header className="flex justify-between items-center mb-16 md:mb-24 py-8">
            {/* Logo */}
            <Link
                to="/"
                className="flex items-center gap-2 font-bold text-white text-lg select-none cursor-pointer hover:opacity-80 transition-opacity"
            >
                <i className="fas fa-terminal text-primary terminal-blink"></i>
                <span>{personalInfo.name}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-gray font-medium">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `hover:text-white transition-colors ${isActive ? 'text-white font-bold' : ''}`
                        }
                    >
                        <span className="text-primary">#</span>{link.name}
                    </NavLink>
                ))}
            </nav>

            {/* Mobile Toggle */}
            <button className="md:hidden text-2xl text-white" onClick={() => setIsOpen(!isOpen)}>
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="fixed inset-0 bg-bg z-50 p-8 flex flex-col gap-8 md:hidden">
                    <div className='flex justify-end'>
                        <button className="text-2xl text-white" onClick={() => setIsOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-medium text-gray hover:text-white"
                        >
                            <span className="text-primary">#</span>{link.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;