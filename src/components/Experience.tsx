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
    limit?: number; // Added to control how many companies show
}

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

const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({ featuredExperience, limit }) => {
    const [expandedIds, setExpandedIds] = useState<Record<number, boolean>>({});
    const [contentHeights, setContentHeights] = useState<Record<number, number>>({});
    const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

    // Always use full array for the total years calculation
    const totalExp = useMemo(() => calculateTotalExperience(featuredExperience), [featuredExperience]);

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
        // Slice the groups based on the limit prop
        return limit ? groups.slice(0, limit) : groups;
    }, [featuredExperience, limit]);

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
        <div className="font-sans relative animate-fadeIn max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <i className="fas fa-history text-accent text-xl"></i>
                        <h3 className="text-2xl font-semibold text-text-main tracking-tight">
                            Work Experience
                        </h3>
                    </div>
                    <p className="text-text-muted text-base font-light">
                        My professional journey and key contributions.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl w-full md:w-auto md:self-center">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <i className="fas fa-briefcase text-accent text-sm"></i>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold leading-none mb-1">
                            Total Experience
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-text-main">{totalExp.years}</span>
                            <span className="text-xs text-text-muted font-mono mr-2">Years</span>
                            {totalExp.months > 0 && (
                                <>
                                    <span className="text-2xl font-bold text-text-main">{totalExp.months}</span>
                                    <span className="text-xs text-text-muted font-mono">Months</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {groupedExperience.map((group, groupIndex) => (
                    <div key={groupIndex} className="group/company">
                        {/* CHANGED: Removed shadow-lg, added shadow-none and hover:shadow-md */}
                        <div className="glass-card border border-white/5 bg-glass-overlay/50 p-6 md:p-8 rounded-2xl hover:border-accent/30 transition-all duration-300 shadow-none hover:shadow-md">

                            {/* 1. COMPANY HEADER SECTION */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 border-b border-white/5 pb-4">
                                <h3 className="text-xl font-bold text-text-main flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(34,211,238,0.4)]"></span>
                                    {group.company}
                                </h3>

                                <span className="w-fit self-start mt-2 sm:mt-0 text-[10px] sm:text-[11px] text-text-muted flex items-center gap-2 font-mono tracking-wider bg-white/5 px-2 py-1 sm:px-3 rounded-full border border-white/5">
                                    <i className="fas fa-map-marker-alt text-accent/70"></i> {group.location}
                                </span>
                            </div>

                            <div className="flex flex-col gap-10 relative">
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
                                            <div className={`absolute left-[3px] top-2.5 w-2 h-2 rounded-full border border-bg z-10
                                    ${isPresent ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-500'}`}
                                            ></div>

                                            {/* 2. ROLE & PERIOD SECTION */}
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2 sm:gap-3">
                                                <h4 className="text-lg font-semibold text-white group-hover/company:text-accent transition-colors">
                                                    {exp.role}
                                                </h4>

                                                <div className="w-fit self-start flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-text-main bg-transparent px-2 py-1 sm:px-3 rounded-full border border-white/5 whitespace-nowrap">
                                                    {isPresent && (
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                        </span>
                                                    )}
                                                    <span className={isPresent ? "text-green-400 font-bold" : ""}>{exp.period}</span>
                                                </div>
                                            </div>

                                            {/* Description Logic */}
                                            <div className="text-slate-300 text-sm leading-relaxed font-light">
                                                <ul className="space-y-3">
                                                    {initialContent.map((point, idx) => (
                                                        <li key={idx} className="flex gap-3">
                                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/50 flex-shrink-0"></span>
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {hasMoreContent && (
                                                    <div
                                                        ref={el => { contentRefs.current[exp.id] = el }}
                                                        style={{
                                                            maxHeight: isExpanded ? `${fullHeight}px` : '0px',
                                                            transition: `max-height 500ms ease-in-out, opacity 400ms ease-in-out`,
                                                            overflow: 'hidden',
                                                            opacity: isExpanded ? 1 : 0,
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

                                                {hasMoreContent && (
                                                    <button
                                                        onClick={() => toggleExpansion(exp.id)}
                                                        className="mt-4 text-[10px] font-bold uppercase tracking-widest text-accent/70 hover:text-accent flex items-center gap-2 transition-colors border-b border-transparent hover:border-accent/50 pb-0.5 w-max"
                                                    >
                                                        {isExpanded ? 'Collapse' : 'Read Full Details'}
                                                        <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[8px]`}></i>
                                                    </button>
                                                )}
                                            </div>

                                            {exp.skills && exp.skills.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
                                                    {exp.skills.map((skill, i) => (
                                                        <span key={i} className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800/30 text-slate-400 border border-slate-700/30">
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
            {/* ADDED: Style block to define the minimalistic dark shadow */}
            <style>{`
                /* Minimalist subtle hover shadow for dark glass-cards */
                .hover\:shadow-md:hover {
                    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.5);
                }
            `}</style>
        </div>
    );
};

export default ExperiencePreview;