/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-custom)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        secondary_dark : 'rgb(var(--color-secondary_dark) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        dactive : 'rgb(var(--color-dactive) / <alpha-value>)',
        active_background : 'rgb(var(--color-active_background) / <alpha-value>)',

        primary_s: 'rgb(var(--color-primary-s) / <alpha-value>)',
        accent_s: 'rgb(var(--color-accent-s) / <alpha-value>)',
      }
    },
  },
  plugins: [],
};
