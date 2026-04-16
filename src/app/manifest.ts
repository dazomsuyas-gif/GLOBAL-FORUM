import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Global Forum - Learn Languages, Buy/Sell, Connect Worldwide',
        short_name: 'Global Forum',
        description: 'Language learning with AI tutors, global marketplace, and knowledge community. TOEFL, HSK, DELE, DELF, Goethe, Swahili.',
        theme_color: '#1e293b', // Navy
        background_color: '#0f172a', // Slate 900
        display: 'standalone',
        scope: '/',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
            {
                src: '/icons/icon-48.png',
                sizes: '48x48',
                type: 'image/png',
            },
            {
                src: '/icons/icon-72.png',
                sizes: '72x72',
                type: 'image/png',
            },
            {
                src: '/icons/icon-96.png',
                sizes: '96x96',
                type: 'image/png',
            },
            {
                src: '/icons/icon-128.png',
                sizes: '128x128',
                type: 'image/png',
            },
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/icon-384.png',
                sizes: '384x384',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}

