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


    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit" });

    return (
        <div className="w-full font-mono text-sm relative group cursor-default my-8">

            {/* TERMINAL CONTAINER */}
            <div className="relative border border-white shadow-2xl rounded-md">

                {/* Header */}
                <div className="flex items-center justify-between bg-[#1e222a] border-b border-gray-700 p-2">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-gray-500 text-xs flex gap-2">
                        <span className='text-primary'>/bin/bash</span>
                    </div>
                </div>

                {/* Body */}
                <div className="bg-[#282C33] p-4 md:p-6 min-h-[240px] flex flex-col justify-between relative overflow-hidden">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_100%] opacity-20"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-gray-400 text-xs md:text-sm">
                            <span className="text-green-400">root@rayhan</span>
                            <span className="text-gray-500">:</span>
                            <span className="text-blue-400">~/wisdom</span>
                            <span className="text-gray-500">$</span>
                            <span className="text-white">echo $QUOTE</span>
                        </div>

                        {/* Quote Text: Responsive Text Size (text-base -> text-lg -> text-xl) */}
                        <div className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed pl-4 border-l-2 border-gray-700  break-words tracking-tighter">
                            {displayedText}
                            <span className="animate-pulse inline-block w-[3px] h-5 bg-yellow-400 ml-1 align-middle shadow-[0_0_8px_rgba(250,204,21,0.6)]"></span>
                        </div>

                        {/* Author: Rendered ALWAYS to reserve space, opacity toggled to prevent blinking */}
                        <div
                            className={`mt-4 text-right text-green-400 italic transition-opacity duration-700 ease-in-out ${isTyping ? 'opacity-0' : 'opacity-100'
                                }`}
                        >
                            - {quotes[index].author}
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center text-xs text-gray-500 font-mono">
                        <div className="flex gap-4">
                            <span><span className="text-green-400">✓</span> Executed</span>
                            <span>{time}</span>
                        </div>
                        <div className="relative flex items-center justify-center w-8 h-8"> {/* Adjust w/h for size */}

                            {/* 1. The Circular Progress Ring */}
                            {/* This element will have the gradient and spin */}
                            <div className="circular-loader-ring"></div>

                            {/* 2. Inner Circle (to mask the center and show text) */}
                            <div className="absolute flex items-center justify-center bg-[#282C33] rounded-full text-white font-mono text-xs z-10">
                                {Math.round(progress)}% {/* 'progress' state will come from parent component */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default QuoteDisplay;