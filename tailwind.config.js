/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                navy: '#0A1628',
                gold: '#C9A84C',
                'gold-bright': '#FFD700',
                red: '#E63946',
                parchment: '#F8F5F0',
                steel: '#1E2A3A',
                'white-soft': '#F0EDE8',
                'lang-english': '#003087',
                'lang-chinese': '#DE2910',
                'lang-spanish': '#AA151B',
                'lang-french': '#002395',
                'lang-german': '#000000',
                'lang-swahili': '#1B5E20',
            },
            animation: {
                'gradient': 'gradient 3s ease infinite',
                'gradient-x': 'gradient-x 15s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'gradient-x': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                float: {
                    '0%, 100%': { transform: 'translate3d(0,0,0)' },
                    '50%': { transform: 'translate3d(0,-20px,0)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glow-gold': '0 0 20px rgba(201, 168, 76, 0.5)',
                'glow-navy': '0 0 20px rgba(10, 22, 40, 0.5)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glow-xl': '0 0 40px rgba(201, 168, 76, 0.6)',
            },
            fontFamily: {
                'display': ['Inter', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
