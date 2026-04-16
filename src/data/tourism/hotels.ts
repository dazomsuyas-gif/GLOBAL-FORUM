import type { Hotel } from '../../types/tourism';

export const HOTELS: Hotel[] = [
    {
        id: 'luxury-1',
        name: 'Four Seasons Resort Zanzibar',
        location: 'Zanzibar',
        description: 'Luxury beachfront resort with private villas and infinity pools.',
        images: [
            'https://picsum.photos/800/500?random=1',
            'https://picsum.photos/800/500?random=2',
            'https://picsum.photos/800/500?random=3',
        ],
        rating: 4.9,
        priceUSD: 450,
        priceTZS: 1194000,
        amenities: ['Private Pool', 'Beach Access', 'Spa', 'Fine Dining', 'Airport Shuttle'],
        rooms: [
            { type: 'Ocean Villa', priceUSD: 450, priceTZS: 1194000 },
            { type: 'Presidential Suite', priceUSD: 1200, priceTZS: 3180000 }
        ],
        category: 'Luxury'
    },
    {
        id: 'luxury-2',
        name: 'Serena Hotel Arusha',
        location: 'Arusha',
        description: 'Premier safari lodge with panoramic views of Mount Meru.',
        images: [
            'https://picsum.photos/800/500?random=4',
            'https://picsum.photos/800/500?random=5',
            'https://picsum.photos/800/500?random=6',
        ],
        rating: 4.7,
        priceUSD: 280,
        priceTZS: 743000,
        amenities: ['Infinity Pool', 'Gym', 'Restaurant', 'Conference Facilities'],
        rooms: [
            { type: 'Deluxe Room', priceUSD: 280, priceTZS: 743000 },
            { type: 'Suite', priceUSD: 450, priceTZS: 1194000 }
        ],
        category: 'Luxury'
    },
    {
        id: 'midrange-1',
        name: 'Gold Zanzibar Beach House & Spa',
        location: 'Zanzibar',
        description: 'Beachfront boutique hotel with excellent service and location.',
        images: [
            'https://picsum.photos/800/500?random=7',
            'https://picsum.photos/800/500?random=8',
            'https://picsum.photos/800/500?random=9',
        ],
        rating: 4.5,
        priceUSD: 160,
        priceTZS: 424000,
        amenities: ['Beach Access', 'Pool', 'Spa', 'Restaurant'],
        rooms: [
            { type: 'Superior Room', priceUSD: 160, priceTZS: 424000 },
            { type: 'Deluxe Room', priceUSD: 220, priceTZS: 583000 }
        ],
        category: 'Mid-range'
    },
    {
        id: 'midrange-2',
        name: 'Mount Meru Hotel',
        location: 'Arusha',
        description: 'Modern hotel perfect for safari groups and business travelers.',
        images: [
            'https://picsum.photos/800/500?random=10',
            'https://picsum.photos/800/500?random=11',
            'https://picsum.photos/800/500?random=12',
        ],
        rating: 4.3,
        priceUSD: 130,
        priceTZS: 345000,
        amenities: ['Pool', 'Gym', 'Restaurant', 'Free WiFi'],
        rooms: [
            { type: 'Standard Room', priceUSD: 130, priceTZS: 345000 },
            { type: 'Executive Room', priceUSD: 180, priceTZS: 477000 }
        ],
        category: 'Mid-range'
    },
    {
        id: 'budget-1',
        name: 'Zanzibar Coffee House Hotel',
        location: 'Zanzibar',
        description: 'Clean, comfortable budget option in Stone Town center.',
        images: [
            'https://picsum.photos/800/500?random=13',
            'https://picsum.photos/800/500?random=14',
            'https://picsum.photos/800/500?random=15',
        ],
        rating: 4.1,
        priceUSD: 50,
        priceTZS: 132500,
        amenities: ['WiFi', 'Roof Terrace', 'Restaurant', 'Tour Desk'],
        rooms: [
            { type: 'Standard Room', priceUSD: 50, priceTZS: 132500 }
        ],
        category: 'Budget'
    },
    {
        id: 'budget-2',
        name: 'Arusha Backpackers Lodge',
        location: 'Arusha',
        description: 'Ideal for budget travelers and safari groups.',
        images: [
            'https://picsum.photos/800/500?random=16',
            'https://picsum.photos/800/500?random=17',
            'https://picsum.photos/800/500?random=18',
        ],
        rating: 4.0,
        priceUSD: 35,
        priceTZS: 92800,
        amenities: ['Shared Kitchen', 'Garden', 'Free WiFi', 'Tour Booking'],
        rooms: [
            { type: 'Dorm Bed', priceUSD: 20, priceTZS: 53000 },
            { type: 'Private Room', priceUSD: 35, priceTZS: 92800 }
        ],
        category: 'Budget'
    }
];
