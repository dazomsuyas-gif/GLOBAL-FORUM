import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['framer-motion'],
    experimental: {
        typedRoutes: true,
    },
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
    },
};

export default withPWA({
    dest: 'public',
    cacheOnFrontEndNav: true,
    reloadOnOnline: true,
    aggressiveSwSetup: true,
    swcMinify: true,
    disable: process.env.NODE_ENV === 'development',
})(nextConfig);

