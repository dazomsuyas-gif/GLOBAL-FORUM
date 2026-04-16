import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700, 0 0 30px #ffd700' },
                    '100%': { boxShadow: '0 0 20px #ffd700, 0 0 30px #ffd700, 0 0 40px #ffd700' }
                }
            },
            colors: {
                gold: '#FFD700',
                'gold-bright': '#FFED4A',
                navy: '#1E3A8A',
                'savanna-gold': '#D4AF37',
                'earth-brown': '#8B4513'
            }
        },
    },
    plugins: [],
}
export default config
