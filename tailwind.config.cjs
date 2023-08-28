/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      padding: {
        'five': '1.25rem',
        'three': '0.75rem',
        'zero': '0',
    //     #mappin-embed .pt-5 {
    //       padding-top: 1.25rem;
    //   }
      
    //   #mappin-embed .pr-3 {
    //       padding-right: 0.75rem;
    //   }
    //   #mappin-embed .pl-0 {
    //     padding-left: 0;
    // }
    },
      fontFamily: {
        'sans': ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'mappin-blue': '#0081A1',
      },
    },
  },
  plugins: [],
  
  //NOTE: Scopes tailwind to only override classes in the project (root element id is 'mappin-embed')
  important: '#mappin-embed',
  
  //NOTE: prevents tailwind from injecting global styles
  corePlugins: { 
    preflight: false,
  },
}
