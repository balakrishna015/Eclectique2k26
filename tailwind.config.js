/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#0a0a0f',
        'neon-cyan': '#00f3ff',
        'neon-purple': '#bc13fe',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        liquid: ['Liquidasi', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
