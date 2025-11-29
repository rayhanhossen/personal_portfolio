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
                <div className="h-40 w-[1px] bg-primary"></div>
                <a href={`mailto:${personalInfo.email}`} className="text-gray hover:text-white text-xl my-1"><i className="fa-regular fa-envelope"></i></a>
                <a href={personalInfo.whatsapp} target="_blank" className="text-gray hover:text-white text-xl my-1"><i className="fa-brands fa-whatsapp"></i></a>
                <a href={personalInfo.linkedin} target="_blank" className="text-gray hover:text-white text-xl my-1"><i className="fab fa-linkedin"></i></a>
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
                <div className="group flex items-center justify-center border border-gray-600 bg-[#282C33] p-3 rounded-sm hover:border-primary hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(199,120,221,0.3)] transition-all duration-300">

                    {/* Arrow (Always Visible) */}
                    <i className="fas fa-arrow-up text-gray-400 group-hover:text-primary transition-colors text-sm"></i>

                    {/* Text (Hidden by default, slides out on hover) */}
                    <div className="max-w-0 overflow-hidden group-hover:max-w-[60px] transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                        <span className="text-white font-mono text-sm pl-2 whitespace-nowrap">
                            <span className="text-primary">~/</span>top
                        </span>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default Layout;