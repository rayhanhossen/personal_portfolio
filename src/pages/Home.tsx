import { HashLink } from 'react-router-hash-link';
import { personalInfo, experiences } from '../data/content';
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
        emailCopyStatus,
        phoneCopyStatus
    } = useContactForm();


    return (
        <div id="home-view" className="view-section">

            {/* HERO SECTION */}
            <section id="home" className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-12 md:gap-x-0 md:items-stretch mb-[30px] md:mb-[32px]">
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
                        border border-white/20 text-text-muted hover:border-accent hover:text-accent 
                        hover:bg-accent/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                        >
                            <span>Resume</span>
                            <i className="fas fa-download text-sm ml-1 transition-colors"></i>
                        </a>
                    </div>
                </div>

                {/* 2. PROFILE IMAGE CARD (4 Columns) */}
                <div className="order-1 md:order-2 md:col-span-4 glass-card shadow-xl h-full relative flex flex-col justify-center items-center border border-white/5">

                    {/* Inner container */}
                    <div className="relative z-10 w-70 md:w-[310px] group h-full flex items-center md:mb-3 rounded-xl">

                        {/* Image */}
                        <img
                            src={profileImg}
                            alt="profile"
                            className="w-full h-full object-cover shadow-2xl transition-transform duration-300 group-hover:-translate-y-1 opacity-90 hover:opacity-100"
                            // style={{ transform: 'scaleX(-1)' }}
                        />
                        {/* Gradient Fade at bottom to blend with card */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg/50 to-transparent rounded-b-xl z-1"></div>
                    </div>
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section className="mb-[30px] md:mb-[32px] w-full">
                <QuoteDisplay />
            </section>


            {/* EXPERIENCE PREVIEW */}
            <section id="experience-preview" className="mb-[30px] md:mb-[32px]">
                <ExperiencePreview featuredExperience={experiences} />
            </section>


            {/* CONTACTS SECTION */}
            <section id="contacts" className="mb-[30px] md:mb-[32px]">
                <div className="flex justify-between items-end mb-[18px]">
                    <h2 className="text-xl md:text-2xl font-semibold text-text-main flex items-baseline">
                        <span className="text-accent mr-2 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                            <i className="fas fa-envelope-open-text"></i>
                        </span>
                        <span className="tracking-tight">Contact Me</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">

                    {/* ⬅️ LEFT COLUMN: Contact Info Card */}
                    <div className="flex flex-col gap-8">

                        <div className="glass-card p-6 md:h-full w-full shadow-lg border border-white/5">
                            <p className="mb-8 text-text-muted">
                                I'm interested in new opportunities. If you have a question, collaboration idea, or just want to connect, feel free to reach out.
                            </p>
                            <h4 className="text-text-main text-xl font-bold mb-4">Get in touch</h4>
                            <div className="flex flex-col gap-3">

                                {/* Email Row */}
                                <div className="flex items-center text-text-muted">

                                    <a
                                        href={`mailto:${personalInfo.email}`}
                                        className="flex items-center gap-3 hover:text-accent transition-colors">

                                        <i className="fas fa-envelope text-slate-500 w-4 text-center group-hover:text-accent"></i>
                                        <span className='font-medium'>{personalInfo.email}</span>
                                    </a>

                                    <button
                                        onClick={() => handleCopy("email", personalInfo.email)}
                                        className="group flex items-center gap-1.5 text-slate-500 hover:text-accent transition-colors p-1 ml-2"
                                        title="Copy to clipboard"
                                    >
                                        {emailCopyStatus ? (
                                            <i className="fas fa-check-circle text-lg text-accent transition-colors"></i>
                                        ) : (
                                            <i className="far fa-copy text-lg transition-colors"></i>
                                        )}
                                    </button>
                                </div>

                                {/* Phone Row */}
                                <div className="flex items-center text-text-muted">

                                    <a
                                        href={`tel:${personalInfo.phone}`}
                                        className="flex items-center gap-3 hover:text-accent transition-colors">

                                        <i className="fa fa-phone text-slate-500 w-4 text-center group-hover:text-accent"></i>
                                        <span className='font-medium'>{personalInfo.phone}</span>
                                    </a>

                                    <button
                                        onClick={() => handleCopy("phone", personalInfo.phone)}
                                        className="group flex items-center gap-1.5 text-slate-500 hover:text-accent transition-colors p-1 ml-2"
                                        title="Copy to clipboard"
                                    >
                                        {phoneCopyStatus ? (
                                            <i className="fas fa-check-circle text-lg text-accent transition-colors"></i>
                                        ) : (
                                            <i className="far fa-copy text-lg transition-colors"></i>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ➡️ RIGHT COLUMN: Message Draft Form */}
                    <div className="flex justify-start md:justify-end">

                        {/* 🫧 GLASS CONTACT FORM BOX */}
                        <div className="glass-card p-6 w-full shadow-lg border border-white/5">

                            {/* === FROM INPUT === */}
                            <label className="block text-sm text-text-muted mb-1 font-medium">Your Email:</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-bg/50 text-text-main border border-white/10 focus:border-accent/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] rounded-lg p-3 outline-none mb-4 text-sm transition-all placeholder-slate-600"
                            />

                            {/* === SUBJECT INPUT === */}
                            <label className="block text-sm text-text-muted mb-1 font-medium">Subject:</label>
                            <input
                                type="text"
                                placeholder="Inquiry about collaboration"
                                className="w-full bg-bg/50 text-text-main border border-white/10 focus:border-accent/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] rounded-lg p-3 outline-none mb-4 text-sm transition-all placeholder-slate-600"
                            />

                            {/* === MESSAGE TEXTAREA === */}
                            <label className="block text-sm text-text-muted mb-2 font-medium">Quick Message:</label>
                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-bg/50 text-text-main border border-white/10 focus:border-accent/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] rounded-lg p-3 outline-none resize-none mb-1 text-sm transition-all placeholder-slate-600"
                                rows={6}
                                placeholder="Type a message here..."
                            />

                            {/* === CONTROLS === */}
                            <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-2">
                                {/* 🤖 Refine Button */}
                                <button
                                    onClick={handleRefine}
                                    disabled={loading}
                                    className="group font-medium text-xs md:text-sm flex items-center gap-2 transition-all 
                                   px-3 py-1.5 rounded-full border border-transparent 
                                   text-text-muted hover:text-accent hover:border-accent/30 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <i className="fas fa-circle-notch fa-spin text-accent"></i>
                                            <span className="text-text-muted italic">Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <i className="fas fa-magic text-accent group-hover:text-accent/80 transition-colors"></i>
                                            <span className="semibold">AI Refine</span>
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center gap-4">
                                    {/* 🚀 Send Button */}
                                    <button
                                        onClick={handleSend}
                                        disabled={!message.trim()}
                                        className="font-bold text-sm md:text-base group flex items-center gap-1.5 transition-all py-1.5 px-5 rounded-full
                                       bg-accent text-bg shadow-[0_0_15px_rgba(34,211,238,0.4)]
                                       hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]
                                       disabled:bg-slate-700 disabled:shadow-none disabled:text-slate-400 disabled:cursor-not-allowed"
                                    >
                                        Send
                                        <i className="fas fa-paper-plane text-xs ml-1"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;