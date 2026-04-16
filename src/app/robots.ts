import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin/',
                '/api/admin/',
                '/private/',
                '/temp/',
            ],
        },
        sitemap: 'https://globalforum.com/sitemap.xml',
        host: 'https://globalforum.com',
    };
}

