/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    'postcss-import': require('postcss-import'),
    'tailwindcss': require('tailwindcss'),
  },
};

export default config;
