/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // This enables our dark mode toggle
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: {
          light: '#1E293B', // For light mode sidebars
          dark: '#0F172A',  // For dark mode sidebars/backgrounds
        },
        background: {
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        accent: {
          cyan: '#22D3EE',
          green: '#10B981',
          red: '#EF4444',
          amber: '#F59E0B',
        },
        'text-light': '#111827',
        'text-dark': '#F9FAFB',
      },
    },
  },
  plugins: [],
}