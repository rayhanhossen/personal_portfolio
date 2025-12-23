import React, { useEffect, useRef, useState } from 'react';

// Common style props for consistency
const SVG_PROPS = {
    width: "100%",
    height: "100%",
    fill: "white",      // Inner Color
    stroke: "white",    // Outline Color
    strokeWidth: "0.9", // Outline Thickness
    strokeLinejoin: "round" as "round",
    strokeLinecap: "round" as "round"
};

const SVG_PROPS_NOT_ALLOWED = {
    width: "100%",
    height: "100%",
    fill: "red",      // Inner Color
    stroke: "white",    // Outline Color
    strokeWidth: "0.9", // Outline Thickness
    strokeLinejoin: "round" as "round",
    strokeLinecap: "round" as "round"
};

const IconDefault = () => (
    // YOUR NEW SVG (ViewBox 0 0 24 24)
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        <g>
             {/* The Bounding Box (Transparent) */}
            <path fill="none" d="M0 0h24v24H0z"/>
            {/* The Arrow Path */}
            <path 
                d="M13.91 12.36L17 20.854l-2.818 1.026-3.092-8.494-4.172 3.156 1.49-14.909 10.726 10.463z"
                fill="black"
                stroke="white"
                strokeWidth="0.9"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </g>
    </svg>
);

const IconPointer = () => (
    // Adjusted viewBox to crop the empty space from the original 36x36
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
         <path 
            d="M30.4,17.6c-1.8-1.9-4.2-3.2-6.7-3.7c-1.1-0.3-2.2-0.5-3.3-0.6c2.8-3.3,2.3-8.3-1-11.1s-8.3-2.3-11.1,1s-2.3,8.3,1,11.1c0.6,0.5,1.2,0.9,1.8,1.1v2.2l-1.6-1.5c-1.4-1.4-3.7-1.4-5.2,0c-1.4,1.4-1.5,3.6-0.1,5l4.6,5.4c0.2,1.4,0.7,2.7,1.4,3.9c0.5,0.9,1.2,1.8,1.9,2.5v1.9c0,0.6,0.4,1,1,1h13.6c0.5,0,1-0.5,1-1v-2.6c1.9-2.3,2.9-5.2,2.9-8.1v-5.8C30.7,17.9,30.6,17.7,30.4,17.6z M8.4,8.2c0-3.3,2.7-5.9,6-5.8c3.3,0,5.9,2.7,5.8,6c0,1.8-0.8,3.4-2.2,4.5V7.9c-0.1-1.8-1.6-3.2-3.4-3.2c-1.8-0.1-3.4,1.4-3.4,3.2v5.2C9.5,12.1,8.5,10.2,8.4,8.2L8.4,8.2z M28.7,24c0.1,2.6-0.8,5.1-2.5,7.1c-0.2,0.2-0.4,0.4-0.4,0.7v2.1H14.2v-1.4c0-0.3-0.2-0.6-0.4-0.8c-0.7-0.6-1.3-1.3-1.8-2.2c-0.6-1-1-2.2-1.2-3.4c0-0.2-0.1-0.4-0.2-0.6l-4.8-5.7c-0.3-0.3-0.5-0.7-0.5-1.2c0-0.4,0.2-0.9,0.5-1.2c0.7-0.6,1.7-0.6,2.4,0l2.9,2.9v3l1.9-1V7.9c0.1-0.7,0.7-1.3,1.5-1.2c0.7,0,1.4,0.5,1.4,1.2v11.5l2,0.4v-4.6c0.1-0.1,0.2-0.1,0.3-0.2c0.7,0,1.4,0.1,2.1,0.2v5.1l1.6,0.3v-5.2l1.2,0.3c0.5,0.1,1,0.3,1.5,0.5v5l1.6,0.3v-4.6c0.9,0.4,1.7,1,2.4,1.7L28.7,24z" 
            {...SVG_PROPS}
            //transform="scale(0.9) translate(1,1)" // Slight adjust to fit stroke inside box
        />
    </svg>
);

const IconText = () => (
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        <path 
            d="M13,19A1,1 0 0,0 14,20H16V22H13.5C12.95,22 12,21.55 12,21C12,21.55 11.05,22 10.5,22H8V20H10A1,1 0 0,0 11,19V5A1,1 0 0,0 10,4H8V2H10.5C11.05,2 12,2.45 12,3C12,2.45 12.95,2 13.5,2H16V4H14A1,1 0 0,0 13,5V19Z" 
            {...SVG_PROPS}
        />
    </svg>
);

const IconDisabled = () => (
    <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
        <g {...SVG_PROPS_NOT_ALLOWED} strokeWidth="2">
             <path d="M10,29.5 C6.416,29.5 3.5,26.584 3.5,23 C3.5,21.78 3.837,20.609 4.48,19.579 L13.421,28.52 C12.391,29.163 11.22,29.5 10,29.5 L10,29.5 Z M6.607,17.463 C7.63,16.831 8.792,16.5 10,16.5 C13.584,16.5 16.5,19.416 16.5,23 C16.5,24.208 16.169,25.37 15.537,26.393 L6.607,17.463 Z M10,13.5 C4.762,13.5 0.5,17.762 0.5,23 C0.5,28.238 4.762,32.5 10,32.5 C15.238,32.5 19.5,28.238 19.5,23 C19.5,17.762 15.238,13.5 10,13.5 L10,13.5 Z" />
             <path d="M0,16.4219 L0,0.4069 L11.591,12.0259 L4.55,12.0259 L4.399,12.1499 L0,16.4219 Z" />
        </g>
    </svg>
);


// --- 2. MAIN COMPONENT ---

type CursorType = 'default' | 'pointer' | 'text' | 'disabled';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [cursorType, setCursorType] = useState<CursorType>('default');
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        // --- 1. Hide System Cursor ---
        const style = document.createElement('style');
        style.innerText = `
            body, html, * { cursor: none !important; }
            @media (pointer: coarse) {
                body, html, * { cursor: auto !important; }
                .custom-cursor { display: none !important; }
            }
        `;
        document.head.appendChild(style);

        // --- 2. Move Logic ---
        const onMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        // --- 3. Hover Detection Logic ---
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const computedStyle = window.getComputedStyle(target).cursor;

            if (target.hasAttribute('disabled') || target.closest('[disabled]') || computedStyle === 'not-allowed') {
                setCursorType('disabled');
            } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || computedStyle === 'text' || target.isContentEditable) {
                setCursorType('text');
            } else if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || computedStyle === 'pointer') {
                setCursorType('pointer');
            } else {
                setCursorType('default');
            }
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div 
            ref={cursorRef}
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center drop-shadow-md"
            style={{ 
                // UNIFIED SIZE: 32px
                width: '32px', 
                height: '32px', 
                // Center exactly on mouse tip
                marginTop: '-12px', 
                marginLeft: '-12px' 
            }}
        >
            <div className={`w-full h-full transition-transform duration-100 ease-out ${isClicking ? 'scale-75' : 'scale-100'}`}>
                {cursorType === 'default' && <IconDefault />}
                {cursorType === 'pointer' && <IconPointer />}
                {cursorType === 'text' && <IconText />}
                {cursorType === 'disabled' && <IconDisabled />}
            </div>
        </div>
    );
};

export default CustomCursor;