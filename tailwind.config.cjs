/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'mappin-blue': '#0081A1',
      },
    },
  },
  plugins: [],

  //NOTE: Scopes tailwind to only override classes in the embed (root element id is 'mappin-embed')
  important: '#mappin-embed',

  //NOTE: prevents tailwind from injecting global styles
  corePlugins: {
    preflight: false,
  },
}
