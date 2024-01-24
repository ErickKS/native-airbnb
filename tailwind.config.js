/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.{js,ts,tsx}", "./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#FF385C",
        gray: "#5E5D5E",
      },
    },
  },
  plugins: [],
};
