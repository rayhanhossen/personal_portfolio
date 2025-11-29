import { education, certificates } from '../data/content';

const EducationPage = () => {
    return (
        <div>
            {/* Header */}
            <div className="mb-16">
                <h2 className="text-3xl text-white font-semibold mb-4">
                    <span className="text-primary">/</span>education
                </h2>
                <p className="text-gray">My academic background</p>
            </div>

            {/* Degrees Timeline */}
            <section className="mb-24 relative">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-8 flex items-center">
                    <span className="text-primary mr-2">def</span>
                    <span className="text-yellow-400">degrees</span>
                    <span className="text-gray-400">()</span>
                    <span className="text-gray-400 animate-pulse">:</span>
                </h3>

                {/* Decoration */}
                <div className="absolute -top-10 -right-4 w-20 h-20 dots-pattern opacity-50 z-0"></div>

                <div className="max-w-3xl relative z-10">
                    <div className="relative border-l border-gray-600 ml-3 md:ml-6 space-y-8 pb-2">

                        {education.map((edu) => (
                            // 1. Add 'group' to the parent wrapper
                            <div key={edu.id} className="relative pl-8 group">

                                {/* Timeline Dot: Adjusted to -left-[9px] and used group-hover */}
                                <div className="absolute -left-[9px] top-[24px] w-4 h-4 bg-bg border border-gray-600 rounded-full group-hover:bg-primary group-hover:border-primary transition-all duration-300"></div>

                                {/* Card: Changed hover:border-white to group-hover:border-white */}
                                <div className="border border-gray-600 p-6 group-hover:border-white transition-colors bg-card">
                                    <div className="flex flex-col md:flex-row justify-between mb-2">
                                        <h3 className="text-white font-medium text-xl group-hover:text-primary transition-colors">
                                            {edu.degree}
                                        </h3>
                                        <span className="text-gray-500 font-mono">{edu.period}</span>
                                    </div>
                                    <p className="text-gray-300 font-medium mb-2">{edu.institution}</p>
                                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                                        {edu.details}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* Certifications Grid */}
            <section className="mb-24 relative">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-8 flex items-center">
                    <span className="text-primary mr-2">def</span>
                    <span className="text-yellow-400">certificates</span>
                    <span className="text-gray-400">()</span>
                    <span className="text-gray-400 animate-pulse">:</span>
                </h3>
                {/* Decoration */}
                <div className="absolute -top-10 -right-4 w-20 h-20 dots-pattern opacity-50 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className={`border border-gray-600 bg-card p-6 transition-colors group relative overflow-hidden ${cert.borderColorClass}`}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent"></div>

                            {/* Icon */}
                            <i className={`${cert.iconClass} text-4xl mb-4 ${cert.colorClass}`}></i>

                            <h4 className="text-white font-bold text-lg mb-1">{cert.title}</h4>
                            <p className="text-gray-500 text-xs mb-4">{cert.issuer} • Issued {cert.date}</p>

                            {/* CONDITIONAL LINK LOGIC */}
                            {cert.link && cert.link !== "#" && (
                                <a 
                                    href={cert.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-primary text-sm hover:underline block mt-2"
                                >
                                    View Credential {'->'}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EducationPage;