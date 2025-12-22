import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { personalInfo } from '../data/content';
import VideoBackground from './VideoBackground';

const Layout: React.FC = () => {
    const [showScroll, setShowScroll] = useState(false);
    const location = useLocation();

    // 1. Handle Browser Scroll Restoration
    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    // 2. Handle Scroll on Route Change
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

    // Dynamic Title
    useEffect(() => {
        const pageTitle = location.pathname === '/' ? 'Home' : location.pathname.substring(1).replace('-', ' ');
        document.title = `${personalInfo.name} | ${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}`;
    }, [location]);

    return (
        <div className="min-h-screen relative text-text-main font-sans cursor-none overflow-x-hidden selection:bg-accent selection:text-bg">

            {/* Background */}
            <VideoBackground />
            
            {/* Custom Cursor */}
            <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
                <CustomCursor />
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
                <Navbar />
                <main className="view-section mb-20">
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
                {/* 🚨 UPDATED DESIGN: Rounded-xl (Square) + Animated Arrow */}
                <div className="flex items-center justify-center h-12 w-12 rounded-xl 
                    bg-glass-overlay backdrop-blur-md border border-white/10 shadow-lg
                    hover:bg-accent hover:border-accent hover:shadow-neon hover:-translate-y-1
                    transition-all duration-300 group">
                    
                    {/* Icon animates UP on hover now */}
                    <i className="fas fa-arrow-up text-accent group-hover:text-bg text-base transition-transform duration-300 group-hover:-translate-y-0.5"></i>
                </div>
            </button>
        </div>
    );
};

export default Layout;