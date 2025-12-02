// src/components/CustomCursor.tsx
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let clientX = -100;
    let clientY = -100;
    let isActive = false;

    const update = () => {
      if (el) el.style.transform = `translate(${clientX}px, ${clientY}px)`;
      requestAnimationFrame(update);
    };
    update();

    const move = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
    };

    const down = () => {
      el?.classList.add('active');
      isActive = true;
    };
    const up = () => {
      el?.classList.remove('active');
      isActive = false;
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  return <div ref={ref} className="custom-cursor" style={{ left: 0, top: 0 }} />;
};

export default CustomCursor;
