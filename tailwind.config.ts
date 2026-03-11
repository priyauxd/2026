import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black:  '#08080f',
        s1:     '#0d0d1a',
        s2:     '#111120',
        s3:     '#181828',
        gold: {
          DEFAULT: '#C9A84C',
          2:       '#e0bf6e',
          border:  'rgba(201,168,76,0.18)',
          dim:     'rgba(201,168,76,0.07)',
          faint:   'rgba(201,168,76,0.05)',
        },
        cream: {
          DEFAULT: '#f0ede6',
          muted:   'rgba(240,237,230,0.46)',
          dim:     'rgba(240,237,230,0.18)',
          faint:   'rgba(240,237,230,0.07)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Outfit', 'sans-serif'],
      },
      animation: {
        'rise':   'rise 0.8s ease forwards',
        'scroll': 'scroll 28s linear infinite',
        'glow':   'glow 2.5s ease-in-out infinite',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(26px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        scroll: {
          to: { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%,100%': { boxShadow: '0 0 0 2px rgba(34,197,94,0.25)' },
          '50%':     { boxShadow: '0 0 0 5px rgba(34,197,94,0.08)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
