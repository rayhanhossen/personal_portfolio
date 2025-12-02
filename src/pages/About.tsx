import { personalInfo, skills } from '../data/content';
import profileImg from '../assets/profile-avatar.png';

const About = () => {
    return (
        <div className="font-sans animate-fadeIn">
            {/* Header */}
            <div className="mb-12 pt-4">
                <h2 className="text-3xl text-text-main font-bold mb-2">
                    <span className="text-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">/</span>about-me
                </h2>
                <p className="text-text-muted text-lg">Who am I?</p>
            </div>

            {/* Main Bio & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-9 items-start">
                
                {/* 1. Bio Text & Button */}
                <div className="text-text-muted leading-relaxed order-2 md:order-1 pt-4">
                    {personalInfo.about.map((paragraph, index) => (
                        <p key={index} className="mb-6 text-base opacity-90 hover:opacity-100 transition-opacity duration-300">
                            {paragraph}
                        </p>
                    ))}

                    {/* 📄 CV Download Button (Dark Mode Style) */}
                    <a
                        href={personalInfo.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border border-white/20 text-text-muted font-medium 
                            px-6 py-3 hover:border-accent hover:text-accent hover:bg-accent/5 
                            w-max mt-8 transition-all duration-300 rounded-full"
                        aria-label="Download Resume"
                    >
                        <span>Resume</span>
                        <i className="fas fa-download text-sm transform group-hover:translate-y-0.5 transition-all duration-300 ml-1"></i>
                    </a>
                </div>

                {/* 2. Image Decoration (Dark Mode) */}
                <div className="relative flex justify-center md:justify-end order-1 md:order-2">
                    {/* Glass Card Container for Image */}
                    <div className="relative w-72 md:w-80 p-4 rounded-xl shadow-2xl glass-card border border-white/5">
                        
                        {/* Profile Image */}
                        <img
                            src={profileImg}
                            alt={personalInfo.name}
                            className="w-full relative z-10 rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300"
                            style={{ transform: 'scaleX(-1)' }}
                        />
                        
                        {/* Subtle background shapes for depth */}
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
                    {skills.map((grp) => (
                        // 🚨 Glass Panel for Skill Group
                        <div
                            key={grp.category}
                            className="h-56 flex flex-col glass-card border border-white/5 hover:border-accent/30 group hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Card Header (Darker Glass) */}
                            <div className="border-b border-white/10 p-3 flex justify-between items-center bg-white/5">
                                <span className="font-bold text-text-main text-sm tracking-wide">
                                    {grp.category}
                                </span>
                            </div>
                            
                            {/* Skill List */}
                            <div className="p-4 text-text-muted text-sm flex flex-col gap-y-2 overflow-y-auto aesthetic-scrollbar">
                                {grp.items.map((skill) => (
                                    <span key={skill} className="hover:text-accent transition-colors cursor-default flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;