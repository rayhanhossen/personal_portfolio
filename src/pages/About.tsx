import { personalInfo, skills, funFacts } from '../data/content';
import profileImg from '../assets/profile-avatar.png'; // Ensure this image exists

const About = () => {
    return (
        <div>
            {/* Header */}
            <div className="mb-12">
                <h2 className="text-3xl text-white font-semibold mb-4">
                    <span className="text-primary">/</span>about-me
                </h2>
                <p className="text-gray">Who am i?</p>
            </div>

            {/* Main Bio & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
                <div className="text-gray leading-relaxed order-2 md:order-1">
                    {personalInfo.about.map((paragraph, index) => (
                        <p key={index} className="mb-6">
                            {paragraph}
                        </p>
                    ))}

                    {/* Developer Aesthetic Download Button (wget Style) */}
                    <a
                        href={personalInfo.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 border border-gray-600 bg-[#282C33] px-5 py-3 hover:border-green-400 w-max mt-6 transition-all duration-300 hover:shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                    >
                        {/* Terminal Prompt */}
                        <span className="text-gray-500 font-mono text-sm group-hover:text-green-400 transition-colors font-bold">$</span>

                        {/* Command Text */}
                        <span className="font-mono text-sm">
                            <span className="text-gray-300 group-hover:text-white transition-colors">wget</span>
                            <span className="text-green-400 ml-2">cv.pdf</span>
                        </span>

                        {/* Download Icon (Animated) */}
                        <i className="fas fa-arrow-down text-gray-500 group-hover:text-green-400 transform group-hover:translate-y-1 transition-all duration-300 text-xs ml-2"></i>
                    </a>
                </div>

                {/* Image Decoration */}
                <div className="relative flex justify-center md:justify-end order-1 md:order-2">
                    <div className="relative">
                        {/* Dots top left */}
                        <div className="absolute top-[4.75rem] left-[0.5rem] w-16 h-16 dots-pattern z-0"></div>

                        {/* Profile Image (Flipped) */}
                        <img
                            src={profileImg}
                            alt={personalInfo.name}
                            className="w-72 md:w-80 relative z-10 -scale-x-100 -ml-[10px] top-[10px]"
                        />

                        {/* Dots bottom right */}
                        <div className="absolute bottom-20 -right-4 w-16 h-16 dots-pattern z-20"></div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <section className="mb-24 relative">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-8 flex items-center">
                    <span className="text-primary mr-2">def</span>
                    <span className="text-yellow-400">skills</span>
                    <span className="text-gray-400">()</span>
                    <span className="text-gray-400 animate-pulse">:</span>
                </h3>
                {/* Decorative dots top right */}
                <div className="absolute -top-10 -right-4 w-20 h-20 dots-pattern opacity-50 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {skills.map((grp) => (
                        <div
                            key={grp.category}
                            className="h-52 flex flex-col border border-gray-600 bg-card group hover:border-white transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="border-b border-gray-600 p-2 flex justify-between items-center bg-[#21252B]">
                                <span className="font-bold text-white text-sm">
                                    <span className="text-primary">#</span>{grp.category.toLowerCase()}
                                </span>
                                {/* Traffic Lights decoration */}
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                </div>
                            </div>
                            <div className="p-3 text-gray text-sm flex flex-col gap-y-2 overflow-y-auto aesthetic-scrollbar">
                                {grp.items.map((skill) => (
                                    <span key={skill} className="hover:text-white transition-colors cursor-default">
                                        <span className="text-primary font-bold">&gt;</span> {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Fun Facts Section */}
            <section className="mb-24 relative">
                <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-8 flex items-center">
                    <span className="text-primary mr-2">def</span>
                    <span className="text-yellow-400">my_fun_facts</span>
                    <span className="text-gray-400">()</span>
                    <span className="text-gray-400 animate-pulse">:</span>
                </h3>

                <div className="flex gap-4 flex-wrap max-w-2xl">
                    {funFacts.map((fact) => (
                        <div key={fact.id} className="border border-gray-600 p-2 text-gray hover:text-white hover:border-white transition-colors cursor-default">
                            {fact.text}
                        </div>
                    ))}
                </div>

                {/* Decorative Elements */}
                <div className="hidden md:block absolute right-0 top-20">
                    <div className="absolute -top-16 -right-10 w-16 h-16 dots-pattern"></div>
                    {/* Interlocking squares */}
                    <div className="relative w-32 h-32">
                        <div className="absolute top-0 right-8 w-16 h-16 border border-gray-600"></div>
                        <div className="absolute bottom-8 right-0 w-16 h-16 border border-primary"></div>
                    </div>
                    <div className="absolute top-40 -right-8 w-16 h-16 dots-pattern"></div>
                </div>
            </section>
        </div>
    );
};

export default About;