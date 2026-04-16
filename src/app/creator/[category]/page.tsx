"use client";
import Link from 'next/link';
import { scripts } from '@/data/scripts';
import ScriptCard from '@/components/creator/ScriptCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { motion as framerMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
    params: {
        category: string;
    };
    searchParams: {
        page?: string;
        sort?: string;
        search?: string;
    };
}

const categoryData = {
    'richest-people': {
        name: 'Richest People',
        description: 'Billionaire biographies, wealth insights, success stories',
        color: '#C9A84C'
    },
    'history-empires': {
        name: 'History & Empires',
        description: 'Ancient civilizations, world leaders, empire rise and fall',
        color: '#E63946'
    },
    'science-tech': {
        name: 'Science & Tech',
        description: 'Technology breakthroughs, scientific discoveries, future trends',
        color: '#00b4d8'
    },
    'nature': {
        name: 'Nature',
        description: 'Wildlife, conservation, natural wonders, climate change',
        color: '#40916c'
    },
    'food-culture': {
        name: 'Food & Culture',
        description: 'World cuisines, cultural traditions, food history',
        color: '#e76f51'
    },
    'health': {
        name: 'Health',
        description: 'Wellness, medicine, nutrition, mental health',
        color: '#4cc9f0'
    },
    'wars-geopolitics': {
        name: 'Wars & Geopolitics',
        description: 'Military history, global conflicts, international relations',
        color: '#6d6875'
    },
    'economy': {
        name: 'Economy',
        description: 'Financial markets, economic systems, global trade',
        color: '#2a9d8f'
    }
};

export default function CreatorCategoryPage({ params, searchParams }: CategoryPageProps) {
    const categorySlug = params.category;
    const category = categoryData[categorySlug as keyof typeof categoryData];

    if (!category) {
        return <div>Category not found</div>;
    }

    const page = parseInt(searchParams.page || '1');
    const sortBy = searchParams.sort || 'newest';
    const searchTerm = searchParams.search || '';
    const scriptsPerPage = 9;

    const categoryScripts = scripts.filter(script => script.category === categorySlug);

    // Sort scripts
    const sortedScripts = [...categoryScripts].sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
            case 'popular':
                return b.downloadCount - a.downloadCount;
            case 'shortest':
                return a.wordCount - b.wordCount;
            case 'longest':
                return b.wordCount - a.wordCount;
            default:
                return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        }
    });

    // Filter by search
    const filteredScripts = sortedScripts.filter(script =>
        script.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredScripts.length / scriptsPerPage);
    const paginatedScripts = filteredScripts.slice(
        (page - 1) * scriptsPerPage,
        page * scriptsPerPage
    );

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900">
            {/* Category Hero */}
            <section
                className="relative py-32 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${category.color}20 0%, ${category.color}10 50%, transparent 100%)`
                }}
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div
                        className="flex items-center gap-4 mb-8"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            href="/creator"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/20 transition-all text-white font-medium"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Hub
                        </Link>
                    </motion.div>

                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 mb-8">
                            <span className="text-4xl">{categorySlug === 'richest-people' ? '💰' : '📽️'}</span>
                            <span className="text-2xl font-bold uppercase tracking-wide">{category.name}</span>
                            <span className="px-4 py-1 bg-gold/30 text-gold font-bold rounded-full text-sm">
                                {categoryScripts.length} scripts
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6">
                            Script Library
                        </h1>

                        <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto mb-16">
                            {category.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters */}
            <section className="py-16 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-16">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search scripts in this category..."
                                    className="w-full pl-14 pr-6 py-4 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-gold/70 focus:bg-white/20 transition-all duration-300 text-lg"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <select className="px-6 py-4 rounded-3xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-gold/70 text-lg">
                                <option>Newest First</option>
                                <option>Most Popular</option>
                                <option>Shortest First</option>
                                <option>Longest First</option>
                            </select>

                            <div className="flex items-center gap-2 text-sm text-white/60">
                                Page {page} of {totalPages}
                            </div>
                        </div>
                    </div>

                    {/* Scripts Grid */}
                    {paginatedScripts.length === 0 ? (
                        <div className="text-center py-32">
                            <div className="text-8xl mb-8">📜</div>
                            <h3 className="text-4xl font-bold text-white mb-6">No scripts found</h3>
                            <p className="text-xl text-white/60 mb-12">Try adjusting your search or sort options</p>
                            <Link
                                href="/creator"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy font-bold text-xl rounded-3xl shadow-2xl hover:shadow-glow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                            >
                                ← Browse All Scripts
                            </Link>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                            {paginatedScripts.map((script, index) => (
                                <motion.div
                                    key={script.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <ScriptCard script={script} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap gap-3 justify-center items-center mt-20 text-white/70">
                            <Link
                                href={`/creator/${categorySlug}?page=${Math.max(page - 1, 1)}`}
                                className={`px-6 py-3 rounded-2xl font-bold transition-all ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:text-white'}`}
                            >
                                ← Previous
                            </Link>

                            {getPageNumbers().map(p => (
                                <Link
                                    key={p}
                                    href={`/creator/${categorySlug}?page=${p}`}
                                    className={`px-4 py-3 rounded-xl font-bold transition-all min-w-[44px] text-center ${p === page
                                            ? 'bg-gold text-navy shadow-glow-gold'
                                            : 'hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {p}
                                </Link>
                            ))}

                            <Link
                                href={`/creator/${categorySlug}?page=${Math.min(page + 1, totalPages)}`}
                                className={`px-6 py-3 rounded-2xl font-bold transition-all ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:text-white'}`}
                            >
                                Next →
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

function getPageNumbers() {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, page + 2);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return pages;
}

