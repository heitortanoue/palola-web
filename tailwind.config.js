/** @type {import('tailwindcss').Config} */
const TAILWIND_COLORS = require("./utils/tailwindColors");

function withOpacity(variableName) {
    return `rgb(var(--${variableName})/<alpha-value>)`
  } 

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",    
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ["Poppins", "Inter", "sans-serif"],
        },
        colors: TAILWIND_COLORS
      },
    },
    plugins: [],
  }