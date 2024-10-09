/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['*'],
  theme: {
    extend: {
      fontFamily: {
        'lato': ["Lato", "sans-serif"],
        'inter': ["Inter", "sans-serif"],
     },
     colors: {
      'btn-bg': 'rgba(14, 122, 129, 1)',
      'custom-color': 'rgba(14, 122, 129, 1)',
    },
   
    },
  },
  plugins: [
    require('daisyui')
  ],
}

