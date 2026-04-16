"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plane, Calendar, User, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import TravelBot from '../../../components/tourism/TravelBot';
import { FLIGHTS } from '../../../data/tourism/flights';
import { OWNER_INFO } from '../../../data/constants';

const AIRPORTS = {
    from: [
        { code: 'DAR', name: 'Dar es Salaam' },
        { code: 'ZNZ', name: 'Zanzibar' },
        { code: 'JRO', name: 'Kilimanjaro' },
        { code: 'ARK', name: 'Arusha' }
    ],
    to: [
        { code: 'DXB', name: 'Dubai' },
        { code: 'LHR', name: 'London' },
        { code: 'JFK', name: 'New York' },
        { code: 'PEK', name: 'Beijing' },
        { code: 'NBO', name: 'Nairobi' },
        { code: 'JNB', name: 'Johannesburg' },
        { code: 'IST', name: 'Istanbul' },
        { code: 'DOH', name: 'Doha' }
    ]
};

const CABIN_CLASSES = ['Economy', 'Business', 'First'];

export default function FlightsPage() {
    const [formData, setFormData] = useState({
        from: 'DAR',
        to: 'DXB',
        departure: '',
        return: '',
        passengers: 1,
        cabin: 'Economy'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Search logic here
    };

    const tzsRate = 2650; // USD to TZS

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
            <TravelBot />

            {/* Hero Search */}
            <section className="relative py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-center mb-12 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent"
                    >
                        Book Flights
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50"
                    >
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-4 items-end">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                    <MapPin className="w-4 h-4" />
                                    <span>From</span>
                                </label>
                                <select
                                    value={formData.from}
                                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {AIRPORTS.from.map(airport => (
                                        <option key={airport.code} value={airport.code}>
                                            {airport.name} ({airport.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                    <MapPin className="w-4 h-4" />
                                    <span>To</span>
                                </label>
                                <select
                                    value={formData.to}
                                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    {AIRPORTS.to.map(airport => (
                                        <option key={airport.code} value={airport.code}>
                                            {airport.name} ({airport.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                    <Calendar className="w-4 h-4" />
                                    <span>Departure</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.departure}
                                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                    <Calendar className="w-4 h-4" />
                                    <span>Return</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.return}
                                    onChange={(e) => setFormData({ ...formData, return: e.target.value })}
                                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-1">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 md:block">
                                    <User className="w-4 h-4 md:hidden" />
                                    <span className="md:block md:mt-1 md:text-left">Passengers / Cabin</span>
                                </label>
                                <div className="flex space-x-2 md:block md:space-x-0 md:space-y-2">
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.passengers}
                                        onChange={(e) => setFormData({ ...formData, passengers: Number(e.target.value) })}
                                        className="flex-1 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <select
                                        value={formData.cabin}
                                        onChange={(e) => setFormData({ ...formData, cabin: e.target.value })}
                                        className="flex-1 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent md:w-full"
                                    >
                                        {CABIN_CLASSES.map(cabin => (
                                            <option key={cabin} value={cabin}>
                                                {cabin}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <Button type="submit" className="md:col-span-5 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-blue-500/50 h-fit w-full md:w-auto">
                                <Search className="mr-2 h-5 w-5" />
                                Search Flights
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* AI Price Prediction */}
            <section className="py-12 bg-gradient-to-r from-blue-50 to-emerald-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                AI Price Prediction
                            </h3>
                            <p className="text-lg text-slate-600">
                                <span className="font-bold text-green-600 text-xl">📉 23% lower</span> than average.
                                Best time to book: 2 months in advance. Current prices are optimal!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flight Results */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 mb-2">
                                Available Flights
                            </h2>
                            <p className="text-xl text-slate-600">
                                16 flights found • Best prices first
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <button className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors">
                                Price: Low-High
                            </button>
                            <button className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors">
                                Departure: Earliest
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {FLIGHTS.map((flight) => (
                            <motion.div
                                key={flight.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl p-6 border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                                            <img
                                                src={flight.logo}
                                                alt={flight.airline}
                                                className="w-12 h-12 rounded-lg"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + flight.airline.replace(/ /g, '+') + '&background=4285f4&color=fff&size=128&bold=true';
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-slate-900">{flight.airline}</h3>
                                            <p className="text-slate-500">{flight.cabin}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-black text-emerald-600 mb-1">
                                            ${flight.priceUSD.toLocaleString()}
                                        </div>
                                        <div className="text-slate-500 text-sm">
                                            {flight.priceTZS.toLocaleString()} TZS
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8 items-center mb-6 p-6 bg-slate-50 rounded-2xl">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">{flight.from}</div>
                                        <div className="text-sm text-slate-500 mb-4">{flight.departureTime}</div>
                                        <div className="mx-auto w-24 h-px bg-slate-300" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-slate-700">{flight.duration}</div>
                                        <div className="text-sm text-slate-500 flex items-center justify-center space-x-1">
                                            <Plane className="w-4 h-4" />
                                            <span>Direct</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">{flight.to}</div>
                                        <div className="text-sm text-slate-500">{flight.arrivalTime}</div>
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <Button asChild size="lg" className="flex-1">
                                        <Link href="/tourism/flights/select" className="w-full">
                                            Select Flight →
                                        </Link>
                                    </Button>
                                    <Button variant="outline" size="lg" className="px-6">
                                        Details
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

