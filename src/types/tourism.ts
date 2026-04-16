export interface Destination {
    id: string;
    name: string;
    description: string;
    image: string;
}

export interface Flight {
    id: string;
    airline: string;
    logo: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    priceUSD: number;
    priceTZS: number;
    cabin: 'Economy' | 'Business' | 'First';
}

export interface Hotel {
    id: string;
    name: string;
    location: string;
    description: string;
    images: string[];
    rating: number;
    priceUSD: number;
    priceTZS: number;
    amenities: string[];
    rooms: {
        type: string;
        priceUSD: number;
        priceTZS: number;
    }[];
    category: 'Luxury' | 'Mid-range' | 'Budget';
}

export interface Tour {
    id: string;
    title: string;
    duration: string;
    priceUSD: number;
    priceTZS: number;
    highlights: string[];
    itinerary: string[];
    included: string[];
    excluded: string[];
    images: string[];
}

export interface VisaInfo {
    country: string;
    required: boolean;
    type: string;
    feeUSD: number;
    feeTZS: number;
    processingDays: number;
}

export interface QuickReply {
    text: string;
    type: 'quick' | 'whatsapp';
}
