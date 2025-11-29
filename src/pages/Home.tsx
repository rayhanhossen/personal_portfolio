import { Link } from 'react-router-dom';
import { personalInfo, projects, skills, experiences } from '../data/content';
import profileImg from '../assets/profile-avatar.png';
import { useContactForm } from '../hooks/useContactForm';
import QuoteDisplay from '../components/QuoteDisplay';


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
    const featuredExperience = experiences.slice(0, 2);

    return (
        <div id="home-view" className="view-section">

            {/* HERO SECTION */}
            <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-end mb-12 md:mb-20">
                <div className="order-2 md:order-1 pb-2">
                    <h3 className="font-mono text-1xl md:text-4xl font-bold text-white mb-6 leading-snug tracking-tight">
                        Hi, I’m {personalInfo.name} — <br />
                        <span className="text-primary">{personalInfo.title}</span> focused on building <br />
                        <span className="whitespace-nowrap">
                            <span className="text-primary">AI-powered</span> applications<span className="animate-pulse text-primary">_</span>
                        </span>
                    </h3>

                    <p className="font-mono text-gray-400 mb-8 max-w-lg text-sm md:text-base leading-relaxed">
                        // I love turning complex ideas into clear, intelligent digital experiences.
                    </p>

                    <div className="flex flex-row gap-3 mt-6 w-full md:w-auto">
                        {/* Contact: JSON Object Style */}
                        <Link
                            to="/contacts"
                            className="flex-1 md:flex-none group border border-primary/50 bg-[#282C33] px-4 py-3 flex items-center justify-center gap-2 hover:border-primary hover:shadow-[0_0_15px_rgba(199,120,221,0.3)] transition-all duration-300"
                        >
                            <span className="text-primary font-bold transition-transform duration-300 group-hover:-translate-x-1">{`>`}</span>
                            <span className="font-mono font-medium text-white group-hover:text-primary transition-colors text-sm md:text-base">contact me</span>
                            {/* <span className="text-primary font-bold transition-transform duration-300 group-hover:translate-x-1">{`}`}</span> */}
                        </Link>

                        {/* CV: Shell Command Style */}
                        <a
                            href={personalInfo.cvLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none group border border-gray-600 bg-[#282C33] px-4 py-3 flex items-center justify-center gap-2 hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.2)] transition-all duration-300"
                        >
                            <span className="text-gray-500 font-mono text-sm group-hover:text-green-400 transition-colors">$</span>
                            <span className="font-mono font-medium text-gray-300 group-hover:text-white transition-colors text-sm md:text-base">cv.pdf</span>
                            <i className="fas fa-download text-xs text-gray-500 group-hover:text-green-400 transition-colors ml-1"></i>
                        </a>
                    </div>

                </div>

                <div className="order-1 md:order-2 relative flex justify-center md:justify-end md:-translate-y-[18px]">
                    <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gray-600 opacity-50 z-0"></div>
                    <div className="absolute bottom-[13.3rem] right-[21rem] w-16 h-16 dots-pattern opacity-60 z-20"></div>

                    <div className="relative z-10 w-64 md:w-80 group">
                        <img src={profileImg} alt="profile" className="w-full object-contain drop-shadow-[0_10px_20px_rgba(199,120,221,0.2)] transition-transform duration-300 group-hover:-translate-y-1 -scale-x-100 -ml-[25px]" />

                        <div className="absolute top-0 -left-6 w-12 h-12 opacity-50 animate-bounce delay-700">
                            <svg viewBox="0 0 100 100" fill="none" stroke="#C778DD" strokeWidth="2">
                                <rect x="10" y="10" width="80" height="80" />
                                <path d="M10 50 L90 50" />
                                <path d="M50 10 L50 90" />
                            </svg>
                        </div>

                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border border-gray-600 bg-[#282C33] p-2 flex items-center gap-2 text-gray-400 text-sm w-max z-20 shadow-xl">

                            <div className="relative flex h-3 w-3">
                                {/* Added style={{ animationDuration: '3s' }} to slow it down */}
                                <span
                                    className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                    style={{ animationDuration: '2s' }}
                                ></span>

                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>

                            <span>Currently open to <span className="text-white font-bold">opportunities</span></span>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section className="mb-24 w-full">
                <QuoteDisplay />
            </section>

            {/* SKILLS SECTION */}
            <section id="skills" className="mb-24">
                <div className="flex justify-between items-end mb-12">
                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-mono font-bold text-white flex items-center">
                        <span className="text-primary mr-2">def</span>
                        <span className="text-yellow-400">skills</span>
                        <span className="text-gray-400">()</span>
                        <span className="text-gray-400 animate-pulse">:</span>
                    </h2>

                    <Link to="/about" className="group mb-1">
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

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Left Decorative Area (Hardcoded Visual) */}
                    <div className="hidden lg:flex lg:col-span-2 relative min-h-[300px] items-center justify-center">
                        <div className="absolute top-4 left-4 w-24 h-24 dots-pattern opacity-40"></div>
                        <div className="absolute top-10 right-10 w-20 h-20 border border-gray-600 opacity-30"></div>
                        <div className="absolute top-1/2 right-0 w-3 h-3 bg-primary transform translate-x-1/2"></div>
                        <div className="absolute bottom-10 left-10 w-24 h-24 border border-primary opacity-20 -z-10"></div>

                        <div className="relative bg-[#21252B] border border-gray-600 rounded-lg w-full max-w-[300px] shadow-2xl transform transition-transform hover:-translate-y-1">
                            <div className="border-b border-gray-700 p-3 flex gap-2 bg-[#282C33] rounded-t-lg">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="p-5 font-mono text-sm leading-relaxed">
                                <div><span className="text-white">skills</span> <span className="text-primary">=</span> <span className="text-yellow-500">{'{'}</span></div>
                                <div className="pl-4"><span className="text-green-400">"passion"</span>: <span className="text-yellow-600">True</span>,</div>
                                <div className="pl-4"><span className="text-green-400">"learning"</span>: <span className="text-green-400">"always"</span>,</div>
                                <div className="pl-4"><span className="text-green-400">"code"</span>: <span className="text-primary">lambda</span>: <span className="text-green-400">"awesome"</span></div>
                                <div><span className="text-yellow-500">{'}'}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Skills Grid */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
                        {skills.map((grp) => (
                            <div key={grp.category} className="border border-gray-600 bg-[#282C33] group hover:border-white transition-all duration-300">
                                <div className="border-b border-gray-600 p-2 pl-3 flex justify-between items-center bg-[#21252B]">
                                    <span className="font-bold text-white text-sm"><span className="text-primary">#</span>{grp.category.toLowerCase()}</span>
                                </div>
                                <div className="h-32 overflow-y-auto aesthetic-scrollbar p-3 text-gray-400 text-sm flex flex-col gap-2">
                                    {grp.items.map((item) => (
                                        <span key={item} className="hover:text-white transition-colors cursor-default">
                                            <span className="text-primary font-bold">&gt;</span> {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EXPERIENCE PREVIEW */}
            <section id="experience-preview" className="mb-24">
                <div className="flex justify-between items-end mb-12">
                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-mono font-bold text-white flex items-center">
                        <span className="text-primary mr-2">def</span>
                        <span className="text-yellow-400">experience</span>
                        <span className="text-gray-400">()</span>
                        <span className="text-gray-400 animate-pulse">:</span>
                    </h2>

                    <Link to="/experience" className="group mb-1">
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

                <div className="relative border-l border-gray-600 ml-3 md:ml-6 space-y-12 pb-2">
                    {featuredExperience.map(exp => (
                        // 1. Added 'group' here so children react to parent hover
                        <div key={exp.id} className="timeline-item pl-8 relative group">

                            {/* Dot: adjusted alignment to -left-[9px] and used group-hover */}
                            <div className="absolute -left-[9px] top-[24px] w-4 h-4 bg-[#282C33] border border-gray-600 rounded-full group-hover:bg-primary group-hover:border-primary transition-all duration-300"></div>

                            {/* Card: Changed hover:border-white to group-hover:border-white */}
                            <div className="border border-gray-600 p-4 group-hover:border-white transition-colors bg-[#282C33]">
                                <div className="flex flex-col md:flex-row justify-between mb-2">
                                    <h3 className="text-white font-medium text-lg">{exp.role}</h3>
                                    <span className="text-gray-500 text-sm">{exp.period}</span>
                                </div>
                                <p className="text-primary text-sm mb-4">{exp.company} <span className="text-gray-500 ml-2 text-xs"><i className="fas fa-map-marker-alt"></i> {exp.location}</span></p>
                                <p className="text-gray-400 text-sm">
                                    {Array.isArray(exp.description) ? exp.description[0] : exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
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
                                    <button
                                        onClick={handleCopy}
                                        // Conditional text color change for the entire button when copied
                                        className={`group flex items-center gap-1.5 font-mono transition-colors ${copyStatus ? 'text-green-500 hover:text-green-500' : 'text-gray-500 hover:text-white'}`}
                                        title="Copy to clipboard"
                                    >
                                        {copyStatus ? (
                                            /* STATE: COPIED (Mobile & Desktop Icon/Text) */
                                            <>
                                                {/* ICON: Always show checkmark when copied */}
                                                <i className="fas fa-check-circle text-lg transition-colors"></i>
                                            </>
                                        ) : (
                                            /* STATE: IDLE (Mobile Icon & Desktop Code Style) */
                                            <>
                                                {/* MOBILE ONLY: Icon */}
                                                <i className="far fa-copy text-lg group-hover:text-green-400 transition-colors md:hidden"></i>

                                                {/* DESKTOP ONLY: Text code style */}
                                                <span className="hidden md:inline text-sm">
                                                    <span className="text-gray-600">.</span>
                                                    <span className="text-green-400 opacity-70 group-hover:opacity-100 transition-opacity">copy</span>
                                                    <span className="text-gray-600">()</span>
                                                </span>
                                            </>
                                        )}
                                    </button>

                                    <button
                                        onClick={handleSend}
                                        disabled={!message}
                                        className="font-mono text-sm md:text-base group flex items-center gap-1.5 transition-all disabled:cursor-not-allowed py-2"
                                    >
                                        {!message ? (
                                            /* Disabled State: Looks like a code comment */
                                            <span className="text-gray-600 italic font-mono select-none">// type_message</span>
                                        ) : (
                                            /* Enabled State: Looks like an async function call */
                                            <>
                                                <span className="text-primary font-bold">await</span>
                                                <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">send</span>
                                                <span className="text-gray-400">()</span>
                                                {/* Semicolon appears on hover */}
                                                <span className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">;</span>
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
                                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                                    <i className="fa fa-phone text-gray-500"></i>
                                    <span>{personalInfo.phone}</span>
                                </a>
                                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                                    <i className="fas fa-envelope text-gray-500"></i>
                                    <span>{personalInfo.email}</span>
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