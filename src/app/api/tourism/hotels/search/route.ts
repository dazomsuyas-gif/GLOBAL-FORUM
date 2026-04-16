import { NextRequest, NextResponse } from 'next/server';
import { amadeusHotelSearch } from '@/lib/apis/amadeus';

const USD_TO_TZS = 2700;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const params = {
            cityCode: searchParams.get('cityCode') || 'ZNZ',
            checkInDate: searchParams.get('checkInDate') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            checkOutDate: searchParams.get('checkOutDate') || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            adults: parseInt(searchParams.get('adults') || '2'),
            max: parseInt(searchParams.get('max') || '12'),
        };

        const hotels = await amadeusHotelSearch(params);

        // Ensure TZS pricing
        const hotelsWithTZS = hotels.map((hotel: any) => ({
            ...hotel,
            priceTZS: hotel.priceUSD * USD_TO_TZS,
        }));

        return NextResponse.json({
            hotels: hotelsWithTZS,
            usdToTzsRate: USD_TO_TZS,
            searchParams: params,
        });
    } catch (error) {
        console.error('Hotel search API error:', error);
        return NextResponse.json({ error: 'Search failed, showing popular hotels' }, { status: 500 });
    }
}

