"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, GraduationCap, Home, Users, DollarSign, BookOpen, Building2 } from 'lucide-react';
import DiscussionForum from '@/components/DiscussionForum';

const economicsSubsections = [
    { id: 'market-trends', title: 'Market Trends', desc: 'Stock market updates, crypto prices, commodity shifts.', icon: TrendingUp },
    { id: 'investment-tips', title: 'Investment Tips', desc: 'Beginner to advanced strategies for wealth building.', icon: DollarSign },
    { id: 'global-economy', title: 'Global Economy', desc: 'GDP growth, inflation rates, trade balances worldwide.', icon: Users },
    { id: 'personal-finance', title: 'Personal Finance', desc: 'Budgeting, saving, debt management advice.', icon: TrendingUp }
];

const educationSubsections = [
    { id: 'scholarships', title: 'Scholarships', desc: 'Global opportunities, application tips, deadlines.', icon: DollarSign },
    { id: 'study-tips', title: 'Study Tips', desc: 'Proven techniques for better grades and retention.', icon: BookOpen },
    { id: 'career-guidance', title: 'Career Guidance', desc: 'Job hunting, resume building, interview prep.', icon: GraduationCap },
    { id: 'online-courses', title: 'Online Courses', desc: 'Best platforms, free/paid recommendations by skill.', icon: BookOpen }
];

const realEstateSubsections = [
    { id: 'property-listings', title: 'Property Listings', desc: 'Featured homes, apartments, commercial spaces.', icon: Home },
    { id: 'market-analysis', title: 'Market Analysis', desc: 'Price forecasts, hot areas, buyer/seller trends.', icon: TrendingUp },
    { id: 'buying-selling-tips', title: 'Buying/Selling Tips', desc: 'Negotiation, inspection, closing process guide.', icon: DollarSign },
    { id: 'mortgage-calculator', title: 'Mortgage Calculator', desc: 'Interactive tool for loan estimates and payments.', icon: Building2 }
];

export default function EconomicsEducationRealEstatePage() {
    const [activeTab, setActiveTab] = useState('economics');

    const tabs = [
        { id: 'economics', label: 'Economics', icon: TrendingUp },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'real-estate', label: 'Real Estate', icon: Home }
    ];

    const renderSubsections = (subsections: typeof economicsSubsections, title: string) => (
        <>
            <section className="py-24">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black text-white mb-6">{title}</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">Insights and advice for building your future</p>
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
            </section>
        </>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-navy">
            {/* Hero */}
            <section className="relative py-32 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Economics, Education & Real Estate
                    </motion.h1>
                    <motion.p
                        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Building wealth, knowledge, and homes
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
                    {activeTab === 'economics' && (
                        <>
                            {renderSubsections(economicsSubsections, 'Economics')}
                            <DiscussionForum forumId="economics-economics" />
                        </>
                    )}
                    {activeTab === 'education' && (
                        <>
                            {renderSubsections(educationSubsections, 'Education')}
                            <DiscussionForum forumId="economics-education" />
                        </>
                    )}
                    {activeTab === 'real-estate' && (
                        <>
                            {renderSubsections(realEstateSubsections, 'Real Estate')}
                            <DiscussionForum forumId="economics-realestate" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

