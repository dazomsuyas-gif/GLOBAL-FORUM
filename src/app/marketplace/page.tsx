"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, TrendingUp, Crown, ShoppingCart, MapPin } from 'lucide-react';
import Link from 'next/link';
import { products, categories, sellers } from '@/data/marketplaceData';
import ProductCard from '@/components/marketplace/ProductCard';
import PricePrediction from '@/components/marketplace/PricePrediction';
import WhatsAppMarketplaceBot from '@/components/marketplace/WhatsAppMarketplaceBot';

"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, TrendingUp, Crown, ShoppingCart, MapPin, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { products, categories } from '@/data/marketplaceData';

export default function MarketplaceHome() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceRange, setPriceRange] = useState([0, 5000000]);
    const [sortBy, setSortBy] = useState('trending');

    // Mock promoted products (paid $2-$3)
    const promotedProducts = products.filter(p => p.isPromoted);
    const featuredProducts = products.filter(p => p.isFeatured);
    const trendingProducts = products.filter(p => p.isTrending || p.salesCount > 50);
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        const matchesPrice = p.priceLocal >= priceRange[0] && p.priceLocal <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
        if (sortBy === 'trending') return b.salesCount - a.salesCount;
        if (sortBy === 'newest') return 0; // mock
        if (sortBy === 'price-low') return a.priceLocal - b.priceLocal;
        return b.priceLocal - a.priceLocal;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950">
            {/* Hero */}
            <section className="relative py-32 lg:py-48 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.1),transparent_50%)]" />
                <motion.div className="relative z-10 max-w-7xl mx-auto px-6">
                    <h1 className="text-7xl lg:text-9xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 bg-clip-text text-transparent mb-8">
                        Global Marketplace
                    </h1>
                    <p className="text-3xl lg:text-4xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Buy & sell worldwide. Local prices in TZS + International prices in USD/EUR/GBP.
                        15+ payment methods including Amazon Pay & Nala Money.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto relative">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-8 h-8 text-white/50" />
                        <input
                            type="text"
                            placeholder="Search electronics, fashion, food, phones..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-20 pr-16 py-8 bg-white/5 backdrop-blur-xl border border-white/20 rounded-4xl text-2xl text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-all font-semibold shadow-2xl"
                        />
                        <motion.button
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-3xl shadow-lg hover:shadow-emerald-500/50 transition-all"
                            whileHover={{ scale: 1.1 }}
                        >
                            <ShoppingCart className="w-7 h-7" />
                        </motion.button>
                    </div>
                </motion.div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
                <motion.div className="mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-6 mb-12">
                        <div className="w-3 h-16 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-2xl" />
                        <h2 className="text-5xl font-black text-white">Categories</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/marketplace/products?category=${category.toLowerCase().replace('&', '').replace(' ', '-')}`}
                                className="glass-premium group p-8 rounded-4xl hover:shadow-glow-emerald hover:scale-105 transition-all cursor-pointer border-2 border-transparent hover:border-emerald-400/50 text-center"
                            >
                                <div className="text-5xl mb-6">{getCategoryIcon(category)}</div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{category}</h3>
                                <p className="text-white/60 text-sm uppercase tracking-wide font-bold mt-2">Shop Now</p>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Promoted Products */}
            {promotedProducts.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-6 mb-16">
                            <div className="w-3 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-2xl" />
                            <h2 className="text-5xl font-black text-white flex items-center gap-4">
                                <Crown className="w-16 h-16 text-yellow-400 shadow-2xl" />
                                Promoted Products
                            </h2>
                            <div className="ml-auto text-white/60 text-sm font-bold uppercase tracking-wide">
                                Paid Promotion ($2-$3)
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {promotedProducts.slice(0, 8).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* Featured Carousel */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-6 mb-16">
                        <div className="w-3 h-16 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-2xl" />
                        <h2 className="text-5xl font-black text-white">Featured Products</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {featuredProducts.slice(0, 12).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Trending */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-6 mb-16">
                        <div className="w-3 h-16 bg-gradient-to-b from-orange-400 to-red-500 rounded-2xl" />
                        <h2 className="text-5xl font-black text-white flex items-center gap-4">
                            <TrendingUp className="w-16 h-16 text-orange-400 shadow-2xl animate-pulse" />
                            Trending Now
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {trendingProducts.slice(0, 12).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* WhatsApp Bot */}
            <WhatsAppMarketplaceBot />

            {/* Filters Sidebar (for desktop) */}
            <motion.div
                className="lg:block hidden fixed right-8 top-32 w-80 h-fit"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="glass-card p-8 rounded-4xl shadow-2xl border border-white/10 sticky top-40">
                    <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                        <Filter className="w-10 h-10 text-emerald-400" />
                        Filters
                    </h3>

                    {/* Category Filter */}
                    <div className="mb-12">
                        <label className="block text-lg font-bold text-white mb-6">Category</label>
                        <div className="space-y-3">
                            {categories.map(cat => (
                                <motion.button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`w-full p-4 rounded-2xl font-bold transition-all flex items-center gap-3 ${categoryFilter === cat
                                        ? 'bg-emerald-500 text-white shadow-emerald-500/50'
                                        : 'bg-white/10 hover:bg-white/20 text-white/70 border border-white/20'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {getCategoryIcon(cat)}
                                    {cat}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-12">
                        <label className="block text-lg font-bold text-white mb-6">Price Range (TZS)</label>
                        <div className="space-y-3">
                            <motion.button
                                onClick={() => setPriceRange([0, 100000])}
                                className={`w-full p-4 rounded-2xl font-bold transition-all ${priceRange[1] === 100000 ? 'bg-emerald-500 text-white shadow-emerald-500/50' : 'bg-white/10 hover:bg-white/20 text-white/70 border border-white/20'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                0 - 100K
                            </motion.button>
                            <motion.button
                                onClick={() => setPriceRange([100000, 500000])}
                                className={`w-full p-4 rounded-2xl font-bold transition-all ${priceRange[1] === 500000 ? 'bg-emerald-500 text-white shadow-emerald-500/50' : 'bg-white/10 hover:bg-white/20 text-white/70 border border-white/20'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                100K - 500K
                            </motion.button>
                            <motion.button
                                onClick={() => setPriceRange([500000, 5000000])}
                                className={`w-full p-4 rounded-2xl font-bold transition-all ${priceRange[1] === 5000000 ? 'bg-emerald-500 text-white shadow-emerald-500/50' : 'bg-white/10 hover:bg-white/20 text-white/70 border border-white/20'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                            >
                                500K+
                            </motion.button>
                        </div>
                    </div>

                    {/* Sort */}
                    <div>
                        <label className="block text-lg font-bold text-white mb-6">Sort By</label>
                        <div className="space-y-3">
                            {['trending', 'newest', 'price-low', 'price-high'].map(option => (
                                <motion.button
                                    key={option}
                                    onClick={() => setSortBy(option)}
                                    className={`w-full p-4 rounded-2xl font-bold transition-all flex items-center gap-3 ${sortBy === option
                                        ? 'bg-emerald-500 text-white shadow-emerald-500/50'
                                        : 'bg-white/10 hover:bg-white/20 text-white/70 border border-white/20'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {option === 'trending' && 'Most Popular'}
                                    {option === 'newest' && 'Newest'}
                                    {option === 'price-low' && 'Price: Low-High'}
                                    {option === 'price-high' && 'Price: High-Low'}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Helper function
function getCategoryIcon(category: string) {
    const icons: Record<string, string> = {
        'Electronics': '⚡',
        'Fashion': '👕',
        'Food & Groceries': '🍎',
        'Phones & Accessories': '📱',
        'Audio': '🎵',
        'Cameras': '📸',
        'Local Products': '🛍️',
        'Trending': '🔥'
    };
    return icons[category] || '🛒';
}

