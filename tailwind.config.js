/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#282C33',
        primary: '#C778DD',
        text: '#E0E6ED',
        gray: '#ABB2BF',
        card: '#282C33',
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
      },
      spacing: {
        'container': '1024px',
      }
    },
  },
  plugins: [],
}