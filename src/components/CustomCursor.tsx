import React, { useEffect, useRef, useState } from 'react';

type CursorState = 'default' | 'pointer' | 'disabled';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    
    // We consolidate state into a specific type
    const [cursorState, setCursorState] = useState<CursorState>('default');
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // --- 1. Global Cursor Hiding ---
        // We inject a style tag to forcibly hide the default cursor everywhere
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; } 
            body, html { cursor: none !important; }
        `;
        document.head.appendChild(style);

        // --- 2. Movement Logic (Web Animations API for performance) ---
        const moveCursor = (e: MouseEvent) => {
            const { clientX, clientY } = e;

            // Main Pointer (Instant)
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }

            // Follower (Smooth Lag)
            if (followerRef.current) {
                followerRef.current.animate({
                    left: `${clientX}px`,
                    top: `${clientY}px`
                }, { duration: 500, fill: "forwards", easing: "ease-out" });
            }
        };

        // --- 3. Interaction Logic ---
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if element is disabled
            const isDisabled = 
                target.hasAttribute('disabled') || 
                target.classList.contains('cursor-not-allowed') ||
                target.closest('[disabled]');

            // Check if element is clickable
            const isClickable = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.closest('a') || 
                target.closest('button') ||
                target.classList.contains('cursor-pointer');

            if (isDisabled) {
                setCursorState('disabled');
            } else if (isClickable) {
                setCursorState('pointer');
            } else {
                setCursorState('default');
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Attach Listeners
        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.head.removeChild(style); // Cleanup styles
        };
    }, []);

    // --- Dynamic Styles based on State ---
    const getMainCursorColor = () => {
        if (cursorState === 'disabled') return '#ef4444'; // Red-500
        if (cursorState === 'pointer') return '#22d3ee'; // Cyan-400
        return '#f8fafc'; // Slate-50
    };

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            
            {/* --- 1. Main Cursor: The Tip --- */}
            <div 
                ref={cursorRef}
                className="fixed top-0 left-0 will-change-transform z-50"
                style={{ marginTop: '-4px', marginLeft: '-4px' }} 
            >
                {/* Visual SVG changes based on state */}
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    className={`transition-transform duration-150 ${isClicking ? 'scale-75' : 'scale-100'}`}
                >
                    {cursorState === 'disabled' ? (
                        // Disabled: An "X" or Blocked symbol
                        <path 
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z" 
                            fill="#ef4444"
                            opacity="0.9"
                        />
                    ) : (
                        // Normal/Hover: Sharp Tech Arrow
                        <path 
                            d="M3 3L10.5 22.5L13.5 14L22 11L3 3Z" 
                            fill={getMainCursorColor()}
                            stroke="#020617"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                    )}
                </svg>
            </div>

            {/* --- 2. Follower: The "Developer" Effect --- */}
            <div 
                ref={followerRef}
                className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform transition-all duration-300 ease-out
                    flex items-center justify-center
                    ${cursorState === 'pointer' ? 'w-12 h-12' : 'w-6 h-6'}
                `}
            >
                {/* State: Default (Small diamond)
                */}
                <div className={`absolute inset-0 border border-slate-500/50 rotate-45 transition-all duration-300
                    ${cursorState === 'default' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}/>

                {/* State: Hover (Spinning Code/Loader Ring) 
                    This creates the "Loading" / "System Processing" look
                */}
                <div className={`absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/80 transition-all duration-300
                    ${cursorState === 'pointer' ? 'opacity-100 scale-100 animate-[spin_3s_linear_infinite]' : 'opacity-0 scale-50'}
                `}/>
                
                {/* Optional: Inner static ring for Hover */}
                <div className={`absolute inset-0 rounded-full border border-cyan-400/30 transition-all duration-300 scale-75
                     ${cursorState === 'pointer' ? 'opacity-100' : 'opacity-0'}
                `}/>

                {/* State: Disabled (Solid Red Block)
                */}
                 <div className={`absolute inset-0 rounded-full bg-red-500/20 border border-red-500/50 transition-all duration-300
                    ${cursorState === 'disabled' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}/>

            </div>
        </div>
    );
};

export default CustomCursor;