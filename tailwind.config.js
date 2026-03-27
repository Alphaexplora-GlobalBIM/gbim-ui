/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#FACC15', // Bright Gold
          500: '#EAB308', // Standard Gold
          600: '#CA8A04', // Dark Gold
          700: '#A16207', // Deep Gold
        },
        silver: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB', // Standard Silver
          400: '#9CA3AF', // Dark Silver
        },
        charcoal: {
          800: '#1F2937', // Light Charcoal
          900: '#111827', // Deep Charcoal (Site Background)
          950: '#030712', // Black Charcoal
        }
      }
    },
  },
  plugins: [],
}