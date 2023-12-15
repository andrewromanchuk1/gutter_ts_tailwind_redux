/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titillium: ['Titillium Web', 'sans-serif'],
        sourceSerif: ['Noto Serif', 'serif'],
      },
      colors: {
        conduit: {
          gray: {
            100: '#f3f3f3',
            200: '#eceeef',
            300: '#ddd',
            400: '#ccc',
            500: '#bbb',
            650:  '#a1a1a1',
            600: '#aaa',
            700: '#999',
            800: '#818a91',
            900: '#687077',
            1000: '#373a3c',
            1100: '#333',
          },
          green: '#5CB85C',
          darkGreen: '#3d8b3d',
        }
      },
      spacing: {
        0.2: '0.2rem',
        0.3: '0.3rem',
        0.37: '0.37rem',
        navItem: '0.425rem',
        0.45: '0.45rem',
        tag: '0.6rem',
        25: '6.25rem',
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
        articleTitle: '2.8rem',
        articleBody: '1.2rem'
      },
      borderRadius: {
        btnSm: '0.2rem',
        tag: '10rem'
      },
      lineHeight: {
        articleTitle: '1.1',
        articleBody: '1.8rem',
      }
    },
  },
  plugins: [],
}

