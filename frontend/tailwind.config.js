/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure you cover all possible file types
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
