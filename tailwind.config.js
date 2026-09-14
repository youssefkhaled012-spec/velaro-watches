/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velaro: {
          black: '#080808',
          charcoal: '#111111',
          surface: '#161616',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.16)',
          gold: '#C6A15B',
          'gold-hover': '#D8B36E',
          'gold-dark': '#9E7E41',
          white: '#F5F5F5',
          muted: '#A5A5A5',
          darker: '#050505',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        velaro: '6px',
      },
      letterSpacing: {
        widest: '0.22em',
        editorial: '0.15em',
      }
    },
  },
  plugins: [],
}
