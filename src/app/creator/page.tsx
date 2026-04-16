"use client";
import Link from 'next/link';
import { scripts } from '@/data/scripts';
import { creatorCategories } from '@/data/scripts';
import ScriptCard from '@/components/creator/ScriptCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function CreatorHub() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const filteredScripts = scripts.filter(script =>
        script.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterCategory || script.category === filterCategory)
    );

    const featuredScripts = scripts
        .filter(script => script.isPopular)
        .slice(0, 6);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900">
            {/* Hero */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold bg-[length:200px_200px] opacity-10 animate-pulse"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Creator Hub
                    </motion.h1>

                    <motion.p
                        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        100+ ready-to-record YouTube scripts. Copy, record, publish, profit.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="text-center p-8">
                            <div className="text-5xl font-black text-gold mb-4">100+</div>
                            <div className="text-xl text-white/70">Scripts</div>
                        </div>
                        <div className="text-center p-8">
                            <div className="text-5xl font-black text-gold mb-4">8</div>
                            <div className="text-xl text-white/70">Categories</div>
                        </div>
                        <div className="text-center p-8">
                            <div className="text-5xl font-black text-gold mb-4">10K+</div>
                            <div className="text-xl text-white/70">Downloads</div>
                        </div>
                        <div className="text-center p-8">
                            <div className="text-5xl font-black text-gold mb-4">Free</div>
                            <div className="text-xl text-white/70">Forever</div>
                        </div>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        className="flex flex-col lg:flex-row gap-4 max-w-2xl mx-auto mb-24"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search scripts (e.g., 'richest people', 'Rome')..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-gold/70 focus:bg-white/20 transition-all duration-300 text-lg shadow-xl"
                            />
                        </div>

                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="px-8 py-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white focus:outline-none focus:border-gold/70 focus:bg-white/20 transition-all duration-300 text-lg shadow-xl min-w-[200px]"
                        >
                            <option value="">All Categories</option>
                            {creatorCategories.map(cat => (
                                <option key={cat} value={cat}>{cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
                            ))}
                        </select>
                    </motion.div>

                    <motion.a
                        href="#submit-script"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy font-black text-xl rounded-3xl shadow-2xl hover:shadow-glow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 shadow-gold"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        ✍️ Submit Your Script
                        <span className="text-lg font-normal">(Community Feature Coming Soon)</span>
                    </motion.a>
                </div>
            </section>

            {/* Creator Categories */}
            <section className="py-24 mb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">Script Categories</h2>
                        <p className="text-2xl text-white/70 max-w-2xl mx-auto">
                            Choose your niche and start recording today
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {creatorCategories.map((category, index) => (
                            <Link
                                key={category}
                                href={`/creator/${category}`}
                                className="glass-card p-10 group h-64 flex flex-col items-center justify-center text-center hover:shadow-glow-gold hover:border-gold/50 hover:bg-white/10 transition-all duration-500 rounded-3xl border border-white/10"
                            >
                                <motion.div
                                    className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    {category === 'richest-people' ? '💰' :
                                        category === 'history-empires' ? '👑' :
                                            category === 'science-tech' ? '🔬' :
                                                category === 'nature' ? '🌿' :
                                                    category === 'food-culture' ? '🍲' :
                                                        category === 'health' ? '💊' :
                                                            category === 'wars-geopolitics' ? '⚔️' :
                                                                '📈'}
                                </motion.div>

                                <motion.h3
                                    className="text-2xl lg:text-3xl font-black text-white mb-4 group-hover:text-gold transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </motion.h3>

                                <div className="flex items-center gap-2 text-gold/90 text-lg font-bold">
                                    <div className="w-3 h-3 bg-gold-bright rounded-full animate-ping"></div>
                                    View Scripts
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Scripts */}
            <section className="py-24 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl lg:text-6xl font-black text-gold mb-6">Featured Scripts</h2>
                        <p className="text-2xl text-white/70 max-w-2xl mx-auto">
                            Most popular and trending scripts right now
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredScripts.slice(0, 6).map((script) => (
                            <ScriptCard key={script.id} script={script} />
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link
                            href="/creator?filter=popular"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy font-black text-xl rounded-3xl shadow-2xl hover:shadow-glow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                        >
                            View All Scripts (100+)
                        </Link>
                    </div>
                </div>
            </section>

            <section id="submit-script" className="py-24">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
                        Want to Contribute?
                    </h2>
                    <p className="text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
                        Share your scripts with the Global Forum community. Top contributors get featured badges and priority downloads.
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div className="glass-card p-8" whileHover={{ y: -8 }}>
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Write Scripts</h3>
                            <p className="text-white/70">Submit YouTube scripts (2k+ words)</p>
                        </motion.div>
                        <motion.div className="glass-card p-8" whileHover={{ y: -8 }}>
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Get Featured</h3>
                            <p className="text-white/70">Top scripts get homepage placement</p>
                        </motion.div>
                        <motion.div className="glass-card p-8" whileHover={{ y: -8 }}>
                            <div className="text-4xl mb-4">🎖️</div>
                            <h3 className="text-2xl font-bold text-white mb-4">Earn Rewards</h3>
                            <p className="text-white/70">Badges, credits, and recognition</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}

