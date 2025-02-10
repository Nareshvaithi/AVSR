/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "themeRed":"#ca0e0f"
      },
      fontFamily:{
        "mainFont1":["EB Garamond", "serif"]
      },
      container:{
        center:true,
        padding:{
          DEFAULT: "1rem",
          sm: "2rem",
          md: "4rem",
          xl: "5rem",
          "2xl": "6rem",  
        }
      }
    },
  },
  plugins: [],
}

