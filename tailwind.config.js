const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/*.{html,js}"],
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
        'custom-radial': 'radial-gradient(circle, #102f57, #05203e 50%, #041c35 80%, #041a2e)',
      },
    },
  },
  plugins: [
    // Móvil con texto ampliado: la ventana mide menos de 20rem (320px con texto normal)
    plugin(({ addVariant }) => addVariant('texto-grande', '@container (max-width: 19.9rem)')),
  ],
}