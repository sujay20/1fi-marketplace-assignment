/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core 1Fi palette, sampled from the existing Shop screens
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          900: '#3B0764',
        },
        surface: '#F6F6F8',
        ink: {
          900: '#151221',
          600: '#4B4759',
          400: '#8B879A',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21, 18, 33, 0.04), 0 1px 12px rgba(21, 18, 33, 0.06)',
      },
    },
  },
  plugins: [],
};
