import { personalInfo, experiences, heroStack } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import ExperiencePreview from '../components/Experience';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div id="home-view" className="view-section animate-fadeIn">
            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-[100dvh] flex flex-col justify-center py-20 md:pt-28 md:pb-20 relative">
                <div className="w-full max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-tr from-accent to-transparent">
                            <img
                                src={profileImg}
                                alt="Rayhan"
                                className="w-full h-full rounded-full object-cover border-2 border-bg"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl md:text-2xl font-medium text-text-muted mb-1">
                                Hi, I'm <span className="text-text-main font-semibold">{personalInfo.name} Hossen</span>
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-mono font-bold tracking-widest text-green-400">
                                    OPEN_TO_WORK
                                </span>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-main mb-8 leading-[1.1] tracking-tight">
                        Engineering{' '}
                        <span className="text-transparent bg-clip-text bg-text-gradient inline-block pb-2">
                            Intelligent Systems
                        </span>
                        <br className="hidden md:block" />
                        that solve real problems.
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light border-l-2 border-accent/30 pl-6">
                        Focused on writing <span className="text-white font-medium">clean, maintainable code</span> and designing <span className="text-white font-medium">resilient systems</span>.
                        I deliver efficient software solutions that solve complex technical challenges <span className="text-white italic">at scale</span>.
                    </p>

                    <div className="flex flex-row gap-3 w-full sm:w-auto justify-center sm:justify-start">

                        {/* 1. Primary Button (Get In Touch) */}
                        <Link
                            to="/contact"
                            className="group relative flex-1 sm:flex-none px-4 sm:px-8 py-3.5 flex items-center justify-center gap-2 sm:gap-3 
                   rounded-full bg-accent text-bg font-bold text-xs sm:text-sm tracking-wide
                   shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]
                   hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.6)]
                   hover:scale-[1.02] active:scale-[0.98]
                   transition-all duration-300 ease-out whitespace-nowrap"
                        >
                            <span>Get In Touch</span>
                            <i className="fas fa-paper-plane text-xs transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                        </Link>

                        {/* 2. Secondary Button (Resume) */}
                        <a
                            href={personalInfo.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex-1 sm:flex-none px-4 sm:px-8 py-3.5 flex items-center justify-center gap-2 sm:gap-3 
                            rounded-full 
                            /* PERMANENT STYLES (Previously Hover) */
                            bg-text-muted/10 border border-text-main/50 text-text-main 
                            /* NEW HOVER (Subtle interaction only) */
                            hover:bg-text-muted/20 hover:scale-[1.02] active:scale-[0.98]
                            transition-all duration-300 ease-out whitespace-nowrap"
                        >
                            <span>Resume</span>
                            <i className="fas fa-download text-xs opacity-100 group-hover:translate-y-0.5 transition-all duration-300"></i>
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-12 border-t border-white/5 w-full overflow-hidden">
                    <p className="text-sm font-mono text-slate-400 mb-5 uppercase tracking-widest font-semibold">
                        Core Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {heroStack.map((tech) => (
                            <span key={tech} className="text-xl md:text-2xl font-bold text-slate-400 hover:text-accent cursor-default transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE PREVIEW SECTION --- */}
            <section className="mb-12">
                {/* The Experience Card */}
                <ExperiencePreview featuredExperience={experiences} limit={1} />

                {/* Center Navigation Button */}
                <div className="mt-4 flex justify-center w-full">
                    <Link
                        to="/about#experience"
                        className="group relative inline-flex items-center gap-3 px-8 py-3 
                       rounded-full border border-text-muted/20 bg-transparent
                       text-xs font-mono tracking-[0.2em] uppercase text-text-muted
                       hover:text-accent hover:border-accent/40 hover:bg-accent/5
                       transition-all duration-500 ease-out"
                    >
                        <span className="relative z-10 font-semibold">View All</span>

                        {/* Icon container with right-slide animation */}
                        <i className="fas fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;