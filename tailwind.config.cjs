/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bayon: ['Bayon', "sans-serif"],
        bellota: ['Bellota Text', "sans-serif"],
      }
    },
  },
  plugins: [],
}