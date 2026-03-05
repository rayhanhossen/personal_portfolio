import { personalInfo as staticPersonalInfo, experiences as staticExperiences, heroStack } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import ExperiencePreview from '../components/Experience';
import { Link } from 'react-router-dom';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Skeleton from '../components/Skeleton';

const HomeSkeleton = () => (
    <div className="view-section animate-fadeIn">
        <section className="min-h-[100dvh] flex flex-col justify-center py-28 md:pt-28 md:pb-20 relative">
            <div className="w-full max-w-5xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Skeleton variant="circle" className="w-16 h-16 md:w-20 md:h-20" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <Skeleton className="h-16 md:h-24 w-3/4 mb-4" />
                <Skeleton className="h-16 md:h-24 w-1/2 mb-8" />
                <Skeleton className="h-20 w-2/3 mb-10" />
                <div className="flex gap-3">
                    <Skeleton className="h-12 w-32 rounded-lg" />
                    <Skeleton className="h-12 w-32 rounded-lg" />
                </div>
            </div>
        </section>
    </div>
);

const Home = () => {
    const { data, loading } = usePortfolioData();

    // Use dynamic data if available, otherwise fallback to static data
    const info = data?.personalInfo || staticPersonalInfo;
    const expList = data?.experiences || staticExperiences;

    if (loading) {
        return <HomeSkeleton />;
    }

    return (
        <div id="home-view" className="view-section animate-fadeIn">
            {/* --- HERO SECTION --- */}
            <section id="home" className="min-h-[100dvh] flex flex-col justify-center py-28 md:pt-28 md:pb-20 relative">
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
                                Hi, I'm <span className="text-text-main font-semibold">{info.name} Hossen</span>
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
                            className="btn-primary w-full sm:w-auto"
                        >
                            <span>Get In Touch</span>
                            <i className="fas fa-paper-plane text-xs transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                        </Link>

                        {/* 2. Secondary Button (Resume) */}
                        <a
                            href={info.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary w-full sm:w-auto"
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
                    <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12 mt-6">
                        {heroStack.map((tech) => {
                            const Icon = tech.icon;
                            return (
                                <div
                                    key={tech.name}
                                    className="flex flex-col items-center gap-2 cursor-default"
                                >
                                    <Icon className={`text-3xl md:text-4xl ${tech.color}`} />
                                    <span className="text-xs font-mono font-medium text-slate-400">
                                        {tech.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- EXPERIENCE PREVIEW SECTION --- */}
            <section className="mb-12">
                {/* The Experience Card */}
                <ExperiencePreview featuredExperience={expList} limit={1} />

                {/* Center Navigation Button */}
                <div className="mt-4 flex justify-center w-full">
                    <Link
                        to="/about#experience"
                        className="btn-secondary group"
                    >
                        <span>View All</span>
                        <i className="fas fa-arrow-right text-xs transform group-hover:translate-x-1 transition-transform duration-300"></i>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;