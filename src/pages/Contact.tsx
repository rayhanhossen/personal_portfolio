import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/content';
import { Helmet } from 'react-helmet-async';

const ContactPage: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const formSectionRef = useRef<HTMLDivElement>(null);

    // State
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

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


    return (
        <div className="font-sans animate-fadeIn">
            <Helmet>
                <meta name="description" content="Get in touch with Rayhan Hossen for software engineering opportunities, collaborations, or technical inquiries." />
                <meta name="keywords" content="Contact Rayhan Hossen, Software Engineer Hire, Remote Developer, Python Freelancer" />
            </Helmet>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="pt-28 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20 text-text-main">

                {/* LEFT COLUMN: Status & Info */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Status Card (Updated shadow) */}
                    <div className="flex-1 glass-card p-8 border border-white/10 rounded-2xl relative overflow-hidden group flex flex-col justify-between shadow-none transition-all duration-300 hover:border-accent/40 hover:shadow-md">
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <i className="fas fa-globe-americas text-accent text-xl"></i>
                                    <h3 className="text-text-main font-semibold text-md uppercase tracking-widest font-mono mt-1">
                                        Mobility Status
                                    </h3>
                                </div>

                                {/* ... The 'AVAILABLE' badge code continues here ... */}
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-text-main text-xl font-bold leading-tight">
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
                                    {/* Refine button removed — feature disabled */}
                                </div>
                                <textarea required name="message" value={message} onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Hey Rayhan, I saw your portfolio and wanted to chat about..."
                                    className="contact-input flex-1 resize-none py-4 transition-all duration-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!message.trim() || status === 'sending'}
                                className={`w-full py-4 mt-2 ${status === 'success' ? 'bg-green-500 text-white rounded-full font-bold tracking-wide transition-all' : 'btn-primary'}`}
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


        </div >
    );
};

export default ContactPage;