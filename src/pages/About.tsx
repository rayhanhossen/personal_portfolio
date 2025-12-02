import { personalInfo, skills } from '../data/content';
import profileImg from '../assets/profile-avatar.png';

const About = () => {
    return (
        <div className="font-sans">
            {/* Header */}
            <div className="mb-12 pt-4">
                <h2 className="text-3xl text-gray-800 font-bold mb-2">
                    <span className="text-accent">/</span>about-me
                </h2>
                <p className="text-gray-600 text-lg">Who am I?</p>
            </div>

            {/* Main Bio & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-9 items-start">
                
                {/* 1. Bio Text & Button */}
                <div className="text-gray-700 leading-relaxed order-2 md:order-1 pt-4">
                    {personalInfo.about.map((paragraph, index) => (
                        <p key={index} className="mb-6 text-base">
                            {paragraph}
                        </p>
                    ))}

                    {/* 📄 CV Download Button (Clean, Outlined Style) */}
                    <a
                        href={personalInfo.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border border-gray-400 text-gray-700 font-medium 
                            px-6 py-3 hover:border-accent hover:text-accent hover:bg-accent/5 
                            w-max mt-8 transition-all duration-300 rounded-xl"
                        aria-label="Download Resume"
                    >
                        <span>Resume</span>
                        <i className="fas fa-download text-sm transform group-hover:translate-y-0.5 transition-all duration-300 ml-1"></i>
                    </a>
                </div>

                {/* 2. Image Decoration (Minimalist) */}
                <div className="relative flex justify-center md:justify-end order-1 md:order-2">
                    <div className="relative w-72 md:w-80 p-4 rounded-xl shadow-2xl bg-white/70 backdrop-blur-sm">
                        
                        {/* Profile Image (No flip, centered) */}
                        <img
                            src={profileImg}
                            alt={personalInfo.name}
                            // Removed negative margin/flip for clean presentation
                            className="w-full relative z-10 rounded-lg shadow-md"
                        />
                        
                        {/* Subtle background shape (Optional: replace dots) */}
                        <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-accent/10 -translate-x-1/2 -translate-y-1/2 z-0"></div>
                        <div className="absolute bottom-0 right-0 w-2/5 h-2/5 rounded-full bg-gray-200 translate-x-1/3 translate-y-1/3 z-0"></div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <section className="mb-9 relative">
                {/* 🚨 UPDATED HEADING: Clean, professional sans-serif title */}
                <h3 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-4 flex items-center tracking-tight">
                    <i className="fas fa-cogs text-accent mr-3"></i>
                    Technical Skills
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills.map((grp) => (
                        // 🚨 APPLIED GLASS CARD: Transforms skills group into a floating glass panel
                        <div
                            key={grp.category}
                            className="h-56 flex flex-col glass-card group hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Header (Cleaned up: no traffic lights, just bold text) */}
                            <div className="border-b border-gray-200 p-3 flex justify-between items-center bg-gray-50/50">
                                <span className="font-bold text-gray-800 text-sm">
                                    {grp.category}
                                </span>
                            </div>
                            
                            {/* Skill List (Cleaned up: dark text, simple bullet/list style) */}
                            <div className="p-4 text-gray-700 text-sm flex flex-col gap-y-1 overflow-y-auto aesthetic-scrollbar">
                                {grp.items.map((skill) => (
                                    <span key={skill} className="hover:text-accent transition-colors cursor-default">
                                        &bull; {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fun Facts Section */}
            {/* <section className="mb-24 relative">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 flex items-center tracking-tight">
                    <i className="fas fa-lightbulb text-accent mr-3"></i>
                    Fun Facts
                </h3>

                <div className="flex gap-3 flex-wrap max-w-2xl">
                    {funFacts.map((fact) => (
                        // 🚨 Applied Glass Card (as a small badge)
                        <div 
                            key={fact.id} 
                            className="glass-card p-3 text-gray-700 text-sm hover:text-gray-900 transition-colors cursor-default shadow-sm"
                        >
                            {fact.text}
                        </div>
                    ))}
                </div>

                <div className="hidden md:block absolute right-0 top-0">
                    <div className="relative w-32 h-32">
                        <div className="absolute top-0 right-0 w-16 h-16 rounded-lg border border-gray-300"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-accent/20"></div>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default About;