/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#e8ebf1',
          100: '#c5cde0',
          200: '#9aacc9',
          300: '#6f8bb2',
          400: '#4f72a0',
          500: '#2e598e',
          600: '#244d82',
          700: '#1a3f72',
          800: '#132f5c',
          900: '#1C2B4A',
          950: '#0d1e35',
        },
        crimson: {
          50:  '#fdeaea',
          100: '#facaca',
          200: '#f59898',
          300: '#f06565',
          400: '#eb3d3d',
          500: '#C0282B',
          600: '#a82226',
          700: '#8e1b1e',
          800: '#741417',
          900: '#5a0d10',
        },
        cream: {
          50:  '#faf9f7',
          100: '#f5f2ee',
          200: '#EDE8E1',
          300: '#e0d9cf',
          400: '#d3cab8',
          500: '#c6bba1',
          600: '#b9ab8a',
          700: '#a09372',
          800: '#7d725a',
          900: '#5a5242',
        },
        gold: {
          400: '#F5C842',
          500: '#E5B800',
          600: '#C9A000',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-navy':   'linear-gradient(135deg, #1C2B4A 0%, #2e598e 100%)',
        'gradient-crimson':'linear-gradient(135deg, #C0282B 0%, #8e1b1e 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #1C2B4A 0%, #2e598e 50%, #C0282B 100%)',
        'gradient-hero':   'linear-gradient(to bottom, rgba(28,43,74,0.7) 0%, rgba(28,43,74,0.4) 50%, rgba(28,43,74,0.8) 100%)',
      },
      boxShadow: {
        'glass':   '0 8px 32px rgba(28,43,74,0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
        'card':    '0 4px 24px rgba(28,43,74,0.08)',
        'card-hover':'0 12px 40px rgba(28,43,74,0.16)',
        'luxury':  '0 20px 60px rgba(28,43,74,0.2)',
        'crimson': '0 8px 24px rgba(192,40,43,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-in-out',
        'slide-up':   'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'count-up':   'countUp 2s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',      opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      screens: {
        xs: '475px',
      },
    },
  },
  plugins: [],
}
