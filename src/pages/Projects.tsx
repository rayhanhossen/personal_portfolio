import { useState } from 'react';
import { projects } from '../data/content';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveLink: string;
  sourceLink?: string; 
  cached?: boolean;
  category: 'professional' | 'small'; 
}

const Projects = () => {
    const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});

    const completeProjects = projects.filter(p => p.category === 'professional');
    const smallProjects = projects.filter(p => p.category === 'small');

    const toggleExpand = (id: number) => {
        setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Helper: Project Thumbnail
    const renderProjectThumbnail = (project: Project) => (
        <div className="h-48 border-b border-white/10 overflow-hidden relative flex items-center justify-center bg-black/50 flex-none group/image">
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
        </div>
    );

    // Helper: Project Card
    const renderProjectCard = (project: Project) => {
        const isExpanded = !!expandedIds[project.id];
        const maxLength = 120;
        const shouldTruncate = project.description.length > maxLength;
        
        const displayDescription = isExpanded || !shouldTruncate
            ? project.description 
            : `${project.description.slice(0, maxLength)}...`;

        return (
            <div
                key={project.id}
                className="group flex flex-col glass-card bg-glass-overlay backdrop-blur-md border border-white/10 rounded-xl overflow-hidden 
                           transition-all duration-300 
                           hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
            >
                {renderProjectThumbnail(project)}

                {/* 🚨 TECH STACK: Centered (justify-center) */}
                <div className="border-b border-white/5 p-3 bg-white/5 flex-none">
                    <div className="flex flex-wrap justify-center gap-2">
                        {project.tech.map((tech, i) => (
                            <span key={i} className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded text-accent/80 bg-accent/5 border border-accent/10">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 🚨 CONTENT BODY: Left Aligned (Standard) */}
                <div className="p-5 flex flex-col flex-grow relative">
                    
                    <h3 className="text-xl text-text-main font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                    </h3>
                    
                    <div className="mb-6 flex-grow">
                        <p className="text-slate-300 text-sm leading-relaxed font-light transition-all duration-300">
                            {displayDescription}
                        </p>

                        {shouldTruncate && (
                            <button
                                onClick={() => toggleExpand(project.id)}
                                className="mt-2 text-xs font-bold uppercase tracking-wider text-accent/70 hover:text-accent flex items-center gap-1 transition-colors focus:outline-none"
                            >
                                <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                                <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px]`}></i>
                            </button>
                        )}
                    </div>

                    {/* Links - Standard Alignment */}
                    <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-4">
                        {project.liveLink && project.liveLink !== "#" && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent text-sm font-semibold hover:text-white transition-colors flex items-center gap-2 group/link"
                            >
                                <span>Live Demo</span>
                                <i className="fas fa-external-link-alt text-xs transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"></i>
                            </a>
                        )}

                        {project.sourceLink && project.sourceLink !== "#" && (
                            <a
                                href={project.sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-muted text-sm font-medium hover:text-accent transition-colors flex items-center gap-2 group/code ml-auto"
                            >
                                <i className="fab fa-github text-sm transition-transform group-hover/code:scale-110"></i>
                                <span>Source</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div id="projects-view" className="view-section animate-fadeIn font-sans">
            
            {/* --- HEADER --- */}
            <div className="mb-12 relative z-10">
                <div className="absolute -top-10 -left-10 text-[100px] text-accent/5 opacity-20 pointer-events-none select-none z-0">
                    <i className="fas fa-laptop-code"></i>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2 relative z-10">
                    <span className="text-accent font-mono drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">/</span>
                    <span className="text-transparent bg-clip-text bg-text-gradient">projects</span>
                </h2>
                <p className="text-text-muted text-lg font-light tracking-wide relative z-10">
                    A selection of my best work.
                </p>
            </div>

            {/* 1. Professional Apps */}
            <section className="mb-16 relative">
                <h3 className="text-xl md:text-2xl font-semibold text-text-main mb-8 flex items-center tracking-tight">
                    <i className="fas fa-rocket text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Professional Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completeProjects.map(renderProjectCard)}
                </div>
            </section>

            {/* 2. Coding Challenges */}
            <section className="mb-8 relative">
                <h3 className="text-xl md:text-2xl font-semibold text-text-main mb-8 flex items-center tracking-tight">
                    <i className="fas fa-terminal text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
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