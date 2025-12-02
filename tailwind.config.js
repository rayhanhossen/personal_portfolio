/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- MIDNIGHT ICE PALETTE ---
        'bg': '#020617',         // Very dark slate (almost black)
        'glass-overlay': '#1e293b', // Lighter slate for cards/navbar
        'accent': '#22d3ee',     // Bright Neon Cyan (The "Ice")
        
        // Custom text colors for the dark theme
        'text-main': '#f8fafc',  // Bright white-blue
        'text-muted': '#94a3b8', // Muted blue-grey
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        'ripple': 'ripple 15s infinite linear',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
}