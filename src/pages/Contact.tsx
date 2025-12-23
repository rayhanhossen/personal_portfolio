import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/content';

const ContactPage: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const formSectionRef = useRef<HTMLDivElement>(null);

    // State
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [loadingRefine, setLoadingRefine] = useState(false);
    const [isRefined, setIsRefined] = useState(false);
    const [copyStatus, setCopyStatus] = useState<string | null>(null);
    const [cooldown, setCooldown] = useState(false);

    // --- Action: Send Email ---
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current || !message.trim()) return;
        setStatus('sending');

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(() => {
                setStatus('success');
                form.current?.reset();
                setMessage('');
                setTimeout(() => setStatus('idle'), 3000);
            }, (error) => {
                console.error("Email Error:", error);
                setStatus('error');
            });
    };

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus(type);
            setTimeout(() => setCopyStatus(null), 2000);
        });
    };

    // const handleRefine = useCallback(async (e: React.MouseEvent) => {
    //     e.preventDefault();

    //     // 2. Add 'cooldown' to the block condition
    //     if (!message.trim() || loadingRefine || cooldown) return;

    //     setLoadingRefine(true);
    //     setCooldown(true); // 3. Start cooldown immediately

    //     // 4. Reset cooldown after 5 seconds (prevents spamming)
    //     setTimeout(() => setCooldown(false), 5000);

    //     const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    //     const prompt = `Refine this message for a developer's contact form. Fix grammar and improve clarity. Keep it professional but friendly and concise. Output ONLY the refined text: "${message}"`;

    //     try {
    //         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    //         });

    //         // 5. specific check for 429
    //         if (response.status === 429) {
    //             console.warn("Too many requests. Please wait a moment.");
    //             // Optional: alert("Please wait a few seconds before refining again.");
    //             setLoadingRefine(false);
    //             return;
    //         }

    //         const data = await response.json();
    //         const refinedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    //         if (refinedText) {
    //             setMessage(refinedText.trim());
    //             setIsRefined(true);
    //             setTimeout(() => setIsRefined(false), 2000);
    //         }
    //     } catch (error) {
    //         console.error("AI Error:", error);
    //     }
    //     setLoadingRefine(false);
    // }, [message, loadingRefine, cooldown]);

    return (
        <div className="font-sans animate-fadeIn">
            {/* --- HEADER --- */}
            <div className="pt-24 md:pt-32 mb-8 relative z-10">
                <div className="absolute -top-10 -left-10 text-[100px] text-accent/5 opacity-20 pointer-events-none select-none z-0">
                    <i className="fas fa-paper-plane"></i>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2 relative z-10">
                    <span className="text-accent font-mono">/</span>
                    <span className="text-transparent bg-clip-text bg-text-gradient">contact_me</span>
                </h2>
            </div>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 text-text-main">

                {/* LEFT COLUMN: Status & Info */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Status Card (Updated shadow) */}
                    <div className="flex-1 glass-card p-8 border border-white/10 rounded-2xl relative overflow-hidden group flex flex-col justify-between shadow-none transition-all duration-300 hover:border-accent/40 hover:shadow-md">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    {/* CHANGED: Removed wrapper div, increased icon size directly */}
                                    <i className="fas fa-globe-americas text-accent text-xl"></i>

                                    {/* Kept text styles, flex-row handles the alignment */}
                                    <h3 className="text-text-main font-semibold text-md uppercase tracking-widest font-mono mt-1">
                                        Mobility Status
                                    </h3>
                                </div>

                                {/* ... The 'AVAILABLE' badge code continues here ... */}
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-text-main text-1xl font-bold leading-tight">
                                    Seeking Global & Local Opportunities
                                </h4>
                                <div className="text-text-muted text-[15px] leading-relaxed font-light">
                                    <p>
                                        I am <span className="text-white font-medium italic">actively seeking</span> software engineering roles with a focus on <span className="text-white font-medium">Relocation</span> (Europe, USA, UK, Canada, Malaysia) or <span className="text-white font-medium">Remote</span> opportunities. I am also <span className="text-white font-medium italic">open to joining</span> tech companies within <span className="text-white font-medium">Bangladesh</span>.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-3 pt-2">
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <i className="fas fa-plane-departure text-accent/60 w-5"></i>
                                        <span>Open to Relocation</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-300">
                                        <i className="fas fa-laptop-house text-accent/60 w-5"></i>
                                        <span>Remote Work Ready</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metadata Footer */}
                        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Current Location</span>
                                <div className="flex items-center gap-2">
                                    {/* Dynamic Location */}
                                    <span className="text-xs font-bold text-white">{personalInfo.location}</span>
                                    {/* Dynamic Timezone */}
                                    <span className="text-[10px] font-mono text-accent bg-accent/5 px-1.5 py-0.5 rounded border border-accent/10">
                                        {personalInfo.timezone}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-end">
                                <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Notice Period</span>
                                {/* Dynamic Notice Period */}
                                <span className="text-xs font-bold text-accent">{personalInfo.noticePeriod}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Methods */}
                    <div className="flex flex-col gap-4">
                        {[
                            { label: 'Email', val: personalInfo.email, icon: 'fa-envelope', key: 'email' },
                            { label: 'Phone', val: personalInfo.phone, icon: 'fa-phone', key: 'phone' }
                        ].map((item) => (
                            <div key={item.key} className="group glass-card p-4 border border-white/5 hover:border-accent/30 transition-all rounded-xl flex items-center justify-between bg-glass-overlay/20 shadow-none hover:shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent/10 transition-colors">
                                        <i className={`fas ${item.icon}`}></i>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">{item.label}</p>
                                        <p className="text-sm text-gray-200 truncate">{item.val}</p>
                                    </div>
                                </div>
                                <button onClick={() => handleCopy(item.val, item.key)} className="p-2 text-text-muted hover:text-accent transition-colors">
                                    <i className={`fas ${copyStatus === item.key ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN: The Form (Updated shadow) */}
                <div ref={formSectionRef} className="lg:col-span-7">
                    <div className="glass-card bg-glass-overlay/50 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-none transition-all duration-300 hover:shadow-md h-full flex flex-col">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-white mb-1">Quick Message</h3>
                            <p className="text-text-muted text-sm">I'll get back to you within 24 hours.</p>
                        </div>

                        <form ref={form} onSubmit={handleSend} className="flex flex-col gap-6 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-accent uppercase tracking-widest ml-1">Name</label>
                                    <input required type="text" name="name" placeholder="John Doe" className="contact-input" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-accent uppercase tracking-widest ml-1">Email</label>
                                    <input required type="email" name="from_email" placeholder="john.doe@gmail.com" className="contact-input" />
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col gap-2 min-h-[250px]">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-mono text-accent uppercase tracking-widest">Message</label>
                                    {/* <button
                                        type="button"
                                        onClick={handleRefine}
                                        disabled={loadingRefine || !message.trim()}
                                        className={`
                                            text-[10px] font-mono tracking-[0.2em] uppercase flex items-center gap-2 transition-all duration-500 transform
                                            ${loadingRefine
                                                ? 'text-accent animate-pulse scale-100 opacity-100'
                                                : message.trim()
                                                    ? 'text-text-muted/60 hover:text-accent scale-100 opacity-100 cursor-pointer'
                                                    : 'scale-95 opacity-0 pointer-events-none'
                                            }
                                        `}
                                    >
                                        <i className={`fas ${loadingRefine ? 'fa-circle-notch fa-spin' : 'fa-wand-magic-sparkles'} text-[9px]`}></i>
                                        <span>{loadingRefine ? 'Refining' : 'Refine'}</span>
                                    </button> */}
                                </div>
                                <textarea required name="message" value={message} onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Hey Rayhan, I saw your portfolio and wanted to chat about..."
                                    className={`contact-input flex-1 resize-none py-4 transition-all duration-500 ${isRefined ? 'border-accent/60 bg-accent/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : ''}`}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!message.trim() || status === 'sending'}
                                className={`w-full py-5 rounded-xl font-bold text-sm tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-3 
                                    ${status === 'success'
                                        ? 'bg-green-500 text-white shadow-none'
                                        : 'bg-accent text-bg disabled:bg-white/5 disabled:text-text-muted disabled:border-white/10 disabled:shadow-none hover:shadow-sm shadow-none border border-transparent'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    <>
                                        <span className="tracking-widest">Sending...</span>
                                        <i className="fas fa-paper-plane animate-pulse text-xs"></i>
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        <span className="tracking-widest">Delivered!</span>
                                        <i className="fas fa-check-circle text-white animate-fadeIn"></i>
                                    </>
                                ) : (
                                    <>
                                        <span className="tracking-widest">Send Message</span>
                                        <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                .contact-input {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 12px;
                    padding: 1rem;
                    font-size: 0.875rem;
                    color: white;
                    transition: all 0.3s ease;
                }
                .contact-input:focus {
                    outline: none;
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(34, 211, 238, 0.4);
                }
                /* Minimalist subtle hover shadow for dark glass-cards */
                .hover\:shadow-md:hover {
                    box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.5);
                }
                .hover\:shadow-sm:hover {
                    box-shadow: 0 5px 15px -10px rgba(255, 255, 255, 0.05);
                }
            `}</style>
        </div>
    );
};

export default ContactPage;