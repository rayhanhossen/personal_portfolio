import { useState, useRef, useEffect } from 'react';
import { projects } from '../data/content';
import { Helmet } from 'react-helmet-async';

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
    const [contentHeights, setContentHeights] = useState<Record<number, number>>({});
    const contentRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

    const completeProjects = projects.filter(p => p.category === 'professional');
    const smallProjects = projects.filter(p => p.category === 'small');

    useEffect(() => {
        const newHeights: Record<number, number> = {};
        let hasChanges = false;

        projects.forEach(project => {
            const ref = contentRefs.current[project.id];
            if (ref) {
                const height = ref.scrollHeight;
                if (contentHeights[project.id] !== height) {
                    newHeights[project.id] = height;
                    hasChanges = true;
                }
            }
        });

        if (hasChanges) {
            setContentHeights(prev => ({ ...prev, ...newHeights }));
        }
    }, [contentHeights]);

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
                className="group flex flex-col glass-card bg-glass-overlay backdrop-blur-md border border-white/[0.12] rounded-xl overflow-hidden 
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
                                        className="text-[10px] font-mono font-medium tracking-wide px-2.5 py-1 rounded-full text-slate-300 bg-white/5 border border-white/10"
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
                            style={{
                                maxHeight: isExpanded ? `${contentHeights[project.id] || 500}px` : '4.5rem',
                                transition: 'max-height 500ms ease-in-out',
                                overflow: 'hidden'
                            }}
                        >
                            <p
                                ref={el => { contentRefs.current[project.id] = el; }}
                                className="text-slate-300 text-sm leading-relaxed font-light"
                            >
                                {project.description}
                            </p>
                        </div>

                        {shouldTruncate && (
                            <button
                                onClick={() => toggleExpand(project.id)}
                                className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400/80 hover:text-accent flex items-center gap-2 transition-colors border-b border-transparent hover:border-accent/50 pb-0.5 w-max focus:outline-none"
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

    // Helper: Tool Card (No Image, GitHub-style)
    const renderToolCard = (project: Project) => {
        return (
            <div
                key={project.id}
                className="group flex flex-col glass-card bg-glass-overlay backdrop-blur-md border border-white/[0.12] rounded-xl overflow-hidden 
                       transition-all duration-300 p-6 relative
                       shadow-none hover:shadow-[0_4px_20px_-5px_rgba(34,211,238,0.2)] hover:-translate-y-1 hover:border-accent/40"
            >
                {/* Background Glow Effect on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent/80 group-hover:text-accent group-hover:border-accent/30 transition-colors">
                        <i className={`fas ${project.title.toLowerCase().includes('bot') ? 'fa-robot' : 'fa-code'} text-lg`}></i>
                    </div>

                    <div className="flex gap-3">
                        {project.sourceLink && project.sourceLink !== "#" && (
                            <a
                                href={project.sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                                aria-label="Source Code"
                            >
                                <i className="fab fa-github text-lg transition-transform hover:scale-110"></i>
                            </a>
                        )}
                        {project.liveLink && project.liveLink !== "#" && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-accent transition-colors flex items-center justify-center"
                                aria-label="Live Demo"
                            >
                                <i className="fas fa-external-link-alt text-lg transition-transform hover:scale-110"></i>
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-xl text-text-main font-bold mb-3 group-hover:text-accent transition-colors duration-300 relative z-10">
                    {project.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed font-light flex-grow mb-6 relative z-10">
                    {project.description}
                </p>

                <div className="mt-auto relative z-10 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="text-[10px] font-mono font-medium tracking-wide px-2.5 py-1 rounded-full text-slate-300 bg-white/5 border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
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
            <Helmet>
                <meta name="description" content="Explore Rayhan Hossen's portfolio of professional projects, including AI-powered systems, fintech solutions, and enterprise software." />
                <meta name="keywords" content="Rayhan Hossen Projects, Software Engineering Portfolio, AI Systems, Django Projects, FastAPI Apps" />
            </Helmet>



            {/* 1. Professional Apps */}
            <section className="mb-12 relative">
                <h3 className="text-2xl font-semibold text-text-main mb-8 flex items-center tracking-tight">
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
                <h3 className="text-2xl font-semibold text-text-main mb-8 flex items-center tracking-tight">
                    <i className="fas fa-terminal text-accent mr-3 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"></i>
                    Tools & Snippets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {smallProjects.map(renderToolCard)}
                    {/* DYNAMIC FILLER */}
                    {renderFillerCard(smallProjects.length)}
                </div>
            </section>



        </div>
    );
};

export default Projects;