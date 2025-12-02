import { projects } from '../data/content';

// --- Types (Ideally in ../types.ts) ---
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveLink: string;
  sourceLink?: string; // Made optional to prevent TS errors if missing
  cached?: boolean;
  category: 'professional' | 'small'; 
}

const Projects = () => {
    const completeProjects = projects.filter(p => p.category === 'professional');
    const smallProjects = projects.filter(p => p.category === 'small');

    // Helper: Project Thumbnail
    const renderProjectThumbnail = (project: Project) => (
        <div className="h-48 border-b border-white/10 overflow-hidden relative flex items-center justify-center bg-white/5 flex-none">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-100 transition-opacity duration-300"
            />
        </div>
    );

    // Helper: Project Card
    const renderProjectCard = (project: Project) => (
        <div
            key={project.id}
            // 🚨 ADDED: 'flex flex-col' ensures the card stretches vertically
            className="group glass-card border border-white/5 overflow-hidden -translate-y-1 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all duration-300 flex flex-col"
        >
            {renderProjectThumbnail(project)}

            {/* Tech Stack Bar */}
            {/* 🚨 ADDED: 'flex-none' prevents this from squishing */}
            <div className="border-b border-white/10 p-2 bg-white/5 text-text-muted text-xs font-medium uppercase tracking-wider flex-none">
                <div className="w-fit mx-auto max-w-full text-left">
                    {project.tech.join(" · ")}
                </div>
            </div>

            {/* Content Body */}
            {/* 🚨 ADDED: 'flex-grow' forces this section to fill remaining height */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl text-text-main font-semibold mb-3 transition-colors">
                    {project.title}
                </h3>
                
                {/* Description pushes buttons to bottom */}
                <p className="text-text-muted text-sm mb-4 leading-relaxed flex-grow">
                    {project.description}
                </p>

                {/* Links Container */}
                <div className="flex items-center gap-4 mt-auto pt-2">
                    
                    {/* 1. Live Demo */}
                    {project.liveLink && project.liveLink !== "#" && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent text-sm font-medium hover:text-white transition-colors flex items-center gap-2 group/link"
                            aria-label={`View live demo for ${project.title}`}
                        >
                            <span>Live Demo</span>
                            <i className="fas fa-arrow-right text-xs transform group-hover/link:translate-x-1 transition-transform"></i>
                        </a>
                    )}

                    {/* 2. Source Code */}
                    {project.sourceLink && project.sourceLink !== "#" && (
                        <a
                            href={project.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 text-sm font-medium hover:text-accent transition-colors flex items-center gap-2 group/code"
                            aria-label={`View source code for ${project.title}`}
                        >
                            <i className="fab fa-github text-sm transition-transform group-hover/code:scale-110"></i>
                            <span>Source Code</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div id="projects-view" className="view-section pt-2 animate-fadeIn font-sans">

            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl text-text-main font-bold mb-2">
                    <span className="text-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">/</span>projects
                </h2>
                <p className="text-text-muted text-lg">A selection of my best work.</p>
            </div>

            {/* 1. Professional Apps */}
            <section className="mb-12 relative">
                <h3 className="text-2xl md:text-2xl font-semibold text-text-main mb-6 flex items-center tracking-tight">
                    <i className="fas fa-rocket text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Professional Applications
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completeProjects.map(renderProjectCard)}
                </div>
            </section>

            {/* 2. Small Projects / Snippets */}
            <section className="mb-8 relative">
                <h3 className="text-2xl md:text-2xl font-semibold text-text-main mb-6 flex items-center tracking-tight">
                    <i className="fas fa-code text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Coding Challenges & Snippets
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {smallProjects.map(renderProjectCard)}
                </div>
            </section>

        </div>
    );
};

export default Projects;