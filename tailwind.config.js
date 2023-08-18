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
          green: '#5CB85C'
        }
      },
      spacing: {
        navItem: '0.425rem'
      },
      boxShadow: {
        banner: 'inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)'
      },
      dropShadow: {
        logo: '0px 1px 3px rgba(0, 0, 0, 0.3)'
      },
      fontSize: {
        logo: '3.5rem'
      }
    },
  },
  plugins: [],
}

