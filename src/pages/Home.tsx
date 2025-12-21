import { HashLink } from 'react-router-hash-link';
import { personalInfo, experiences, heroStack } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import QuoteDisplay from '../components/QuoteDisplay';
import Contact from '../components/Contact';
import ExperiencePreview from '../components/Experience'; // Ensure this path is correct based on your file structure

const Home = () => {
    return (
        <div id="home-view" className="view-section animate-fadeIn">

            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-[80vh] flex flex-col justify-center pt-32 pb-12 relative">

                <div className="w-full max-w-5xl mx-auto">

                    {/* AVATAR + INTRO ROW */}
                    <div className="flex items-center gap-4 mb-6">
                        {/* Glowing Avatar */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-tr from-accent to-transparent">
                            <img
                                src={profileImg}
                                alt="Rayhan"
                                className="w-full h-full rounded-full object-cover border-2 border-bg"
                            />
                        </div>

                        <div>
                            <h2 className="text-xl md:text-2xl font-medium text-text-muted mb-1">
                                Hi, I'm <span className="text-text-main font-semibold">{personalInfo.name}</span>
                            </h2>

                            {/* 🚨 UPDATED: Green Pinging Status Indicator */}
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

                    {/* MASSIVE HEADLINE */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-main mb-8 leading-[1.1] tracking-tight">
                        Engineering{' '}
                        <span className="text-transparent bg-clip-text bg-text-gradient inline-block pb-2">
                            Intelligent Systems
                        </span>
                        <br className="hidden md:block" />
                        that solve real problems.
                    </h1>

                    {/* SUB-HEADLINE */}
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light border-l-2 border-accent/30 pl-6">
                        Focused on writing <span className="text-white font-medium">clean, maintainable code</span> and designing <span className="text-white font-medium">resilient systems</span>.
                        I deliver efficient software solutions that solve complex technical challenges <span className="text-white italic">at scale</span>.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <HashLink
                            to="#contacts"
                            smooth
                            className="group relative px-8 py-4 flex items-center justify-center gap-3 
                            rounded-lg font-bold text-base transition-all duration-300
                            bg-accent text-bg shadow-neon hover:bg-white hover:text-bg hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                        >
                            <span>Let's Talk</span>
                            <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                        </HashLink>

                        <a
                            href={personalInfo.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-8 py-4 flex items-center justify-center gap-3 
                            rounded-lg font-medium text-base transition-all duration-300
                            bg-glass-overlay border border-white/10 text-text-muted hover:text-accent hover:border-accent"
                        >
                            <span>Download Resume</span>
                            <i className="fas fa-download text-sm opacity-70 group-hover:opacity-100 transition-opacity"></i>
                        </a>
                    </div>
                </div>

                {/* TECH TICKER */}
                <div className="mt-12 pt-8 border-t border-white/5 w-full overflow-hidden">
                    <p className="text-sm font-mono text-slate-400 mb-5 uppercase tracking-widest font-semibold">
                        Core Tech Stack:
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {heroStack.map((tech) => (
                            <span key={tech} className="text-xl md:text-2xl font-bold text-slate-500 hover:text-accent cursor-default transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- OTHER SECTIONS --- */}

            <section className="mb-12 w-full">
                <QuoteDisplay />
            </section>

            <section id="experience-preview" className="mb-12">
                <ExperiencePreview featuredExperience={experiences} />
            </section>

            <section>
                <Contact />
            </section>

        </div>
    );
};

export default Home;