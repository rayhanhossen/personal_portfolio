import React, { useState, useRef, useEffect, useMemo } from 'react';

// --- Type Definitions ---
export interface Experience {
    id: number;
    role: string;
    company: string;
    location: string;
    period: string;
    startDate: string; // Format: "YYYY-MM" (e.g., "2022-03")
    endDate: string;   // Format: "YYYY-MM" or "Present"
    description: string[] | string;
}

interface ExperiencePreviewProps {
    featuredExperience: Experience[];
}

// --- Helper: Total Experience (Excluding current partial month) ---
const calculateTotalExperience = (experiences: Experience[]) => {
    let totalMonths = 0;

    experiences.forEach(exp => {
        // 1. Parse Start Date
        const start = new Date(`${exp.startDate}-01`);

        // 2. Parse End Date
        let end;
        if (exp.endDate === 'Present') {
            const now = new Date();
            // 🚨 FIX: Go back 1 month from today to get "previous month last date" logic
            // effectively ignoring the current running month
            end = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        } else {
            end = new Date(`${exp.endDate}-01`);
        }

        // 3. Calculate difference
        // Formula: (Year Diff * 12) + Month Diff
        // We add +1 because experience is inclusive (Jan to Jan is 1 month of work)
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;

        // Only add if the result is positive (prevents issues if start date is in the future)
        if (months > 0) {
            totalMonths += months;
        }
    });

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    return { years, months: remainingMonths };
};

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ featuredExperience }) => {
    const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
    const [contentHeights, setContentHeights] = useState<Record<number, number>>({});
    const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const totalExp = useMemo(() => calculateTotalExperience(featuredExperience), [featuredExperience]);

    const toggleExpansion = (id: number) => {
        setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
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

            {/* --- HEADER --- */}
            <div className="flex flex-row justify-between items-center mb-[24px] gap-4">

                <h2 className="text-xl md:text-2xl font-semibold text-text-main flex items-baseline">
                    <span className="text-accent mr-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                        <i className="fas fa-briefcase"></i>
                    </span>
                    <span className="tracking-tight">Work Experience</span>
                </h2>

                {/* Total Exp Badge */}
                <div className="glass-card border border-accent/20 bg-accent/5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 md:gap-3 shadow-[0_0_10px_rgba(34,211,238,0.05)]">
                    <div className="flex flex-col items-end leading-none">
                        <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-text-muted font-bold mb-0.5 md:mb-1">
                            Total Exp
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg md:text-xl font-bold text-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                                {totalExp.years}
                            </span>
                            <span className="text-[10px] md:text-xs text-slate-400 mr-1 md:mr-2">Yrs</span>

                            {totalExp.months > 0 && (
                                <>
                                    <span className="text-lg md:text-xl font-bold text-accent drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                                        {totalExp.months}
                                    </span>
                                    <span className="text-[10px] md:text-xs text-slate-400">Mth</span>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Icon: Smaller on mobile */}
                    <i className="fas fa-history text-xl md:text-2xl text-accent/20 ml-1"></i>
                </div>
            </div>

            {/* --- TIMELINE --- */}
            <div className="relative border-l border-white/10 space-y-4 pb-2">
                {featuredExperience.map((exp, index) => {
                    const isFirst = index === 0;
                    const isExpanded = !!expandedIds[exp.id];
                    const fullHeight = contentHeights[exp.id] || 1000;

                    const descriptionPoints = Array.isArray(exp.description) ? exp.description : [exp.description];
                    const hasMoreContent = descriptionPoints.length > 2;
                    const initialContent = hasMoreContent ? descriptionPoints.slice(0, 2) : descriptionPoints;
                    const restOfContent = hasMoreContent ? descriptionPoints.slice(2) : [];

                    let dotClasses = 'absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all duration-300 z-10 shadow-md';

                    if (isFirst) {
                        // Highlight: Accent color + 'animate-pulse' for the breathing effect
                        dotClasses += ' bg-accent border-2 border-bg shadow-[0_0_10px_rgba(34,211,238,0.6)] animate-pulse';
                    } else {
                        // Past: Dark slate dot
                        dotClasses += ' bg-slate-700 border border-slate-800 group-hover:bg-accent/80 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.4)]';
                    }

                    return (
                        <div key={exp.id} className="timeline-item pl-8 relative group">
                            <div className={dotClasses}></div>
                            <div className="p-6 transition-all duration-300 glass-card border border-white/5 hover:border-accent/30">
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    <h3 className="text-text-main font-semibold text-xl transition-colors">{exp.role}</h3>
                                    <span className="text-text-muted text-sm mt-1 md:mt-0 font-medium">{exp.period}</span>
                                </div>

                                <p className="text-accent font-medium text-sm mb-4">
                                    {exp.company}
                                    <span className="text-text-muted ml-3 text-xs opacity-70">
                                        <i className="fas fa-map-marker-alt"></i> {exp.location}
                                    </span>
                                </p>

                                <div className="text-slate-300 text-sm">
                                    <ul className="list-disc list-inside text-slate-300 space-y-2 leading-relaxed mb-1 pl-4 marker:text-accent">
                                        {initialContent.map((point, idx) => <li key={idx}>{point}</li>)}
                                    </ul>

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
                                                <ul className="list-disc list-inside text-slate-300 space-y-2 leading-relaxed mb-1 pl-4 marker:text-accent">
                                                    {restOfContent.map((point, idx) => <li key={idx}>{point}</li>)}
                                                </ul>
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <button
                                                    onClick={() => toggleExpansion(exp.id)}
                                                    className="flex items-center gap-1 font-medium text-sm text-accent hover:text-white transition-colors"
                                                >
                                                    <span>{isExpanded ? `Show Less` : `Show More`}</span>
                                                    <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}></i>
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