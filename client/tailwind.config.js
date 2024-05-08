/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [typography, daisyui]
};
