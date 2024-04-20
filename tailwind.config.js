/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      main: ['Poppins','sans-serif']
    },
    extend: {
      width:{
        main: '1220px'
      },
      backgroundColor:{
        main: '#ee3131'
      },
      colors:{
        main: '#ee3131'
      },
      flex:{
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
      },
      keyframes: {
        'slide-top':{
          '0%': {
            '-webkit-transform': 'translateY(80px);',
                    transform: 'translateY(80px);'
          },
          '100%': {
            '-webkit-transform': 'translateY(-10px);',
                    transform: 'translateY(-10px);'
          }
        }
      },
      animation:{
        'slide-top': 'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      }
    },
  },
  plugins: [],
}