"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../components/ui/button';
import TravelBot from '../../components/tourism/TravelBot';
import { DESTINATION_IMAGES } from '../../data/tourism/destinations';

const destinations = [
    {
        name: 'Zanzibar',
        description: 'Tropical beaches, Stone Town UNESCO site, spice tours',
        image: DESTINATION_IMAGES.zanzibar
    },
    {
        name: 'Serengeti',
        description: 'Great wildebeest migration, Big 5 safaris',
        image: DESTINATION_IMAGES.serengeti
    },
    {
        name: 'Kilimanjaro',
        description: 'Africa\'s highest peak, climbing expeditions',
        image: DESTINATION_IMAGES.kilimanjaro
    },
    {
        name: 'Ngorongoro Crater',
        description: 'World\'s largest intact volcanic crater, wildlife haven',
        image: DESTINATION_IMAGES.ngorongoro
    },
    {
        name: 'Arusha',
        description: 'Safari capital, gateway to northern parks',
        image: DESTINATION_IMAGES.arusha
    },
    {
        name: 'Mafia Island',
        description: 'Marine park, world-class diving, whale sharks',
        image: DESTINATION_IMAGES.mafia
    }
];

const travelTips = [
    {
        title: 'Best Time to Visit',
        description: 'June-October (safari dry season), July-March (Zanzibar beaches)'
    },
    {
        title: 'What to Pack',
        description: 'Light clothes, safari jacket, sunscreen, insect repellent, binoculars'
    },
    {
        title: 'Health Requirements',
        description: 'Yellow Fever vaccine recommended for most countries'
    },
    {
        title: 'Currency',
        description: 'Tanzanian Shilling (TZS). USD accepted at hotels/safaris'
    },
    {
        title: 'Language',
        description: 'Swahili official, English widely spoken in tourism areas'
    }
];

export default function TourismPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/tanzania-hero.mp4" type="video/mp4" />
                        <img src="https://picsum.photos/1920/1080?random=100" className="w-full h-full object-cover" alt="Tanzania Hero" />
                    </video>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl"
                    >
                        Discover Tanzania
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl mb-12 max-w-2xl leading-relaxed"
                    >
                        Africa&apos;s Premier Destination – Book flights, hotels, tours, and get visa assistance with AI support
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                    >
                        <Button asChild size="lg" className="group">
                            <Link href="/tourism/flights">
                                ✈️ Book Flights
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/tourism/tours">
                                🗺️ Tour Packages
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="/tourism/hotels">
                                🏨 Find Hotels
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost">
                            <Link href="/tourism/visa">
                                🛂 Visa Assistance
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Featured Destinations */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                            Featured Destinations
                        </h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                            Tanzania offers world-class wildlife, beaches, mountains and culture
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((destination, index) => (
                            <motion.div
                                key={destination.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-500"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={destination.image}
                                        alt={destination.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {destination.name}
                                        </h3>
                                        <p className="text-slate-200 leading-relaxed">
                                            {destination.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Travel Tips */}
            <section className="py-24 bg-gradient-to-r from-emerald-50 to-orange-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-center mb-20 bg-gradient-to-r from-emerald-700 to-orange-600 bg-clip-text text-transparent"
                    >
                        Essential Travel Tips
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {travelTips.map((tip, index) => (
                            <motion.div
                                key={tip.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:bg-white"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl font-bold text-white">✓</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors">
                                    {tip.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {tip.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <TravelBot />
        </div>
    );
}
