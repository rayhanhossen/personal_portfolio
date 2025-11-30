import React, { useState, useRef, useEffect } from 'react';

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
    const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
    const [contentHeights, setContentHeights] = useState<Record<number, number>>({});
    const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

    // Toggle function (unchanged)
    const toggleExpansion = (id: number) => {
        setExpandedIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // EFFECT: Measure the full height of the description content once it renders (unchanged)
    useEffect(() => {
        const newHeights: Record<number, number> = {};

        featuredExperience.forEach(exp => {
            const ref = contentRefs.current[exp.id];

            if (ref && !contentHeights[exp.id]) {
                newHeights[exp.id] = ref.scrollHeight;
            }
        });

        if (Object.keys(newHeights).length > 0) {
            setContentHeights(prev => ({ ...prev, ...newHeights }));
        }
    }, [featuredExperience, contentHeights]);

    return (
        <div id="experience-preview" className="font-sans">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-xl md:text-2xl font-mono font-bold text-white flex items-baseline">
                    <span className="flex items-center">
                        <span className="text-green-200 mr-2 font-normal">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z" />
                            </svg>

                        </span>
                        <span className="text-primary mr-1 font-semibold italic tracking-tighter">Work Experience</span>
                    </span>
                </h2>
            </div>

            {/* Timeline Body */}
            <div className="relative border-l border-gray-600 space-y-12 pb-2">
                {featuredExperience.map((exp, index) => {
                    const isFirst = index === 0;
                    const isExpanded = !!expandedIds[exp.id];
                    // Fallback to a large, safe max-height (like 1000px) if not measured yet
                    const fullHeight = contentHeights[exp.id] || 1000;

                    // 💥 NEW: Normalize description to an array
                    const descriptionPoints = Array.isArray(exp.description) ? exp.description : [exp.description];

                    // 💥 NEW: Determine if there is content that needs to be hidden
                    const hasMoreContent = descriptionPoints.length > 2;

                    // 💥 NEW: The content that is *always* visible (first 2 items)
                    const initialContent = hasMoreContent ? descriptionPoints.slice(0, 2) : descriptionPoints;

                    // 💥 NEW: The content that is *hidden* initially (rest of the items)
                    const restOfContent = hasMoreContent ? descriptionPoints.slice(2) : [];

                    // ... Dot and Card Styling Logic remain the same ...
                    let dotClasses = 'absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-300 z-10';
                    if (isFirst) {
                        dotClasses += ' bg-green-400 border-white terminal-blink';
                    } else {
                        dotClasses += ' bg-[#282C33] border border-white group-hover:bg-primary';
                    }

                    let cardClasses = 'p-4 transition-colors bg-[#282C33] rounded-md';
                    if (isFirst) {
                        cardClasses += ' border border-green-400 shadow-[0_0_15px_rgba(27,172,129,0.5)]';
                    } else {
                        cardClasses += ' border border-white group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(199,120,221,1)]';
                    }

                    return (
                        <div key={exp.id} className="timeline-item pl-8 relative group">
                            <div className={dotClasses}></div>
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
                                    {/* --- 1. ALWAYS VISIBLE CONTENT (First 2 points) --- */}
                                    {/* We use a separate list/paragraph for initial content to ensure it's always rendered */}
                                    {Array.isArray(exp.description) ? (
                                        <ul className="list-disc list-inside text-gray-400 space-y-2 leading-relaxed mb-1">
                                            {initialContent.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        // This handles the case where description is just a string (no points to hide)
                                        <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                                    )}

                                    {/* --- 2. HIDING/MEASURING WRAPPER --- */}
                                    {/* This wrapper holds the 'rest of the content' and is used for measuring/transitioning */}
                                    {hasMoreContent && (
                                        <>
                                            {/* Measurement Wrapper: Always render full content for accurate height */}
                                            <div
                                                ref={el => { contentRefs.current[exp.id] = el }}
                                                className="content-inner-wrapper pt-2"
                                                // Style visibility to measure, but hide it visually if not expanded
                                                style={{
                                                    // Ensure content is measured at its full height
                                                    maxHeight: isExpanded ? `${fullHeight}px` : '0px',
                                                    // Add the smooth transition
                                                    transition: `max-height 500ms ease-in-out, opacity 500ms ease-in-out`,
                                                    // Control visual state
                                                    overflow: 'hidden',
                                                    opacity: isExpanded ? 1 : 0.01,
                                                }}
                                            >
                                                <ul className="list-disc list-inside text-gray-400 space-y-2 leading-relaxed mb-1">
                                                    {restOfContent.map((point, idx) => (
                                                        <li key={idx}>{point}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Show/Hide Button */}
                                            {/* <div className="flex justify-end pt-2">
                                                <button
                                                    onClick={() => toggleExpansion(exp.id)}
                                                    className="text-xs text-primary hover:text-white transition-colors font-mono tracking-widest uppercase"
                                                >
                                                    {isExpanded ? 
                                                        `Hide` : 
                                                        `Show More` // Accurate count of remaining items
                                                    }
                                                </button>
                                            </div> */}
                                            <div className="flex justify-end pt-4">
                                                <div className="flex items-baseline gap-2 font-mono text-base">
                                                    {/* 1. The stylized 'return' text */}
                                                    <span className="text-primary opacity-70 transition-opacity italic">
                                                        {isExpanded ? 'show' : 'show'}
                                                    </span>

                                                    {/* The main container for the stylized button */}
                                                    <button
                                                        onClick={() => toggleExpansion(exp.id)}
                                                        className="group" // Useful for hover effects on child elements
                                                    >

                                                        {/* 2. The main button text, with hover effect */}
                                                        <div className="flex items-center gap-2 text-white hover:text-green-400 transition-colors">
                                                            <span>
                                                                {isExpanded ?
                                                                    `less` :
                                                                    `more`
                                                                }
                                                            </span>
                                                            {/* --- ICON IMPLEMENTATION --- */}
                                                            {isExpanded ? (
                                                                // Up Arrow Icon (Visible when expanded = 'less')
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={2.5}
                                                                    stroke="currentColor"
                                                                    className="w-4 h-4"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                                </svg>
                                                            ) : (
                                                                // Down Arrow Icon (Visible when not expanded = 'more')
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth={2.5}
                                                                    stroke="currentColor"
                                                                    className="w-4 h-4"
                                                                >
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExperiencePreview;