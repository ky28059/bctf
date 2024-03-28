import type { Config } from 'tailwindcss';
import headlessuiPlugin from '@headlessui/tailwindcss';


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 45s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          // Magic numbers, do not touch >:(
          from: { transform: "translateY(0) translateX(0) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" },
          to: { transform: "translateY(70.5vh) translateX(15vh) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" },
        },
      },
      colors: {
        background: '#111',
        theme: '#c22026',
        'theme-dark': '#9A1B1F',
        'theme-bright': '#ff1e1e',
        success: '#0dd157',
        primary: '#BABABA',
        secondary: '#757575',
        tertiary: '#404040'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.75rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      }
    },
  },
  plugins: [headlessuiPlugin],
}
export default config;
