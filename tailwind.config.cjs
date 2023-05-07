/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
  //NOTE: Scopes tailwind to only override classes in the project (root element id is 'mappin-embed')
  important: '#mappin-embed',
  
  //NOTE: prevents tailwind from injecting global styles
  corePlugins: { 
    preflight: false,
  },
}
