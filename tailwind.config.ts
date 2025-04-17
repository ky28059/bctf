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
                "mark-rotate": "mark-rotate 8s ease-in-out alternate infinite",
                "mark-pivot-rotate": "mark-pivot-rotate 9s ease-in-out alternate infinite"
            },
            keyframes: {
                "loop-scroll": {
                    // Magic numbers, do not touch >:(
                    from: { transform: "translateY(0) translateX(0) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" },
                    to: {
                        // Translate x: 7.5 * scale
                        // Translate y: 35.26 * scale
                        transform: "translateY(calc(0.3526 * var(--tw-scale-y) * max(100vh, 100vw))) translateX(calc(0.075 * var(--tw-scale-x) * max(100vh, 100vw))) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
                    },
                },
                "mark-rotate": {
                    from: { transform: 'rotateY(-30deg)' },
                    to: { transform: 'rotateY(30deg)' }
                },
                "mark-pivot-rotate": {
                    from: { transform: 'rotateZ(8deg)' },
                    to: { transform: 'rotateZ(-8deg)' }
                }
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
