/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        typedRoutes: true,
    },
    transpilePackages: [
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'gsap',
        '@tsparticles/react',
        'lottie-react',
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'tailwindui.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    webpack: (config, { isServer }) => {
        // Fix for GSAP
        config.resolve.alias = {
            ...config.resolve.alias,
            'gsap': 'gsap',
        };

        if (!isServer) {
            // Add polyfills for browser-only APIs
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false,
                crypto: false,
            };
        }

        return config;
    },
}

module.exports = nextConfig
