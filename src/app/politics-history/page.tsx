"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Globe, History, Users, Newspaper } from 'lucide-react';
import Link from 'next/link';
import DiscussionForum from '@/components/DiscussionForum';

const politicsSubsections = [
    { id: 'world-elections', title: 'World Elections', desc: 'Latest election results, voter turnout, and political shifts across continents.', icon: Newspaper },
    { id: 'government-policies', title: 'Government Policies', desc: 'New laws, reforms, and policy changes impacting daily lives.', icon: LayoutDashboard },
    { id: 'international-relations', title: 'International Relations', desc: 'Diplomatic meetings, treaties, alliances, and global partnerships.', icon: Globe },
    { id: 'political-analysis', title: 'Political Analysis', desc: 'Expert opinions, trend forecasts, and deep-dive articles.', icon: Users }
];

const historySubsections = [
    { id: 'ancient-civilizations', title: 'Ancient Civilizations', desc: 'Egypt, Mesopotamia, Indus Valley, and their lasting legacies.', icon: History },
    { id: 'world-wars', title: 'World Wars', desc: 'Key battles, leaders, strategies, and consequences of global conflicts.', icon: Newspaper },
    { id: 'historical-leaders', title: 'Historical Leaders', desc: 'Profiles of figures who shaped history - from Caesar to Mandela.', icon: Users },
    { id: 'timeline-view', title: 'Interactive Timeline', desc: 'Visual chronology of major historical events.', icon: LayoutDashboard }
];

export default function PoliticsHistoryPage() {
    const [activeTab, setActiveTab] = useState('politics');

    const tabs = [
        { id: 'politics', label: 'Politics', icon: LayoutDashboard },
        { id: 'history', label: 'History', icon: History }
    ];

    const renderSubsections = (subsections: typeof politicsSubsections) => (
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
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-navy">
            {/* Hero */}
            <section className="relative py-32 bg-gradient-to-br from-gold via-yellow-500 to-orange-500">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Politics & History
                    </motion.h1>
                    <motion.p
                        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Understanding our world through past and present
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
                    {activeTab === 'politics' && (
                        <>
                            <section className="py-24">
                                <div className="text-center mb-16">
                                    <h2 className="text-5xl font-black text-white mb-6">Politics</h2>
                                    <p className="text-xl text-white/70 max-w-2xl mx-auto">Stay informed on global political developments</p>
                                </div>
                                {renderSubsections(politicsSubsections)}
                            </section>
                            <DiscussionForum forumId="politics-politics" />
                        </>
                    )}

                    {activeTab === 'history' && (
                        <>
                            <section className="py-24">
                                <div className="text-center mb-16">
                                    <h2 className="text-5xl font-black text-white mb-6">History</h2>
                                    <p className="text-xl text-white/70 max-w-2xl mx-auto">Learn from humanity&apos;s past</p>
                                </div>
                                {renderSubsections(historySubsections)}
                            </section>
                            <DiscussionForum forumId="politics-history" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

