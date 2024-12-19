import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#065f46',  // Tailwind emerald-800
        secondary: '#fcd34d',  // amber-300
        accent: '#dc2626',  // red-600
        background: '#e7e5e4',  // stone-200
        // Lisää tumman tilan värit
        darkBackground: '#1f2937', // Tailwind gray-800
        darkPrimary: '#10b981', // emerald-500
        darkSecondary: '#fde68a', // amber-200
      },
    },
  },
  darkMode: 'class',  // Mahdollistaa manuaalisen vaihtamisen käyttöliittymästä
  plugins: [require('daisyui')],
};

export default config;
