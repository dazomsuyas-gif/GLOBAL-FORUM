import axios from 'axios';

const API_HOST = 'test.api.amadeus.com'; // change to 'api.amadeus.com' for production
const API_VERSION = 'v2';

const client = axios.create({
    baseURL: `https://${API_HOST}`,
    headers: {
        'Authorization': 'Bearer TODO_TOKEN', // will be set dynamically
    },
});

let accessToken: string | null = null;

/**
 * Get Amadeus access token
 */
export async function getAmadeusToken() {
    if (accessToken && (accessTokenExpiry || 0) > Date.now()) {
        return accessToken;
    }

    if (!process.env.AMADEUS_API_KEY || !process.env.AMADEUS_API_SECRET) {
        console.log('Amadeus keys missing - mock mode');
        return null;
    }

    try {
        const response = await axios.post('https://test.api.amadeus.com/v20/oauth2/token',
            'grant_type=client_credentials&client_id=' + process.env.AMADEUS_API_KEY + '&client_secret=' + process.env.AMADEUS_API_SECRET,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        accessToken = response.data.access_token;
        accessTokenExpiry = Date.now() + (response.data.expires_in * 1000) - 60000; // 1 min early refresh
        return accessToken;
    } catch (error) {
        console.error('Amadeus token error:', error);
        return null;
    }
}

let accessTokenExpiry = 0;

export async function amadeusFlightSearch(params: {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    max: number;
}) {
    const token = await getAmadeusToken();
    if (!token) {
        // Fallback to mock
        const { FLIGHTS } = await import('../../../data/tourism/flights');
        return FLIGHTS.slice(0, params.max);
    }

    client.defaults.headers.Authorization = `Bearer ${token}`;

    try {
        const response = await client.get(`/shopping/flight-offers`, {
            params: {
                originLocationCode: params.originLocationCode,
                destinationLocationCode: params.destinationLocationCode,
                departureDate: params.departureDate,
                returnDate: params.returnDate,
                adults: params.adults,
                max: params.max,
                currencyCode: 'USD',
            },
        });

        // Transform response to match mock format
        return response.data.data.map((offer: any) => ({
            id: offer.id,
            airline: offer.itineraries[0].segments[0].carrierCode,
            logo: `https://logo.clearbit.com/${offer.itineraries[0].segments[0].carrierCode.toLowerCase()}.com`,
            from: params.originLocationCode,
            to: params.destinationLocationCode,
            departureTime: offer.itineraries[0].segments[0].departure.at.slice(11, 16),
            arrivalTime: offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1].arrival.at.slice(11, 16),
            duration: 'Direct', // simplify
            cabin: 'Economy',
            priceUSD: parseFloat(offer.price.total),
            priceTZS: parseFloat(offer.price.total) * 2700,
        }));
    } catch (error) {
        console.error('Flight search error:', error);
        // Fallback
        const { FLIGHTS } = await import('../../../data/tourism/flights');
        return FLIGHTS.slice(0, params.max);
    }
}

export async function amadeusHotelSearch(params: {
    cityCode: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    max: number;
}) {
    const token = await getAmadeusToken();
    if (!token) {
        // Fallback
        const { HOTELS } = await import('../../../data/tourism/hotels');
        return HOTELS.slice(0, params.max);
    }

    client.defaults.headers.Authorization = `Bearer ${token}`;

    try {
        const response = await client.get('/shopping/hotel-offers', {
            params: {
                cityCode: params.cityCode,
                checkInDate: params.checkInDate,
                checkOutDate: params.checkOutDate,
                adults: params.adults,
                max: params.max,
            },
        });

        // Transform
        return response.data.data.map((offer: any) => ({
            id: offer.hotel.hotelId,
            name: offer.hotel.name,
            images: [offer.hotel.media?.images?.[0]?.url || '/fallback-hotel.jpg'],
            rating: offer.offers[0].rateType === 'GENIUS' ? 4.5 : 4.0,
            category: 'Mid-range',
            priceUSD: parseFloat(offer.offers[0].price.total),
            priceTZS: parseFloat(offer.offers[0].price.total) * 2700,
            description: offer.hotel.description?.body || 'Great location and amenities',
        }));
    } catch (error) {
        console.error('Hotel search error:', error);
        const { HOTELS } = await import('../../../data/tourism/hotels');
        return HOTELS.slice(0, params.max);
    }
}

