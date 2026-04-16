export interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    description: string;
    color: string;
    articleCount: number;
    gradient: string;
}

export const categories: Category[] = [
    {
        id: 1,
        name: "Richest People",
        slug: "richest-people",
        icon: "💰",
        description: "Billionaires, wealth rankings, success stories",
        color: "#C9A84C",
        gradient: "from-yellow-400 to-orange-500",
        articleCount: 22
    },
    {
        id: 2,
        name: "Science & Technology",
        slug: "science-technology",
        icon: "🔬",
        description: "Innovations, AI, space exploration, gadgets",
        color: "#00b4d8",
        gradient: "from-blue-400 to-cyan-500",
        articleCount: 20
    },
    {
        id: 3,
        name: "Nature",
        slug: "nature",
        icon: "🌿",
        description: "Wildlife, environment, climate, ecosystems",
        color: "#40916c",
        gradient: "from-green-400 to-emerald-600",
        articleCount: 20
    },
    {
        id: 4,
        name: "Culture",
        slug: "culture",
        icon: "🎭",
        description: "Traditions, festivals, music, art worldwide",
        color: "#f72585",
        gradient: "from-pink-400 to-rose-500",
        articleCount: 20
    },
    {
        id: 5,
        name: "Food",
        slug: "food",
        icon: "🍲",
        description: "Recipes, cuisines, food culture, nutrition",
        color: "#e76f51",
        gradient: "from-orange-400 to-red-500",
        articleCount: 20
    },
    {
        id: 6,
        name: "Health",
        slug: "health",
        icon: "💊",
        description: "Fitness, mental health, medicine, wellness",
        color: "#4cc9f0",
        gradient: "from-sky-400 to-blue-500",
        articleCount: 30
    },
    {
        id: 7,
        name: "Tourism & Visa",
        slug: "tourism-visa",
        icon: "✈️",
        description: "Travel guides, visa requirements, destinations",
        color: "#06d6a0",
        gradient: "from-teal-400 to-emerald-500",
        articleCount: 23
    },
    {
        id: 8,
        name: "Library",
        slug: "library",
        icon: "📚",
        description: "Classic books, philosophy, literature reviews",
        color: "#7b2ff7",
        gradient: "from-violet-500 to-purple-600",
        articleCount: 15
    },
    {
        id: 9,
        name: "Events & Trends",
        slug: "events-trends",
        icon: "🎉",
        description: "Current affairs, viral trends, global events",
        color: "#f4a261",
        gradient: "from-amber-400 to-orange-500",
        articleCount: 18
    },
    {
        id: 10,
        name: "Empires & Leaders",
        slug: "empires-leaders",
        icon: "👑",
        description: "History, politics, great leaders, empires",
        color: "#E63946",
        gradient: "from-red-500 to-rose-600",
        articleCount: 24
    },
    {
        id: 11,
        name: "Economies",
        slug: "economies",
        icon: "📈",
        description: "GDP, markets, business, finance analysis",
        color: "#2a9d8f",
        gradient: "from-teal-500 to-emerald-600",
        articleCount: 19
    },
    {
        id: 12,
        name: "Wars",
        slug: "wars",
        icon: "⚔️",
        description: "Military history, conflicts, strategy",
        color: "#6d6875",
        gradient: "from-slate-500 to-gray-600",
        articleCount: 23
    },
    {
        id: 13,
        name: "Creator Hub",
        slug: "creator-hub",
        icon: "🎥",
        description: "YouTube scripts, content creation, monetization",
        color: "#e9c46a",
        gradient: "from-yellow-400 to-amber-500",
        articleCount: 120
    },
    {
        id: 14,
        name: "Language Academy",
        slug: "language-academy",
        icon: "🌐",
        description: "Language learning reference materials",
        color: "#1B5E20",
        gradient: "from-green-600 to-emerald-700",
        articleCount: 50
    }
];

