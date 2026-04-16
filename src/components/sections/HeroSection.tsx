"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Typed from 'react-typed';
import Link from 'next/link';

const taglines = [
    "Learn 6 Languages",
    "Read 20+ Stories",
    "Join Global Community",
    "Shop Marketplace"
];

export default function HeroSection() {
    const [currentTagline, setCurrentTagline] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagline((currentTagline + 1) % taglines.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [currentTagline]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy via-slate-900 to-purple-900">
            {/* Floating Orbs */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-gold to-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                <div className="absolute top-1/4 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-1000"></div>
                <div className="absolute bottom-1/4 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <motion.div
                className="relative z-10 text-center max-w-7xl mx-auto px-6"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
                {/* Title */}
                <motion.h1
                    className="text-7xl md:text-[9rem] lg:text-[12rem] xl:text-[15rem] font-black leading-none mb-12 tracking-[-0.05em]"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        times: [0, 0.5, 1]
                    }}
                >
                    <motion.span
                        className="bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent pb-8 block drop-shadow-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        GLOBAL
                    </motion.span>
                    <motion.span
                        className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        FORUM
                    </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                    className="text-3xl md:text-5xl lg:text-6xl font-light text-white/90 mb-8 tracking-wide uppercase"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                >
                    Knowledge Without Borders
                </motion.h2>

                {/* Typed Tagline */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    <Typed
                        className="text-2xl md:text-4xl lg:text-5xl font-mono text-gold tracking-wide"
                        strings={taglines}
                        typeSpeed={60}
                        backSpeed={40}
                        backDelay={2000}
                        loop
                    />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                >
                    <Link
                        href="/languages"
                        className="btn-gold px-12 py-6 text-xl font-bold shadow-2xl group relative overflow-hidden transform-gpu"
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Explore Languages →</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                    </Link>

                    <Link
                        href="/community"
                        className="btn-glass px-12 py-6 text-xl font-bold border-2 border-white/30"
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join Community →
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="animate-bounce"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                >
                    <div className="flex flex-col items-center space-y-2">
                        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
                        <span className="text-white/60 text-sm font-mono uppercase tracking-widest rotate-[-90deg] origin-center">
                            scroll
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

