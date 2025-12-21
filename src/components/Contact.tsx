import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/content';

const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // State
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [loadingRefine, setLoadingRefine] = useState(false);
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    // --- Actions ---
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
                console.error(error);
                setStatus('error');
            });
    };

    const handleCopy = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyStatus(type);
            setTimeout(() => setCopyStatus(null), 2000);
        });
    };

    const handleRefine = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        setLoadingRefine(true);

        const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
        const prompt = `Refine this message for a developer contact form. Fix grammar, improve clarity, keep it professional but friendly. Output ONLY the refined text: "${message}"`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            const data = await response.json();
            const refinedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (refinedText) setMessage(refinedText.trim());
        } catch (error) {
            console.error("AI Error", error);
        }
        setLoadingRefine(false);
    }, [message]);

    return (
        <section id="contacts" className="w-full max-w-5xl mx-auto px-4 md:px-6 mb-20 relative">

            {/* 1. Header Section */}
            <div className="mb-12 relative z-10">
                {/* Watermark Icon */}
                <div className="absolute -top-10 -left-10 text-[100px] text-accent/5 opacity-20 pointer-events-none select-none z-0">
                    <i className="fas fa-paper-plane"></i>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2 relative z-10">
                    <span className="text-accent font-mono drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">/</span>
                    <span className="text-transparent bg-clip-text bg-text-gradient">contact</span>
                </h2>

                {/* 🚨 UPDATED: Stronger, Recruiter-Friendly Text */}
                <p className="text-text-muted text-lg font-light tracking-wide max-w-xl relative z-10">
                    I am actively seeking full-time opportunities. If you have a role to discuss, or just want to connect, my inbox is always open.
                </p>
            </div>

            {/* 2. The Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* ⬅️ LEFT COLUMN: Info Panels (Occupies 5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* Status Card */}
                    <div className="glass-card p-6 border border-white/10 rounded-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                        <h3 className="text-text-main font-bold text-lg mb-4">Current Status</h3>
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            {/* 🚨 UPDATED STATUS TEXT */}
                            <span className="text-green-400 font-mono text-sm tracking-wider font-bold">OPEN TO WORK</span>
                        </div>
                        <p className="text-text-muted text-sm mt-3 leading-relaxed">
                            Ready to join your team immediately.
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="flex flex-col gap-4">
                        {/* Email */}
                        <div className="group glass-card p-4 border border-white/5 hover:border-accent/30 transition-all duration-300 flex items-center justify-between rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Email</p>
                                    <a href={`mailto:${personalInfo.email}`} className="text-sm md:text-base text-gray-200 group-hover:text-white transition-colors">
                                        {personalInfo.email}
                                    </a>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCopy(personalInfo.email, 'email')}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-text-muted hover:text-accent transition-colors"
                            >
                                <i className={`fas ${copyStatus === 'email' ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                            </button>
                        </div>

                        {/* Phone */}
                        <div className="group glass-card p-4 border border-white/5 hover:border-accent/30 transition-all duration-300 flex items-center justify-between rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                    <i className="fas fa-phone"></i>
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Phone</p>
                                    <a href={`tel:${personalInfo.phone}`} className="text-sm md:text-base text-gray-200 group-hover:text-white transition-colors">
                                        {personalInfo.phone}
                                    </a>
                                </div>
                            </div>
                            <button
                                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-text-muted hover:text-accent transition-colors"
                            >
                                <i className={`fas ${copyStatus === 'phone' ? 'fa-check text-green-400' : 'fa-copy'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ➡️ RIGHT COLUMN: The Form (Occupies 7 cols) */}
                <div className="lg:col-span-7">
                    <div className="glass-card bg-glass-overlay/50 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
                        <form ref={form} onSubmit={handleSend} className="flex flex-col gap-6">

                            {/* Input Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono text-accent uppercase tracking-widest">Name</label>
                                    <input
                                        required type="text" name="name" placeholder="John Doe"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono text-accent uppercase tracking-widest">Email</label>
                                    <input
                                        required type="email" name="from_email" placeholder="john@company.com"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="flex flex-col gap-2 relative">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-mono text-accent uppercase tracking-widest">Message</label>
                                    {/* AI Refine Button */}
                                    <button
                                        type="button"
                                        onClick={handleRefine}
                                        disabled={loadingRefine || !message.trim()}
                                        className="text-[10px] flex items-center gap-1.5 text-accent/70 hover:text-accent disabled:opacity-30 transition-colors"
                                    >
                                        <i className={`fas ${loadingRefine ? 'fa-circle-notch fa-spin' : 'fa-magic'}`}></i>
                                        {loadingRefine ? 'Optimizing...' : 'AI Refine'}
                                    </button>
                                </div>
                                {/* 🚨 UPDATED PLACEHOLDER */}
                                <textarea
                                    required name="message" rows={5}
                                    ref={textareaRef}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Hi, I'd like to discuss a potential role at our company..."
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all resize-none"
                                />
                            </div>

                            {/* Action Bar */}
                            <div className="flex items-center justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={!message.trim() || status === 'sending' || status === 'success'}
                                    className={`
                                        relative overflow-hidden group flex items-center gap-3 px-8 py-3 rounded-lg font-bold text-sm tracking-wide transition-all duration-300
                                        ${status === 'success'
                                            ? 'bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                                            : 'bg-accent text-bg shadow-neon hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:-translate-y-1'
                                        }
                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
                                    `}
                                >
                                    {status === 'sending' ? (
                                        <><span>Transmitting</span><i className="fas fa-circle-notch fa-spin"></i></>
                                    ) : status === 'success' ? (
                                        <><span>Message Sent</span><i className="fas fa-check"></i></>
                                    ) : (
                                        <><span>Send Message</span><i className="fas fa-paper-plane group-hover:translate-x-1 transition-transform"></i></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;