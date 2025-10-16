module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#e6f2e6',
          100: '#c2e0c2',
          500: '#4CAF50',
          600: '#45a049',
        },
        'secondary': {
          50: '#e6f2f2',
          500: '#009688',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'card-hover': 'cardHover 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        cardHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}