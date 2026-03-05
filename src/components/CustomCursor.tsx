import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import this

// --- 1. SVG ICONS (MacOS Style) ---
const dropShadow = "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))";
const filterProps = { filter: dropShadow, overflow: 'visible' };

const IconDefault = () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ ...filterProps, width: '26px', height: '26px' }}>
        <path d="M8 5 L23 15 L15 17 L18 25 L14 26 L11 18 L6 22 Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
);

const IconPointer = () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ ...filterProps, width: '28px', height: '28px' }}>
        {/* Simplified MacOS Hand cursor */}
        <path d="M14 12.5 V5.5 a2 2 0 0 1 4 0 v7 m0 -1.5 v-2 a2 2 0 0 1 4 0 v3 m0 -1.5 v-1 a2 2 0 0 1 4 0 v5 c0 4.5 -3 7.5 -7 7.5 H15 c-4 0 -6.5 -3 -6.5 -5 l-3 -4 a2 2 0 0 1 3 -3 l2.5 2.5 v-9.5 a2 2 0 0 1 4 0 v6"
            fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
);

const IconText = () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.4))', overflow: 'visible', width: '24px', height: '24px' }}>
        <path d="M11 5 H21 M16 5 V27 M11 27 H21" fill="none" stroke="white" strokeWidth="3" strokeLinecap="square" />
        <path d="M12 5 H20 M16 5 V27 M12 27 H20" fill="none" stroke="black" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
);

const IconDisabled = () => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ ...filterProps, width: '28px', height: '28px' }}>
        <circle cx="16" cy="16" r="10" fill="white" />
        <circle cx="16" cy="16" r="8" fill="none" stroke="black" strokeWidth="2" />
        <line x1="10.5" y1="10.5" x2="21.5" y2="21.5" stroke="black" strokeWidth="2" />
    </svg>
);



// --- 2. MAIN COMPONENT ---

type CursorType = 'default' | 'pointer' | 'text' | 'disabled';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [cursorType, setCursorType] = useState<CursorType>('default');
    const [isClicking, setIsClicking] = useState(false);

    // NEW: Detect route changes
    const location = useLocation();

    // NEW: Store mouse coordinates so we can re-check elements without moving mouse
    const mousePos = useRef({ x: 0, y: 0 });

    // Helper: Logic to determine cursor type from an HTML Element
    const getCursorTypeForElement = (target: Element | null): CursorType => {
        if (!target) return 'default';

        const computedStyle = window.getComputedStyle(target);

        if (target.hasAttribute('disabled') || target.closest('[disabled]') || computedStyle.cursor === 'not-allowed') {
            return 'disabled';
        }
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || computedStyle.cursor === 'text' || (target as HTMLElement).isContentEditable) {
            return 'text';
        }
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || computedStyle.cursor === 'pointer') {
            return 'pointer';
        }

        return 'default';
    };

    useEffect(() => {
        // --- 1. Hide System Cursor ---
        const style = document.createElement('style');
        style.innerText = `
            body, html, * { cursor: none !important; }
            @media (hover: none) and (pointer: coarse) {
                body, html, * { cursor: auto !important; }
                .custom-cursor { display: none !important; opacity: 0 !important; visibility: hidden !important; }
            }
        `;
        document.head.appendChild(style);

        // --- 2. Move Logic ---
        const onMouseMove = (e: MouseEvent) => {
            // Update ref coordinates
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Move the visual cursor
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }

            // Traditional hover check (performance optimized)
            const type = getCursorTypeForElement(e.target as Element);
            setCursorType(type);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.head.removeChild(style);
        };
    }, []);

    // --- 3. RE-CHECK ON NAVIGATION (The Fix) ---
    useEffect(() => {
        // When location changes, the element under the mouse changes, 
        // but no 'mousemove' event fires. We must manually check.

        const checkElementUnderMouse = () => {
            const { x, y } = mousePos.current;
            // Get the element at the current coordinates
            const el = document.elementFromPoint(x, y);
            const type = getCursorTypeForElement(el);
            setCursorType(type);
        };

        // Small timeout ensures the new page has rendered before we check
        const timeoutId = setTimeout(checkElementUnderMouse, 50);

        return () => clearTimeout(timeoutId);
    }, [location]); // Re-run whenever route changes

    return (
        <div
            ref={cursorRef}
            className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform flex items-center justify-center drop-shadow-md"
            style={{
                width: '32px',
                height: '32px',
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