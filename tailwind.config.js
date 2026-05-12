/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#f2f2f7',
        card: '#ffffff',
        border: '#e4e4eb',
        'border-light': '#d0d0da',
        ink: '#111118',
        muted: '#6b6b7b',
        green: {
          spotify: '#1DB954',
          light: '#1ed760',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 2px 8px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
}
