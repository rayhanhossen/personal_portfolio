import { useState, useEffect } from 'react';
import { quotes as staticQuotes } from '../data/content';

interface Quote {
    text: string;
    author: string;
}

interface QuoteDisplayProps {
    quotes?: Quote[];
}

const QuoteDisplay = ({ quotes = staticQuotes }: QuoteDisplayProps) => {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [progress, setProgress] = useState(0);

    const activeQuotes = quotes && quotes.length > 0 ? quotes : staticQuotes;

    // 1. Handle Progress Bar (15s)
    useEffect(() => {
        const startTime = Date.now();
        const duration = 15000;

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) clearInterval(progressInterval);
        }, 100);

        return () => clearInterval(progressInterval);
    }, [index]);

    // 2. Handle Switching Quote (Every 15s)
    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % activeQuotes.length);
            setDisplayedText("");
            setIsTyping(true);
        }, 15000);

        return () => clearInterval(quoteInterval);
    }, [activeQuotes]);

    // 3. Typing Effect
    useEffect(() => {
        const currentQuote = activeQuotes[index] || activeQuotes[0];
        const fullText = `"${currentQuote.text}"`;
        if (isTyping) {
            if (displayedText.length < fullText.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText(fullText.slice(0, displayedText.length + 1));
                }, 50);
                return () => clearTimeout(timeout);
            }
        }
    }, [displayedText, isTyping, index, activeQuotes]);

    // Derived state
    const currentQuote = activeQuotes[index] || activeQuotes[0];
    const fullText = `"${currentQuote.text}"`;
    const isCurrentlyTyping = isTyping && displayedText.length < fullText.length;

    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

    return (
        <div className="w-full font-sans text-base relative group cursor-default">
            <div className="bg-glass-overlay backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                <div className="flex items-center justify-between bg-white/5 border-b border-white/5 p-3 px-6">
                    <div className="flex items-center gap-3">
                        <i className="fas fa-terminal text-accent/50 text-xs"></i>
                        <span className="font-mono text-accent/80 text-[10px] tracking-[0.2em] uppercase">
                            FEED_ID: 0X{index + 10}4
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                        </span>
                        <span className="font-mono text-[10px] text-text-muted">LIVE</span>
                    </div>
                </div>

                <div className="p-6 md:p-10 min-h-[250px] flex flex-col justify-center relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

                    <div className="relative z-10 text-center">
                        <h3 className="text-lg md:text-xl text-text-main leading-relaxed font-light italic tracking-wide">
                            {displayedText}
                            <span className={`animate-pulse inline-block w-0.5 h-5 bg-accent shadow-[0_0_10px_#22d3ee] ml-1 align-middle ${isCurrentlyTyping ? 'opacity-100' : 'opacity-0'}`}></span>
                        </h3>

                        <div
                            className={`mt-6 flex items-center justify-center gap-2 transition-all duration-700 ease-in-out ${isCurrentlyTyping ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                        >
                            <span className="h-[1px] w-8 bg-accent/30"></span>
                            {currentQuote.author === "My Principle" ? (
                                <span className="text-accent font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                                    <i className="fas fa-bolt text-[8px]"></i>
                                    Personal Principle
                                </span>
                            ) : (
                                <span className="text-accent font-mono text-xs uppercase tracking-widest">
                                    {currentQuote.author}
                                </span>
                            )}
                            <span className="h-[1px] w-8 bg-accent/30"></span>
                        </div>
                    </div>
                </div>

                <div className="bg-black/20 border-t border-white/5 p-3 px-6 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-text-muted">
                        TIMESTAMP: <span className="text-gray-400">{time}</span>
                    </span>

                    <div className="w-24 md:w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent shadow-[0_0_10px_#22d3ee] transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteDisplay;