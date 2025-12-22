import { personalInfo, experiences, heroStack } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import ExperiencePreview from '../components/Experience';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div id="home-view" className="view-section animate-fadeIn">
            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-screen flex flex-col justify-center pt-20 pb-12 mt-[27px] relative">
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

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            to="/contact"
                            className="group relative px-8 py-4 flex items-center justify-center gap-3 rounded-lg font-bold text-base transition-all duration-300 bg-accent text-bg shadow-neon hover:bg-white hover:text-bg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                        >
                            <span>Get In Touch</span>
                            <i className="fas fa-paper-plane text-sm transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                        </Link>
                        <a
                            href={personalInfo.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-8 py-4 flex items-center justify-center gap-3 rounded-lg font-medium text-base transition-all duration-300 bg-glass-overlay border border-white/10 text-text-muted hover:text-accent hover:border-accent"
                        >
                            <span>Download Resume</span>
                            <i className="fas fa-download text-sm opacity-70 group-hover:opacity-100 transition-opacity"></i>
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
            <section className="mb-24">
                {/* The Experience Card */}
                <ExperiencePreview featuredExperience={experiences} limit={1} />

                {/* Minimalist Navigation Link - Positioned closer to the card */}
                <div className="flex justify-end max-w-5xl mx-auto mt-4">
                    <Link
                        to="/about#experience"
                        className="group flex items-center gap-2 px-2 py-1 
                       text-text-muted hover:text-accent 
                       transition-all duration-300 font-mono text-[11px] tracking-widest uppercase"
                    >
                        <span className="relative">
                            View Full History
                            {/* Minimalist underline animation */}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent/50 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <i className="fas fa-chevron-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;