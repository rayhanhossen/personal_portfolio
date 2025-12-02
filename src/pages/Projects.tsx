import { projects } from '../data/content';
import type { Project } from '../types';

const Projects = () => {
    const completeProjects = projects.filter(p => p.category === 'professional');
    const smallProjects = projects.filter(p => p.category === 'small');

    // Helper function for specific thumbnails - Adapted for Dark Mode
    const renderProjectThumbnail = (project: Project) => {
        const baseClasses = "h-48 border-b border-white/10 overflow-hidden relative flex items-center justify-center";
        
        if (project.title.includes("Kahoot")) {
            return (
                <div className={`${baseClasses} bg-[#46178F]`}>
                    <h1 className="text-white font-bold text-3xl italic drop-shadow-md">Kahoot!</h1>
                </div>
            );
        }
        if (project.title.includes("ProtectX")) {
            return (
                <div className={`${baseClasses} bg-slate-900`}>
                    <i className="fas fa-shield-alt text-6xl text-accent drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"></i>
                </div>
            );
        }
        if (project.title === "Portfolio") {
            return (
                <div className={`${baseClasses} bg-white/5`}>
                    <div className="text-center">
                        <i className="fas fa-desktop text-4xl text-accent mb-2"></i>
                        <h1 className="text-text-main font-bold text-xl mt-2">Rayhan Portfolio</h1>
                    </div>
                </div>
            );
        }
        // Default thumbnail style
        return (
            <div className={`${baseClasses} bg-white/5`}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
            </div>
        );
    };

    const renderProjectCard = (project: Project) => (
        // 🚨 APPLIED GLASS CARD: Floating glass panel with neon hover effects
        <div 
            key={project.id} 
            className="group glass-card border border-white/5 overflow-hidden hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300"
        >
            {renderProjectThumbnail(project)}

            {/* Tech Stack Bar (Dark separator) */}
            <div className="border-b border-white/10 p-2 bg-white/5 text-text-muted text-xs font-medium uppercase tracking-wider">
                {project.tech.join(" · ")}
            </div>

            <div className="p-5">
                <h3 className="text-xl text-text-main font-semibold mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">{project.description}</p>
                
                {/* Link Button */}
                {project.liveLink && project.liveLink !== "#" && (
                    <div className="flex gap-4">
                        <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-accent text-sm font-medium hover:text-white transition-colors flex items-center gap-1 group/link"
                            aria-label={`View live link for ${project.title}`}
                        >
                            View Project
                            <i className="fas fa-arrow-right text-xs transform group-hover/link:translate-x-1 transition-transform"></i>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div id="projects-view" className="view-section pt-4 animate-fadeIn">

            {/* Header */}
            <div className="mb-[32px]">
                <h2 className="text-3xl text-text-main font-bold mb-2">
                    <span className="text-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">/</span>projects
                </h2>
                <p className="text-text-muted text-lg">A selection of my best work.</p>
            </div>

            {/* Complete Apps Section */}
            <section className="mb-[32px] relative">
                <h3 className="text-2xl md:text-2xl font-semibold text-text-main mb-[18px] flex items-center tracking-tight">
                    <i className="fas fa-rocket text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Professional Applications
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completeProjects.map(renderProjectCard)}
                </div>
            </section>

            {/* Small Projects Section */}
            <section className="mb-[32px] relative">
                <h3 className="text-2xl md:text-2xl font-semibold text-text-main mb-[18px] flex items-center tracking-tight">
                    <i className="fas fa-code text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
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