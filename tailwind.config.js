module.exports = {
  safelist: [
    { pattern: /text-(gray|emerald|sky)-(900|800|700)/ },
    { pattern: /text-(4xl|5xl|6xl)/ },
  ],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'slow-zoom-out': 'slowZoomOut 10s ease-out forwards',
      },
      keyframes: {
        slowZoomOut: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.0)' },
        },
      },
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
