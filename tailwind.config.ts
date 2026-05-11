import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#845cf5',
          50: '#f3efff',
          100: '#e9e1fe',
          200: '#d4c5fd',
          300: '#b89afb',
          400: '#9d75f8',
          500: '#845cf5',
          600: '#7040e8',
          700: '#5e30d0',
          800: '#4e28ab',
          900: '#41238b',
        },
      },
      fontFamily: {
        sans: ['"Polysans Neutral"', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        geist: ['var(--font-geist-sans)', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '1.5'], // 16px with a line-height of 1.5
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
