/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1480px',
    },
    extend: {
      colors: {
        // Night chapters
        ink: {
          DEFAULT: '#12151B',
          950: '#090B0F',
          900: '#0E1116',
          800: '#181C23',
          700: '#232832',
          600: '#343A46',
          500: '#4A515E',
        },
        // Day chapters
        paper: {
          DEFAULT: '#F6F1E7',
          50: '#FCFAF5',
          100: '#F6F1E7',
          200: '#EEE7D8',
          300: '#E3D9C5',
          400: '#D3C6AC',
        },
        amber: {
          DEFAULT: '#F0A63A',
          200: '#FAD9A4',
          300: '#F6C473',
          400: '#F0A63A',
          500: '#DE8F24',
          700: '#94570A', // amber that passes AA as text on paper
        },
        mist: '#A9A499', // secondary text on ink (7:1)
        stone: '#5C584D', // secondary text on paper (6:1)
        signal: '#5BD08A', // "available" dot
      },
      fontFamily: {
        display: ['"Playfair Display Variable"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.14em' }],
      },
      maxWidth: {
        page: '1360px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        pulseDot: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '70%': { transform: 'scale(2.6)', opacity: '0' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
        flow: {
          to: { strokeDashoffset: '-24' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        flow: 'flow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
