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

    // 3. Typing Effect (Retained logic, updated cursor)
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
    }, [displayedText, isTyping, index, quotes]);

    const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "2-digit", minute: "2-digit" });

    return (
        <div className="w-full font-sans text-base relative group cursor-default my-8">

            {/* 🫧 GLASS CARD CONTAINER */}
            <div className="glass-card shadow-xl overflow-hidden"> 
                
                {/* Header (Minimalist) */}
                <div className="flex items-center justify-between bg-gray-50/70 border-b border-gray-200 p-3">
                    <div className="flex gap-2">
                        {/* Simple, neutral indicator lights */}
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    {/* Clean Title */}
                    <div className="text-gray-500 text-xs font-medium">
                        Insight Generator
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 min-h-[220px] flex flex-col justify-between relative">
                    
                    <div className="relative z-10">
                        {/* Quote Text: Clean, readable dark text */}
                        <div className="text-xl sm:text-2xl md:text-3xl text-gray-800 leading-snug break-words font-light italic">
                            {displayedText}
                            {/* 🚨 UPDATED CURSOR: Subtle underscore with accent color */}
                            {/* <span className={`animate-pulse inline-block w-2 h-0.5 bg-accent ml-1 align-middle ${isTyping ? 'opacity-100' : 'opacity-0'}`}></span> */}
                        </div>

                        {/* Author: Transitioned to clean sans-serif text */}
                        <div
                            className={`mt-6 text-left text-accent font-medium italic transition-opacity duration-700 ease-in-out ${isTyping ? 'opacity-0' : 'opacity-100'
                                }`}
                        >
                            - {quotes[index].author}
                        </div>
                    </div>

                    {/* Footer with Horizontal Progress Bar (Clean Look) */}
                    <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500 font-sans">
                        <div className="flex gap-4">
                            <span>Quote refreshed: <span className="font-semibold text-gray-700">{time}</span></span>
                        </div>
                        
                        {/* 📊 Progress Bar Container */}
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden relative">
                            <div 
                                className="h-full bg-accent transition-all duration-100 ease-linear rounded-full"
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