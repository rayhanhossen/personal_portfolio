import React, { useState, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '../data/content';

const Contact: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // --- State Management ---
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [loadingRefine, setLoadingRefine] = useState(false);

    // Copy Feedback State
    const [emailCopyStatus, setEmailCopyStatus] = useState(false);
    const [phoneCopyStatus, setPhoneCopyStatus] = useState(false);

    // --- 1. Handle Send (EmailJS) ---
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.current || !message.trim()) return;

        setStatus('sending');

        // 🚨 REPLACE WITH YOUR ACTUAL KEYS
        const SERVICE_ID = import.meta.env.EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = import.meta.env.EMAILJS_TEMPLATE_ID;
        const PUBLIC_KEY = import.meta.env.EMAILJS_PUBLIC_KEY;
        

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then((result: any) => {
                console.log(result.text);
                setStatus('success');
                form.current?.reset();
                setMessage('');

                // Reset success message after 3 seconds
                setTimeout(() => setStatus('idle'), 3000);
            }, (error: any) => {
                console.log(error.text);
                setStatus('error');
            });
    };

    // --- 2. Handle Copy to Clipboard ---
    const handleCopy = (type: 'email' | 'phone', text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            if (type === 'email') {
                setEmailCopyStatus(true);
                setTimeout(() => setEmailCopyStatus(false), 2000);
            } else {
                setPhoneCopyStatus(true);
                setTimeout(() => setPhoneCopyStatus(false), 2000);
            }
        });
    };

    // --- 3. Handle AI Refine (Mock/Placeholder) ---
    const handleRefine = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoadingRefine(true);
        const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

        const prompt = `
            You are a professional editor. The user is drafting a quick message to send via a contact form to a developer.
            Your task is to refine the message below:
            1. Fix any grammar and spelling errors.
            2. Improve the flow and clarity.
            3. Make the tone professional yet friendly.
            4. Do NOT add email formatting like "Subject:", "Dear [Name]", or "Sincerely". 
            5. Do NOT add new information or change the user's intent.
            
            Just output the polished version of the message text.

            User Message: "${message}"
        `;

        const maxRetries = 3;
        let attempt = 0;
        let refinedText: string | null = null;

        while (attempt < maxRetries) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                refinedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

                if (refinedText) {
                    setMessage(refinedText.trim());
                    break; // Success
                } else {
                    throw new Error("Empty response from AI.");
                }

            } catch (error) {
                attempt++;
                console.warn(`Attempt ${attempt} failed.`);
                if (attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000;
                    await new Promise(res => setTimeout(res, delay));
                }
            }
        }
        setLoadingRefine(false);
    }, [message]);

    return (
        <section id="contacts" className="mb-8 font-sans animate-fadeIn">
            {/* Header */}
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
                        <p className="mb-8 text-gray-300 leading-relaxed">
                            I'm interested in new opportunities. If you have a question, collaboration idea, or just want to connect, feel free to reach out.
                        </p>
                        <h4 className="text-text-main text-xl font-bold mb-4">Get in touch</h4>
                        <div className="flex flex-col gap-3">

                            {/* Email Row */}
                            <div className="flex items-center text-text-muted">
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center gap-3 hover:text-accent transition-colors group">
                                    <div className="w-6 flex justify-center">
                                        <i className="fas fa-envelope text-slate-500 group-hover:text-accent transition-colors"></i>
                                    </div>
                                    <span className='font-medium'>{personalInfo.email}</span>
                                </a>
                                <button
                                    onClick={() => handleCopy("email", personalInfo.email)}
                                    className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 transition-all ml-2"
                                    title="Copy email"
                                >
                                    {emailCopyStatus ? (
                                        <i className="fas fa-check text-accent text-sm"></i>
                                    ) : (
                                        <i className="far fa-copy text-slate-500 group-hover:text-accent text-sm transition-colors"></i>
                                    )}
                                </button>
                            </div>

                            {/* Phone Row */}
                            <div className="flex items-center text-text-muted">
                                <a
                                    href={`tel:${personalInfo.phone}`}
                                    className="flex items-center gap-3 hover:text-accent transition-colors group">
                                    <div className="w-6 flex justify-center">
                                        <i className="fas fa-phone text-slate-500 group-hover:text-accent transition-colors"></i>
                                    </div>
                                    <span className='font-medium'>{personalInfo.phone}</span>
                                </a>
                                <button
                                    onClick={() => handleCopy("phone", personalInfo.phone)}
                                    className="group flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 transition-all ml-2"
                                    title="Copy phone"
                                >
                                    {phoneCopyStatus ? (
                                        <i className="fas fa-check text-accent text-sm"></i>
                                    ) : (
                                        <i className="far fa-copy text-slate-500 group-hover:text-accent text-sm transition-colors"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ➡️ RIGHT COLUMN: Message Draft Form */}
                <div className="flex justify-start md:justify-end">

                    {/* 🫧 GLASS CONTACT FORM BOX */}
                    <form ref={form} onSubmit={handleSend} className="glass-card p-6 w-full shadow-lg border border-white/5">
                        {/* === SUBJECT INPUT === */}
                        <label className="block text-sm text-text-muted mb-1 font-medium">Name:</label>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Your name"
                            className="w-full bg-bg/50 text-text-main border border-white/10 focus:border-accent/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] rounded-lg p-3 outline-none mb-4 text-sm transition-all placeholder-slate-600"
                        />

                        {/* === FROM INPUT === */}
                        <label className="block text-sm text-text-muted mb-1 font-medium">Your Email:</label>
                        <input
                            required
                            type="email"
                            name="from_email"
                            placeholder="name@example.com"
                            className="w-full bg-bg/50 text-text-main border border-white/10 focus:border-accent/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] rounded-lg p-3 outline-none mb-4 text-sm transition-all placeholder-slate-600"
                        />

                        {/* === MESSAGE TEXTAREA === */}
                        <label className="block text-sm text-text-muted mb-2 font-medium">Quick Message:</label>
                        <textarea
                            required
                            name="message"
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-bg/50 text-text-main border border-white/10 focus:border-accent/50 focus:shadow-[0_0_10px_rgba(34,211,238,0.1)] rounded-lg p-3 outline-none resize-none mb-1 text-sm transition-all placeholder-slate-600 aesthetic-scrollbar"
                            rows={6}
                            placeholder="Type a message here..."
                        />

                        {/* === CONTROLS === */}
                        <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-2">
                            {/* 🤖 Refine Button (Simulation) */}
                            <button
                                onClick={handleRefine}
                                type="button" // Prevent form submit
                                disabled={loadingRefine || !message.trim()}
                                className="group font-medium text-xs md:text-sm flex items-center gap-2 transition-all 
                               px-3 py-1.5 rounded-full border border-transparent 
                               text-text-muted hover:text-accent hover:border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingRefine ? (
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
                                    type="submit"
                                    disabled={!message.trim() || status === 'sending' || status === 'success'}
                                    className={`font-bold text-sm md:text-base group flex items-center gap-1.5 transition-all py-1.5 px-5 rounded-full
                                   text-bg shadow-[0_0_15px_rgba(34,211,238,0.4)]
                                   hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]
                                   disabled:bg-slate-700 disabled:shadow-none disabled:text-slate-400 disabled:cursor-not-allowed
                                   ${status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-accent hover:bg-cyan-300'}
                                   `}
                                >
                                    {status === 'sending' ? (
                                        <>Sending...</>
                                    ) : status === 'success' ? (
                                        <>Sent <i className="fas fa-check ml-1"></i></>
                                    ) : (
                                        <>Send <i className="fas fa-paper-plane text-xs ml-1"></i></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;