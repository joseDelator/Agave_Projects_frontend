/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},

  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#84cc16",
                   
          "secondary": "#d9f99d",
                   
          "accent": "#1FB2A6",
                   
          "neutral": "#191D24",
                   
          "base-100": "#2A303C",
                   
          "info": "#3ABFF8",
                   
          "success": "#36D399",
                   
          "warning": "#FBBD23",
                   
          "error": "#F87272",
                   },
      }
    ],
  },
}

