/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/styles/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "Plus Jakarta Sans", "sans-serif"],
        hand: ["Caveat", "cursive"]
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
