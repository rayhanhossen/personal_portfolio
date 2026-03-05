import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { experiences as staticExperiences, personalInfo as staticPersonalInfo, skills as staticSkills } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import QuoteDisplay from '../components/QuoteDisplay';
import ExperiencePreview from '../components/Experience';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Skeleton from '../components/Skeleton';

const AboutSkeleton = () => (
    <div className="font-sans animate-fadeIn">
        <div className="pt-32 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 items-start">
            <div className="md:col-span-7 flex flex-col gap-4">
                <div className="flex gap-2 mb-4">
                    <Skeleton className="h-8 w-32 rounded-full" />
                    <Skeleton className="h-8 w-48 rounded-full" />
                </div>
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-full mt-4" />
                <Skeleton className="h-6 w-3/4" />
                <div className="flex gap-3 mt-8">
                    <Skeleton className="h-12 w-36 rounded-lg" />
                    <Skeleton className="h-12 w-28 rounded-lg" />
                </div>
            </div>
            <div className="md:col-span-5 flex justify-center md:justify-end">
                <Skeleton variant="rect" className="w-full max-w-sm h-[400px] rounded-2xl" />
            </div>
        </div>
        <section className="mb-12 pt-12 border-t border-white/5">
            <Skeleton className="h-8 w-48 mb-10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} variant="rect" className="h-32 rounded-xl" />
                ))}
            </div>
        </section>
    </div>
);

const About = () => {
    const { hash } = useLocation();
    const { data, loading } = usePortfolioData();

    // Use dynamic data if available, otherwise fallback to static data
    const info = data?.personalInfo || staticPersonalInfo;
    const skillsList = data?.skills || staticSkills;
    const expList = data?.experiences || staticExperiences;
    const quotesList = data?.quotes || [];

    // Effect to handle scrolling to experience section if hash is present
    useEffect(() => {
        if (hash === '#experience') {
            const element = document.getElementById('experience-full-section');
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [hash]);

    if (loading) {
        return <AboutSkeleton />;
    }

    return (
        <div className="font-sans animate-fadeIn">


            {/* --- BIO & IMAGE --- */}
            <div className="pt-32 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 items-start">
                <div className="md:col-span-7 leading-relaxed order-2 md:order-1">

                    {/* Role + Status Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <span className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"></span>
                            Open to Work
                        </span>
                        <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400">
                            <i className="fas fa-map-marker-alt text-accent/60 mr-1.5"></i>{info.location} ({info.timezone})
                        </span>
                    </div>

                    {/* Bio Text — Dynamic */}
                    {info.about.map((paragraph: string, i: number) => (
                        <p
                            key={i}
                            className={`${i === 0 ? 'mb-4 text-base md:text-lg text-slate-300' : 'mb-6 text-base text-slate-400'} font-light leading-relaxed`}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                    ))}

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-row gap-3 mt-8 w-full sm:w-auto">
                        <Link
                            to="/contact"
                            className="btn-primary w-full sm:w-auto"
                        >
                            <span>Get In Touch</span>
                            <i className="fas fa-paper-plane text-xs transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"></i>
                        </Link>

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
                <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2">
                    <div className="relative w-full max-w-sm group">
                        <div className="absolute -inset-0.5 bg-gradient-to-tr from-accent to-transparent rounded-2xl opacity-50 blur-sm group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative rounded-2xl bg-black border border-white/10 overflow-hidden">
                            <img src={profileImg} alt={info.name} className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
                                <div className="text-white font-bold text-lg">{info.name}</div>
                                <div className="text-accent text-xs font-mono">{info.title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* --- SKILLS SECTION --- */}
            <section className="mb-12 pt-12 border-t border-white/5 relative">

                <div className="flex items-center gap-3 mb-10">
                    <i className="fas fa-microchip text-accent text-xl drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    <h3 className="text-2xl font-semibold text-text-main tracking-tight">Technical Skills</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skillsList.map((grp: any) => {
                        // Category-specific icons
                        const categoryIcons: Record<string, string> = {
                            'Programming': 'fa-code',
                            'Frameworks': 'fa-layer-group',
                            'Front-End': 'fa-palette',
                            'Databases': 'fa-database',
                            'Caching & Messaging': 'fa-bolt',
                            'Cloud & DevOps': 'fa-cloud',
                            'AI & Data Processing': 'fa-brain',
                            'Automation & Testing': 'fa-robot',
                            'Development Methodologies': 'fa-diagram-project',
                        };
                        const icon = categoryIcons[grp.category] || 'fa-cube';

                        return (
                            <div key={grp.category} className="bg-glass-overlay backdrop-blur-md rounded-xl p-5 flex flex-col group relative overflow-hidden
                                           border border-white/10 transition-all duration-300
                                           shadow-[0_4px_24px_rgba(0,0,0,0.4)]
                                           hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-accent/30">

                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                                        <i className={`fas ${icon} text-accent text-sm`}></i>
                                    </div>
                                    <span className="font-mono font-bold text-white text-xs uppercase tracking-widest">{grp.category}</span>
                                </div>

                                {/* Skill Pills */}
                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {grp.items.map((skill: string) => (
                                        <span
                                            key={skill}
                                            className="text-xs font-medium px-3 py-1.5 rounded-full 
                                                       bg-white/5 border border-white/10 text-slate-300
                                                       hover:bg-accent/10 hover:border-accent/30 hover:text-accent
                                                       transition-all duration-300 cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* --- FULL EXPERIENCE SECTION --- */}
            <section id="experience-full-section" className="mb-12">
                <ExperiencePreview featuredExperience={expList} />
            </section>

            {/* --- SYSTEM PHILOSOPHY --- */}
            <div className="mb-12 max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <i className="fas fa-brain text-accent text-xl"></i>
                    <h3 className="text-2xl font-semibold text-text-main tracking-tight">Dev Mindset</h3>
                </div>
                <QuoteDisplay quotes={quotesList} />
            </div>
        </div>
    );
};

export default About;