"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
    const stats = [
        { number: '250+', label: 'Knowledge Articles' },
        { number: '6', label: 'Languages' },
        { number: '15+', label: 'Payment Methods' },
        { number: '50+', label: 'Countries Served' },
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-pulse"></div>
                <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="relative z-10 text-center max-w-7xl mx-8 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight leading-none mb-8"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="bg-gradient-to-r from-gold via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
                            GLOBAL
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">
                            FORUM
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed px-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Knowledge Without Borders. Learn. Connect. Succeed.
                    </motion.p>

                    <motion.div
                        className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <motion.button
                            className="btn-gold px-12 py-6 text-xl font-bold shadow-2xl group relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Join Free</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.button>

                        <motion.button
                            className="btn-glass px-12 py-6 text-xl font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Watch Demo
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ staggerChildren: 0.2, delay: 1.2 }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="glass-card group cursor-default"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gold to-yellow-500 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-all duration-300">
                                    {stat.number}
                                </div>
                                <p className="text-white/80 text-sm md:text-base font-medium uppercase tracking-wide">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

