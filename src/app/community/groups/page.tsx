"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Award, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import GroupCard from '@/components/community/GroupCard';

const mockGroups = [
    {
        id: 1,
        name: "English Fluency Hub",
        slug: "english-fluency-hub",
        language: "English",
        flag: "🇺🇸",
        coverImage: "gradient-gold-blue",
        avatar: "🇺🇸",
        description: "Practice speaking English with 15K+ learners. IELTS/TOEFL prep, conversation practice, grammar help.",
        memberCount: 15234,
        postCountToday: 234,
        isJoined: false,
        createdAt: "2024-01-15"
    },
    {
        id: 2,
        name: "HSK Warriors",
        slug: "hsk-warriors",
        language: "Chinese",
        flag: "🇨🇳",
        coverImage: "gradient-red-orange",
        avatar: "HSK",
        description: "HSK 1-6 prep, tones mastery, character recognition. Join 8K+ Chinese learners.",
        memberCount: 8567,
        postCountToday: 156,
        isJoined: true,
        createdAt: "2024-02-01"
    },
    {
        id: 3,
        name: "Spanish Amigos",
        slug: "spanish-amigos",
        language: "Spanish",
        flag: "🇪🇸",
        coverImage: "gradient-orange-red",
        avatar: "🇪🇸",
        description: "DELE prep, rolling R practice, conversation partners. 12K+ members.",
        memberCount: 12891,
        postCountToday: 189,
        isJoined: false,
        createdAt: "2024-01-20"
    },
    // ... more groups
];

export default function GroupsDirectory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('members');
    const [currentPage, setCurrentPage] = useState(0);
    const groupsPerPage = 9;

    const filteredGroups = mockGroups.filter(group => {
        const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || group.language === filter;
        return matchesSearch && matchesFilter;
    }).sort((a, b) => {
        if (sort === 'members') return b.memberCount - a.memberCount;
        if (sort === 'active') return b.postCountToday - a.postCountToday;
        if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
    }).slice(currentPage * groupsPerPage, (currentPage + 1) * groupsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950">
            {/* Hero */}
            <section className="relative py-32 lg:py-48 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
                <motion.div
                    className="relative z-10 max-w-6xl mx-auto px-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-7xl lg:text-9xl font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 bg-clip-text text-transparent mb-8">
                        Language Groups
                    </h1>
                    <p className="text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto mb-20 leading-relaxed">
                        Join a <span className="font-black text-emerald-400">language practice group</span> and connect with learners & native speakers worldwide.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4">15+</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Active Groups</div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4">50K+</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4">1K+</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Daily Posts</div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4">6</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Languages</div>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                        className="mx-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white px-16 py-8 rounded-4xl text-3xl font-black shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Users className="w-12 h-12 inline mr-4 group-hover:rotate-12 transition-transform duration-300" />
                        Find Your Group
                    </motion.button>
                </motion.div>
            </section>

            {/* Filters & Search */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative z-10 mb-16">
                <div className="glass-card p-8 lg:p-12 mb-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between mb-8">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
                            <input
                                type="text"
                                placeholder="Search groups by name, language, or topic..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-all font-semibold text-lg"
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {['all', 'English', 'Chinese', 'Spanish', 'French', 'German', 'Swahili'].map((lang) => (
                                <motion.button
                                    key={lang}
                                    onClick={() => setFilter(lang.toLowerCase())}
                                    className={`px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${filter === lang.toLowerCase()
                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 shadow-lg'
                                            : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {lang}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-white/60">
                        <span className="font-bold">Sort by:</span>
                        <div className="flex gap-2">
                            {['members', 'active', 'newest'].map((option) => (
                                <motion.button
                                    key={option}
                                    onClick={() => setSort(option)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${sort === option
                                            ? 'bg-emerald-500 text-white shadow-emerald-500/50'
                                            : 'bg-white/10 hover:bg-white/20 text-white/80'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {option === 'members' && 'Most Members'}
                                    {option === 'active' && 'Most Active'}
                                    {option === 'newest' && 'Newest'}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Groups */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
                <div className="flex items-center gap-6 mb-12">
                    <div className="w-2 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" />
                    <h2 className="text-4xl lg:text-5xl font-black text-white">
                        Featured Groups
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {mockGroups.slice(0, 6).map((group, index) => (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GroupCard group={group} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* All Groups */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl lg:text-5xl font-black text-white">
                        All Groups ({filteredGroups.length})
                    </h2>
                    <motion.button
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Users className="w-6 h-6" />
                        Create Group
                    </motion.button>
                </div>

                {filteredGroups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGroups.map((group) => (
                            <GroupCard key={group.id} group={group} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="glass-card p-24 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="text-8xl mb-12">🔍</div>
                        <h3 className="text-4xl font-black text-white mb-6">No Groups Found</h3>
                        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                            Try adjusting your search or filter. There are many language practice groups waiting for you!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                className="px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-3xl shadow-lg hover:shadow-emerald-500/50 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                Browse All
                            </motion.button>
                            <motion.button
                                className="px-12 py-6 border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white font-bold rounded-3xl hover:bg-white/20 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                Create Group
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Pagination */}
                {filteredGroups.length > 0 && (
                    <div className="flex items-center justify-center gap-4 mt-20">
                        <motion.button
                            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                            disabled={currentPage === 0}
                            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-50"
                            whileHover={{ scale: 1.1 }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        <div className="flex gap-2">
                            <motion.button
                                onClick={() => setCurrentPage(0)}
                                className={`px-6 py-3 rounded-2xl font-bold transition-all ${currentPage === 0 ? 'bg-emerald-500 text-white shadow-emerald-500/50' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                whileHover={{ scale: 1.05 }}
                            >
                                1
                            </motion.button>
                            {mockGroups.length > groupsPerPage && (
                                <motion.button
                                    onClick={() => setCurrentPage(1)}
                                    className={`px-6 py-3 rounded-2xl font-bold transition-all ${currentPage === 1 ? 'bg-emerald-500 text-white shadow-emerald-500/50' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    2
                                </motion.button>
                            )}
                        </div>

                        <motion.button
                            onClick={() => setCurrentPage(p => p + 1)}
                            disabled={filteredGroups.length < groupsPerPage}
                            className="p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-50"
                            whileHover={{ scale: 1.1 }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                )}
            </section>
        </div>
    );
}

