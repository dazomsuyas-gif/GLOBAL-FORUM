export interface Chapter {
    chapterNumber: number;
    title: string;
    content: string;
    wordCount: number;
    isRead?: boolean;
}

export interface Story {
    id: number;
    title: string;
    slug: string;
    genre: 'romance' | 'horror' | 'life' | 'adventure' | 'mystery';
    author: string;
    authorBio: string;
    authorAvatar: string;
    coverImage: string;
    bannerImage: string;
    synopsis: string;
    tags: string[];
    wordCount: number;
    readTime: number;
    chapterCount: number;
    likes: number;
    views: number;
    publishDate: string;
    isFeatured: boolean;
    isComplete: boolean;
    isPopular: boolean;
    chapters: Chapter[];
}

export const stories: Story[] = [
    // ROMANCE (5 stories)
    {
        id: 1,
        title: "The Last Letter from Zanzibar",
        slug: "the-last-letter-from-zanzibar",
        genre: "romance",
        author: "Kelvin Juma Msuya",
        authorBio: "Award-winning Tanzanian writer specializing in cross-cultural love stories.",
        authorAvatar: "📝",
        coverImage: "https://images.unsplash.com/photo-1578631517811-25f8ab9dce3a?w=800&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1578631517811-25f8ab9dce3a?w=1200&h=300&fit=crop",
        synopsis: "Amara discovers hidden love letters in her grandmother's Zanzibar spice shop. The 1960s romance reveals forbidden love between an Indian merchant and French woman. As Amara translates the letters, she falls for Lucas, a French historian researching the same story. Family secrets threaten to repeat history.",
        tags: ["Love", "Zanzibar", "1960s", "Letters", "Cross-cultural", "SpiceTrade"],
        wordCount: 8500,
        readTime: 35,
        chapterCount: 12,
        likes: 234,
        views: 12500,
        publishDate: "2024-01-15",
        isFeatured: true,
        isComplete: true,
        isPopular: true,
        chapters: [
            {
                chapterNumber: 1,
                title: "The Spice Shop Discovery",
                content: `<p class="leading-relaxed text-lg"><strong>Stone Town, Zanzibar - Present Day</strong></p>
<p>The aroma of cloves and cinnamon wafted through the narrow streets of Stone Town. Amara Juma stood at the entrance of her late mother's spice shop, the wooden sign creaking softly in the Indian Ocean breeze. Tourists passed by, their cameras clicking at the coral stone buildings painted in pastel hues.</p>
<p>"Mama would have loved this weather," she whispered, adjusting her headscarf. The shop was exactly as her mother had left it three months ago. Jars of turmeric lined the shelves, cardamom pods filled glass bowls, and vanilla beans rested in wooden trays.</p>
<p>Amara swept the floor as she did every morning, the rhythm familiar and comforting. But today, something caught her eye. One floorboard near the back wall was loose, slightly raised above the others. She knelt down, her fingers tracing the edge. With a gentle pry, the board lifted free.</p>
<p>Beneath it lay a small wooden box, intricately carved with Arabic patterns, its brass lock long since rusted. Amara's heart raced. She had swept this floor a thousand times as a child. How had she never noticed?</p>
<p>The box was no larger than a book, tied shut with faded silk ribbon. Trembling fingers untied the bow, and the lid creaked open. Inside were envelopes, yellowed with age, addressed in elegant cursive French script.</p>
<p><em>"À ma bien-aimée, Safiya"</em> - To my beloved Safiya.</p>
<p>Amara's grandmother's name. From whom? And why hidden?</p>
<p>She glanced at the date on the first letter: 1962. Four years before her mother was born. Four years before her grandparents supposedly died in a tragic boating accident.</p>
<p>The first letter slipped from her fingers. Something told her this changed everything.</p>`,
                wordCount: 720,
                isRead: false
            }
            // 11 more chapters truncated for brevity
        ]
    },

    // Continue with 19 more stories following the same pattern...
    {
        id: 20,
        title: "The Whispering Walls of Edinburgh",
        slug: "the-whispering-walls-of-edinburgh",
        genre: "mystery",
        author: "Eleanor Gray",
        authorBio: "Scottish mystery writer and former detective.",
        authorAvatar: "🕵️",
        coverImage: "https://images.unsplash.com/photo-1511737602755-9197e1371dda?w=800&h=600&fit=crop",
        bannerImage: "https://images.unsplash.com/photo-1511737602755-9197e1371dda?w=1200&h=300&fit=crop",
        synopsis: "Historian Clara discovers that Edinburgh Castle's walls literally whisper secrets from 500 years ago. The voices reveal a 16th-century murder that matches her own colleague's recent disappearance. As Clara deciphers the cryptic messages, she realizes the killer is still watching...",
        tags: ["Mystery", "Edinburgh", "Castle", "Ghosts", "Murder", "History"],
        wordCount: 7500,
        readTime: 32,
        chapterCount: 10,
        likes: 156,
        views: 8900,
        publishDate: "2024-03-10",
        isFeatured: false,
        isComplete: true,
        isPopular: true,
        chapters: [
            {
                chapterNumber: 1,
                title: "The First Whisper",
                content: `<p>The wind howled through Edinburgh Castle's ancient stone corridors, carrying voices no tourist could hear.</p>
<p>Clara MacKenzie pressed her ear against the wall of St. Margaret's Chapel, the oldest building in Edinburgh. The other historians laughed at her obsession with \"castle ghosts.\" But she heard them. Faint, melodic whispers in old Scots dialect.</p>
<p>\"The blood... under the floor... find it before the new moon...\"</p>`,
                wordCount: 680
            }
        ]
    }
];

export default stories;

