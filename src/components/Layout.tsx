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
        <div className="bg-bg min-h-screen relative text-text font-mono">
            {/* Fixed Left Sidebar */}
            <div className="fixed left-4 top-0 h-full hidden md:flex flex-col items-center justify-start pt-0 gap-2 w-8 z-50">
                <div className="h-56 w-[2px] gradient-line"></div>

                {/* Email Link */}
                <a href={`mailto:${personalInfo.email}`} target="_blank" className="relative group text-gray hover:text-primary text-xl my-1">
                    <i className="fa-regular fa-envelope"></i>
                    <span className="social-label">{personalInfo.email}</span>
                </a>

                {/* WhatsApp Link */}
                <a href={personalInfo.whatsapp} target="_blank" className="relative group text-gray hover:text-primary text-xl my-1">
                    <i className="fa-brands fa-whatsapp"></i>
                    <span className="social-label">+{personalInfo.whatsapp.substring(personalInfo.whatsapp.indexOf('8'))}</span> {/* Assuming personalInfo.whatsapp holds the number */}
                </a>

                {/* LinkedIn Link */}
                <a href={personalInfo.linkedin} target="_blank" className="relative group text-gray hover:text-primary text-xl my-1">
                    <i className="fab fa-linkedin"></i>
                    <span className="social-label">{'LinkedIn'}</span> {/* Use a username or custom field */}
                </a>
            </div>

            <div className="max-w-5xl mx-auto px-6 md:px-12 pt-8 pb-12">
                <Navbar />
                <main className="view-section">
                    <Outlet />
                </main>
                <Footer />
            </div>

            {/* Scroll To Top: Expanding Arrow */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 transform ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                    }`}
            >
                {/* 🚨 UPDATED CLASSES ON THE INNER DIV 🚨 */}
                <div className="group flex items-center justify-center border-2 border-[#1bac81] bg-transparent p-3 rounded-full 
                    hover:border-[#1bac81] hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(27,172,129,0.8)] 
                    transition-all duration-300">

                    {/* Arrow (Always Visible) - Now starts Primary Purple, turns Green on hover */}
                    <i className="fas fa-arrow-up text-[#1bac81] group-hover:text-[#1bac81] transition-colors text-sm"></i>
                </div>
            </button>
        </div>
    );
};

export default Layout;