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

        return (
            <div
                key={project.id}
                className="group flex flex-col glass-card bg-glass-overlay backdrop-blur-md border border-white/10 rounded-xl overflow-hidden 
                           transition-all duration-300 
                           shadow-none hover:shadow-md hover:-translate-y-2 hover:border-accent/40"
            >
                {renderProjectThumbnail(project)}

                <div className="border-b border-white/5 p-2 flex-none">
                    {(() => {
                        const totalCharCount = project.tech.join('').length;
                        const alignmentClass = totalCharCount > 30 ? 'justify-start' : 'justify-center';

                        return (
                            <div className={`flex flex-wrap gap-1.5 ${alignmentClass}`}>
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-[10px] font-mono font-bold tracking-wide px-2 py-1 rounded-md text-accent border border-accent/20 bg-transparent shadow-[0_0_10px_rgba(34,211,238,0.05)]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        );
                    })()}
                </div>

                <div className="p-5 flex flex-col flex-grow relative">
                    <h3 className="text-xl text-text-main font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                        {project.title}
                    </h3>

                    <div className="mb-6 flex-grow">
                        <div
                            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-[4.5rem]'
                                }`}
                        >
                            <p className="text-slate-300 text-sm leading-relaxed font-light">
                                {project.description}
                            </p>
                        </div>

                        {shouldTruncate && (
                            <button
                                onClick={() => toggleExpand(project.id)}
                                className="mt-4 text-[10px] font-bold uppercase tracking-widest text-accent/70 hover:text-accent flex items-center gap-2 transition-colors border-b border-transparent hover:border-accent/50 pb-0.5 w-max focus:outline-none"
                            >
                                <span>{isExpanded ? 'Collapse' : 'Read Full Details'}</span>
                                <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[8px]`}></i>
                            </button>
                        )}
                    </div>

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

    /**
     * Logic for the Dynamic Filler Card
     * Grid Layout: 1 col (mobile), 2 cols (md), 3 cols (lg)
     */
    const renderFillerCard = (listLength: number) => {
        // MD (Tablet - 2 cols): Needs filler if length is odd (1 remainder)
        const mdNeedsFiller = listLength % 2 !== 0;

        // LG (Desktop - 3 cols): 
        // If remainder 1: Needs filler spanning 2 cols
        // If remainder 2: Needs filler spanning 1 col
        // If remainder 0: No filler
        const lgRemainder = listLength % 3;
        const lgNeedsFiller = lgRemainder !== 0;

        // If neither needs filler, return null
        if (!mdNeedsFiller && !lgNeedsFiller) return null;

        return (
            <div
                className={`
                    rounded-xl border border-dashed border-white/10 bg-white/5 
                    flex-col items-center justify-center text-center p-8 min-h-[400px]
                    
                    /* Base State: Hidden (Mobile) */
                    hidden

                    /* Tablet Logic: Applies display:flex if needed */
                    ${mdNeedsFiller ? 'md:flex md:col-span-1' : 'md:hidden'}

                    /* Desktop Logic: Applies display:flex if needed */
                    ${lgNeedsFiller ? 'lg:flex' : 'lg:hidden'}
                    ${lgRemainder === 1 ? 'lg:col-span-2' : ''}
                    ${lgRemainder === 2 ? 'lg:col-span-1' : ''}
                `}
            >
                <div className="flex flex-col items-center gap-4 opacity-50">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                        <i className="fas fa-hammer text-2xl text-accent/50"></i>
                    </div>
                    <div>
                        <span className="text-text-muted font-mono font-bold tracking-widest text-xs uppercase block mb-1 animate-pulse">
                            WORK_IN_PROGRESS
                        </span>
                        <span className="text-[10px] text-slate-200 font-light tracking-wide">
                            More projects coming soon...
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div id="projects-view" className="pt-32 relative z-10 view-section animate-fadeIn font-sans">

            {/* --- HEADER --- */}
            {/* <div className="pt-24 md:pt-32 mb-8 relative z-10">
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
            </div> */}

            {/* 1. Professional Apps */}
            <section className="mb-12 relative">
                <h3 className="text-xl md:text-2xl font-semibold text-text-main mb-8 flex items-center tracking-tight">
                    <i className="fas fa-rocket text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Professional Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completeProjects.map(renderProjectCard)}
                    {/* DYNAMIC FILLER */}
                    {renderFillerCard(completeProjects.length)}
                </div>
            </section>

            {/* 2. Coding Challenges */}
            <section className="mb-12 relative">
                <h3 className="text-xl md:text-2xl font-semibold text-text-main mb-8 flex items-center tracking-tight">
                    <i className="fas fa-terminal text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Tools & Snippets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {smallProjects.map(renderProjectCard)}
                    {/* DYNAMIC FILLER */}
                    {renderFillerCard(smallProjects.length)}
                </div>
            </section>

            <style>{`
                /* Minimalist subtle hover shadow for dark glass-cards */
                .hover\:shadow-md:hover {
                    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
};

export default Projects;