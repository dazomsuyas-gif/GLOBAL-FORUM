import { NextRequest, NextResponse } from 'next/server';
import { amadeusFlightSearch } from '@/lib/apis/amadeus';

const USD_TO_TZS = 2700;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const params = {
            originLocationCode: searchParams.get('from') || 'DAR',
            destinationLocationCode: searchParams.get('to') || 'DXB',
            departureDate: searchParams.get('departureDate') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            returnDate: searchParams.get('returnDate') || '',
            adults: parseInt(searchParams.get('adults') || '1'),
            max: parseInt(searchParams.get('max') || '12'),
        };

        const flights = await amadeusFlightSearch(params);

        // Ensure TZS pricing
        const flightsWithTZS = flights.map((flight: any) => ({
            ...flight,
            priceTZS: flight.priceUSD * USD_TO_TZS,
        }));

        return NextResponse.json({
            flights: flightsWithTZS,
            usdToTzsRate: USD_TO_TZS,
            searchParams: params,
        });
    } catch (error) {
        console.error('Flight search API error:', error);
        return NextResponse.json({ error: 'Search failed, showing popular flights' }, { status: 500 });
    }
}

