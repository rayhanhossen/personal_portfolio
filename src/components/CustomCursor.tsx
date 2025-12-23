import React, { useEffect, useRef, useState } from 'react';

// Theme Colors
const THEME = {
    accent: '#22d3ee', // Cyan-400
    bg: '#020617',     // Slate-950
    text: '#f8fafc',   // Slate-50
    danger: '#ef4444'  // Red-500
};

type CursorState = 'default' | 'pointer' | 'text' | 'disabled';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    
    const [cursorState, setCursorState] = useState<CursorState>('default');
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // 1. Hide System Cursor
        const style = document.createElement('style');
        style.innerHTML = `* { cursor: none !important; } body, html { cursor: none !important; }`;
        document.head.appendChild(style);

        // 2. Movement Logic
        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Main Tip (Instant)
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }

            // Follower (Smooth Physics)
            if (followerRef.current) {
                followerRef.current.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, { duration: 500, fill: "forwards", easing: "ease-out" });
            }
        };

        // 3. Smart Hover Logic
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check for Disabled
            if (target.hasAttribute('disabled') || target.classList.contains('cursor-not-allowed') || target.closest('[disabled]')) {
                setCursorState('disabled');
                return;
            }

            // Check for Clickables (Links, Buttons)
            const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer');
            
            // Check for Text (Paragraphs, Headers, Inputs)
            // const isText = target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

            if (isClickable) {
                setCursorState('pointer');
            } 
            //else if (isText) {
            //     setCursorState('text');
            // } 
            else {
                setCursorState('default');
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.head.removeChild(style);
        };
    }, []);

    const getMainCursorColor = () => {
        if (cursorState === 'disabled') return THEME.danger;
        if (cursorState === 'pointer') return THEME.accent;
        if (cursorState === 'text') return THEME.accent;
        return THEME.text;
    };

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            
            {/* --- 1. MAIN CURSOR TIP --- */}
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 will-change-transform z-50"
                style={{ marginTop: '-4px', marginLeft: '-4px' }} 
            >
                {/* Condition: If Text Mode, show I-Beam. Else, show Arrow. */}
                {cursorState === 'text' ? (
                     <div className={`w-[2px] h-6 bg-accent shadow-[0_0_10px_#22d3ee] ml-1 transition-all duration-200 ${isClicking ? 'h-4' : 'h-6'}`}></div>
                ) : (
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        style={{ filter: cursorState === 'pointer' ? `drop-shadow(0 0 5px ${THEME.accent})` : 'none' }}
                        className={`transition-all duration-200 ${isClicking ? 'scale-75' : 'scale-100'}`}
                    >
                        {cursorState === 'disabled' ? (
                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z" fill={THEME.danger} opacity="0.8"/>
                        ) : (
                            <path d="M3 3L10.5 22.5L13.5 14L22 11L3 3Z" fill={getMainCursorColor()} stroke={THEME.bg} strokeWidth="1.5" strokeLinejoin="round"/>
                        )}
                    </svg>
                )}
            </div>

            {/* --- 2. FOLLOWER (HUD RING) --- */}
            <div 
                ref={followerRef}
                className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform transition-all duration-300 ease-out flex items-center justify-center
                    ${cursorState === 'pointer' ? 'w-14 h-14' : cursorState === 'text' ? 'w-0 h-0' : 'w-6 h-6'}
                `}
            >
                {/* State: Default (Small Diamond) */}
                <div className={`absolute inset-0 border border-white/20 rotate-45 transition-all duration-300
                    ${cursorState === 'default' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `}/>

                {/* State: Pointer (Spinning Neon Ring) */}
                <div className={`absolute inset-0 rounded-full border border-dashed border-accent transition-all duration-300
                    ${cursorState === 'pointer' ? 'opacity-100 scale-100 animate-[spin_8s_linear_infinite] shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'opacity-0 scale-50'}
                `}/>
                
                {/* State: Pointer (Inner Lock) */}
                <div className={`absolute inset-0 rounded-full border border-accent/40 transition-all duration-300 scale-75
                     ${cursorState === 'pointer' ? 'opacity-100' : 'opacity-0'}
                `}/>

                {/* State: Text (Hidden Follower - clean reading experience) */}
            </div>
        </div>
    );
};

export default CustomCursor;