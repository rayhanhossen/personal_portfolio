import { personalInfo } from '../data/content';
import { useContactForm } from '../hooks/useContactForm';
import React from 'react'; // Added explicit import for React functions/types

const Contacts = () => {
    const {
        message,
        setMessage,
        loading,
        copyStatus, // <-- 1. Get copyStatus from hook
        textareaRef,
        handleRefine,
        handleCopy,
        handleSend
    } = useContactForm();


    // CSS Fix for iOS Auto-Zoom (Ensures font-size is >= 16px)
    const textareaStyle: React.CSSProperties = {
        fontSize: '16px'
    };


    return (
        <div>
            <div className="mb-12">
                <h2 className="text-3xl text-white font-medium mb-4"><span className="text-primary">/</span>contacts</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-gray-400">
                    <p className="mb-6">
                        I'm interested in new opportunities. If you have a question, collaboration idea, or just want to connect, feel free to reach out.
                    </p>

                    <div className="border border-gray-600 p-4 mt-6 relative bg-[#282C33]/20">
                        <label className="block text-1xl text-gray-500 mb-2 font-mono">Quick Message Draft:</label>

                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-transparent text-white font-mono outline-none resize-none mb-4 text-sm focus:placeholder-gray-600 transition-colors"
                            rows={4}
                            placeholder="Type a message here..."
                            style={textareaStyle} // <-- 2. Apply iOS Zoom Fix
                        />

                        <div className="flex justify-between items-center border-t border-gray-600 pt-3">
                            <button
                                onClick={handleRefine}
                                disabled={loading || !message.trim()} // <-- Disabled check added for empty message
                                className="group font-mono text-xs md:text-sm flex items-center gap-1.5 transition-all hover:bg-white/5 px-2 py-1 rounded-sm border border-transparent hover:border-gray-700 disabled:opacity-50"
                            >
                                {loading ? (
                                    /* Loading State: Compiling style */
                                    <>
                                        <i className="fas fa-circle-notch fa-spin text-primary"></i>
                                        <span className="text-gray-500 italic">processing...</span>
                                    </>
                                ) : (
                                    /* Idle State: Method Call style */
                                    <>
                                        <i className="fas fa-magic text-purple-400 group-hover:text-yellow-400 transition-colors"></i>

                                        <span className="flex items-center">
                                            <span className="text-primary font-bold">AI</span>
                                            <span className="text-gray-500">.</span>
                                            <span className="text-yellow-400 group-hover:text-yellow-300 transition-colors">refine</span>
                                            <span className="text-gray-500">(</span>
                                            <span className="text-green-400 opacity-70 group-hover:opacity-100">msg</span>
                                            <span className="text-gray-500">)</span>
                                        </span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center gap-4">
                                {/* --- Copy Button (Unchanged) --- */}
                                <button
                                    onClick={handleCopy}
                                    className="group flex items-center gap-1.5 font-mono text-gray-500 hover:text-white transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {/* 3. Conditional rendering based on copyStatus */}
                                    {copyStatus ? (
                                        <i className="fas fa-check-circle text-lg text-green-500 transition-colors"></i>
                                    ) : (
                                        <>
                                            {/* MOBILE ONLY: Icon */}
                                            <i className="far fa-copy text-lg group-hover:text-green-400 transition-colors md:hidden"></i>
                                        </>
                                    )}

                                    {/* DESKTOP ONLY: Text code style */}
                                    <span className="hidden md:inline text-sm">
                                        <span className="text-gray-600">.</span>
                                        <span className={`text-green-400 ${copyStatus ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} transition-opacity`}>copy</span>
                                        <span className="text-gray-600">()</span>
                                    </span>
                                </button>

                                {/* --- Send Button (UPDATED to match Copy style) --- */}
                                <button
                                    onClick={handleSend}
                                    disabled={!message.trim()} // Disabled when no text exists
                                    className="font-mono text-sm md:text-base group flex items-center gap-1.5 transition-all disabled:cursor-not-allowed py-2"
                                >
                                    {!message.trim() ? (
                                        /* 🚨 1. DISABLED State: Simple gray text 🚨 */
                                        <span className="text-gray-500 font-mono select-none text-sm md:text-base">.send()</span>
                                    ) : (
                                        /* 🚨 2. ENABLED State: Code style with Icon and Method call 🚨 */
                                        <>
                                            {/* ICON (Mobile Only: Use a generic send/arrow icon) */}
                                            <i className="fas fa-paper-plane text-lg text-primary group-hover:text-yellow-400 transition-colors md:hidden"></i>

                                            {/* DESKTOP/CODE STYLE */}
                                            <span className="hidden md:inline text-sm md:text-base">
                                                <span className="text-gray-500">.</span>
                                                <span className="text-primary group-hover:text-yellow-400 transition-colors">send</span>
                                                <span className="text-gray-500">()</span>
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start md:justify-end">
                    <div className="border border-gray-600 p-4 w-full md:w-auto">
                        <h4 className="text-white font-bold mb-4">Feel free to reach out</h4>
                        <div className="flex flex-col gap-2">
                            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                                <i className="fas fa-envelope text-gray-500"></i>
                                <span>{personalInfo.email}</span>
                            </a>
                            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                                <i className="fa fa-phone text-gray-500"></i>
                                <span>{personalInfo.phone}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;