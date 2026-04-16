"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const pillars = [
    {
        icon: "📚",
        title: "Knowledge Hub",
        desc: "250+ articles across 14 categories",
        link: "/knowledge",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: "🗣️",
        title: "Language Academy",
        desc: "6 languages, A1-C2, HSK 1-6, 8000+ vocab",
        link: "/languages",
        color: "from-emerald-500 to-emerald-600"
    },
    {
        icon: "📖",
        title: "Story World",
        desc: "20+ original stories (romance, horror, life)",
        link: "/stories",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: "👥",
        title: "Global Community",
        desc: "10,000+ members, groups, forums, DMs",
        link: "/community",
        color: "from-pink-500 to-pink-600"
    },
    {
        icon: "🛒",
        title: "Marketplace",
        desc: "Buy & sell local, cultural, digital products",
        link: "/marketplace",
        color: "from-orange-500 to-orange-600"
    },
    {
        icon: "🎬",
        title: "Creator Hub",
        desc: "100+ YouTube scripts, content tools",
        link: "/creator",
        color: "from-indigo-500 to-indigo-600"
    },
    {
        icon: "💳",
        title: "15+ Payments",
        desc: "Banks, mobile money, crypto",
        link: "/membership",
        color: "from-yellow-500 to-yellow-600"
    },
    {
        icon: "🤖",
        title: "AI WhatsApp Bots",
        desc: "24/7 support in any language",
        link: "/contact",
        color: "from-green-500 to-green-600"
    },
];

export default function PillarsSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-slate-900/50 to-slate-900/80">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Title */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="section-title mb-6">Our 8 Core Pillars</h2>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Complete ecosystem for learning, creating, connecting, and earning globally.
                    </p>
                </motion.div>

                {/* Pillars Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            className="group relative cursor-pointer h-80 glass-card overflow-hidden hover:shadow-glow-xl transition-all duration-700 border border-transparent hover:border-gold/50"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -20, scale: 1.02 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                delay: index * 0.1
                            }}
                        >
                            <Link href={pillar.link} className="h-full block p-10 flex flex-col items-center justify-center text-center group-hover:text-gold">
                                {/* Icon */}
                                <motion.div
                                    className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500"
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    {pillar.icon}
                                </motion.div>

                                {/* Title */}
                                <motion.h3
                                    className="text-2xl font-black mb-4 bg-gradient-to-r from-white via-gold to-yellow-400 bg-clip-text text-transparent group-hover:scale-110"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {pillar.title}
                                </motion.h3>

                                {/* Description */}
                                <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xs">
                                    {pillar.desc}
                                </p>

                                {/* Arrow */}
                                <motion.span
                                    className="text-gold font-bold uppercase tracking-wider text-sm group-hover:translate-x-2 transition-transform duration-300"
                                    whileHover={{ x: 8 }}
                                >
                                    Explore →
                                </motion.span>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Glow Ring */}
                                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-transparent to-yellow-500/20 opacity-0 group-hover:opacity-100 blur-xl scale-150 group-hover:scale-100 transition-all duration-700" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

