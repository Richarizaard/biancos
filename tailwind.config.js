/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['app/javascript/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bianco-black': '#090809ff',
        'bianco-red': '#f40000ff',
        'bianco-vermilion': '#f44e3fff',
        'bianco-salmon': '#f4796bff',
        'bianco-pink': '#f4998dff',
      },
      animation: {
        fadeIn: 'fadeIn 0.75s ease-in',
        fadeOut: 'fadeOut 0.75s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
