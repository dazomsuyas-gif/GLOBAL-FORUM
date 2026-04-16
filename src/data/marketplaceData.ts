export interface Product {
    id: string;
    slug: string;
    title: string;
    category: string;
    subcategory: string;
    description: string;
    specifications: Record<string, string>;
    images: string[];
    priceLocal: number; // TZS
    priceInternational: {
        USD: number;
        EUR: number;
        GBP: number;
    };
    stock: number;
    condition: 'New' | 'Used' | 'Refurbished';
    sellerId: string;
    rating: number;
    reviewCount: number;
    viewCount: number;
    salesCount: number;
    isPromoted?: boolean;
    promotionEndDate?: string;
    isTrending?: boolean;
    isFeatured?: boolean;
    deliveryOptions: ('digital' | 'pickup' | 'domestic' | 'regional' | 'international')[];
}

export interface Seller {
    id: string;
    name: string;
    username: string;
    avatar: string;
    rating: number;
    responseTime: string;
    totalSales: number;
    payoutMethod: string;
}

export interface Review {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    rating: number;
    comment: string;
    timestamp: string;
}

// Categories
export const categories = [
    'Electronics',
    'Fashion',
    'Food & Groceries',
    'Phones & Accessories',
    'Audio',
    'Cameras',
    'Local Products',
    'Trending'
] as const;

export const subcategories: Record<string, string[]> = {
    'Electronics': ['Laptops', 'Tablets', 'Smart Home', 'Accessories'],
    'Fashion': ['Men', 'Women', 'Kids', 'Shoes'],
    'Food & Groceries': ['Grains', 'Vegetables', 'Meat', 'Dairy'],
    'Phones & Accessories': ['iPhone', 'Samsung', 'Accessories', 'Cases'],
    'Audio': ['Speakers', 'Headphones', 'Microphones'],
    'Cameras': ['DSLR', 'Mirrorless', 'Action Cameras'],
    'Local Products': ['Handicrafts', 'Baskets', 'Clothing', 'Art'],
    'Trending': ['Viral Products', 'New Arrivals']
};

// Sample Products (100+)
export const products: Product[] = [
    {
        id: '1',
        slug: 'iphone-15-pro',
        title: 'iPhone 15 Pro 256GB Natural Titanium (Unlocked)',
        category: 'Phones & Accessories',
        subcategory: 'iPhone',
        description: 'Latest Apple iPhone 15 Pro with A17 Pro chip, titanium frame, 48MP camera system, USB-C, iOS 17. Global unlocked.',
        specifications: {
            'Display': '6.1" Super Retina XDR',
            'Camera': '48MP Main + UltraWide + Telephoto',
            'Processor': 'A17 Pro',
            'Storage': '256GB',
            'Battery': 'Up to 23 hours video'
        },
        images: [
            'https://images.unsplash.com/photo-1692110854784-6b7e9f75c52a?w=500&h=500&fit=crop',
            'https://images.unsplash.com/photo-1692110854784-6b7e9f75c52a?w=500&h=500&fit=crop&rotate=90'
        ],
        priceLocal: 3500000,
        priceInternational: { USD: 1199, EUR: 1120, GBP: 950 },
        stock: 12,
        condition: 'New',
        sellerId: 'seller1',
        rating: 4.8,
        reviewCount: 127,
        viewCount: 24567,
        salesCount: 89,
        isPromoted: true,
        promotionEndDate: '2024-12-01',
        isTrending: true,
        isFeatured: false,
        deliveryOptions: ['pickup', 'domestic', 'regional', 'international']
    },
    // ... Add 99 more products following the same structure
    {
        id: '2',
        slug: 'samsung-galaxy-s24-ultra',
        title: 'Samsung Galaxy S24 Ultra 512GB Titanium Black',
        category: 'Phones & Accessories',
        subcategory: 'Samsung',
        description: 'S24 Ultra with S Pen, 200MP camera, AI features, 6.8" display, 12GB RAM.',
        specifications: {
            'Display': '6.8" Dynamic AMOLED 2X',
            'Camera': '200MP + 50MP + 10MP + 12MP',
            'Processor': 'Snapdragon 8 Gen 3',
            'Storage': '512GB'
        },
        images: ['https://images.unsplash.com/photo-1701256243100-dad3766fa272?w=500&h=500&fit=crop'],
        priceLocal: 3200000,
        priceInternational: { USD: 1299, EUR: 1210, GBP: 1020 },
        stock: 25,
        condition: 'New',
        sellerId: 'seller2',
        rating: 4.7,
        reviewCount: 89,
        viewCount: 18345,
        salesCount: 123,
        isPromoted: false,
        isTrending: false,
        isFeatured: false,
        deliveryOptions: ['pickup', 'domestic', 'international']
    },
    {
        id: '3',
        slug: 'jbl-charge-5',
        title: 'JBL Charge 5 Bluetooth Speaker (IP67 Waterproof)',
        category: 'Audio',
        subcategory: 'Speakers',
        description: '20 hours playtime, 40W power, USB-C charging, PartyBoost, IP67 waterproof.',
        specifications: {
            'Power': '40W RMS',
            'Battery': '20 hours',
            'Bluetooth': '5.1',
            'Waterproof': 'IP67'
        },
        images: ['https://images.unsplash.com/photo-1598358671006-cd84d175efe3?w=500&h=500&fit=crop'],
        priceLocal: 450000,
        priceInternational: { USD: 179, EUR: 168, GBP: 142 },
        stock: 45,
        condition: 'New',
        sellerId: 'seller3',
        rating: 4.9,
        reviewCount: 345,
        viewCount: 56789,
        salesCount: 234,
        isPromoted: false,
        isTrending: true,
        isFeatured: false,
        deliveryOptions: ['pickup', 'domestic', 'regional', 'international']
    }
    // Continue with remaining products...
];

export const sellers: Seller[] = [
    {
        id: 'seller1',
        name: 'Tech World Tanzania',
        username: 'techworldtz',
        avatar: '🖥️',
        rating: 4.9,
        responseTime: '2h avg',
        totalSales: 1567,
        payoutMethod: 'M-PESA'
    },
    {
        id: 'seller2',
        name: 'Global Electronics',
        username: 'globalelectronics',
        avatar: '📱',
        rating: 4.8,
        responseTime: '4h avg',
        totalSales: 2345,
        payoutMethod: 'PayPal'
    }
];

export const mockReviews = [
    {
        id: '1',
        user: { name: 'John Doe', avatar: '👤' },
        rating: 5,
        comment: 'Perfect phone! Fast delivery from seller.',
        timestamp: '2024-04-15'
    }
];

