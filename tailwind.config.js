/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        venom: {
          DEFAULT: '#00FF41',
          dark: '#00CC33',
          light: '#33FF66',
        },
        blood: {
          DEFAULT: '#DC143C',
          dark: '#B01030',
          light: '#FF1744',
        },
        abyss: {
          DEFAULT: '#0A0A0A',
          light: '#1A1A1A',
          lighter: '#2A2A2A',
        },
      },
      fontFamily: {
        creepy: ['Creepster', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slither': 'slither 3s ease-in-out infinite',
        'crack': 'crack 0.3s ease-out',
        'venom-drip': 'venomDrip 2s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite',
        'pulse-red': 'pulseRed 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        slither: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-5px) rotate(-2deg)' },
          '50%': { transform: 'translateX(5px) rotate(0deg)' },
          '75%': { transform: 'translateX(-3px) rotate(2deg)' },
        },
        crack: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        venomDrip: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(20px)', opacity: '0' },
        },
        glitch: {
          '0%, 100%': { textShadow: '2px 2px #DC143C, -2px -2px #00FF41' },
          '25%': { textShadow: '-2px 2px #DC143C, 2px -2px #00FF41' },
          '50%': { textShadow: '2px -2px #DC143C, -2px 2px #00FF41' },
          '75%': { textShadow: '-2px -2px #DC143C, 2px 2px #00FF41' },
        },
        pulseRed: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(220, 20, 60, 0.7)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 0 10px rgba(220, 20, 60, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
