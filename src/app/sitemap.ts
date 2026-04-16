import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://globalforum.com'; // Replace with your domain

    // Static routes
    const staticRoutes = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date('2024-10-20'),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/knowledge`,
            lastModified: new Date('2024-10-20'),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/languages`,
            lastModified: new Date('2024-10-20'),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/marketplace`,
            lastModified: new Date('2024-10-20'),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/community`,
            lastModified: new Date('2024-10-20'),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/admin/login`,
            lastModified: new Date('2024-10-20'),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
    ];

    // Dynamic knowledge categories (14 categories)
    const knowledgeCategories = [
        'technology', 'business', 'health', 'travel', 'food', 'sports', 'entertainment',
        'education', 'finance', 'lifestyle', 'science', 'politics', 'environment', 'culture'
    ].map(category => ({
        url: `${baseUrl}/knowledge/${category}`,
        lastModified: new Date('2024-10-20'),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Sample articles (250+ - show first 50)
    const articles = Array.from({ length: 50 }, (_, i) => {
        const titles = ['AI Revolution', 'Machine Learning Basics', 'Web Development Trends', 'Blockchain Explained'];
        return {
            url: `${baseUrl}/knowledge/technology/ai-revolution-${i + 1}`,
            lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
            img: `${baseUrl}/images/article-${i % 10}.jpg`
        };
    });

    // Sample products (100+ - show first 30)
    const products = Array.from({ length: 30 }, (_, i) => ({
        url: `${baseUrl}/marketplace/product/${i + 1}`,
        lastModified: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        changeFrequency: 'daily' as const,
        priority: 0.8,
        img: `${baseUrl}/images/product-${i % 20}.jpg`
    }));

    // Community pages
    const communityPages = [
        { url: `${baseUrl}/community`, lastModified: new Date('2024-10-20'), changeFrequency: 'daily' as const, priority: 0.8 },
        { url: `${baseUrl}/community/groups`, lastModified: new Date('2024-10-20'), changeFrequency: 'weekly' as const, priority: 0.7 },
    ];

    return [
        ...staticRoutes,
        ...knowledgeCategories,
        ...articles,
        ...products,
        ...communityPages,
    ];
}

