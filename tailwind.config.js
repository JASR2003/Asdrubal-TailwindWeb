/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'blue-dark': '#020f1e',
        'blue-back': '#041a2e',
        'gray-txt': '#94a3b8',
        'blue-txt': '#36d0f1',
        'blue-hover': '#192a3b',
        'blue-btn': '#032540',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Montserrat como fuente principal
      },
      backgroundImage: {
        'custom-cursor': 'radial-gradient(rgba(179, 181, 212, 1), rgba(179, 181, 212, 0.5) 40%, transparent 70%);',
      },
    },
  },
  plugins: [],
}