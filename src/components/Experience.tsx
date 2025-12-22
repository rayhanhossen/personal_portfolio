import React, { useState, useRef, useEffect, useMemo } from 'react';

export interface Experience {
    id: number;
    role: string;
    company: string;
    location: string;
    period: string;
    startDate: string;
    endDate: string;
    description: string[] | string;
    skills?: string[];
}

interface ExperiencePreviewProps {
    featuredExperience: Experience[];
}

// --- Helper: Calculate Total Experience ---
const calculateTotalExperience = (experiences: Experience[]) => {
    let totalMonths = 0;
    experiences.forEach(exp => {
        const start = new Date(`${exp.startDate}-01`);
        let end;
        if (exp.endDate === 'Present') {
            const now = new Date();
            end = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        } else {
            end = new Date(`${exp.endDate}-01`);
        }
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
        if (months > 0) totalMonths += months;
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

    // --- Grouping Logic ---
    const groupedExperience = useMemo(() => {
        const groups: { company: string; location: string; roles: Experience[] }[] = [];
        featuredExperience.forEach((exp) => {
            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup.company === exp.company) {
                lastGroup.roles.push(exp);
            } else {
                groups.push({ company: exp.company, location: exp.location, roles: [exp] });
            }
        });
        return groups;
    }, [featuredExperience]);

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
        <div id="experience-preview" className="font-sans relative animate-fadeIn">

            {/* --- HEADER --- */}
            <div className="flex flex-row justify-between items-end mb-12 relative z-10">
                <div className="relative">
                    {/* Watermark */}
                    <div className="absolute -top-10 -left-10 text-[100px] text-accent/5 opacity-20 pointer-events-none select-none z-0">
                        <i className="fas fa-history"></i>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2 relative z-10">
                        <span className="text-accent font-mono drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">/</span>
                        <span className="text-transparent bg-clip-text bg-text-gradient">work_experience</span>
                    </h2>
                    <p className="text-text-muted text-lg font-light tracking-wide relative z-10 mt-2">
                        My professional journey.
                    </p>
                </div>

                {/* Total Experience Badge */}
                <div className="hidden sm:flex glass-card border border-accent/20 bg-accent/5 px-4 py-2 rounded-xl items-center gap-3 shadow-[0_0_15px_rgba(34,211,238,0.05)] backdrop-blur-md">
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1 opacity-80">Total_Exp</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">{totalExp.years}</span>
                            <span className="text-xs text-slate-400 mr-2">Yrs</span>
                            {totalExp.months > 0 && (
                                <>
                                    <span className="text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">{totalExp.months}</span>
                                    <span className="text-xs text-slate-400">Mth</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- LIST CONTAINER (No Outer Line) --- */}
            <div className="flex flex-col gap-5">

                {groupedExperience.map((group, groupIndex) => (
                    <div key={groupIndex} className="group/company">

                        {/* 🚨 REMOVED: Outer Timeline Dot & Line */}

                        {/* COMPANY CARD */}
                        <div className="glass-card border border-white/5 bg-glass-overlay/50 p-6 md:p-8 rounded-2xl hover:border-accent/30 transition-all duration-300 shadow-lg">

                            {/* Company Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b border-white/5 pb-4">
                                <h3 className="text-2xl font-bold text-text-main flex items-center gap-3">
                                    {group.company}
                                </h3>
                                <span className="text-xs text-text-muted flex items-center gap-1 mt-1 sm:mt-0 font-mono bg-white/5 px-2 py-1 rounded">
                                    <i className="fas fa-map-marker-alt text-accent/70"></i> {group.location}
                                </span>
                            </div>

                            {/* ROLES LIST (Inner Timeline Kept for Logic) */}
                            <div className="flex flex-col gap-10 relative">

                                {/* Vertical line connecting roles if > 1 */}
                                {group.roles.length > 1 && (
                                    <div className="absolute left-[7px] top-3 bottom-6 w-[1px] bg-white/10"></div>
                                )}

                                {group.roles.map((exp) => {
                                    const isPresent = exp.endDate === 'Present';
                                    const isExpanded = !!expandedIds[exp.id];
                                    const fullHeight = contentHeights[exp.id] || 1000;
                                    const descriptionPoints = Array.isArray(exp.description) ? exp.description : [exp.description];
                                    const hasMoreContent = descriptionPoints.length > 2;
                                    const initialContent = hasMoreContent ? descriptionPoints.slice(0, 2) : descriptionPoints;
                                    const restOfContent = hasMoreContent ? descriptionPoints.slice(2) : [];

                                    return (
                                        <div key={exp.id} className="relative pl-8">

                                            {/* Role Dot */}
                                            <div className={`absolute left-[3px] top-2.5 w-2 h-2 rounded-full border border-bg
                                                ${isPresent ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-500'}`}
                                            ></div>

                                            {/* Role Header */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                                                <h4 className="text-xl font-semibold text-white group-hover/company:text-accent transition-colors">
                                                    {exp.role}
                                                </h4>

                                                {/* Date & Blink Indicator */}
                                                <div className="flex items-center gap-2 text-xs font-mono text-text-muted whitespace-nowrap bg-black/20 px-2 py-1 rounded border border-white/5">
                                                    {isPresent && (
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                        </span>
                                                    )}
                                                    <span className={isPresent ? "text-green-400 font-bold" : ""}>{exp.period}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="text-slate-300 text-sm leading-relaxed font-light">
                                                <ul className="space-y-3">
                                                    {initialContent.map((point, idx) => (
                                                        <li key={idx} className="flex gap-3">
                                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/50 flex-shrink-0"></span>
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Expandable Content */}
                                                {hasMoreContent && (
                                                    <div
                                                        ref={el => { contentRefs.current[exp.id] = el }}
                                                        style={{
                                                            maxHeight: isExpanded ? `${fullHeight}px` : '0px',
                                                            transition: `max-height 500ms ease-in-out, opacity 500ms ease-in-out`,
                                                            overflow: 'hidden',
                                                            opacity: isExpanded ? 1 : 0.01,
                                                        }}
                                                    >
                                                        <ul className="space-y-3 mt-3">
                                                            {restOfContent.map((point, idx) => (
                                                                <li key={idx} className="flex gap-3">
                                                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/50 flex-shrink-0"></span>
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Toggle Button */}
                                                {hasMoreContent && (
                                                    <button
                                                        onClick={() => toggleExpansion(exp.id)}
                                                        className="mt-4 text-[10px] font-bold uppercase tracking-widest text-accent/70 hover:text-accent flex items-center gap-2 transition-colors border-b border-transparent hover:border-accent/50 pb-0.5 w-max"
                                                    >
                                                        {isExpanded ? 'Collapse' : 'Read Full Details'}
                                                        <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                                                    </button>
                                                )}
                                            </div>

                                            {/* Skills Tags */}
                                            {exp.skills && exp.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                                                    {exp.skills.map((skill, i) => (
                                                        <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/50 text-slate-300 border border-slate-700/50">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperiencePreview;