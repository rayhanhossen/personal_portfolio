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
            {/* 🚨 UPDATED: Clean Heading (Dark Mode) */}
            <div className="flex justify-between items-end mb-[18px]">
                <h2 className="text-xl md:text-2xl font-semibold text-text-main flex items-baseline">
                    <span className="text-accent mr-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                        <i className="fas fa-briefcase"></i>
                    </span>
                    <span className="tracking-tight">Work Experience</span>
                </h2>
            </div>

            {/* 🌬️ Timeline Body (Dark Line) */}
            <div className="relative border-l border-white/10 space-y-4 pb-2">
                {featuredExperience.map((exp, index) => {
                    const isFirst = index === 0;
                    const isExpanded = !!expandedIds[exp.id];
                    const fullHeight = contentHeights[exp.id] || 1000;

                    const descriptionPoints = Array.isArray(exp.description) ? exp.description : [exp.description];

                    const hasMoreContent = descriptionPoints.length > 2;
                    const initialContent = hasMoreContent ? descriptionPoints.slice(0, 2) : descriptionPoints;
                    const restOfContent = hasMoreContent ? descriptionPoints.slice(2) : [];

                    // 🚨 UPDATED: Dot Styling (Dark Mode & Neon Glow)
                    let dotClasses = 'absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-300 z-10 shadow-md';
                    if (isFirst) {
                        // Highlight: Accent color with a dark border to 'cut' into the line
                        dotClasses += ' bg-accent border-2 border-bg shadow-[0_0_10px_rgba(34,211,238,0.6)] dot-blink-animation';
                    } else {
                        // Past: Dark slate dot with subtle border
                        dotClasses += ' bg-slate-700 border border-slate-800 group-hover:bg-accent/80 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.4)]';
                    }

                    // 🚨 UPDATED: Card Styling (Dark Glass Card)
                    const cardClasses = 'p-6 transition-all duration-300 glass-card border border-white/5 hover:border-accent/30 hover:bg-white/5';
                    
                    return (
                        <div key={exp.id} className="timeline-item pl-8 relative group">
                            <div className={dotClasses}></div>
                            <div className={cardClasses}>
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    {/* Role: Prominent White Text */}
                                    <h3 className="text-text-main font-semibold text-xl group-hover:text-accent transition-colors">{exp.role}</h3>
                                    {/* Period: Muted Text */}
                                    <span className="text-text-muted text-sm mt-1 md:mt-0 font-medium">{exp.period}</span>
                                </div>
                                
                                <p className="text-accent font-medium text-sm mb-4">
                                    {exp.company}
                                    <span className="text-text-muted ml-3 text-xs opacity-70">
                                        <i className="fas fa-map-marker-alt"></i> {exp.location}
                                    </span>
                                </p>

                                <div className="text-slate-300 text-sm">
                                    {/* --- 1. ALWAYS VISIBLE CONTENT --- */}
                                    {Array.isArray(exp.description) ? (
                                        <ul className="list-disc list-inside text-slate-300 space-y-2 leading-relaxed mb-1 pl-4 marker:text-accent/50">
                                            {initialContent.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-slate-300 leading-relaxed">{exp.description}</p>
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
                                                <ul className="list-disc list-inside text-slate-300 space-y-2 leading-relaxed mb-1 pl-4 marker:text-accent/50">
                                                    {restOfContent.map((point, idx) => (
                                                        <li key={idx}>{point}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* 🚨 UPDATED: Show/Hide Button */}
                                            <div className="flex justify-end pt-4">
                                                <button
                                                    onClick={() => toggleExpansion(exp.id)}
                                                    className="flex items-center gap-1 font-medium text-sm text-accent hover:text-white transition-colors"
                                                >
                                                    <span>{isExpanded ? `Show Less` : `Show More`}</span>
                                                    {isExpanded ? (
                                                        <i className="fas fa-chevron-up text-xs"></i>
                                                    ) : (
                                                        <i className="fas fa-chevron-down text-xs"></i>
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