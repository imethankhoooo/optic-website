/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    light: '#e0c896',
                    DEFAULT: '#c9a96e',
                    dark: '#8c734b',
                },
                dark: '#1d1d1f',
                light: '#f5f5f7',
            },
            fontFamily: {
                heading: ['"Cormorant Garamond"', 'serif'],
                body: ['"Manrope"', 'sans-serif'],
            },
            transitionTimingFunction: {
                'luxury': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            }
        },
    },
    plugins: [],
}
