export interface Language {
    id: number;
    name: string;
    slug: string;
    flag: string;
    color: string;
    levels: string[];
    totalLessons: number;
    totalVocabulary: number;
    totalHours: number;
    examAlignment: string;
    description: string;
    funFact: string;
    speakerCount: string;
    countries: string[];
    features: string[];
    heroImage: string;
    bannerImage: string;
}

export const languages: Language[] = [
    {
        id: 1,
        name: "English",
        slug: "english",
        flag: "🇺🇸🇬🇧",
        color: "#003087",
        levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        totalLessons: 560,
        totalVocabulary: 5000,
        totalHours: 400,
        examAlignment: "TOEFL, IELTS, Cambridge",
        description: "The global language of business, science, and diplomacy. Unlock opportunities worldwide.",
        funFact: "Over 1.5 billion people speak English worldwide",
        speakerCount: "1.5B+ speakers",
        countries: ["USA", "UK", "Canada", "Australia", "India", "Nigeria"],
        features: [
            "TOEFL/IELTS Prep",
            "Business English",
            "Academic Writing",
            "American/British",
            "Job Interview Prep"
        ],
        heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=300&fit=crop"
    },

    {
        id: 2,
        name: "Chinese (Mandarin)",
        slug: "chinese",
        flag: "🇨🇳",
        color: "#DE2910",
        levels: ["HSK1", "HSK2", "HSK3", "HSK4", "HSK5", "HSK6"],
        totalLessons: 560,
        totalVocabulary: 8000,
        totalHours: 600,
        examAlignment: "HSK Official",
        description: "Language of the world's most spoken native language and economic powerhouse.",
        funFact: "4 tones + neutral tone create 5 pitches",
        speakerCount: "1.1B+ native speakers",
        countries: ["China", "Taiwan", "Singapore", "Malaysia"],
        features: [
            "Pinyin System",
            "Stroke Order Animation",
            "4 Tones Practice",
            "HSK Exam Prep",
            "Business Chinese"
        ],
        heroImage: "https://images.unsplash.com/photo-1579820117122-19875a6a3f29?w=1200&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1579820117122-19875a6a3f29?w=1400&h=300&fit=crop"
    },

    {
        id: 3,
        name: "Spanish",
        slug: "spanish",
        flag: "🇪🇸🇲🇽🇦🇷",
        color: "#AA151B",
        levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        totalLessons: 560,
        totalVocabulary: 5000,
        totalHours: 350,
        examAlignment: "DELE, SIELE",
        description: "2nd most spoken language globally. Connect with 500M+ speakers.",
        funFact: "Most spoken Romance language",
        speakerCount: "500M+ speakers",
        countries: ["Spain", "Mexico", "Argentina", "Colombia", "USA"],
        features: [
            "Latin American Spanish",
            "Spain Spanish",
            "Verb Conjugations",
            "DELE Exam Prep",
            "Business Spanish"
        ],
        heroImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&h=300&fit=crop"
    },

    {
        id: 4,
        name: "French",
        slug: "french",
        flag: "🇫🇷🇨🇦🇧🇫",
        color: "#002395",
        levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        totalLessons: 560,
        totalVocabulary: 5000,
        totalHours: 400,
        examAlignment: "DELF, DALF",
        description: "Language of culture, diplomacy, and cuisine. Spoken on 5 continents.",
        funFact: "Language of love has 700,000 words",
        speakerCount: "300M+ speakers",
        countries: ["France", "Canada", "Belgium", "Switzerland", "Senegal"],
        features: [
            "Gender Rules",
            "Verb Groups",
            "DELF/DALF Prep",
            "France/Canada French",
            "Cultural French"
        ],
        heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&h=300&fit=crop"
    },

    {
        id: 5,
        name: "German",
        slug: "german",
        flag: "🇩🇪🇨🇭🇦🇹",
        color: "#000000",
        levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        totalLessons: 560,
        totalVocabulary: 5000,
        totalHours: 450,
        examAlignment: "Goethe, TELC, TestDaF",
        description: "Most spoken native language in EU. Key for engineering and business.",
        funFact: "4 grammatical cases + compound words",
        speakerCount: "130M+ speakers",
        countries: ["Germany", "Austria", "Switzerland", "Belgium"],
        features: [
            "4 Cases Explained",
            "Umlaut Practice",
            "Compound Words",
            "Business German",
            "Goethe Exam Prep"
        ],
        heroImage: "https://images.unsplash.com/photo-1559010433-aab75afdd0ab?w=1200&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1559010433-aab75afdd0ab?w=1400&h=300&fit=crop"
    },

    {
        id: 6,
        name: "Swahili",
        slug: "swahili",
        flag: "🇹🇿🇰🇪🇺🇬🇷🇼",
        color: "#1B5E20",
        levels: ["A1", "A2", "B1", "B2", "C1", "C2"],
        totalLessons: 560,
        totalVocabulary: 5000,
        totalHours: 300,
        examAlignment: "KKG (Kiswahili Kwa Gari)",
        description: "East Africa's lingua franca. Unlocks 200M+ speakers across 14 countries.",
        funFact: "15 noun classes (no gender, but classes)",
        speakerCount: "200M+ speakers",
        countries: ["Tanzania", "Kenya", "Uganda", "Rwanda", "DR Congo"],
        features: [
            "Noun Classes (Ngeli)",
            "East African Dialects",
            "Trade Language",
            "Bantu Grammar",
            "KKG Exam Prep"
        ],
        heroImage: "https://images.unsplash.com/photo-1575918175295-fb9d9363c3aa?w=1200&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1575918175295-fb9d9363c3aa?w=1400&h=300&fit=crop"
    }
];

export default languages;

