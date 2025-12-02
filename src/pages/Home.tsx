import { HashLink } from 'react-router-hash-link';
import { personalInfo, experiences } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import QuoteDisplay from '../components/QuoteDisplay';
import ExperiencePreview from '../components/Experience';
import Contact from '../components/Contact';


const Home = () => {

    return (
        <div id="home-view" className="view-section">

            {/* HERO SECTION */}
            <section id="home" className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-12 md:gap-x-0 md:items-stretch mb-8">
                {/* 1. TEXT AND BUTTONS CARD (8 Columns) */}
                <div className="order-2 md:order-1 p-5 pb-[24px] md:col-span-8 glass-card shadow-xl md:mr-[16px] border border-white/5">
                    {/* 1. STATUS BUBBLE */}
                    <div className="mb-4 inline-flex items-center p-2 rounded-lg border border-accent/20 bg-accent/5 text-sm w-max">
                        <div className="flex items-center gap-2 text-text-muted">
                            <span className="relative flex h-3 w-3">
                                {/* Ping/Dot */}
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                                    style={{ animationDuration: '2s' }}
                                ></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent shadow-[0_0_10px_#22d3ee]"></span>
                            </span>

                            {/* Status Text */}
                            <span className='tracking-normal font-medium text-text-main'>
                                Open to <span className="text-accent font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">work</span>
                            </span>
                        </div>
                    </div>

                    {/* 2. HEADER */}
                    <h3 className="font-sans text-2xl md:text-5xl font-medium text-text-main mb-6 tracking-tight md:leading-tight">
                        Engineering AI-driven products that solve real problems — beautifully and efficiently
                        <span className="animate-pulse text-accent">.</span>
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-text-muted mb-8 max-w-lg text-base leading-relaxed">
                        I love turning complex ideas into clear, intelligent digital experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full md:w-auto">

                        {/* Contact Me Button */}
                        <HashLink
                            to="#contacts"
                            smooth
                            className="flex-1 sm:flex-none group relative
                        px-6 py-3 flex items-center justify-center gap-2 
                        transition-all duration-300 rounded-full font-bold text-sm md:text-base
                        
                        // BASE STATE: Accent background, Dark text (Better contrast on Cyan)
                        bg-accent text-bg shadow-[0_0_15px_rgba(34,211,238,0.3)]
                        
                        // HOVER STATE: Lift and Glow
                        hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]"
                        >
                            <span>Get in touch</span>
                            <span className="font-bold transition-transform duration-300 group-hover:translate-x-1">
                                {`>`}
                            </span>
                        </HashLink>

                        {/* 📄 Resume Download Button */}
                        <a
                            href={personalInfo.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none group relative
                        px-6 py-3 flex items-center justify-center gap-2 
                        transition-all duration-300 rounded-full font-medium text-sm md:text-base
                        
                        // BASE STATE: Outline style (Dark Mode)
                        border border-white/20 text-text-muted border-accent hover:text-accent 
                        hover:bg-accent/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                        >
                            <span>Resume</span>
                            <i className="fas fa-download text-sm ml-1 transition-colors"></i>
                        </a>
                    </div>
                </div>

                {/* 2. PROFILE IMAGE CARD (4 Columns) */}
                <div className="order-1 md:order-2 md:col-span-4 glass-card shadow-xl h-full min-h-[350px] relative border border-white/5 overflow-hidden">
                    {/* UPDATED: 
                       - Removed 'flex' and 'justify-end' 
                       - Added 'w-full h-full object-cover' to image
                       - This forces the image to cover the ENTIRE card area like a background
                    */}
                    <img
                        src={profileImg}
                        alt="profile"
                        className="w-full h-full object-cover absolute inset-0"
                        // 'object-center' ensures the face stays visible if cropped
                        style={{ objectPosition: 'center' }}
                    />

                    {/* Subtle background shapes (These are now hidden behind the opaque image, but kept for structure) */}
                    <div className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full bg-accent/10 blur-xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
                    <div className="absolute bottom-0 right-0 w-2/5 h-2/5 rounded-full bg-blue-600/10 blur-xl translate-x-1/3 translate-y-1/3 z-0"></div>
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section className="mb-8 w-full">
                <QuoteDisplay />
            </section>


            {/* EXPERIENCE PREVIEW */}
            <section id="experience-preview" className="mb-8">
                <ExperiencePreview featuredExperience={experiences} />
            </section>


            {/* CONTACTS SECTION */}
            <Contact />
        </div>
    );
};

export default Home;