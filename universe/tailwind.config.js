/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './Component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors:{
      light_blue:'#E8FFFB', //color de la navbar
      light_blue_hover:'#ABC7C2',// color mas oscuro para cuando se necesita hover sobre la navbar horizontal
      blue_page:'#A9E9DF',// color de la lateral_NavBar
      button_color:'#285F76',// color de los botones
      dark_blue:'#1D3752'// color de los iconos de la  barra lateral
    },
  },
  plugins: [],
}
