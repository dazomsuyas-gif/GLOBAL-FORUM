"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Bookmark, Heart, MessageSquare, UserCheck, Globe, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import PostCard from '@/components/community/PostCard';

interface LanguageLevel {
    language: string;
    flag: string;
    level: string;
    certified: boolean;
}

interface ProfileStats {
    followers: number;
    following: number;
    posts: number;
}

const mockProfile = {
    username: "kelvinmsuya",
    name: "Kelvin Juma Msuya",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=600&fit=crop",
    bio: "Polyglot & Language Enthusiast | Building Global Forum | HSK4 • DELF B2 • Goethe B1 | Learning Swahili & Korean 🇹🇿✈️🌍",
    location: "Tanzania",
    website: "globalforum.app",
    joined: "Jan 2024",
    isFollowing: false
};

const profileStats: ProfileStats = {
    followers: 1247,
    following: 89,
    posts: 156
};

const languageLevels: LanguageLevel[] = [
    { language: "English", flag: "🇺🇸", level: "C1 Native", certified: true },
    { language: "Chinese", flag: "🇨🇳", level: "HSK 4", certified: true },
    { language: "Spanish", flag: "🇪🇸", level: "DELE B2", certified: true },
    { language: "French", flag: "🇫🇷", level: "DELF B2", certified: true },
    { language: "German", flag: "🇩🇪", level: "Goethe B1", certified: true },
    { language: "Swahili", flag: "🇹🇿", level: "Native", certified: true }
];

