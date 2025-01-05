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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'custom-cursor': 'radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.5) 70%, rgba(255,255,255,0.4) 80%, rgba(255,255,255,0.3) 90%, rgba(255,255,255,0.2) 95%, rgba(255,255,255,0))',
      },
    },
  },
  plugins: [],
}