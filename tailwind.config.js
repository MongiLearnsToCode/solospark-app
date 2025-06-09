/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom theme colors following design specifications
        'amber-gold': '#F59E0B', // Primary - High-intent CTAs
        'sky-blue': '#0EA5E9', // Secondary - Links, buttons, hover states
        'indigo': '#6366F1', // Accent - Tags, badges, alerts
        'offwhite': '#F9FAFB', // Background - Page and card backgrounds
        'slate-gray': '#475569', // Neutral - Body text, borders
        
        // Additional shades for better design flexibility
        primary: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        secondary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
        },
        accent: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#5B21B6',
          700: '#4C1D95',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Primary font for body text
        heading: ['Poppins', 'sans-serif'], // Headings font
        poppins: ['Poppins', 'sans-serif'], // Alias for consistency
      },
      fontSize: {
        // Base responsive sizes
        'base': ['16px', { lineHeight: '24px' }],
        'base-mobile': ['14px', { lineHeight: '21px' }],
        
        // Responsive heading sizes
        'h1': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'h1-mobile': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'h2-mobile': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'h3-mobile': ['16px', { lineHeight: '24px', fontWeight: '600' }],
      },
      spacing: {
        // 8px base spacing system
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      borderRadius: {
        'lg': '8px', // Standard border radius
      },
      boxShadow: {
        // Minimal card shadows
        'card': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'glass': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}