"use client";

import { useState, useEffect } from 'react';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';
import { motion } from 'framer-motion';
import { Bed, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import TravelBot from '../../../components/tourism/TravelBot';
import { HOTELS } from '../../../data/tourism/hotels';

const DESTINATIONS = [
    'Zanzibar',
    'Arusha',
    'Dar es Salaam',
    'Moshi',
    'Mwanza',
    'Serengeti'
];

export default function HotelsPage() {
    const [formData, setFormData] = useState({
        destination: 'Zanzibar',
        checkin: '',
        checkout: '',
        guests: 2,
        rooms: 1
    });

    const categories = ['Luxury', 'Mid-range', 'Budget'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-emerald-50">
            <TravelBot />

            {/* Hero Search */}
            <section className="relative py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-rose-500 via-orange-500 to-emerald-500 bg-clip-text text-transparent">
                            Find Perfect Hotels
                        </h1>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Luxury resorts, safari lodges, and budget stays across Tanzania
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50"
                    >
                        <form className="grid md:grid-cols-5 gap-4 items-end">
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                    <Bed className="w-4 h-4" />
                                    <span>Destination</span>
                                </label>
                                <select
                                    value={formData.destination}
                                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                >
                                    {DESTINATIONS.map(dest => (
                                        <option key={dest} value={dest}>{dest}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                    <Calendar className="w-4 h-4" />
                                    <span>Dates</span>
                                </label>
                                <div className="flex space-x-3">
                                    <input
                                        type="date"
                                        value={formData.checkin}
                                        onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
                                        className="flex-1 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                    <input
                                        type="date"
                                        value={formData.checkout}
                                        onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
                                        className="flex-1 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                                    <User className="w-4 h-4" />
                                    <span>Guests / Rooms</span>
                                </label>
                                <div className="flex space-x-3">
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.guests}
                                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                                        className="w-20 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
                                    />
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={formData.rooms}
                                        onChange={(e) => setFormData({ ...formData, rooms: Number(e.target.value) })}
                                        className="flex-1 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500"
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="md:col-span-1 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-rose-500/50 h-fit w-full md:w-auto">
                                🔍 Search Hotels
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Hotels by Category */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-black text-center mb-20 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                        Choose Your Perfect Stay
                    </h2>

                    {['Luxury', 'Mid-range', 'Budget'].map((category) => (
                        <motion.div key={category} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
                            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                                {category} Hotels ({HOTELS.filter(h => h.category === category).length})
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                                {HOTELS.filter(h => h.category === category).map((hotel) => (
                                    <motion.div
                                        key={hotel.id}
                                        whileHover={{ y: -8 }}
                                        className="group bg-gradient-to-b from-white to-slate-50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-200 hover:border-orange-300 transition-all duration-500 cursor-pointer"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <Image
                                                src={hotel.images[0]}
                                                alt={hotel.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${hotel.category === 'Luxury' ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white' :
                                                    hotel.category === 'Mid-range' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' : 'bg-gradient-to-r from-slate-500 to-slate-600 text-white'
                                                    }`}>
                                                    {hotel.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <div className="flex items-center mb-3">
                                                <div className="flex space-x-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-300'}`} viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279L.24 9.306l8.332-1.151z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-slate-600 font-medium">({hotel.rating})</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                {hotel.name}
                                            </h3>
                                            <p className="text-slate-600 mb-4 line-clamp-2">{hotel.description}</p>
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <div className="text-3xl font-black text-emerald-600">
                                                        ${hotel.priceUSD}<span className="text-lg font-normal text-slate-600">/night</span>
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {hotel.priceTZS.toLocaleString()} TZS
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                                                        Free cancellation
                                                    </span>
                                                </div>
                                            </div>
                                            <Link href={`/tourism/hotels/${hotel.id}`}>
                                                <Button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-rose-500/50 transition-all">
                                                    Book Now →
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

