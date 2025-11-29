import { projects } from '../data/content';
import type { Project } from '../types';

const Projects = () => {
    const completeProjects = projects.filter(p => p.category === 'professional');
    const smallProjects = projects.filter(p => p.category === 'small');

    // Helper function for specific thumbnails
    const renderProjectThumbnail = (project: Project) => {
        if (project.title.includes("Kahoot")) {
            return (
                <div className="h-48 bg-[#46178F] border-b border-gray-600 overflow-hidden relative flex items-center justify-center">
                    <h1 className="text-white font-bold text-3xl italic">Kahoot!</h1>
                </div>
            );
        }
        if (project.title.includes("ProtectX")) {
            return (
                <div className="h-48 bg-[#333] border-b border-gray-600 overflow-hidden relative flex items-center justify-center">
                    <i className="fas fa-shield-alt text-6xl text-green-500"></i>
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            );
        }
        if (project.title === "Portfolio") {
            return (
                <div className="h-48 bg-[#282C33] border-b border-gray-600 overflow-hidden relative flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-primary text-lg font-mono">...</div>
                        <h1 className="text-white font-bold text-xl mt-2">Rayhan Portfolio</h1>
                    </div>
                </div>
            );
        }
        return (
            <div className={`h-48 border-b border-gray-600 overflow-hidden relative ${project.title.includes('Kotik') ? 'bg-[#111]' : 'bg-[#333]'}`}>
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
            </div>
        );
    };

    return (
        <div id="projects-view" className="view-section">

            {/* Header */}
            <div className="mb-16">
                <h2 className="text-3xl text-white font-semibold mb-4">
                    <span className="text-primary">/</span>projects
                </h2>
                <p className="text-gray-400">List of my projects</p>
            </div>

            {/* Complete Apps */}
            <section className="mb-20 relative">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-8 flex items-center">
                    <span className="text-primary mr-2">def</span>
                    <span className="text-yellow-400">professional_projects</span>
                    <span className="text-gray-400">()</span>
                    <span className="text-gray-400 animate-pulse">:</span>
                </h3>

                <div className="absolute -top-10 -right-4 w-20 h-20 dots-pattern opacity-50 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completeProjects.map((project) => (
                        <div key={project.id} className="border border-gray-600 hover:border-white transition-colors group">
                            {renderProjectThumbnail(project)}

                            <div className="border-b border-gray-600 p-2 text-gray-400 text-sm">
                                {project.tech.join(" ")}
                            </div>

                            <div className="p-4">
                                <h3 className="text-2xl text-white font-medium mb-4">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                
                                {/* CONDITIONAL RENDERING LOGIC */}
                                {project.liveLink && project.liveLink !== "#" && (
                                    <div className="flex gap-4">
                                        <a 
                                            href={project.liveLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-primary text-sm hover:underline"
                                        >
                                            Link {'->'}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Small Projects */}
            <section className="mb-24 relative">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-8 flex items-center">
                    <span className="text-primary mr-2">def</span>
                    <span className="text-yellow-400">small_projects</span>
                    <span className="text-gray-400">()</span>
                    <span className="text-gray-400 animate-pulse">:</span>
                </h3>

                <div className="absolute -top-10 -right-4 w-20 h-20 dots-pattern opacity-50 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {smallProjects.map((project) => (
                        <div key={project.id} className="border border-gray-600 hover:border-white transition-colors bg-[#282C33]">
                            <div className="border-b border-gray-600 p-2 text-gray-400 text-sm">
                                {project.tech.join(" ")}
                            </div>

                            <div className="p-4">
                                <h3 className="text-2xl text-white font-medium mb-2">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                
                                {/* CONDITIONAL RENDERING LOGIC */}
                                {project.liveLink && project.liveLink !== "#" && (
                                    <a 
                                        href={project.liveLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-primary text-sm hover:underline"
                                    >
                                        Link {'->'}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default Projects;