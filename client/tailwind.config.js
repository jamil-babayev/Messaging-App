/** @type {import('tailwindcss').Config} **/
// const defaultTheme = require('tailwindcss/defaultTheme')
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#25bdd8',
      },
      screens: {
        xs: '400px',
      },
    },
    fontFamily: {
      lobster: ['Lobster', 'cursive'],
      ubuntu: ['Ubuntu', 'sans-serif'],
    },
  },
  plugins: [],
});
