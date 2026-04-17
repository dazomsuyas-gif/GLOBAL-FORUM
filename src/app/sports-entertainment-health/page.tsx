"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Football, Film, HeartPulse, Users, Trophy, Clapperboard, Dumbbell } from 'lucide-react';
import DiscussionForum from '@/components/DiscussionForum';

const sportsSubsections = [
    { id: 'football', title: 'Football (Soccer)', desc: 'Premier League, La Liga, Champions League updates.', icon: Football },
    { id: 'basketball', title: 'Basketball', desc: 'NBA, EuroLeague highlights and player stats.', icon: Trophy },
    { id: 'tennis', title: 'Tennis', desc: 'Grand Slams, ATP/WTA tours, rankings.', icon: Trophy },
    { id: 'athletics', title: 'Athletics', desc: 'Olympics, World Championships, records.', icon: Trophy }
];

const entertainmentSubsections = [
    { id: 'movie-reviews', title: 'Movie Reviews', desc: 'Latest blockbusters, indie films, ratings.', icon: Clapperboard },
    { id: 'tv-series', title: 'TV Series Discussions', desc: 'Netflix, HBO, binge-worthy recommendations.', icon: Clapperboard },
    { id: 'celebrity-news', title: 'Celebrity News', desc: 'Hollywood gossip, red carpet, interviews.', icon: Users },
    { id: 'music-releases', title: 'Music Releases', desc: 'New albums, charts, artist spotlights.', icon: Users }
];

const healthSubsections = [
    { id: 'fitness-tips', title: 'Fitness Tips', desc: 'Gym routines, home workouts, progress tracking.', icon: Dumbbell },
    { id: 'nutrition-advice', title: 'Nutrition Advice', desc: 'Meal plans, supplements, diet trends.', icon: HeartPulse },
    { id: 'mental-wellness', title: 'Mental Wellness', desc: 'Stress management, mindfulness practices.', icon: HeartPulse },
    { id: 'workout-plans', title: 'Workout Plans', desc: 'Beginner to advanced programs.', icon: Dumbbell }
];

export default function SportsEntertainmentHealthPage() {
    const [activeTab, setActiveTab] = useState('sports');

    const tabs = [
        { id: 'sports', label: 'Sports', icon: Football },
        { id: 'entertainment', label: 'Entertainment', icon: Clapperboard },
        { id: 'health', label: 'Health', icon: HeartPulse }
    ];

    const renderSubsections = (subsections: typeof sportsSubsections, title: string) => (
        <>
            <section className="py-24">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-white mb-6">{title}</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">Live your best life</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {subsections.map((subsection, index) => (
                        <motion.div
                            key={subsection.id}
                            className="glass-card p-8 text-center group cursor-pointer hover:shadow-glow-gold"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="w-20 h-20 bg-gradient-to-r from-gold to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-500">
                                <subsection.icon className="w-10 h-10 text-navy" />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-gold">{subsection.title}</h3>
                            <p className="text-white/80 leading-relaxed">{subsection.desc}</p>
                        </motion.div>
                    ))}
                </div>
                {title === 'Sports' && (
                    <motion.div className="glass-card p-8 mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Trophy className="w-8 h-8 text-gold" /> Mock Live Scores</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-2xl p-6">
                                <div className="text-lg font-bold text-white mb-2">Man Utd 2 - 1 Liverpool</div>
                                <div className="text-sm text-white/70">Premier League • LIVE</div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-6">
                                <div className="text-lg font-bold text-white mb-2">Real Madrid 3 - 0 Barcelona</div>
                                <div className="text-sm text-white/70">La Liga • Final</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </section>
        </>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-navy">
            {/* Hero */}
            <section className="relative py-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Sports, Entertainment & Health
                    </motion.h1>
                    <motion.p
                        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Live your best life
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 relative z-10">
                {/* Tabs */}
                <div className="flex bg-white/5 backdrop-blur-xl rounded-3xl p-1 mb-16 border border-white/10">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-6 px-8 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy shadow-glow-gold shadow-xl scale-[1.02]'
                                    : 'text-white/70 hover:text-white hover:bg-white/10 border border-white/20'
                                }`}
                            whileHover={{ scale: activeTab === tab.id ? 1.02 : 1.05 }}
                        >
                            <tab.icon className="w-6 h-6" />
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-24 mb-32">
                    {activeTab === 'sports' && (
                        <>
                            {renderSubsections(sportsSubsections, 'Sports')}
                            <DiscussionForum forumId="sports-sports" />
                        </>
                    )}
                    {activeTab === 'entertainment' && (
                        <>
                            {renderSubsections(entertainmentSubsections, 'Entertainment')}
                            <DiscussionForum forumId="sports-entertainment" />
                        </>
                    )}
                    {activeTab === 'health' && (
                        <>
                            {renderSubsections(healthSubsections, 'Health')}
                            <DiscussionForum forumId="sports-health" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

