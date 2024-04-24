/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "skinColor": "#F5DFBB",
        "firstColor" : "#0E9594",
        "secondColor": "#F2542D",
        "warningColor" : "#562C2C",

      }
    },
  },
  plugins: [],
}
