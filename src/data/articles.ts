import type { Category } from './categories';

export interface Article {
    id: number;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: string;
    readTime: number;
    publishDate: string;
    views: number;
    likes: number;
}

// Sample 30 articles across categories
export const articles: Article[] = [
    // Richest People (5 articles)
    {
        id: 1,
        title: "The 10 Richest People in the World 2024",
        slug: "richest-people-in-the-world-2024",
        category: "richest-people",
        excerpt: "Who are the world's billionaires in 2024? Full rankings, net worth, and how they made their fortunes.",
        content: `
      <h2>Introduction</h2>
      <p>Every year, the world's richest people change as markets shift and fortunes grow. Here's the definitive 2024 list...</p>
      <h2>#1 Elon Musk</h2>
      <p>$251B - Tesla, SpaceX, xAI, Neuralink...</p>
      <h2>#2 Bernard Arnault</h2>
      <p>$232B - LVMH luxury empire...</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1613360665806-418a45892efb?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 12,
        publishDate: "2024-01-15",
        views: 152340,
        likes: 1245
    },
    {
        id: 2,
        title: "How Jeff Bezos Built Amazon Empire",
        slug: "jeff-bezos-amazon-empire",
        category: "richest-people",
        excerpt: "From garage startup to trillion-dollar company - Bezos' step-by-step strategy revealed.",
        content: "<p>Complete Bezos story...</p>",
        coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 15,
        publishDate: "2023-12-20",
        views: 98765,
        likes: 892
    },
    {
        id: 3,
        title: "Warren Buffett's Investment Secrets",
        slug: "warren-buffett-investment-secrets",
        category: "richest-people",
        excerpt: "The Oracle of Omaha's timeless principles for building lasting wealth.",
        content: "<p>Buffett's wisdom...</p>",
        coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 10,
        publishDate: "2024-02-10",
        views: 76543,
        likes: 678
    },
    {
        id: 4,
        title: "Mark Zuckerberg and Meta's Future",
        slug: "mark-zuckerberg-meta-future",
        category: "richest-people",
        excerpt: "From Facebook to metaverse empire - Zuckerberg's bold vision.",
        content: "<p>Meta's evolution...</p>",
        coverImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 8,
        publishDate: "2024-01-28",
        views: 54321,
        likes: 456
    },
    {
        id: 5,
        title: "African Billionaires Rising 2024",
        slug: "african-billionaires-2024",
        category: "richest-people",
        excerpt: "Aliko Dangote, Johann Rupert, and Africa's emerging wealth creators.",
        content: "<p>African wealth boom...</p>",
        coverImage: "https://images.unsplash.com/photo-1558618047-b5448d4dcfc1?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 11,
        publishDate: "2024-03-05",
        views: 43210,
        likes: 321
    },

    // Science & Technology (5 articles)
    {
        id: 6,
        title: "Quantum Computing Revolution 2024",
        slug: "quantum-computing-revolution-2024",
        category: "science-technology",
        excerpt: "Google, IBM, and China's quantum supremacy race explained.",
        content: "<p>Quantum breakthrough...</p>",
        coverImage: "https://images.unsplash.com/photo-1551288049-b178bc9f3f8c?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 14,
        publishDate: "2024-02-22",
        views: 87654,
        likes: 987
    },
    {
        id: 7,
        title: "AI Agents: Future of Work",
        slug: "ai-agents-future-work",
        category: "science-technology",
        excerpt: "Autonomous AI systems that complete complex tasks without human intervention.",
        content: "<p>AI agents...</p>",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 9,
        publishDate: "2024-01-30",
        views: 65432,
        likes: 543
    },
    // ... Continue with 23 more articles across all categories to reach 30 total
    {
        id: 30,
        title: "Creator Hub: 100+ YouTube Scripts",
        slug: "creator-hub-youtube-scripts",
        category: "creator-hub",
        excerpt: "Ready-made scripts for tech, education, entertainment channels.",
        content: "<p>Creator tools...</p>",
        coverImage: "https://images.unsplash.com/photo-1617341025881-ebc490e681c6?w=800&h=400&fit=crop",
        author: "Kelvin Juma Msuya",
        readTime: 7,
        publishDate: "2024-03-15",
        views: 12345,
        likes: 234
    }
];

// Full 250 articles would follow this pattern
export default articles;

