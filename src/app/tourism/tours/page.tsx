"use client";

import { motion } from 'framer-motion';
import { Map, Calendar, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import TravelBot from '../../../components/tourism/TravelBot';
import { TOURS } from '../../../data/tourism/tours';

export default function ToursPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-emerald-50">
            <TravelBot />

            {/* Hero */}
            <section className="relative py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600">
                <div className="max-w-6xl mx-auto px-4 text-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl"
                    >
                        Safari & Adventure Tours
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto drop-shadow-lg"
                    >
                        Epic wildlife safaris, Kilimanjaro climbs, Zanzibar beaches, and cultural adventures
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                        <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 font-bold shadow-xl">
                            <Link href="/tourism/tours/1">
                                Popular: Serengeti Safari →
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-600">
                            View All Tours
                        </Button>
                    </div>
                </div>
            </section>

            {/* Tour Packages */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-center mb-20 bg-gradient-to-r from-slate-900 via-indigo-900 to-emerald-700 bg-clip-text text-transparent"
                    >
                        Featured Tour Packages
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TOURS.slice(0, 6).map((tour, index) => (
                            <motion.div
                                key={tour.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -12 }}
                                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-slate-200 hover:border-indigo-300 transition-all duration-500 cursor-pointer hover:-translate-y-2"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={tour.images[0]}
                                        alt={tour.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-800 shadow-lg">
                                            {tour.duration}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </div>

                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                        {tour.title}
                                    </h3>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>{tour.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Users className="w-4 h-4" />
                                            <span>Group tours available</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm text-slate-600">
                                            <Map className="w-4 h-4" />
                                            <span>Multiple departures weekly</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <div className="text-4xl font-black text-emerald-600 mb-1">
                                                ${tour.priceUSD}
                                            </div>
                                            <div className="text-lg text-emerald-600 font-semibold">
                                                {tour.priceTZS.toLocaleString()} TZS
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium">
                                            <DollarSign className="w-4 h-4" />
                                            <span>Per person</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                        {tour.highlights.slice(0, 4).map((highlight, i) => (
                                            <div key={i} className="flex items-center space-x-2 text-sm text-slate-600">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                                <span>{highlight}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={`/tourism/tours/${tour.id}`}>
                                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-indigo-500/50 transition-all">
                                            View Details & Book →
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-center mt-20"
                    >
                        <Button asChild size="lg" variant="outline" className="text-xl px-16 py-8 border-2 border-slate-300 hover:border-indigo-400">
                            <Link href="/tourism/tours">
                                View All Tours (20+)
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

