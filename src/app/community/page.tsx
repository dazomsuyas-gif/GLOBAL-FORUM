"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageCircle, Users, TrendingUp, MapPin, Award, Activity } from 'lucide-react';
import Link from 'next/link';
import PostCard from '@/components/community/PostCard';
import TrendingTopics from '@/components/community/TrendingTopics';
import LanguagePracticeGroup from '@/components/community/LanguagePracticeGroup';

const mockPosts = [
    {
        id: 1,
        user: {
            name: "PolyglotMaster",
            avatar: "👑",
            username: "@polyglotmaster",
            level: "C2"
        },
        content: "Just finished HSK6 mock test with 95%! Chinese tones are finally mastered 🎉 Who's doing HSK6 prep with me? #HSK6 #Chinese",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        likes: 247,
        comments: 42,
        shares: 18,
        language: "Chinese",
        timestamp: "2h ago"
    },
    {
        id: 2,
        user: {
            name: "SpanishAmiga",
            avatar: "🇪🇸",
            username: "@spanishamiga",
            level: "B2"
        },
        content: "Rolling R practice update: Finally got 'perro' to sound right! 🎊 Practice partners needed for DELE B2 prep. DM me! #Spanish #DELE",
        likes: 189,
        comments: 31,
        shares: 12,
        language: "Spanish",
        timestamp: "5h ago"
    }
];

export default function CommunityHub() {
    const [activeTab, setActiveTab] = useState('for-you');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950">
            {/* Hero */}
            <section className="relative py-32 lg:py-48 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(59,130,246,0.1),transparent)]" />
                <motion.div
                    className="relative z-10 max-w-6xl mx-auto px-6"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-7xl lg:text-9xl font-black bg-gradient-to-r from-white via-emerald-400 to-teal-500 bg-clip-text text-transparent mb-8 leading-tight">
                        Global Community
                    </h1>
                    <p className="text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto mb-20 leading-relaxed">
                        Connect with <span className="font-black text-emerald-400">100,000+</span> language learners worldwide. Practice speaking, share stories, and grow together.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4 animate-pulse">10K+</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4">50K+</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Posts</div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4 animate-pulse">1K+</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Daily Active</div>
                        </div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-emerald-400 mb-4">500+</div>
                            <div className="text-xl text-white/80 font-bold uppercase tracking-wide">Groups</div>
                        </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                        className="mx-auto bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white px-16 py-8 rounded-4xl text-3xl font-black shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 hover:-translate-y-2 transition-all duration-500 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Plus className="w-12 h-12 inline mr-4 group-hover:rotate-90 transition-transform duration-300" />
                        Create Post
                    </motion.button>
                </motion.div>
            </section>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Left Sidebar - Filters */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <TrendingUp className="w-8 h-8 text-emerald-400" />
                                Feed
                            </h3>
                            <div className="space-y-3">
                                {['for-you', 'following', 'trending', 'near-you'].map((tab) => (
                                    <motion.button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`w-full text-left p-4 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === tab
                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 shadow-lg scale-105'
                                                : 'bg-white/10 hover:bg-white/20 text-white/80 border border-white/20'
                                            }`}
                                        whileHover={{ scale: activeTab === tab ? 1.05 : 1.02 }}
                                    >
                                        {tab === 'for-you' && '✨ For You'}
                                        {tab === 'following' && '❤️ Following'}
                                        {tab === 'trending' && '🔥 Trending'}
                                        {tab === 'near-you' && '📍 Near You'}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <TrendingTopics />
                    </div>

                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Create Post CTA */}
                        <motion.div
                            className="glass-card p-8 flex items-center gap-6 cursor-pointer hover:shadow-emerald-500/50 hover:scale-[1.02] transition-all"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                                <Plus className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div className="flex-1">
                                <div className="text-xl font-bold text-white mb-2">What's happening?</div>
                                <div className="text-white/60 text-sm">Share a language tip, story, or ask for help</div>
                            </div>
                            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl font-bold text-white shadow-lg hover:shadow-emerald-500/50 transition-all whitespace-nowrap">
                                Post
                            </button>
                        </motion.div>

                        {/* Posts Feed */}
                        {mockPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}

                        {/* Load More */}
                        <motion.div
                            className="text-center py-16"
                            whileHover={{ scale: 1.05 }}
                        >
                            <button className="px-16 py-8 bg-white/10 backdrop-blur-xl rounded-3xl border-2 border-white/20 text-white font-bold text-xl hover:bg-white/20 hover:shadow-glow-white hover:scale-105 transition-all duration-300">
                                Load More Posts ↓
                            </button>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="glass-card p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <Users className="w-8 h-8 text-emerald-400" />
                                Online Friends
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { name: "Ana 🇪🇸", status: "online", level: "B2" },
                                    { name: "Li Wei 🇨🇳", status: "online", level: "HSK4" },
                                    { name: "Pierre 🇫🇷", status: "online", level: "C1" },
                                    { name: "Fatima 🇹🇿", status: "online", level: "B1" }
                                ].map((friend, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 hover:bg-white/10 rounded-2xl transition-all cursor-pointer">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl ${friend.status === 'online' ? 'bg-emerald-500 text-white' : 'bg-slate-600 text-slate-300'
                                            }`}>
                                            {friend.name.split(' ')[0][0]}{friend.name.split(' ')[1]?.[0] || ''}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{friend.name}</div>
                                            <div className="text-emerald-400 text-sm font-bold">{friend.level}</div>
                                        </div>
                                        <div className={`ml-auto w-3 h-3 rounded-full ${friend.status === 'online' ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <LanguagePracticeGroup />
                    </div>
                </div>

                {/* Mobile Bottom Nav */}
                <motion.div
                    className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-2xl border-t border-white/10 p-4 z-50"
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                >
                    <div className="flex justify-around">
                        {[
                            { icon: <Activity className="w-7 h-7" />, label: "Feed", href: "/community" },
                            { icon: <Users className="w-7 h-7" />, label: "Groups", href: "/community/groups" },
                            { icon: <Plus className="w-7 h-7" />, label: "Post", href: "#" },
                            { icon: <MessageCircle className="w-7 h-7" />, label: "Messages", href: "/community/messages" },
                            { icon: <Award className="w-7 h-7" />, label: "Profile", href: "/community/profile" }
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex flex-col items-center gap-1 p-3 rounded-2xl hover:bg-white/10 transition-all flex-1 text-center"
                            >
                                {item.icon}
                                <span className="text-xs font-bold text-white/80">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

