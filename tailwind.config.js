/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define the new, clean color palette
        'bg': '#E8F7FA', // The light, airy background
        'glass-overlay': '#FFFFFF', // The base color for the translucent panels
        'accent': '#3CB4C4', // The new, calm accent color
        
        // Use standard Tailwind grays for text to maintain contrast
      },
      fontFamily: {
        // Implement the modern sans-serif font stack
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial"],
      },
      // You can add a custom 'glass' utility if you like, 
      // but applying backdrop-blur directly is often simpler.
    },
  },
  plugins: [],
}