/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#F35510",
        secondary: "#FFC211",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        satisfy: ["Satisfy", "sans-serif"],
      },
    },
    screens: {
      "3xl": { max: "1280px" },
      // => @media (max-width: 1280px) { ... }

      "2xl": { max: "1200px" },
      // => @media (max-width: 1200px) { ... }

      xl: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      lg: { max: "991px" },
      // => @media (max-width: 991px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      lm: { max: "550px" },
      // => @media (max-width: 550px) { ... }

      sm: { max: "465px" },
      // => @media (max-width: 450px) { ... }
    },
  },
  plugins: [],
};
