import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { personalInfo } from '../data/content';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'About', path: '/about' },
        // { name: 'experience', path: '/experience' },
        // { name: 'education', path: '/education' },
        // { name: 'contacts', path: '/contacts' },
    ];

    return (
        <header className="flex justify-between items-center mb-10 md:mb-12 py-4 md:py-4">
            {/* Logo */}
            <Link
                to="/"
                className="flex items-center gap-2 font-bold text-white text-3xl select-none cursor-pointer hover:opacity-80 transition-opacity"
            >
                <i className="fas fa-terminal text-primary terminal-blink"></i>
                <span className='gradient-text'>{personalInfo.name}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-4 text-gray font-medium">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        // Use 'relative' on the NavLink to contain the absolute sweep span
                        className={({ isActive }) =>
                            `transition-colors relative overflow-hidden group py-2 px-3 rounded-md 
                            ${isActive
                                ? 'text-white font-bold nav-active-style' // Apply the active styles and custom class
                                : 'hover:text-primary-light text-gray-400' // Default/Hover style for inactive links
                            }`
                        }
                    >
                        {/* 1. The sweeping effect element (must be the first child for correct z-indexing) */}
                        <span className="nav-sweep-bg"></span>

                        {/* 2. The visible text content (must be relative and higher z-index) */}
                        <div className="relative z-10 flex items-center">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-5 w-5 mr-1 nav-code-icon-color" // Tailwind classes for size and margin
                            >
                                {/* The fill="currentColor" attribute is key: it makes the SVG inherit the text color from its parent. */}
                                <path
                                    fill="currentColor"
                                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                />
                            </svg>

                            <code className="nav-link-text ">{link.name}</code>


                        </div>

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
                    <div className='flex justify-between items-center'>
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 font-bold text-white text-3xl select-none cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <i className="fas fa-terminal text-primary terminal-blink"></i>
                            <span className='gradient-text'>{personalInfo.name}</span>
                        </Link>
                        <button className="text-2xl text-white hover:text-red-400" onClick={() => setIsOpen(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <hr className='text-white'/>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                // Outer className sets link container styles and general color
                                `text-2xl font-medium flex items-center transition-colors 
                                ${isActive
                                    ? 'text-white'
                                    : 'text-gray hover:text-white'
                                }`
                            }
                        >
                            {/* 🚨 FIX IS HERE: ALL CONTENT IS MOVED INSIDE THE FUNCTION 🚨 */}
                            {({ isActive }) => (
                                <>
                                    {/* 1. SVG Icon - Now inside the function */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        className="h-6 w-8 mr-4 nav-code-icon-color"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                        />
                                    </svg>

                                    {/* 2. Text Span - Conditional gradient remains */}
                                    <span
                                        className={isActive ? 'text-green-400' : 'text-white'}
                                    >
                                        {link.name}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;