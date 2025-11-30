import React from 'react';
import { Link } from 'react-router-dom';

// --- Type Definitions ---
interface Experience {
    id: number;
    role: string;
    company: string;
    location: string;
    period: string;
    description: string[] | string;
}

interface ExperiencePreviewProps {
    featuredExperience: Experience[];
}


const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ featuredExperience }) => {

    // Helper component for the decorative cursor/pipe in the heading
    const PipeCursor: React.FC = () => (
        <span className="text-white flex items-center">
            <svg width="10" height="20" viewBox="0 0 12 60" fill="none">
                <path d="M10 2 Q2 30 10 58" stroke="currentColor" stroke-width="5" fill="none"
                    className="h-3 md:h-3" />
            </svg>
            <svg width="10" height="20" viewBox="0 0 12 60" fill="none">
                <path d="M2 2 Q10 30 2 58" stroke="currentColor" stroke-width="5" fill="none"
                    className="h-3 md:h-3" />
            </svg>
            <span className="text-white-400 animate-pulse">:</span>
        </span>
    );

    return (
        <div id="experience-preview">
            <div className="flex justify-between items-end mb-12">
                {/* Heading */}
                <h2 className="text-xl md:text-2xl font-mono font-bold text-white flex items-center">
                    <span className="text-green-400 mr-2 italic font-normal">def</span>
                    <span className="text-primary font-semibold">experience</span>
                    <PipeCursor />
                </h2>
            </div>

            {/* Timeline Body */}
            <div className="relative border-l border-gray-600 ml-3 md:ml-6 space-y-12 pb-2">
                {featuredExperience.map((exp, index) => {
                    // Determine styling based on the position in the timeline
                    const isFirst = index === 0;
                    
                    // Dot Styling Logic
                    let dotClasses = 'absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-300 z-10';
                    if (isFirst) {
                        dotClasses += ' bg-green-400 border-white terminal-blink'; // Currently active
                    } else {
                        dotClasses += ' bg-[#282C33] border border-white group-hover:bg-primary';
                    }

                    // Card Styling Logic
                    let cardClasses = 'p-4 transition-colors bg-[#282C33] rounded-md';
                    if (isFirst) {
                        cardClasses += ' border border-green-400 shadow-[0_0_15px_rgba(27,172,129,0.5)]';
                    } else {
                        cardClasses += ' border border-white group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(199,120,221,1)]';
                    }

                    return (
                        // Timeline Item Container
                        <div key={exp.id} className="timeline-item pl-8 relative group">

                            {/* Dot */}
                            <div className={dotClasses}></div>

                            {/* Card */}
                            <div className={cardClasses}>
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    <h3 className="text-white font-medium text-xl">{exp.role}</h3>
                                    <span className="text-gray-500 text-sm">{exp.period}</span>
                                </div>
                                <p className="text-primary text-sm mb-4">
                                    {exp.company}
                                    <span className="text-gray-500 ml-2 text-xs">
                                        <i className="fas fa-map-marker-alt"></i> {exp.location}
                                    </span>
                                </p>

                                <div className="text-gray-400 text-sm">
                                    {Array.isArray(exp.description) ? (
                                        <>
                                            {/* Display UL for list items */}
                                            <ul className="list-disc list-inside text-gray-400 space-y-2 leading-relaxed mb-1">
                                                {/* Show ONLY the first item in the preview */}
                                                {exp.description.slice(0, 2).map((point, idx) => (
                                                    <li key={idx}>{point}</li>
                                                ))}
                                            </ul>

                                            {/* Show the "Show More" button if there's more than 1 item */}
                                            {exp.description.length > 2 && (
                                                <div className="flex justify-end pt-1">
                                                    {/* NOTE: Actual state management for showing more is omitted for brevity but goes here */}
                                                    <button className="text-xs text-primary hover:text-white transition-colors">
                                                        Show More ({exp.description.length - 2})
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        // Display P tag for single string description
                                        <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile View All Link */}
            <div className="flex justify-start mt-8 md:hidden">
                <Link to="/experience" className="group">
                    <div className="flex items-baseline gap-2 font-mono text-base">
                        <span className="text-primary opacity-70 transition-opacity italic">return</span>
                        <div className="flex items-center gap-2 text-white hover:text-green-400 transition-colors">
                            <span>view_all</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ExperiencePreview;