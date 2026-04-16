"use client";
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { articles } from '@/data/articles';
import Image from 'next/image';
import Link from 'next/link';
import ArticleCard from '@/components/knowledge/ArticleCard';
import { motion } from 'framer-motion';
import { motion as framerMotion } from 'framer-motion';
import { useState } from 'react';

interface CategoryPageProps {
    params: {
        category: string;
    };
    searchParams: {
        page?: string;
        sort?: string;
    };
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const categorySlug = params.category;
    const category = categories.find(c => c.slug === categorySlug);

    if (!category) {
        notFound();
    }

    const page = parseInt(searchParams.page || '1');
    const sortBy = searchParams.sort || 'date';
    const articlesPerPage = 10;

    const categoryArticles = articles.filter(article => article.category === categorySlug);

    // Sort articles
    const sortedArticles = [...categoryArticles].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
            case 'oldest':
                return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
            case 'popular':
                return b.views - a.views;
            default:
                return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        }
    });

    const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
    const paginatedArticles = sortedArticles.slice(
        (page - 1) * articlesPerPage,
        page * articlesPerPage
    );

    return (
        <div className="min-h-screen">
            {/* Category Hero */}
            <section
                className="relative py-32 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${category.color}10 0%, transparent 50%, ${category.color}20 100%)`
                }}
            >
                <div className="absolute inset-0 bg-grid-pattern bg-[length:100px_100px] opacity-20"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                            <span className="text-2xl">{category.icon}</span>
                            <span className="text-xl font-bold text-white uppercase tracking-wide">{category.name}</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6">
                            Knowledge Hub
                        </h1>

                        <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-12">
                            {category.articleCount.toLocaleString()} articles about {category.name.toLowerCase()}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-16 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-12">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2 items-center">
                                <span className="text-white/70 font-mono text-sm uppercase tracking-wider">Page {page} of {totalPages}</span>
                            </div>
                            <span className="text-gold font-bold text-xl">{paginatedArticles.length} articles</span>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <Link
                                href={`/knowledge/${category.slug}?page=${Math.max(page - 1, 1)}`}
                                className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white font-medium"
                            >
                                ← Previous
                            </Link>

                            <Link
                                href={`/knowledge/${category.slug}?page=${Math.min(page + 1, totalPages)}`}
                                className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-white font-medium"
                            >
                                Next →
                            </Link>

                            <select
                                defaultValue="date"
                                className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold"
                            >
                                <option value="newest">Newest First</option>
                                <option value="oldest">Oldest First</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ArticleCard article={article} />
                            </motion.div>
                        ))}
                    </div>

                    {/* No articles message */}
                    {paginatedArticles.length === 0 && (
                        <div className="text-center py-32">
                            <div className="text-6xl mb-8">📭</div>
                            <h3 className="text-3xl font-bold text-white mb-4">No articles found</h3>
                            <p className="text-xl text-white/60 mb-8">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

