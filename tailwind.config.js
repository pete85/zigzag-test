/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  prefix: 'tw-',
  content: [
    "./apps/breed-finder/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
