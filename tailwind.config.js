/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom theme colors
        'amber-gold': '#F59E0B', // Amber Gold
        'sky-blue': '#0EA5E9', // Sky Blue
        'indigo': '#6366F1', // Indigo
        'offwhite': '#F9FAFB', // Off-White
        'slate-gray': '#475569', // Slate Gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '24px'],
        'base-mobile': ['14px', '21px'],
        h1: ['32px', '40px'],
        'h1-mobile': ['24px', '32px'],
        h2: ['24px', '32px'],
        'h2-mobile': ['20px', '28px'],
        h3: ['20px', '28px'],
        'h3-mobile': ['16px', '24px'],
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}
