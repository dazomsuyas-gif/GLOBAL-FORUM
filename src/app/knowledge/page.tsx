"use client";
import Link from 'next/link';
import { categories } from '@/data/categories';
import { articles } from '@/data/articles';
import ArticleCard from '@/components/knowledge/ArticleCard';
import CategoryCard from '@/components/knowledge/CategoryCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function KnowledgeHub() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('views');

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const featuredArticles = articles
        .sort((a, b) => b.views - a.views)
        .slice(0, 6);

    const latestArticles = articles
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        .slice(0, 6);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative py-32 bg-gradient-to-br from-gold to-yellow-500">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Knowledge Hub
                    </motion.h1>
                    <motion.p
                        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        250+ articles across 14 categories. Learn from the world's best content.
                    </motion.p>

                    <motion.div
                        className="flex flex-col lg:flex-row gap-4 justify-center max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-gold transition-all duration-300 text-lg"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-6 py-4 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white focus:outline-none focus:border-gold transition-all duration-300 text-lg"
                        >
                            <option value="views">Most Popular</option>
                            <option value="date">Latest</option>
                            <option value="likes">Most Liked</option>
                        </select>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-5xl font-black text-white mb-6">14 Categories</h2>
                        <p className="text-xl text-white/70">Dive into specialized knowledge hubs</p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredCategories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="py-24 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-gold mb-6">Featured Articles</h2>
                        <p className="text-xl text-white/70">Most popular reads this week</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Articles */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black text-white mb-6">Latest Articles</h2>
                        <p className="text-xl text-white/70">Fresh content just published</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

