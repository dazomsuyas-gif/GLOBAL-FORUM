"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Microscope, Users, Brain, Laptop2, Zap } from 'lucide-react';
import Image from 'next/image';
import DiscussionForum from '@/components/DiscussionForum';

const techSubsections = [
    { id: 'latest-tech-news', title: 'Latest Tech News', desc: 'AI breakthroughs, hardware launches, industry updates.', icon: Laptop2 },
    { id: 'gadget-reviews', title: 'Gadget Reviews', desc: 'iPhone, Samsung, laptops - hands-on tests and ratings.', icon: Zap },
    { id: 'ai-developments', title: 'AI Developments', desc: 'Machine learning models, chatbots, automation trends.', icon: Brain },
    { id: 'software-updates', title: 'Software Updates', desc: 'iOS, Android, Windows - features and bug fixes.', icon: Code }
];

const top15Discoveries = [
    { id: 1, title: 'Control of Fire', year: '1.7 million years ago', discoverer: 'Early humans', img: 'https://picsum.photos/800/500?random=1', desc: 'Mastery of fire transformed human evolution by providing heat, protection, and cooking capabilities.', impact: 'Enabled migration to colder climates, improved nutrition through cooked food, and fostered social bonding around campfires.' },
    { id: 2, title: 'The Wheel', year: '3500 BC', discoverer: 'Ancient Mesopotamians', img: 'https://picsum.photos/800/500?random=2', desc: 'First used for pottery, later revolutionized transportation and machinery.', impact: 'Foundation of all wheeled vehicles, industrial machinery, and modern transportation systems.' },
    { id: 3, title: 'Electricity', year: '1752', discoverer: 'Benjamin Franklin', img: 'https://picsum.photos/800/500?random=3', desc: 'Lightning rod invention proved electricity&apos;s nature.', impact: 'Powered modern industry, lighting, electronics, and digital revolution.' },
    { id: 4, title: 'Penicillin', year: '1928', discoverer: 'Alexander Fleming', img: 'https://picsum.photos/800/500?random=4', desc: 'First antibiotic discovered from mold.', impact: 'Revolutionized medicine, saved millions from bacterial infections.' },
    { id: 5, title: 'DNA Structure', year: '1953', discoverer: 'Watson & Crick', img: 'https://picsum.photos/800/500?random=5', desc: 'Double helix model unlocked genetics.', impact: 'Birth of biotechnology, gene therapy, forensics, personalized medicine.' },
    { id: 6, title: 'Internet', year: '1983', discoverer: 'ARPANET team', img: 'https://picsum.photos/800/500?random=6', desc: 'TCP/IP protocol connected networks worldwide.', impact: 'Global communication, e-commerce, social media, information age.' },
    { id: 7, title: 'Printing Press', year: '1440', discoverer: 'Johannes Gutenberg', img: 'https://picsum.photos/800/500?random=7', desc: 'Movable type enabled mass book production.', impact: 'Literacy explosion, Renaissance, scientific revolution, democracy.' },
    { id: 8, title: 'Steam Engine', year: '1712', discoverer: 'Thomas Newcomen', img: 'https://picsum.photos/800/500?random=8', desc: 'Practical steam power for pumping water.', impact: 'Industrial Revolution, factories, railroads, modern economy.' },
    { id: 9, title: 'Telephone', year: '1876', discoverer: 'Alexander Graham Bell', img: 'https://picsum.photos/800/500?random=9', desc: 'First voice transmission over wires.', impact: 'Instant global communication, business transformation.' },
    { id: 10, title: 'Light Bulb', year: '1879', discoverer: 'Thomas Edison', img: 'https://picsum.photos/800/500?random=10', desc: 'Practical incandescent lighting.', impact: 'Extended productive hours, urban growth, safety.' },
    { id: 11, title: 'Airplane', year: '1903', discoverer: 'Wright Brothers', img: 'https://picsum.photos/800/500?random=11', desc: 'First powered controlled flight.', impact: 'Air travel, global trade, rapid transport.' },
    { id: 12, title: 'Computer', year: '1940s', discoverer: 'Modern pioneers', img: 'https://picsum.photos/800/500?random=12', desc: 'Electronic digital computation.', impact: 'Digital age, automation, AI, internet.' },
    { id: 13, title: 'Vaccines', year: '1796', discoverer: 'Edward Jenner', img: 'https://picsum.photos/800/500?random=13', desc: 'Smallpox vaccination principle.', impact: 'Eradicated diseases, increased life expectancy.' },
    { id: 14, title: 'Radio Waves', year: '1887', discoverer: 'Heinrich Hertz', img: 'https://picsum.photos/800/500?random=14', desc: 'Experimental confirmation of EM waves.', impact: 'Broadcasting, wireless communication, radar.' },
    { id: 15, title: 'Nuclear Energy', year: '1938', discoverer: 'Otto Hahn', img: 'https://picsum.photos/800/500?random=15', desc: 'Fission of uranium nucleus.', impact: 'Atomic power, medical isotopes, weapons.' }
];

export default function TechnologySciencePage() {
    const [activeTab, setActiveTab] = useState('technology');

    const tabs = [
        { id: 'technology', label: 'Technology', icon: Code },
        { id: 'science', label: 'Science', icon: Microscope }
    ];

    const renderTechSubsections = () => (
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {techSubsections.map((subsection, index) => (
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

    const renderDiscoveries = () => (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {top15Discoveries.map((discovery, index) => (
                <motion.div
                    key={discovery.id}
                    className="glass-card p-6 hover:shadow-glow-gold group overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                >
                    <div className="relative h-48 mb-6 rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500">
                        <Image
                            src={discovery.img}
                            alt={discovery.title}
                            fill
                            className="object-cover group-hover:brightness-110 transition-all duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-gold to-yellow-500 text-navy px-3 py-1 rounded-full text-sm font-bold">
                            #{discovery.id}
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{discovery.title}</h3>
                    <div className="text-gold text-sm font-bold mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        {discovery.year} • {discovery.discoverer}
                    </div>
                    <p className="text-white/90 mb-3 leading-tight">{discovery.desc}</p>
                    <p className="text-white/70 text-sm italic">"{discovery.impact}"</p>
                </motion.div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-navy">
            {/* Hero */}
            <section className="relative py-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Technology & Science
                    </motion.h1>
                    <motion.p
                        className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Discoveries that changed the world
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
                    {activeTab === 'technology' && (
                        <>
                            <section className="py-24">
                                <div className="text-center mb-16">
                                    <h2 className="text-5xl font-black text-white mb-6">Technology</h2>
                                    <p className="text-xl text-white/70 max-w-2xl mx-auto">Latest innovations and updates</p>
                                </div>
                                {renderTechSubsections()}
                            </section>
                            <DiscussionForum forumId="tech-technology" />
                        </>
                    )}
                    {activeTab === 'science' && (
                        <>
                            <section className="py-24">
                                <div className="text-center mb-16">
                                    <h2 className="text-5xl font-black text-gold mb-6">TOP 15 GREATEST DISCOVERIES</h2>
                                    <p className="text-xl text-white/70 max-w-2xl mx-auto">Transformative scientific breakthroughs</p>
                                </div>
                                {renderDiscoveries()}
                            </section>
                            <DiscussionForum forumId="tech-science" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

