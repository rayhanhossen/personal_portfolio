import { useState, useRef, useCallback } from 'react';
import { personalInfo } from '../data/content';

// Gemini API Configuration (leave blank for Canvas environment)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// --- Custom Hook Implementation: useContactForm ---
export const useContactForm = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    // Added state to manage copy button visual feedback
    const [emailCopyStatus, setEmailCopyStatus] = useState(false);
    const [phoneCopyStatus, setPhoneCopyStatus] = useState(false);

    // 1. Create the Ref (Fixed TS error: use generics for explicit typing)
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // AI Refinement Logic (Updated to use Gemini API)
    const handleRefine = useCallback(async () => {
        if (!message.trim()) return;

        setLoading(true);

        const prompt = `
            You are an assistant that rewrites user-submitted messages into a polished, professional
            email suitable for sending to a Python Backend Engineer with 5+ years of experience in building
            scalable backend systems (FastAPI, Django, PostgreSQL, Docker, AWS, ETL, LLMs, OCR pipelines, etc.).
            Your goal is to keep the user’s intent and tone, but improve the clarity, structure, grammar, and
            professionalism.

            Do NOT add new information that the user didn’t provide.

            Output the final message in clean email format with:*
            – a subject line
            – a concise, friendly greeting
            – a polished body
            – a clear call-to-action if appropriate
            – a polite closing.

            If the user message is informal or unclear, rewrite it into a clear, professional,
            recruiter-friendly or collaboration-friendly email.

            Keep the message human, warm, and easy to read.
            Here is the message the user wants to refine. Rewrite it following the rules above: "${message}"
        `;

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


    const handleCopy = async (type: any, textToCopy: any) => {
        // 1. Check for browser support
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
            // Fallback for older browsers (where the keyboard issue will persist)
            console.warn("Clipboard API not available. Using fallback method.");
            if (!textToCopy) return false;
            // TypeScript now confirms textareaRef.current has these properties
            if (textToCopy && type) {
                // 1. Create a temporary, invisible textarea element
                const tempInput = document.createElement('textarea');
                tempInput.value = textToCopy;
                // Set position to hide it visually but keep it functional
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);

                // 2. Select the text and execute the copy command
                tempInput.select();
                tempInput.setSelectionRange(0, 99999);

                // Use document.execCommand('copy') for better compatibility 
                document.execCommand('copy');

                // Trigger visual feedback (Green Checkmark on the button)
                if (type === "email") {
                    setEmailCopyStatus(true);
                    setTimeout(() => setEmailCopyStatus(false), 2000);
                } else {
                    setPhoneCopyStatus(true);
                    setTimeout(() => setPhoneCopyStatus(false), 2000);
                }
            }
        }

        try {
            // 2. Use the modern, non-visual Clipboard API
            await navigator.clipboard.writeText(textToCopy);

            // 3. Update the state to show the success icon
            if (type === "phone") {
                setPhoneCopyStatus(true);
                setTimeout(() => setPhoneCopyStatus(false), 2000); // Reset after 2 seconds
            }
            else if (type === "email") {
                setEmailCopyStatus(true);
                setTimeout(() => setEmailCopyStatus(false), 2000); // Reset after 2 seconds
            }

        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Send Email Logic 
    const handleSend = useCallback(() => {
        if (!message.trim()) return;

        const email = personalInfo.email;
        const subject = encodeURIComponent("Portfolio Contact Request");
        const body = encodeURIComponent(message);

        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, [message]);


    return {
        message,
        setMessage,
        loading,
        emailCopyStatus,
        phoneCopyStatus,
        textareaRef,
        handleRefine,
        handleCopy,
        handleSend
    };
};