import { useEffect, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { personalInfo } from '../data/content';

// Define the type for mouse coordinates
interface MousePosition {
    x: number;
    y: number;
}


const Layout = () => {
    const [showScroll, setShowScroll] = useState(false);
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const location = useLocation();

    // Custom Cursor Logic
    const handleMouseMove = useCallback((event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });

        // Check if the mouse is hovering over an interactive element (links, buttons)
        const target = event.target as HTMLElement;
        const isInteractive = target.closest('a, button, [role="button"], [role="link"]') !== null;
        setIsHovering(isInteractive);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);


    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Handle Scroll Button Visibility
    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 800) setShowScroll(true);
            else setShowScroll(false);
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    // Dynamic Title Animation
    useEffect(() => {
        const pageTitle = location.pathname === '/' ? 'Home' : location.pathname.substring(1).replace('-', ' ');
        document.title = `${personalInfo.name} | ${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}`;
    }, [location]);

    return (
        // Apply 'default-cursor' class for general elements if needed, 
        // but 'body' handles cursor visibility via CSS.
        <div className="bg-bg min-h-screen relative text-gray-800 font-sans">

            {/* 🖱️ CUSTOM CURSOR ELEMENT */}
            <div
                className={`custom-cursor ${isHovering ? 'active' : ''}`}
                style={{ left: mousePosition.x, top: mousePosition.y }}
            ></div>

            {/* Fixed Left Sidebar */}
            <div className="fixed left-4 top-0 h-full hidden md:flex flex-col items-center justify-start pt-0 gap-2 w-8 z-50">
                <div className="h-56 w-[1px] bg-gray-400"></div>

                <div className="flex flex-col items-center">
                    <a href={`mailto:${personalInfo.email}`} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="Email">
                        <i className="fa-regular fa-envelope"></i></a>
                    <a href={personalInfo.whatsapp} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="Whatsapp">
                        <i className="fa-brands fa-whatsapp"></i></a>
                    <a href={personalInfo.linkedin} target="_blank" className="text-gray-500 hover:text-accent text-xl transition-colors" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8 pb-12">
                <Navbar />
                <main className="view-section">
                    <Outlet />
                </main>
                <Footer />
            </div>

            {/* Scroll To Top: Clean Circle Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 transform ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                <div className="flex items-center justify-center h-12 w-12 rounded-full 
                    bg-accent/80 backdrop-blur-sm shadow-lg 
                    hover:bg-accent hover:shadow-xl hover:-translate-y-1
                    transition-all duration-300">

                    <i className="fas fa-arrow-up text-white text-base"></i>
                </div>
            </button>
        </div>
    );
};

export default Layout;