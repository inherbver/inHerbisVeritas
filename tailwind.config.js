module.exports = {
  safelist: [
    { pattern: /text-(gray|emerald|sky)-(900|800|700)/ },
    { pattern: /text-(4xl|5xl|6xl)/ }
  ],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
