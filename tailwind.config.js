/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  // ✅ crucial for React apps
  theme: {
    extend: {
      backgroundImage:{
        'hero-bg': "url('src/assets/bg.jpg')",
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};