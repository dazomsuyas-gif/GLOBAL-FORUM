import type { Flight } from '../../types/tourism';

export const FLIGHTS: Flight[] = [
    {
        id: '1',
        airline: 'Kenya Airways',
        logo: 'https://logo.clearbit.com/kenya-airways.com',
        from: 'DAR (Dar es Salaam)',
        to: 'DXB (Dubai)',
        departureTime: '08:00',
        arrivalTime: '14:30',
        duration: '4h 30m',
        priceUSD: 320,
        priceTZS: 850000,
        cabin: 'Economy'
    },
    {
        id: '2',
        airline: 'Ethiopian Airlines',
        logo: 'https://logo.clearbit.com/ethiopianairlines.com',
        from: 'JRO (Kilimanjaro)',
        to: 'NBO (Nairobi)',
        departureTime: '10:15',
        arrivalTime: '11:00',
        duration: '0h 45m',
        priceUSD: 85,
        priceTZS: 225000,
        cabin: 'Economy'
    },
    {
        id: '3',
        airline: 'Qatar Airways',
        logo: 'https://logo.clearbit.com/qatarairways.com',
        from: 'ZNZ (Zanzibar)',
        to: 'DOH (Doha)',
        departureTime: '02:30',
        arrivalTime: '07:45',
        duration: '5h 15m',
        priceUSD: 450,
        priceTZS: 1194000,
        cabin: 'Business'
    },
    {
        id: '4',
        airline: 'Emirates',
        logo: 'https://logo.clearbit.com/emirates.com',
        from: 'DAR (Dar es Salaam)',
        to: 'LHR (London)',
        departureTime: '01:45',
        arrivalTime: '09:20',
        duration: '9h 35m',
        priceUSD: 780,
        priceTZS: 2070000,
        cabin: 'Economy'
    },
    {
        id: '5',
        airline: 'Turkish Airlines',
        logo: 'https://logo.clearbit.com/turkishairlines.com',
        from: 'JRO (Kilimanjaro)',
        to: 'IST (Istanbul)',
        departureTime: '05:20',
        arrivalTime: '12:10',
        duration: '7h 50m',
        priceUSD: 620,
        priceTZS: 1646000,
        cabin: 'Economy'
    },
    {
        id: '6',
        airline: 'Precision Air',
        logo: 'https://logo.clearbit.com/precisionairtz.com',
        from: 'ARK (Arusha)',
        to: 'ZNZ (Zanzibar)',
        departureTime: '13:00',
        arrivalTime: '14:20',
        duration: '1h 20m',
        priceUSD: 120,
        priceTZS: 318000,
        cabin: 'Economy'
    }
];
