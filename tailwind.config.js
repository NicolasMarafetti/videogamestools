/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      backgroundImage: {
        'games-left-background':
          "url('/assets/images/gamesPage/background-left.webp')",
        'games-right-background':
          "url('/assets/images/gamesPage/background-right.webp')",
        'header-background': "url('/assets/images/header_background.png')",
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.4)',
        'black-rgba-dark': 'rgba(0, 0, 0, 0.7)',
        gray: {
          100: '#f7fafc',
          200: '#edf2f7',
          300: '#e2e8f0',
          400: '#cbd5e0',
          500: '#a0aec0',
          600: '#718096',
          700: '#4a5568',
          800: '#2d3748',
          900: '#1a202c',
        },
        blue: {
          DEFAULT: '#58C0EB',
          100: '#ebf8ff',
          200: '#bee3f8',
          300: '#90cdf4',
          400: '#63b3ed',
          500: '#4299e1',
          600: '#3182ce',
          700: '#2b6cb0',
          800: '#2c5282',
          900: '#2a4365',
        },
        orange: {
          DEFAULT: '#FA7921',
        },
      },
    },
  },
  plugins: [],
};
