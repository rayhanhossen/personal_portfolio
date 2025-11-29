import { useState, useRef } from 'react';
import { personalInfo } from '../data/content';

export const useContactForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [btnText, setBtnText] = useState('Refine with AI ✨');

    // 1. Create the Ref
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleRefine = () => {
        if (!message) return;
        setLoading(true);
        setBtnText('Refining...');
        
        // Simulating AI delay
        setTimeout(() => {
            setMessage((prev) => `Subject: Inquiry regarding [Topic]\n\nDear ${personalInfo.name},\n\n${prev}\n\nBest regards,\n[Your Name]`);
            setLoading(false);
            setBtnText('Refine with AI ✨');
        }, 1000);
    };

    const handleCopy = () => {
        if (textareaRef.current) {
            textareaRef.current.select();
            textareaRef.current.setSelectionRange(0, 99999); // Mobile support
            navigator.clipboard.writeText(textareaRef.current.value);
        }
    };

    const handleSend = () => {
        window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact&body=${encodeURIComponent(message)}`;
    };

    return {
        message,
        setMessage,
        loading,
        btnText,
        textareaRef,
        handleRefine,
        handleCopy,
        handleSend
    };
};