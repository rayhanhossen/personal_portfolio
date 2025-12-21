/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#020617',         
        'glass-overlay': 'rgba(30, 41, 59, 0.7)', 
        'accent': '#22d3ee',     
        'accent-dim': '#0891b2', 
        'text-main': '#f8fafc',  
        'text-muted': '#94a3b8', 
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // SUGGESTION 3 (Bonus): Added for code/tech labels
        mono: ["'Fira Code'", "monospace"], 
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // SUGGESTION 1: The "Cyberpunk" Text Gradient
        'text-gradient': 'linear-gradient(to right, #f8fafc, #22d3ee)', 
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.accent"), 0 0 20px theme("colors.accent")',
      },
      animation: {
        'ripple': 'ripple 15s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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