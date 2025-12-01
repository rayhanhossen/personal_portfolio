import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { personalInfo } from '../data/content';


const Layout = () => {
    const [showScroll, setShowScroll] = useState(false);
    const location = useLocation();


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

            {/* Fixed Left Sidebar */}
            <div className="fixed left-4 top-0 h-full hidden md:flex flex-col items-center justify-start pt-0 gap-1 w-8 z-50">
                <div className="h-48 w-[1px] bg-gray-400"></div>

                <div className="flex flex-col items-center">
                    <a href={`mailto:${personalInfo.email}`} target="_blank" className="relative group text-gray-500 hover:text-accent text-xl my-2 transition-colors duration-200">
                        <i className="fa-regular fa-envelope"></i>
                        <span className="social-label">{personalInfo.email}</span>
                    </a>
                    <a href={personalInfo.whatsapp} target="_blank" className="relative group text-gray-500 hover:text-accent text-xl my-2 transition-colors duration-200">
                        <i className="fa-brands fa-whatsapp"></i>
                        <span className="social-label">+{personalInfo.whatsapp.substring(personalInfo.whatsapp.indexOf('8'))}</span>
                    </a>
                    <a href={personalInfo.linkedin} target="_blank" className="relative group text-gray-500 hover:text-accent text-xl my-2 transition-colors duration-200">
                        <i className="fab fa-linkedin"></i>
                        <span className="social-label">LinkedIn</span>
                    </a>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-12 pt-[1rem] pb-[1rem]">
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