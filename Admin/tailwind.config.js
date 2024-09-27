/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'), // Add the scrollbar plugin
  ],
  variants: {
    scrollbar: ['rounded'] // Option to make scrollbars rounded
  }
}