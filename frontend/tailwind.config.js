/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors :{
        'primary':'#FFCE1A',
        'secondary':'#0D0842',
        'blackBG':'#F3F3F3',
        'Favourite':'#FF5841'
      },
      fontFamily:{
        'primary':[ "Montserrat", "serif"],
        'secondary':["Nunito Sans", "serif"]
      }
    },
  },
  plugins: [],
}

