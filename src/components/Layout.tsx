import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RippleBackground from '../components/RippleBackground';
import CustomCursor from '../components/CustomCursor';
import { personalInfo } from '../data/content';

const Layout: React.FC = () => {
    const [showScroll, setShowScroll] = useState(false);
    const location = useLocation();

    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Handle Scroll Button
    useEffect(() => {
        const checkScroll = () => {
            if (window.scrollY > 800) setShowScroll(true);
            else setShowScroll(false);
        };
        window.addEventListener('scroll', checkScroll);
        return () => window.removeEventListener('scroll', checkScroll);
    }, []);

    // Dynamic Title
    useEffect(() => {
        const pageTitle = location.pathname === '/' ? 'Home' : location.pathname.substring(1).replace('-', ' ');
        document.title = `${personalInfo.name} | ${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}`;
    }, [location]);

    return (
        <div className="min-h-screen relative text-text-main font-sans cursor-none overflow-x-hidden selection:bg-accent selection:text-bg">

            {/* Background */}
            <RippleBackground />
            
            {/* 🚨 FIX 2: Custom Cursor Z-Index
               - Wrapped in a high z-index div so it sits above Navbar/Sidebar/Buttons.
               - 'pointer-events-none' ensures the wrapper doesn't block clicks. 
            */}
            <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
                <CustomCursor />
            </div>

            {/* 🚨 FIX 1: Sidebar (Left) 
               - Changed 'md:flex' to 'xl:flex'.
               - md (768px) includes tablets.
               - xl (1280px) is strictly desktop/laptop.
            */}
            <div className="fixed left-4 top-0 h-full hidden xl:flex flex-col items-center justify-start pt-0 gap-1 w-8 z-50">
                <div className="h-48 w-[1px] bg-slate-700"></div>

                <div className="flex flex-col items-center">
                    <a href={`mailto:${personalInfo.email}`} className="relative group text-text-muted hover:text-accent text-xl my-2 transition-all duration-300 hover:-translate-y-1">
                        <i className="fa-regular fa-envelope"></i>
                        <span className="social-label bg-accent text-bg font-bold">{personalInfo.email}</span>
                    </a>
                    <a href={personalInfo.whatsapp} target="_blank" rel="noreferrer" className="relative group text-text-muted hover:text-accent text-xl my-2 transition-all duration-300 hover:-translate-y-1">
                        <i className="fa-brands fa-whatsapp"></i>
                        <span className="social-label bg-accent text-bg font-bold">+{personalInfo.whatsapp.substring(personalInfo.whatsapp.indexOf('8'))}</span>
                    </a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="relative group text-text-muted hover:text-accent text-xl my-2 transition-all duration-300 hover:-translate-y-1">
                        <i className="fab fa-linkedin"></i>
                        <span className="social-label bg-accent text-bg font-bold">LinkedIn</span>
                    </a>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-[1rem] md:px-12 relative z-10">
                <Navbar />
                <main className="view-section mb-8">
                    <Outlet />
                </main>
                <Footer />
            </div>

            {/* Scroll To Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${
                    showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            >
                <div className="flex items-center justify-center h-12 w-12 rounded-full 
                    bg-accent/10 backdrop-blur-md border border-accent/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]
                    hover:bg-accent hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] hover:-translate-y-1
                    transition-all duration-300 group">
                    <i className="fas fa-arrow-up text-accent group-hover:text-bg text-base transition-colors"></i>
                </div>
            </button>
        </div>
    );
};

export default Layout;