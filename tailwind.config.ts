import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Polysans Neutral"', 'sans-serif'],
      },
      fontSize: {
        base: ['16px', '1.5'], // 16px with a line-height of 1.5
      },
    },
  },
  plugins: [],
};
export default config;
