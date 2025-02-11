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
          xl: "6rem",
          "2xl": "9rem",  
        }
      }
    },
  },
  plugins: [],
}

