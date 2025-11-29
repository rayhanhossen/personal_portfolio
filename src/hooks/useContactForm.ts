import { useState, useRef, useCallback } from 'react';
import { personalInfo } from '../data/content';

// Gemini API Configuration (leave blank for Canvas environment)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- Custom Hook Implementation: useContactForm ---
export const useContactForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // Added state to manage copy button visual feedback
    const [copyStatus, setCopyStatus] = useState(false);

    // 1. Create the Ref (Fixed TS error: use generics for explicit typing)
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // AI Refinement Logic (Updated to use Gemini API)
    const handleRefine = useCallback(async () => {
        if (!message.trim()) return;

        setLoading(true);

        const prompt = `Rewrite the following message to be a professional, concise inquiry for a AI software engineer. Keep the tone friendly but business-like. Message: "${message}"`;

        // Exponential backoff retry logic
        const maxRetries = 3;
        let attempt = 0;
        let refinedText: string | null = null; // Explicit type for clarity

        while (attempt < maxRetries) {
            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                refinedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

                if (refinedText) {
                    setMessage(refinedText.trim());
                    break; // Success, exit retry loop
                } else {
                    console.error("AI returned empty content.");
                    throw new Error("Empty response from AI.");
                }

            } catch (error) {
                attempt++;
                console.warn(`Attempt ${attempt} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
                if (attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000;
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    console.error('Gemini API failed after all retries. Restoring original message.');
                    // Optionally set a user-friendly error message here
                }
            }
        }
        setLoading(false);
    }, [message]);

    // Clipboard Copy Logic 
    const handleCopy = useCallback(() => {
        // TypeScript now confirms textareaRef.current has these properties
        if (textareaRef.current) {
            textareaRef.current.select();
            textareaRef.current.setSelectionRange(0, 99999); // Mobile support

            // Use document.execCommand('copy') for better compatibility 
            document.execCommand('copy');

            // Trigger visual feedback (Green Checkmark on the button)
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        }
    }, []);

    // Send Email Logic 
    const handleSend = useCallback(() => {
        if (!message.trim()) return;

        const email = personalInfo.email;
        const subject = encodeURIComponent("Inquiry from Portfolio");
        const body = encodeURIComponent(message);

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, [message]);


    return {
        message,
        setMessage,
        loading,
        copyStatus, // Exposed for UI feedback
        textareaRef,
        handleRefine,
        handleCopy,
        handleSend
    };
};