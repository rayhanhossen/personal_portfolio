import React, { useState, useRef, useEffect } from 'react';

// --- Type Definitions (Kept Unchanged) ---
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

    const toggleExpansion = (id: number) => {
        setExpandedIds(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

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
            {/* 🚨 UPDATED: Clean Heading */}
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-baseline">
                    <span className="text-accent mr-2">
                        <i className="fas fa-briefcase"></i>
                    </span>
                    <span className="tracking-tight">Work Experience</span>
                </h2>
            </div>

            {/* 🌬️ Timeline Body (Light Gray Line) */}
            <div className="relative border-l border-gray-300 space-y-10 pb-2">
                {featuredExperience.map((exp, index) => {
                    const isFirst = index === 0;
                    const isExpanded = !!expandedIds[exp.id];
                    const fullHeight = contentHeights[exp.id] || 1000;

                    const descriptionPoints = Array.isArray(exp.description) ? exp.description : [exp.description];

                    const hasMoreContent = descriptionPoints.length > 2;
                    const initialContent = hasMoreContent ? descriptionPoints.slice(0, 2) : descriptionPoints;
                    const restOfContent = hasMoreContent ? descriptionPoints.slice(2) : [];

                    // 🚨 UPDATED: Dot Styling (Clean, Accent-focused)
                    let dotClasses = 'absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-300 z-10 shadow-md';
                    if (isFirst) {
                        // Highlight the latest experience with the accent color
                        dotClasses += ' bg-accent border-2 border-white dot-blink-animation';
                    } else {
                        // Subtle gray dot for past experiences
                        dotClasses += ' bg-gray-400 border border-white group-hover:bg-accent/80';
                    }

                    // 🚨 UPDATED: Card Styling (The core Glass Card)
                    // We apply 'glass-card' and add minimal lift/shadow on hover
                    const cardClasses = 'p-6 transition-all duration-300 glass-card';
                    
                    return (
                        <div key={exp.id} className="timeline-item pl-8 relative group">
                            <div className={dotClasses}></div>
                            <div className={cardClasses}>
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    {/* Role: Prominent dark text */}
                                    <h3 className="text-gray-900 font-semibold text-xl">{exp.role}</h3>
                                    {/* Period: Subtle gray text */}
                                    <span className="text-gray-500 text-sm mt-1 md:mt-0">{exp.period}</span>
                                </div>
                                
                                <p className="text-accent font-medium text-sm mb-4">
                                    {exp.company}
                                    <span className="text-gray-500 ml-3 text-xs">
                                        <i className="fas fa-map-marker-alt"></i> {exp.location}
                                    </span>
                                </p>

                                <div className="text-gray-700 text-sm">
                                    {/* --- 1. ALWAYS VISIBLE CONTENT --- */}
                                    {Array.isArray(exp.description) ? (
                                        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed mb-1 pl-4">
                                            {initialContent.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                                    )}

                                    {/* --- 2. HIDING/MEASURING WRAPPER --- */}
                                    {hasMoreContent && (
                                        <>
                                            <div
                                                ref={el => { contentRefs.current[exp.id] = el }}
                                                className="content-inner-wrapper pt-2"
                                                style={{
                                                    maxHeight: isExpanded ? `${fullHeight}px` : '0px',
                                                    transition: `max-height 500ms ease-in-out, opacity 500ms ease-in-out`,
                                                    overflow: 'hidden',
                                                    opacity: isExpanded ? 1 : 0.01,
                                                }}
                                            >
                                                <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed mb-1 pl-4">
                                                    {restOfContent.map((point, idx) => (
                                                        <li key={idx}>{point}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* 🚨 UPDATED: Show/Hide Button (Minimalist Link) */}
                                            <div className="flex justify-end pt-4">
                                                <button
                                                    onClick={() => toggleExpansion(exp.id)}
                                                    className="flex items-center gap-1 font-medium text-sm text-accent hover:underline transition-colors"
                                                >
                                                    <span>{isExpanded ? `Show Less` : `Show More`}</span>
                                                    {isExpanded ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    )}
                                                </button>
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