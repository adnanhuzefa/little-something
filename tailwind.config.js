const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: c('cream'),
        sand: c('sand'),
        blush: c('blush'),
        rose: c('rose'),
        rosedeep: c('rosedeep'),
        mocha: c('mocha'),
        ink: c('ink'),
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(5deg)' },
        },
        blob: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(34px,-26px,0) scale(1.08)' },
        },
        wave: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-1440px)' },
        },
        tide: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glint: {
          '0%,100%': { opacity: '0.12', transform: 'scaleX(0.55)' },
          '50%': { opacity: '0.9', transform: 'scaleX(1)' },
        },
        cloud: {
          from: { transform: 'translateX(-30px)' },
          to: { transform: 'translateX(90px)' },
        },
        glow: {
          '0%,100%': { opacity: '0.82', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        scrollcue: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '45%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '55%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        eq: {
          '0%,100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        ring: {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        kenburns: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.09)' },
        },
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        'float-slow': 'float 13s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        'wave-slow': 'wave 34s linear infinite',
        'wave-mid': 'wave 24s linear infinite reverse',
        'wave-fast': 'wave 16s linear infinite',
        tide: 'tide 7s ease-in-out infinite',
        glint: 'glint 3.6s ease-in-out infinite',
        cloud: 'cloud 38s ease-in-out infinite alternate',
        glow: 'glow 7s ease-in-out infinite',
        scrollcue: 'scrollcue 2.4s ease-in-out infinite',
        eq: 'eq 1s ease-in-out infinite',
        ring: 'ring 2.6s ease-out infinite',
        kenburns: 'kenburns 26s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
