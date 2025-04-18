/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        comfortaa: ['Comfortaa', 'cursive'],
      },
    },

  },
  plugins: [],
}

