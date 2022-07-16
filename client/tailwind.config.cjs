/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        myBlueFaded: '#E1E8FB',
        myBlue: '#6387FF',
        myBlueDark: '#015092',
        myGray1: '#F0F3F6',
        myGray2: '#EDF0F5',
        myGray3: '#D0D3E3',
        myPink: '#FE5E76',
        hoverBg: '#F7F8FA',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

