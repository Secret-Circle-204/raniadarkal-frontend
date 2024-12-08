/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      colors: {
        pr2: '#0f0f0f',
        pr1: '#c7ab5a',
        pr3: '#dfc169',
        pr4: '#bb9e4a',
        pr5: '#252525',
        pr6: '#121112',
        black_more: '#0f0f0f',
        primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024',
        semgold: '#CFB53B',
        gold1: '#AA8061',
        gold2: '#D6AA84',
        gold3: '#E6C7A2',
        blue1: '#051333',
        blue2: '#122356', 
        background: '#F8F9FA',
        'primary-50': '#ea580c00',
        'primary-100': '#ea580c00',
        'primary-200': '#ea580c00',
        'primary-300': '#ea580c00',
        'primary-400': '#ea580c00',
        'primary-500': '#ea580c',
        'primary-600': '#FF3366',
        'primary-700': '#FF3366',
        'primary-800': '#FF3366',
        'primary-900': '#FF3366',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // // ...
  ],
};
