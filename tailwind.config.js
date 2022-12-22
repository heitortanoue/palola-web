/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ["Poppins", "Inter", "sans-serif"],
        },
        colors: {
            primary: {
                DEFAULT: "rgb(var(--primary)/<alpha-value>)",
                dark: "rgb(var(--primary-dark)/<alpha-value>)",
            },
            secondary: {
                DEFAULT: "rgb(var(--secondary)/<alpha-value>)",
                // dark: "rgb(var(--secondary-dark)/<alpha-value>)",
            },
            tertiary: {
                DEFAULT: "rgb(var(--tertiary)/<alpha-value>)",
                // dark: "rgb(var(--tertiary-dark)/<alpha-value>)",
            },
        }
      },
    },
    plugins: [],
  }