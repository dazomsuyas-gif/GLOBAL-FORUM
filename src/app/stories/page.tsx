"use client";
import Link from 'next/link';
import { stories } from '@/data/stories';
import StoryCard from '@/components/stories/StoryCard';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search } from 'lucide-react';

const genres = [
    { id: 'all', name: 'All Stories', icon: '📚' },
    { id: 'romance', name: 'Romance 💕', icon: '💕' },
    { id: 'horror', name: 'Horror 😱', icon: '😱' },
    { id: 'life', name: 'Life & Drama 🌍', icon: '🌍' },
    { id: 'adventure', name: 'Adventure 🗺️', icon: '🗺️' },
    { id: 'mystery', name: 'Mystery 🔍', icon: '🔍' },
];

export default function StoriesPage() {
    const [activeGenre, setActiveGenre] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const filteredStories = stories.filter(story => {
        const matchesGenre = activeGenre === 'all' || story.genre === activeGenre;
        const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.author.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesGenre && matchesSearch;
    }).sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
            case 'popular':
                return b.views - a.views;
            case 'read':
                return b.likes - a.likes;
            case 'rated':
                return b.likes / b.views - a.likes / a.views;
            default:
                return 0;
        }
    });

    const featuredStories = stories.filter(s => s.isFeatured).slice(0, 3);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 relative overflow-hidden">
            {/* Hero */}
            <section className="relative py-32">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-purple-900/10 to-slate-900/20" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Story World
                    </motion.h1>

                    <motion.p
                        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        20+ original stories across 5 captivating genres. Get lost in worlds of romance, horror, drama, adventure, and mystery.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-center">
                            <div className="text-5xl font-black text-rose-400 mb-2">20+</div>
                            <div className="text-xl text-white/80 uppercase tracking-wide">Stories</div>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-center">
                            <div className="text-5xl font-black text-pink-400 mb-2">150+</div>
                            <div className="text-xl text-white/80 uppercase tracking-wide">Chapters</div>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-center">
                            <div className="text-5xl font-black text-purple-400 mb-2">200K+</div>
                            <div className="text-xl text-white/80 uppercase tracking-wide">Words</div>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 text-center">
                            <div className="text-5xl font-black text-white mb-2">Free</div>
                            <div className="text-xl text-white/80 uppercase tracking-wide">Forever</div>
                        </div>
                    </motion.div>

                    {/* Search & Sort */}
                    <motion.div
                        className="flex flex-col lg:flex-row gap-4 max-w-2xl mx-auto mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                            <input
                                type="text"
                                placeholder="Search stories, authors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-16 pr-6 py-5 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 focus:border-rose-400/70 focus:outline-none transition-all duration-300 text-lg text-white placeholder-white/60 shadow-2xl"
                            />
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-8 py-5 rounded-3xl bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 focus:border-rose-400/70 focus:outline-none transition-all duration-300 text-lg text-white shadow-2xl"
                        >
                            <option value="newest">Newest First</option>
                            <option value="popular">Most Popular</option>
                            <option value="read">Most Read</option>
                            <option value="rated">Highest Rated</option>
                        </select>
                    </motion.div>

                    {/* Genre Tabs */}
                    <motion.div
                        className="flex flex-wrap gap-3 justify-center mb-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {genres.map((genre) => (
                            <motion.button
                                key={genre.id}
                                onClick={() => setActiveGenre(genre.id)}
                                className={`px-8 py-4 rounded-3xl font-bold text-lg transition-all duration-300 shadow-lg ${activeGenre === genre.id
                                        ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-rose-500/50 hover:shadow-rose-500/75 scale-105'
                                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {genre.icon} {genre.name}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Featured Carousel */}
                    <div className="mb-24">
                        <div className="flex justify-center mb-12">
                            <div className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl border border-rose-500/30">
                                <div className="w-3 h-3 bg-rose-400 rounded-full animate-pulse" />
                                <span className="font-bold text-rose-300 uppercase tracking-wide">Featured Stories</span>
                            </div>
                        </div>

                        <div className="carousel-container max-w-6xl mx-auto">
                            <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent snap-x snap-mandatory">
                                {featuredStories.map((story, index) => (
                                    <motion.div
                                        key={story.id}
                                        className="flex-none w-96"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                    >
                                        <StoryCard story={story} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stories Grid */}
                    <section className="pb-24">
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
                                {filteredStories.map((story, index) => (
                                    <motion.div
                                        key={story.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <StoryCard story={story} />
                                    </motion.div>
                                ))}
                            </div>

                            {filteredStories.length === 0 && (
                                <div className="text-center py-32">
                                    <div className="text-8xl mb-8">📖</div>
                                    <h3 className="text-4xl font-bold text-white mb-6">No stories found</h3>
                                    <p className="text-xl text-white/60 mb-12">Try searching different keywords or genres</p>
                                    <Link
                                        href="/stories"
                                        className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-glow-rose hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                                    >
                                        Explore All Stories
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Submit CTA */}
                <section className="py-24 bg-slate-900/50">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-5xl lg:text-6xl font-black text-white mb-8">
                            Want to Share Your Story?
                        </h2>
                        <p className="text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
                            Join our community of writers. Submit your romance, horror, or mystery for the world to read.
                        </p>
                        <Link
                            href="/stories/submit"
                            className="inline-flex items-center gap-3 px-16 py-8 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-glow-purple hover:scale-105 hover:-translate-y-3 transition-all duration-700 shadow-purple-500/50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            ✍️ Submit Your Story
                        </Link>
                    </div>
                </section>
        </div>
    </div >
  );
}

