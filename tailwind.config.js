/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titillium: ['Titillium Web', 'sans-serif'],
      },
      colors: {
        conduit: {
          green: '#5CB85C',
          darkGreen: '#3d8b3d',
          gray: '#bbb',
          lightenGray: '#ddd',
          tag: '#aaa',
          darkestGray: '#373a3c',
          darkenGray: '#999'
        }
      },
      spacing: {
        navItem: '0.425rem',
        0.3: '0.3rem',
        0.2: '0.2rem',
        tag: '0.6rem',
      },
      boxShadow: {
        banner: 'inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)'
      },
      dropShadow: {
        logo: '0px 1px 3px rgba(0, 0, 0, 0.3)'
      },
      fontSize: {
        logo: '3.5rem',
        date: '0.8rem',
      },
      borderRadius: {
        btnSm: '0.2rem',
        tag: '10rem'
      }
    },
  },
  plugins: [],
}

