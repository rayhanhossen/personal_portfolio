import { Link } from 'react-router-dom';
import { personalInfo, projects, experiences } from '../data/content';
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

    // Data Slicing for Previews
    const featuredProjects = projects.slice(0, 3);

    return (
        <div id="home-view" className="view-section">

            {/* HERO SECTION */}
            <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-end mb-12 md:mb-20">
                <div className="order-2 md:order-1 pb-2">
                    {/* intial text  */}
                    <h3 className="font-mono text-1xl md:text-2xl font-bold text-white mb-6 leading-snug tracking-tighter">
                        Hi, I’m {personalInfo.name} Hossen — <br />
                        <span className="text-primary">{personalInfo.title}</span> focused on building <span className="text-primary">AI-powered </span>
                        applications<span className="animate-pulse text-primary">_</span>
                    </h3>

                    {/* sub header  */}
                    <p className="font-mono text-gray-400 mb-8 max-w-lg text-sm md:text-base leading-relaxed tracking-tighter">
                        // I love turning complex ideas into clear, intelligent digital experiences.
                    </p>

                    <div className="flex flex-row gap-3 mt-6 w-full md:w-auto">
                        {/* contact me button  */}
                        <Link
                            to="/contacts"
                            className="flex-1 md:flex-none group border-2 relative
                                px-3 py-3 flex items-center justify-center gap-2 
                                transition-all duration-300 overflow-hidden rounded-md
                                
                                // BASE STATE (Primary Purple Look)
                                bg-transparent 
                                border-[#C778DD]  /* Base Border: Primary Purple */
                                
                                
                                // HOVER STATE (Green Accent) 🚨
                                hover:border-[#1bac81] /* Hover Border: Green */
                                hover:shadow-[0_0_15px_rgba(27,172,129,0.8)] /* Hover Shadow: Green Glow (using #1bac81 converted to rgba) */
                                "
                        >
                            {/* The > symbol color changes from Primary Purple to Green on hover */}
                            <span
                                className="font-bold transition-transform duration-300 
                                    text-[#C778DD]                /* Base Text: Primary Purple */
                                    group-hover:-translate-x-1 
                                    group-hover:text-[#1bac81]"    /* Hover Text: Green */
                            >
                                {`>`}
                            </span>

                            {/* The main text stays white and only changes its accent color */}
                            <span
                                className="font-mono font-medium transition-colors text-sm md:text-base 
                                    text-white /* Always White */
                                    group-hover:text-white" /* Explicitly ensure it stays white on hover */
                            >
                                contact me
                            </span>
                        </Link>

                        {/* resume download button */}
                        <a
                            href={personalInfo.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"

                            // Base State: Primary Purple Border/Shadow
                            className="flex-1 md:flex-none group border-2 relative
                                px-3 py-3 flex items-center justify-center gap-2 
                                transition-all duration-300 overflow-hidden rounded-md
                                
                                bg-transparent 
                                border-[#1bac81]

                                // Hover State: Green Accent
                                hover:border-[#1bac81]                      /* Hover Border: Green */
                                hover:shadow-[0_0_15px_rgba(27,172,129,0.8)] /* Hover Shadow: Green Glow */
                                "
                        >

                            {/* 1. DOWNLOAD ICON (Left, Initially Green, Hover Green) */}
                            <i
                                className="fas fa-download text-sm ml-0 mr-1 transition-colors 
                                            text-[#1bac81]                          /* 🚨 Base Icon Color: Vibrant Green */
                                            group-hover:text-[#1bac81]"             /* Hover Icon Color: Green (Stays Green) */
                            ></i>

                            {/* 2. TEXT (Always White) */}
                            <span className="font-mono font-medium text-white transition-colors text-sm md:text-base">
                                resume.pdf
                            </span>
                        </a>

                    </div>

                </div>

                <div className="order-1 md:order-2 relative flex justify-center md:justify-end md:-translate-y-[18px]">
                    {/* <div className="absolute md:top-10 left-[-54px] top-[-24px] md:left-[2.3rem] w-20 h-20 border-2 border-gray-600 opacity-50 z-0"></div> */}
                    {/* <div className="absolute bottom-[13rem] right-[21rem] w-16 h-16 dots-pattern opacity-60 z-20"></div> */}

                    <div className="relative z-10 w-64 md:w-80 group">
                        <img src={profileImg} alt="profile" className="w-full object-contain drop-shadow-[0_10px_20px_rgba(199,120,221,0.2)] transition-transform duration-300 group-hover:-translate-y-1 -scale-x-100 -ml-[25px]" />


                        <div className="rounded-md absolute -bottom-2 left-1/2 -translate-x-1/2 border border-[#1bac81] shadow-[0_0_15px_rgba(27,172,129,0.5)] bg-[#282C33] p-3 md:p-[12px] flex items-center gap-2 text-gray-400 text-sm w-max z-20">

                            <div className="relative flex h-3 w-3">
                                {/* Added style={{ animationDuration: '3s' }} to slow it down */}
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                    style={{ animationDuration: '2s' }}
                                ></span>

                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>

                            <span className='tracking-normal'>Currently open to <span className="text-primary font-bold">opportunities</span></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section className="mb-12 md:mb-20 w-full">
                <QuoteDisplay />
            </section>


            {/* EXPERIENCE PREVIEW */}
            <section id="experience-preview" className="mb-24">
                <ExperiencePreview featuredExperience={experiences}/>
            </section>

            {/* PROJECTS SECTION */}
            <section id="works" className="mb-24">
                <div className="flex justify-between items-end mb-12">
                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-mono font-bold text-white flex items-center">
                        <span className="text-primary mr-2">def</span>
                        <span className="text-yellow-400">projects</span>
                        <span className="text-gray-400">()</span>
                        <span className="text-gray-400 animate-pulse">:</span>
                    </h2>

                    <Link to="/projects" className="group mb-1">
                        {/* MOBILE VIEW: Clean Arrow Only */}
                        <i className="fas fa-arrow-right text-xl text-gray-400 group-hover:text-primary transition-colors transform group-hover:translate-x-1 duration-300 md:hidden"></i>

                        {/* DESKTOP VIEW: Python Return Style */}
                        <div className="hidden md:flex items-baseline gap-2 font-mono text-base">
                            <span className="text-primary opacity-70 group-hover:opacity-100 transition-opacity italic">return</span>
                            <div className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                                <span>"view_all"</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((p) => (
                        <div key={p.id} className="border border-gray-600 hover:border-white transition-colors group">

                            {/* Image Area Logic */}
                            <div className={`h-48 border-b border-gray-600 overflow-hidden relative ${p.title.includes('Kahoot') ? 'bg-[#46178F] flex items-center justify-center' : 'bg-[#333]'}`}>
                                {p.image && !p.title.includes('Kahoot') && !p.title.includes('ProtectX') ? (
                                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                ) : p.title.includes('Kahoot') ? (
                                    <h1 className="text-white font-bold text-3xl italic">Kahoot!</h1>
                                ) : p.title.includes('ProtectX') ? (
                                    <div className="flex items-center justify-center h-full relative">
                                        <i className="fas fa-shield-alt text-6xl text-green-500"></i>
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    </div>
                                ) : null}
                            </div>

                            <div className="border-b border-gray-600 p-2 text-gray-400 text-sm">
                                {p.tech.join(" ")}
                            </div>

                            <div className="p-4">
                                <h3 className="text-2xl text-white font-medium mb-4">{p.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{p.description}</p>

                                {/* CONDITIONAL LINK RENDERING */}
                                {p.liveLink && p.liveLink !== "#" && (
                                    <div className="flex gap-4">
                                        <a
                                            href={p.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary text-sm hover:underline"
                                        >
                                            Link {'->'}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ABOUT ME SECTION */}
            <section id="about-me" className="mb-24">
                <div className="mb-12">
                    <h2 className="text-3xl font-mono font-bold text-white mb-12 flex items-center">
                        <span className="text-primary mr-2">def</span>
                        <span className="text-yellow-400">about_me</span>
                        <span className="text-gray-400">()</span>
                        <span className="text-gray-400 animate-pulse">:</span>
                    </h2>
                    <p className="text-gray-400">Who am i?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="text-gray-400 leading-relaxed order-2 md:order-1">
                        {personalInfo.about.map((line, idx) => (
                            <p key={idx} className="mb-6">{line}</p>
                        ))}

                        <Link to="/about" className="group inline-block mt-4">
                            {/* Shows "return read_more" on Mobile AND Desktop */}
                            <div className="flex items-baseline gap-2 font-mono text-base">
                                <span className="text-primary opacity-70 group-hover:opacity-100 transition-opacity italic">return</span>
                                <span className="text-green-400 hover:text-green-300 transition-colors">"read_more"</span>
                            </div>
                        </Link>
                    </div>

                    <div className="relative flex justify-center md:justify-end order-1 md:order-2">
                        <div className="relative">
                            <div className="absolute top-[4.75rem] left-[0.5rem] w-16 h-16 dots-pattern z-0"></div>
                            <img src={profileImg} alt="Rayhan Profile" className="w-72 md:w-80 relative z-10 -scale-x-100 -ml-[10px] top-[10px]" />
                            <div className="absolute bottom-[11rem] -right-4 w-16 h-16 dots-pattern z-20"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACTS SECTION */}
            <section id="contacts" className="mb-32">
                <h2 className="text-3xl font-mono font-bold text-white mb-12 flex items-center">
                    <span className="text-primary mr-2">def</span>
                    <span className="text-yellow-400">contacts</span>
                    <span className="text-gray-400">()</span>
                    <span className="text-gray-400 animate-pulse">:</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="text-gray-400">
                        <p className="mb-6">
                            I'm interested in new opportunities. If you have a question, collaboration idea, or just want to connect, feel free to reach out.
                        </p>

                        <div className="border border-gray-600 p-4 mt-6 relative bg-[#282C33]/20">
                            <label className="block text-1xl text-gray-500 mb-2 font-mono">Quick Message Draft:</label>

                            <textarea
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full bg-transparent text-white font-mono outline-none resize-none mb-4 text-sm focus:placeholder-gray-600 transition-colors"
                                rows={4}
                                placeholder="Type a message here..."
                            />

                            <div className="flex justify-between items-center border-t border-gray-600 pt-3">
                                <button
                                    onClick={handleRefine}
                                    disabled={loading}
                                    className="group font-mono text-xs md:text-sm flex items-center gap-1.5 transition-all hover:bg-white/5 px-2 py-1 rounded-sm border border-transparent hover:border-gray-700"
                                >
                                    {loading ? (
                                        /* Loading State: Compiling style */
                                        <>
                                            <i className="fas fa-circle-notch fa-spin text-primary"></i>
                                            <span className="text-gray-500 italic">processing...</span>
                                        </>
                                    ) : (
                                        /* Idle State: Method Call style */
                                        <>
                                            <i className="fas fa-magic text-purple-400 group-hover:text-yellow-400 transition-colors"></i>

                                            <span className="flex items-center">
                                                <span className="text-primary font-bold">AI</span>
                                                <span className="text-gray-500">.</span>
                                                <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">refine</span>
                                                <span className="text-gray-500">(</span>
                                                <span className="text-green-400 opacity-70 group-hover:opacity-100">msg</span>
                                                <span className="text-gray-500">)</span>
                                            </span>
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center gap-4">
                                    {/* --- Copy Button (Unchanged) --- */}
                                    <button
                                        onClick={handleCopy}
                                        className="group flex items-center gap-1.5 font-mono text-gray-500 hover:text-white transition-colors"
                                        title="Copy to clipboard"
                                    >
                                        {/* 3. Conditional rendering based on copyStatus */}
                                        {copyStatus ? (
                                            <i className="fas fa-check-circle text-lg text-green-500 transition-colors"></i>
                                        ) : (
                                            <>
                                                {/* MOBILE ONLY: Icon */}
                                                <i className="far fa-copy text-lg group-hover:text-green-400 transition-colors md:hidden"></i>
                                            </>
                                        )}

                                        {/* DESKTOP ONLY: Text code style */}
                                        <span className="hidden md:inline text-sm">
                                            <span className="text-gray-600">.</span>
                                            <span className={`text-green-400 ${copyStatus ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} transition-opacity`}>copy</span>
                                            <span className="text-gray-600">()</span>
                                        </span>
                                    </button>

                                    {/* --- Send Button (UPDATED to match Copy style) --- */}
                                    <button
                                        onClick={handleSend}
                                        disabled={!message.trim()} // Disabled when no text exists
                                        className="font-mono text-sm md:text-base group flex items-center gap-1.5 transition-all disabled:cursor-not-allowed py-2"
                                    >
                                        {!message.trim() ? (
                                            /* 🚨 1. DISABLED State: Simple gray text 🚨 */
                                            <span className="text-gray-500 font-mono select-none text-sm md:text-base">.send()</span>
                                        ) : (
                                            /* 🚨 2. ENABLED State: Code style with Icon and Method call 🚨 */
                                            <>
                                                {/* ICON (Mobile Only: Use a generic send/arrow icon) */}
                                                <i className="fas fa-paper-plane text-sm text-primary group-hover:text-yellow-400 transition-colors md:hidden"></i>

                                                {/* DESKTOP/CODE STYLE */}
                                                <span className="hidden md:inline text-sm md:text-base">
                                                    <span className="text-gray-500">.</span>
                                                    <span className="text-primary group-hover:text-yellow-400 transition-colors">send</span>
                                                    <span className="text-gray-500">()</span>
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start md:justify-end">
                        <div className="border border-gray-600 p-4 w-full md:w-auto">
                            <h4 className="text-white font-bold mb-4">Feel free to reach out</h4>
                            <div className="flex flex-col gap-2">
                                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                                    <i className="fas fa-envelope text-gray-500"></i>
                                    <span>{personalInfo.email}</span>
                                </a>
                                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                                    <i className="fa fa-phone text-gray-500"></i>
                                    <span>{personalInfo.phone}</span>
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