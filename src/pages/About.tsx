import { personalInfo, skills } from '../data/content';
import profileImg from '../assets/profile-avatar.png';

const About = () => {
    return (
        <div className="font-sans animate-fadeIn">
            {/* Header */}
            <div className="mb-8 pt-2">
                <h2 className="text-3xl text-text-main font-bold mb-2">
                    <span className="text-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">/</span>about-me
                </h2>
                <p className="text-text-muted text-lg">Who am I?</p>
            </div>

            {/* Main Bio & Image */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 items-start">

                {/* 1. Bio Text & Button */}
                <div className="md:col-span-7 text-gray-300 leading-relaxed order-2 md:order-1 pt-4 pb-6">
                    {personalInfo.about.map((paragraph, index) => (
                        <p key={index} className="mb-4 text-base opacity-100 transition-opacity duration-300">
                            {paragraph}
                        </p>
                    ))}

                    {/* 📄 CV Download Button (Dark Mode Style) */}
                    <a
                        href={personalInfo.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border border-white/20 text-gray-200 font-medium 
                            px-6 py-3 border-accent hover:text-accent hover:bg-accent/5 
                            w-max mt-8 transition-all duration-300 rounded-full"
                        aria-label="Download Resume"
                    >
                        <span>Resume</span>
                        <i className="fas fa-download text-sm transform group-hover:translate-y-0.5 transition-all duration-300 ml-1"></i>
                    </a>
                </div>

                {/* 2. Image Decoration (Dark Mode) */}
                <div className="md:col-span-5 relative flex justify-center md:justify-end order-1 md:order-2">
                    {/* Glass Card Container for Image */}
                    {/* FIXES: Removed 'p-4'. Added 'overflow-hidden'. */}
                    <div className="relative w-72 md:w-80 rounded-xl shadow-2xl glass-card border border-white/5 overflow-hidden">

                        {/* Profile Image */}
                        {/* FIXES: Added 'h-full object-cover'. Removed 'rounded-lg' and all opacity/hover classes. */}
                        <img
                            src={profileImg}
                            alt={personalInfo.name}
                            className="w-full h-full object-cover relative z-10 shadow-lg"
                        />

                        {/* Subtle background shapes (These are now hidden behind the opaque image, but kept for structure) */}
                        <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-accent/10 blur-xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        <div className="absolute bottom-0 right-0 w-2/5 h-2/5 rounded-full bg-blue-600/10 blur-xl translate-x-1/3 translate-y-1/3 z-0"></div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <section className="mb-9 relative">
                {/* Heading */}
                <h3 className="text-2xl md:text-2xl font-semibold text-text-main mb-6 flex items-center tracking-tight">
                    <i className="fas fa-cogs text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Technical Skills
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* 1. Real Skill Cards */}
                    {skills.map((grp) => (
                        <div
                            key={grp.category}
                            className="h-56 flex flex-col glass-card border border-white/5 hover:border-accent/30 transition-colors duration-300"
                        >
                            <div className="border-b border-white/10 p-3 flex justify-between items-center bg-white/5">
                                <span className="font-bold text-text-main text-sm tracking-wide">
                                    {grp.category}
                                </span>
                            </div>
                            <div className="p-4 text-gray-200 text-sm flex flex-col gap-y-2 overflow-y-auto aesthetic-scrollbar">
                                {grp.items.map((skill) => (
                                    <span key={skill} className="hover:text-accent transition-colors cursor-default flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-accent"></span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* 2. Dynamic Filler Card (Merges empty slots) */}
                    {/* 2. Dynamic Filler Card (Responsive for Mobile, Tablet, Desktop) */}
                    {(() => {
                        const len = skills.length;

                        // Calculate empty slots for each breakpoint
                        const mobileSlots = (2 - (len % 2)) % 2; // Mobile: Grid cols 2
                        const smSlots = (3 - (len % 3)) % 3;     // Tablet: Grid cols 3
                        const lgSlots = (4 - (len % 4)) % 4;     // Desktop: Grid cols 4

                        // If all breakpoints are full, render nothing
                        if (mobileSlots === 0 && smSlots === 0 && lgSlots === 0) return null;

                        // Lookup maps for Tailwind classes (Required because Tailwind doesn't scan dynamic strings)
                        const mobileClasses: Record<number, string> = {
                            0: "hidden",
                            1: "col-span-1 flex",
                        };

                        const smClasses: Record<number, string> = {
                            0: "sm:hidden",
                            1: "sm:col-span-1 sm:flex",
                            2: "sm:col-span-2 sm:flex",
                        };

                        const lgClasses: Record<number, string> = {
                            0: "lg:hidden",
                            1: "lg:col-span-1 lg:flex",
                            2: "lg:col-span-2 lg:flex",
                            3: "lg:col-span-3 lg:flex",
                        };

                        return (
                            <div
                                className={`h-56 glass-card border border-white/5 bg-white/5 animate-pulse flex-col items-center justify-center text-center 
                                    ${mobileClasses[mobileSlots]} 
                                    ${smClasses[smSlots]} 
                                    ${lgClasses[lgSlots]}`}
                            >
                                <span className="text-gray-500 font-bold tracking-[0.2em] text-xs uppercase mb-2">
                                    Skill Loading
                                </span>
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>
        </div>
    );
};

export default About;