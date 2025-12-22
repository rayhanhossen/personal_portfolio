import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { experiences, personalInfo, skills } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import QuoteDisplay from '../components/QuoteDisplay';
import ExperiencePreview from '../components/Experience';

const About = () => {
    const { hash } = useLocation();

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

    return (
        <div className="font-sans animate-fadeIn">
            {/* --- HEADER --- */}
            <div className="pt-24 md:pt-32 mb-8 relative z-10">
                <div className="absolute -top-10 -left-10 text-[100px] text-accent/5 opacity-20 pointer-events-none select-none z-0">
                    <i className="fas fa-user-astronaut"></i>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2 relative z-10">
                    <span className="text-accent font-mono">/</span>
                    <span className="text-transparent bg-clip-text bg-text-gradient">about_me</span>
                </h2>
                <p className="text-text-muted text-lg font-light tracking-wide relative z-10">Who am I?</p>
            </div>

            {/* --- BIO & IMAGE --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 items-start">
                <div className="md:col-span-7 leading-relaxed order-2 md:order-1">
                    {personalInfo.about.map((paragraph, index) => (
                        <p key={index} className="mb-6 text-base md:text-lg text-slate-300 font-light">
                            {paragraph}
                        </p>
                    ))}
                    <a
                        href={personalInfo.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex w-full md:w-auto md:inline-flex justify-center items-center gap-3 px-8 py-3 mt-4 rounded-lg bg-accent text-bg font-bold shadow-neon hover:bg-white hover:text-bg transition-all duration-300"
                    >
                        <span>Download Resume</span>
                        <i className="fas fa-download text-sm group-hover:translate-y-1 transition-transform"></i>
                    </a>
                </div>
                <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2">
                    <div className="relative w-full max-w-sm group">
                        <div className="absolute -inset-0.5 bg-gradient-to-tr from-accent to-transparent rounded-2xl opacity-50 blur-sm group-hover:opacity-100 transition duration-500"></div>
                        <div className="relative rounded-2xl bg-black border border-white/10 overflow-hidden">
                            <img src={profileImg} alt={personalInfo.name} className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-all duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12">
                                <div className="text-white font-bold text-lg">{personalInfo.name}</div>
                                <div className="text-accent text-xs font-mono">{personalInfo.title}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* --- SKILLS SECTION --- */}
            {/* Added 'border-t' and 'border-white/10' here for the top border */}
            <section className="mb-12 pt-12 border-t border-white/10 relative">

                <div className="flex items-center gap-3 mb-8">
                    <i className="fas fa-microchip text-accent text-xl"></i>
                    <h3 className="text-2xl font-semibold text-text-main tracking-tight">Technical Skills</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* ... your existing skills.map and Dynamic Filler Card ... */}
                    {skills.map((grp) => (
                        <div key={grp.category} className="h-56 flex flex-col bg-glass-overlay backdrop-blur-md rounded-xl border border-white/10 transition-all hover:border-accent/40 group">
                            <div className="border-b border-white/10 p-4 bg-white/5 rounded-t-xl flex justify-between items-center">
                                <span className="font-mono font-bold text-accent text-xs uppercase">{grp.category}</span>
                            </div>
                            <div className="p-4 text-slate-300 text-sm flex flex-col gap-2.5 overflow-y-auto aesthetic-scrollbar">
                                {grp.items.map((skill) => (
                                    <span key={skill} className="hover:text-white transition-colors flex items-center gap-2">
                                        <i className="fas fa-angle-right text-accent/50 text-xs"></i> {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Dynamic Filler Card */}
                    {(() => {
                        const len = skills.length;
                        const mobileSlots = (2 - (len % 2)) % 2;
                        const smSlots = (3 - (len % 3)) % 3;
                        const lgSlots = (4 - (len % 4)) % 4;

                        if (mobileSlots === 0 && smSlots === 0 && lgSlots === 0) return null;

                        const mobileClasses: Record<number, string> = { 0: "hidden", 1: "col-span-1 flex" };
                        const smClasses: Record<number, string> = { 0: "sm:hidden", 1: "sm:col-span-1 sm:flex", 2: "sm:col-span-2 sm:flex" };
                        const lgClasses: Record<number, string> = { 0: "lg:hidden", 1: "lg:col-span-1 lg:flex", 2: "lg:col-span-2 lg:flex", 3: "lg:col-span-3 lg:flex" };

                        return (
                            <div
                                className={`h-56 rounded-xl border border-dashed border-white/10 bg-white/5 flex-col items-center justify-center text-center 
                                    ${mobileClasses[mobileSlots]} 
                                    ${smClasses[smSlots]} 
                                    ${lgClasses[lgSlots]}`}
                            >
                                <span className="text-text-muted font-mono font-bold tracking-widest text-[10px] uppercase mb-2 animate-pulse">
                                    CONTINUOUS_LEARNING...
                                </span>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* --- FULL EXPERIENCE SECTION --- */}
            <section id="experience-full-section" className="mb-12">
                <ExperiencePreview featuredExperience={experiences} />
            </section>

            {/* --- SYSTEM PHILOSOPHY --- */}
            <div className="mb-12 max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <i className="fas fa-brain text-accent text-xl"></i>
                    <h3 className="text-2xl font-semibold text-text-main tracking-tight">Dev Mindset</h3>
                </div>
                <QuoteDisplay />
            </div>
        </div>
    );
};

export default About;