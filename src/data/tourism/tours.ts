import type { Tour } from '../../types/tourism';

export const TOURS: Tour[] = [
    {
        id: '1',
        title: 'Serengeti Safari Adventure',
        duration: '3 Days / 2 Nights',
        priceUSD: 450,
        priceTZS: 1194000,
        highlights: ['Big 5 game drives', 'Luxury tented camp', 'Migration viewing'],
        itinerary: [
            'Day 1: Arusha → Serengeti (Morning game drive)',
            'Day 2: Full day Serengeti (Central plains)',
            'Day 3: Serengeti → Arusha (Afternoon game drive)'
        ],
        included: ['Park fees', '3 meals daily', 'Professional guide', '4x4 safari vehicle', 'Accommodation'],
        excluded: ['Flights', 'Visa', 'Tips', 'Alcoholic drinks'],
        images: [
            'https://picsum.photos/800/500?random=20',
            'https://picsum.photos/800/500?random=21',
            'https://picsum.photos/800/500?random=22',
            'https://picsum.photos/800/500?random=23'
        ]
    },
    {
        id: '2',
        title: 'Kilimanjaro Machame Route Climb',
        duration: '6 Days / 5 Nights',
        priceUSD: 1200,
        priceTZS: 3180000,
        highlights: ['6-day Machame route', 'Porters & guides', 'Summit certification'],
        itinerary: [
            'Day 1: Machame Gate → Machame Camp',
            'Day 2: Machame Camp → Shira Camp',
            'Day 3: Shira Camp → Lava Tower',
            'Day 4: Barranco Camp → Karanga Camp',
            'Day 5: Barafu Camp → Uhuru Peak → Mweka Camp',
            'Day 6: Descent to Mweka Gate'
        ],
        included: ['Park fees', 'All meals', 'Guides & porters', 'Tents & equipment', 'Return transfers'],
        excluded: ['Gear rental', 'Tips', 'Flights', 'Visa'],
        images: [
            'https://picsum.photos/800/500?random=24',
            'https://picsum.photos/800/500?random=25',
            'https://picsum.photos/800/500?random=26'
        ]
    },
    {
        id: '3',
        title: 'Zanzibar Beach Paradise',
        duration: '5 Days / 4 Nights',
        priceUSD: 350,
        priceTZS: 928000,
        highlights: ['Stone Town tour', 'Beach relaxation', 'Spice tour'],
        itinerary: [
            'Day 1: Arrival & Stone Town walking tour',
            'Day 2: Spice plantation tour',
            'Day 3: Mnemba Island snorkeling',
            'Day 4: Beach relaxation & sunset dhow cruise',
            'Day 5: Free time & departure'
        ],
        included: ['4* beach resort', 'All meals', 'Airport transfers', 'Daily activities'],
        excluded: ['Flights', 'Alcoholic beverages', 'Tips'],
        images: [
            'https://picsum.photos/800/500?random=27',
            'https://picsum.photos/800/500?random=28',
            'https://picsum.photos/800/500?random=29'
        ]
    },
    {
        id: '4',
        title: 'Ngorongoro & Lake Manyara',
        duration: '3 Days / 2 Nights',
        priceUSD: 380,
        priceTZS: 1008000,
        highlights: ['Ngorongoro Crater floor', 'Lake Manyara tree climbing lions'],
        itinerary: [
            'Day 1: Arusha → Lake Manyara',
            'Day 2: Lake Manyara → Ngorongoro Crater',
            'Day 3: Full crater tour → Arusha'
        ],
        included: ['Park fees', 'Lodge accommodation', 'All meals', 'Game drives'],
        excluded: ['Flights', 'Visa', 'Tips'],
        images: [
            'https://picsum.photos/800/500?random=30',
            'https://picsum.photos/800/500?random=31',
            'https://picsum.photos/800/500?random=32'
        ]
    },
    {
        id: '5',
        title: 'Tanzania Grand Safari',
        duration: '7 Days / 6 Nights',
        priceUSD: 950,
        priceTZS: 2518000,
        highlights: ['Serengeti, Ngorongoro, Tarangire', 'Big Cat specials'],
        itinerary: [
            'Day 1: Arusha → Tarangire',
            'Day 2: Tarangire full day',
            'Day 3: Tarangire → Serengeti',
            'Day 4-5: Serengeti full days',
            'Day 6: Serengeti → Ngorongoro',
            'Day 7: Ngorongoro → Arusha'
        ],
        included: ['All park fees', '6 nights accommodation', 'All meals', 'Game drives'],
        excluded: ['Flights', 'Tips', 'Premium drinks'],
        images: [
            'https://picsum.photos/800/500?random=33',
            'https://picsum.photos/800/500?random=34',
            'https://picsum.photos/800/500?random=35',
            'https://picsum.photos/800/500?random=36'
        ]
    },
    {
        id: '6',
        title: 'Maasai Cultural Experience',
        duration: '2 Days / 1 Night',
        priceUSD: 150,
        priceTZS: 398000,
        highlights: ['Maasai village visit', 'Traditional dancing', 'Craft market'],
        itinerary: [
            'Day 1: Arusha → Maasai village (cultural activities)',
            'Day 2: Morning walk, craft market → Arusha'
        ],
        included: ['Traditional dinner', 'Village stay', 'Activities', 'Transport'],
        excluded: ['Meals', 'Tips'],
        images: [
            'https://picsum.photos/800/500?random=37',
            'https://picsum.photos/800/500?random=38'
        ]
    }
];
