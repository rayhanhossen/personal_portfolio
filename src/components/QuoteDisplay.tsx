import { useState, useEffect } from 'react';
import { quotes } from '../data/content';

const QuoteDisplay = () => {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [progress, setProgress] = useState(0);

    // 1. Handle Progress Bar (1 Minute)
    useEffect(() => {
        setProgress(0);
        const startTime = Date.now();
        const duration = 60000;

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) clearInterval(progressInterval);
        }, 100);

        return () => clearInterval(progressInterval);
    }, [index]);

    // 2. Handle Switching Quote (Every 60s)
    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
            setDisplayedText("");
            setIsTyping(true);
        }, 60000);

        return () => clearInterval(quoteInterval);
    }, []);

    // 3. Typing Effect
    useEffect(() => {
        const fullText = `"${quotes[index].text}"`;
        if (isTyping) {
            if (displayedText.length < fullText.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(fullText.slice(0, displayedText.length + 1));
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                setIsTyping(false);
            }
        }
    }, [displayedText, isTyping, index]);

    const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "2-digit", minute: "2-digit" });

    return (
        <div className="w-full font-sans text-base relative group cursor-default my-8">

            {/* 🫧 GLASS CARD CONTAINER (Dark Mode Adapted) */}
            <div className="glass-card shadow-xl overflow-hidden border border-white/10"> 
                
                {/* Header (Darkened) */}
                <div className="flex items-center justify-between bg-white/5 border-b border-white/10 p-3">
                    <div className="flex gap-2">
                        {/* Traffic Lights */}
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    {/* Clean Title */}
                    <div className="text-text-muted text-xs font-medium tracking-wide">
                        Insight Generator
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 min-h-[220px] flex flex-col justify-between relative">
                    
                    <div className="relative z-10">
                        {/* Quote Text: White for Dark Mode */}
                        <div className="text-xl sm:text-2xl md:text-3xl text-text-main leading-snug break-words font-light italic">
                            {displayedText}
                            {/* Cursor */}
                            <span className={`animate-pulse inline-block w-2 h-6 bg-accent ml-1 align-middle ${isTyping ? 'opacity-100' : 'opacity-0'}`}></span>
                        </div>

                        {/* Author */}
                        <div
                            className={`mt-6 text-left text-accent font-medium italic transition-opacity duration-700 ease-in-out ${isTyping ? 'opacity-0' : 'opacity-100'
                                }`}
                        >
                            - {quotes[index].author}
                        </div>
                    </div>

                    {/* Footer with Horizontal Progress Bar */}
                    <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-text-muted font-sans">
                        <div className="flex gap-4">
                            <span>Refreshed: <span className="font-semibold text-text-main">{time}</span></span>
                        </div>
                        
                        {/* 📊 Progress Bar Container (Dark Track) */}
                        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                            <div 
                                className="h-full bg-accent transition-all duration-100 ease-linear rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                style={{ width: `${progress}%` }}
                                title={`${Math.round(progress)}% progress`}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteDisplay;