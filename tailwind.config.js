/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    'node_modules/preline/dist/*.js',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
};