export default function UserProfile({ params }: { params: { username: string } }) {
    const [activeTab, setActiveTab] = useState('posts');
    const [editing, setEditing] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950">
            {/* Profile Header */}
            <section className="relative overflow-hidden">
                {/* Cover Image */}
                <motion.div
                    className="h-64 md:h-80 lg:h-[420px] relative"
                    style={{
                        backgroundImage: `url(${mockProfile.coverImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    {editing && (
                        <motion.button
                            className="absolute top-6 right-6 p-4 bg-white/90 backdrop-blur-xl text-slate-900 font-bold rounded-3xl shadow-2xl hover:shadow-white hover:scale-105 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            ✏️ Edit Cover
                        </motion.button>
                    )}
                </motion.div>

                {/* Profile Info */}
                <div className="relative max-w-7xl mx-auto px-6 -mt-20 lg:-mt-28">
                    <div className="glass-card max-w-6xl mx-auto p-12 lg:p-20 -m-4 lg:-m-8 rounded-4xl relative z-10">
                        <div className="flex flex-wrap items-start lg:items-center gap-8 lg:flex-nowrap">
                            {/* Avatar */}
                            <motion.div
                                className="flex-shrink-0"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="relative">
                                    <Image
                                        src={mockProfile.avatar}
                                        alt={mockProfile.name}
                                        width={160}
                                        height={160}
                                        className="w-40 h-40 lg:w-44 lg:h-44 rounded-3xl shadow-2xl border-8 border-white/20 object-cover ring-8 ring-slate-900/50"
                                    />
                                    {editing && (
                                        <motion.button
                                            className="absolute -bottom-4 -right-4 p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl shadow-2xl ring-4 ring-white/30 hover:shadow-emerald-500/50 hover:scale-110 transition-all"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            ✏️
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>

                            {/* Profile Details */}
                            <div className="flex-1 min-w-0 space-y-6">
                                <div className="flex flex-wrap items-baseline gap-6 lg:flex-nowrap">
                                    <div>
                                        <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                                            {mockProfile.name}
                                        </h1>
                                        <div className="flex items-center gap-2 text-2xl text-white/70 font-bold">
                                            <span>@{mockProfile.username}</span>
                                            <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
                                                Verified
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 lg:text-right">
                                        <div className="grid grid-cols-3 gap-8 text-center lg:text-left lg:gap-12">
                                            <div>
                                                <div className="text-4xl lg:text-5xl font-black text-white mb-1">{profileStats.followers.toLocaleString()}</div>
                                                <div className="text-lg text-white/60 uppercase tracking-wide font-bold">Followers</div>
                                            </div>
                                            <div>
                                                <div className="text-4xl lg:text-5xl font-black text-white mb-1">{profileStats.following.toLocaleString()}</div>
                                                <div className="text-lg text-white/60 uppercase tracking-wide font-bold">Following</div>
                                            </div>
                                            <div>
                                                <div className="text-4xl lg:text-5xl font-black text-white mb-1">{profileStats.posts}</div>
                                                <div className="text-lg text-white/60 uppercase tracking-wide font-bold">Posts</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-2xl text-white/90 leading-relaxed max-w-4xl">
                                    {mockProfile.bio}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-xl">
                                    <div className="flex items-center gap-3 text-white/70">
                                        <Globe className="w-7 h-7" />
                                        <span>{mockProfile.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/70">
                                        <Calendar className="w-7 h-7" />
                                        <span>Joined {mockProfile.joined}</span>
                                    </div>
                                    {mockProfile.website && (
                                        <a href={mockProfile.website} className="text-emerald-400 hover:text-emerald-300 font-bold underline decoration-emerald-400">
                                            Website →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Buttons */}
            <div className="sticky z-20 top-4 lg:top-24 -mt-16 lg:-mt-24 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center lg:justify-start">
                    <motion.button className="px-12 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-black text-2xl rounded-4xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all" whileHover={{ scale: 1.05 }}>
                        <Users className="w-8 h-8 inline mr-3" />
                        {mockProfile.isFollowing ? 'Following' : 'Follow'}
                    </motion.button>
                    <motion.button className="px-12 py-6 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 text-white font-bold text-2xl rounded-4xl shadow-xl hover:shadow-glow-white transition-all" whileHover={{ scale: 1.05 }}>
                        <MessageCircle className="w-8 h-8 inline mr-3" />
                        Message
                    </motion.button>
                    {mockProfile.username === 'kelvinmsuya' && (
                        <motion.button
                            onClick={() => setEditing(!editing)}
                            className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-2xl rounded-4xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Edit3 className="w-8 h-8 inline mr-3" />
                            Edit Profile
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Language Levels */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-20 lg:-mt-12 pb-24">
                <div className="glass-card p-12 lg:p-20 rounded-4xl">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="w-3 h-16 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-2xl" />
                        <h2 className="text-5xl font-black text-white">Language Levels</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {languageLevels.map((level, index) => (
                            <motion.div
                                key={level.language}
                                className="glass-card p-8 text-center hover:shadow-glow-emerald hover:scale-105 transition-all cursor-pointer group border-2 border-transparent hover:border-emerald-400/50"
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-5xl mb-4">{level.flag}</div>
                                <div className="text-2xl font-bold text-white mb-2">{level.language}</div>
                                <div className={`px-6 py-2 rounded-2xl font-bold text-xl ${level.certified
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
                                        : 'bg-white/10 border border-white/20 text-white/70'
                                    }`}>
                                    {level.level}
                                </div>
                                {level.certified && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                        <UserCheck className="w-4 h-4" />
                                        Certified
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Tabs */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 pb-24">
                {/* Tab Navigation */}
                <div className="glass-card p-2 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-4xl flex border border-white/10">
                    {[
                        { tab: 'posts', icon: Heart, label: 'Posts', count: profileStats.posts },
                        { tab: 'comments', icon: MessageSquare, label: 'Comments', count: 89 },
                        { tab: 'likes', icon: Heart, label: 'Likes', count: 234 },
                        { tab: 'saved', icon: Bookmark, label: 'Saved', count: 67 },
                        { tab: 'about', icon: Info, label: 'About' }
                    ].map(({ tab, icon: Icon, label, count }) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-6 px-8 rounded-3xl font-bold transition-all flex items-center gap-3 ${activeTab === tab
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 shadow-xl scale-[1.02]'
                                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md'
                                }`}
                            whileHover={{ scale: activeTab === tab ? 1.02 : 1.05 }}
                        >
                            <Icon className="w-7 h-7" />
                            <span>{label}</span>
                            {count && <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm font-bold">{count}</span>}
                        </motion.button>
                    ))}
                </div>

                {/* Posts Tab */}
                {activeTab === 'posts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <PostCard
                                key={index}
                                post={{
                                    id: index.toString(),
                                    user: { name: "Kelvin Juma", avatar: "👤", username: "@kelvinmsuya" },
                                    content: "Just completed my daily German practice! Those Umlauts are getting easier. #Goethe #GermanB1",
                                    likes: Math.floor(Math.random() * 100),
                                    comments: Math.floor(Math.random() * 20),
                                    timestamp: `${Math.floor(Math.random() * 24)}h ago`
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                    <div className="glass-card p-20 rounded-4xl">
                        <div className="max-w-4xl mx-auto text-center lg:text-left space-y-12">
                            <div>
                                <h3 className="text-5xl font-black text-white mb-8">About Me</h3>
                                <p className="text-2xl text-white/90 leading-relaxed">
                                    Passionate about connecting people through language. Building Global Forum to make language learning social and fun.
                                    Currently learning Korean (TOPIK 1) and perfecting Swahili dialect differences.
                                    Love conversation practice and peer feedback!
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-16 pt-12 border-t border-white/10">
                                <div>
                                    <h4 className="text-3xl font-black text-white mb-8">Learning Goals</h4>
                                    <ul className="space-y-4 text-xl text-white/80">
                                        <li>• Korean TOPIK Level 2 by Q3 2024</li>
                                        <li>• Swahili storytelling fluency</li>
                                        <li>• Mentor 100+ language learners</li>
                                        <li>• Launch Global Forum groups feature</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black text-white mb-8">Fun Facts</h4>
                                    <ul className="space-y-4 text-xl text-white/80">
                                        <li>• Speaks 6 languages fluently</li>
                                        <li>• 50K+ words memorized across languages</li>
                                        <li>• Daily 2-hour immersion practice</li>
                                        <li>• Loves language memes 😂</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

