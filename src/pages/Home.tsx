import { Link } from 'react-router-dom';
import { personalInfo, experiences } from '../data/content';
// NOTE: Assuming profileImg is a PNG with a transparent/clean background, 
// if it's currently optimized for dark mode, it may need adjusting.
import profileImg from '../assets/profile-avatar.png';
import { useContactForm } from '../hooks/useContactForm';
import QuoteDisplay from '../components/QuoteDisplay';
import ExperiencePreview from '../components/Experience';


const Home = () => {
    const {
        message,
        setMessage,
        loading,
        textareaRef,
        handleRefine,
        handleCopy,
        handleSend,
        copyStatus
    } = useContactForm();


    return (
        // 🚨 UPDATED: Removed dark theme classes, relying on Layout.tsx for bg/font
        <div id="home-view" className="view-section pt-[16px] md:pt-[25px]">

            {/* HERO SECTION */}
            <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 md:items-start mb-20 md:mb-28">

                {/* 1. TEXT CONTENT */}
                <div className="order-2 md:order-1 pt-4">

                    {/* 🚨 UPDATED: Clean, Sans-Serif Typography and Light Text Colors */}
                    <h3 className="font-sans text-2xl md:text-4xl font-light text-gray-800 mb-6 leading-tight">
                        Hi, I’m {personalInfo.name} Hossen. <br />
                        <span className="text-accent font-medium">{personalInfo.title}</span> focused on building <span className="text-accent font-medium">AI-powered </span>
                        applications<span className="animate-pulse text-accent">.</span>
                    </h3>

                    {/* 🚨 UPDATED: Subtle descriptive text */}
                    <p className="font-sans text-gray-600 mb-8 max-w-lg text-base leading-relaxed">
                        I love turning complex ideas into clear, intelligent digital experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full md:w-auto">

                        {/* 📞 Contact Me Button (Clean, Solid Fill, Accent Color) */}
                        <Link
                            to="/contacts"
                            className="flex-1 sm:flex-none group relative
                                px-6 py-3 flex items-center justify-center gap-2 
                                transition-all duration-300 rounded-xl font-medium text-sm md:text-base
                                
                                // BASE STATE: Accent background, white text
                                bg-accent text-white shadow-lg shadow-accent/40
                                
                                // HOVER STATE: Subtle darkening/lift
                                hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/60"
                        >
                            <span>Get in touch</span>
                            <span className="font-bold transition-transform duration-300 group-hover:translate-x-1">
                                {`>`}
                            </span>
                        </Link>

                        {/* 📄 Resume Download Button (Minimalist, Outline) */}
                        <a
                            href={personalInfo.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none group relative
                                px-6 py-3 flex items-center justify-center gap-2 
                                transition-all duration-300 rounded-xl font-medium text-sm md:text-base
                                
                                // BASE STATE: Outline style
                                border border-gray-400 text-gray-700 hover:border-accent hover:text-accent 
                                hover:bg-accent/5 hover:shadow-md hover:shadow-accent/20"
                        >
                            <span>Resume</span>
                            <i className="fas fa-download text-sm ml-1 transition-colors"></i>
                        </a>

                    </div>
                </div>

                {/* 2. PROFILE IMAGE (Cleaned up, light shadow, status bubble redesigned) */}
                <div className="order-1 md:order-2 relative flex justify-center md:justify-end">

                    <div className="relative z-10 w-70 md:w-[313px] group">
                        {/* Image: Removed glowing shadow, added standard soft shadow, fixed scaleX */}
                        <img
                            src={profileImg}
                            alt="profile"
                            className="w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:-translate-y-1"
                            style={{ transform: 'scaleX(-1)' }}
                        />

                        {/* Status Bubble: No background/padding/glass-card. Just dot and text floating over the image. */}
                        <div className="absolute bottom-[0.4rem] left-1/2 -translate-x-1/2 
                        flex items-center gap-2 text-white text-sm w-max z-20">

                            {/* Combined Dot and Animation */}
                            <span className="relative flex h-3 w-3">
                                {/* Ping/Dot */}
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                    style={{ animationDuration: '2s' }}
                                ></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>

                            {/* Status Text */}
                            <span className='tracking-normal font-medium'>
                                Open to opportunities
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUOTE SECTION (Assuming QuoteDisplay works well with light background) */}
            <section className="mb-12 md:mb-20 w-full">
                <QuoteDisplay />
            </section>


            {/* EXPERIENCE PREVIEW */}
            {/* NOTE: If ExperiencePreview uses dark cards, it will need a redesign too */}
            <section id="experience-preview" className="mb-12 md:mb-20">
                <ExperiencePreview featuredExperience={experiences} />
            </section>


            {/* CONTACTS SECTION */}
            <section id="contacts" className="mb-12 md:mb-20">
                <div className="flex justify-between items-end mb-12">
                    {/* 🚨 UPDATED: Clean text heading */}
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 flex items-baseline">
                        <span className="text-accent mr-2">
                            <i className="fas fa-envelope-open-text"></i>
                        </span>
                        <span className="tracking-tight">Contact Me</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Left Column: Description & Glass Contact Form */}
                    <div>
                        <p className="mb-8 text-gray-600">
                            I'm interested in new opportunities. If you have a question, collaboration idea, or just want to connect, feel free to reach out.
                        </p>

                        {/* 🫧 GLASS CONTACT FORM BOX */}
                        <div className="glass-card p-6 w-full shadow-lg">
                            <label className="block text-sm text-gray-500 mb-2 font-medium">Quick Message Draft:</label>

                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                // 🚨 UPDATED: Light background, dark text
                                className="w-full bg-gray-50/50 text-gray-800 border border-gray-200 focus:border-accent rounded-lg p-3 outline-none resize-none mb-4 text-sm transition-colors"
                                rows={4}
                                placeholder="Type a message here..."
                            />

                            <div className="flex justify-between items-center border-t border-gray-200 pt-3">

                                {/* 🤖 Refine Button (Clean, Non-Code Style) */}
                                <button
                                    onClick={handleRefine}
                                    disabled={loading}
                                    className="group font-medium text-xs md:text-sm flex items-center gap-2 transition-all 
                                               px-3 py-1.5 rounded-full border border-transparent 
                                               text-gray-600 hover:text-accent hover:border-accent/50 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <i className="fas fa-circle-notch fa-spin text-accent"></i>
                                            <span className="text-gray-500 italic">Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-magic text-accent group-hover:text-accent/80 transition-colors"></i>
                                            <span className="font-semibold">AI Refine</span>
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center gap-4">
                                    {/* 📋 Copy Button (Minimalist) */}
                                    <button
                                        onClick={handleCopy}
                                        className="group flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        {copyStatus ? (
                                            <i className="fas fa-check-circle text-lg text-green-500 transition-colors"></i>
                                        ) : (
                                            <i className="far fa-copy text-lg transition-colors"></i>
                                        )}
                                        <span className="hidden md:inline text-sm font-medium">Copy</span>
                                    </button>

                                    {/* 🚀 Send Button (Clean, Accent Color) */}
                                    <button
                                        onClick={handleSend}
                                        disabled={!message.trim()}
                                        className="font-medium text-sm md:text-base group flex items-center gap-1.5 transition-all py-1.5 px-3 rounded-full
                                                   bg-accent text-white shadow-md shadow-accent/30 
                                                   disabled:bg-gray-300 disabled:shadow-none disabled:text-gray-500 disabled:cursor-not-allowed"
                                    >
                                        Send
                                        <i className="fas fa-paper-plane text-xs ml-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Info Card */}
                    <div className="flex justify-start md:justify-end">
                        <div className="glass-card p-6 w-full md:w-96"> {/* 🚨 APPLIED GLASS CARD */}
                            <h4 className="text-gray-800 font-bold mb-4">Feel free to reach out</h4>
                            <div className="flex flex-col gap-3">
                                {/* Email */}
                                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 text-gray-600 hover:text-accent transition-colors">
                                    <i className="fas fa-envelope text-gray-400 w-4 text-center"></i>
                                    <span className='font-medium'>{personalInfo.email}</span>
                                </a>
                                {/* Phone */}
                                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 text-gray-600 hover:text-accent transition-colors">
                                    <i className="fa fa-phone text-gray-400 w-4 text-center"></i>
                                    <span className='font-medium'>{personalInfo.phone}</span>
                                </a>
                                {/* LinkedIn - Good to repeat a social link here */}
                                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-accent transition-colors">
                                    <i className="fab fa-linkedin text-gray-400 w-4 text-center"></i>
                                    <span className='font-medium'>LinkedIn Profile</span>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;