import { projects } from '../data/content';
import type { Project } from '../types';

const Projects = () => {
    const completeProjects = projects.filter(p => p.category === 'professional');
    const smallProjects = projects.filter(p => p.category === 'small');

    // Helper function for specific thumbnails - Adjusted backgrounds to be neutral/cleaner
    const renderProjectThumbnail = (project: Project) => {
        // Shared class for all thumbnails to maintain consistent height and layout
        const baseClasses = "h-48 border-b border-gray-200 overflow-hidden relative flex items-center justify-center";
        
        if (project.title.includes("Kahoot")) {
            // Keep the Kahoot color, but ensure text is readable
            return (
                <div className={`${baseClasses} bg-[#46178F]`}>
                    <h1 className="text-white font-bold text-3xl italic">Kahoot!</h1>
                </div>
            );
        }
        if (project.title.includes("ProtectX")) {
            // Use a dark icon background against the light card
            return (
                <div className={`${baseClasses} bg-gray-700`}>
                    <i className="fas fa-shield-alt text-6xl text-accent"></i>
                </div>
            );
        }
        if (project.title === "Portfolio") {
            // Use a clean light background for the portfolio card
            return (
                <div className={`${baseClasses} bg-gray-100`}>
                    <div className="text-center">
                        <i className="fas fa-desktop text-4xl text-accent mb-2"></i>
                        <h1 className="text-gray-800 font-bold text-xl mt-2">Rayhan Portfolio</h1>
                    </div>
                </div>
            );
        }
        // Default thumbnail style
        return (
            <div className={`${baseClasses} bg-gray-200`}>
                <img
                    src={project.image}
                    alt={project.title}
                    // Reduced opacity transition for a softer look
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
            </div>
        );
    };

    const renderProjectCard = (project: Project) => (
        // 🚨 APPLIED GLASS CARD: Transforms the project item into a floating, light card
        <div 
            key={project.id} 
            className="group glass-card overflow-hidden hover:-translate-y-1 transition-transform duration-300"
        >
            {renderProjectThumbnail(project)}

            {/* Tech Stack Bar (Cleaned up, light separator) */}
            <div className="border-b border-gray-200 p-2 text-gray-500 text-xs font-medium uppercase tracking-wider">
                {project.tech.join(" · ")}
            </div>

            <div className="p-5">
                <h3 className="text-xl text-gray-800 font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                {/* Link Button (Clean, Accent color) */}
                {project.liveLink && project.liveLink !== "#" && (
                    <div className="flex gap-4">
                        <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-accent text-sm font-medium hover:underline flex items-center gap-1"
                            aria-label={`View live link for ${project.title}`}
                        >
                            View Project
                            <i className="fas fa-arrow-right text-xs"></i>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div id="projects-view" className="view-section pt-4">

            {/* Header */}
            <div className="mb-[32px]">
                <h2 className="text-3xl text-gray-800 font-semibold mb-2">
                    <span className="text-accent">/</span>projects
                </h2>
                <p className="text-gray-600 text-lg">A selection of my best work.</p>
            </div>

            {/* Complete Apps Section */}
            <section className="mb-[32px] relative">
                {/* 🚨 UPDATED HEADING: Clean, professional sans-serif title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-[18px] flex items-center tracking-tight">
                    <i className="fas fa-rocket text-accent mr-3"></i>
                    Professional Applications
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completeProjects.map(renderProjectCard)}
                </div>
            </section>

            {/* Small Projects Section */}
            <section className="mb-[32px] relative">
                {/* 🚨 UPDATED HEADING: Clean, professional sans-serif title */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-[18px] flex items-center tracking-tight">
                    <i className="fas fa-code text-accent mr-3"></i>
                    Coding Challenges & Snippets
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {smallProjects.map(renderProjectCard)}
                </div>
            </section>

        </div>
    );
};

export default Projects;