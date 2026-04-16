nn"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LanguageCardProps {
    language: string;
    level: string;
    icon: string;
    color: string;
    href: string;
}

const languages = [
    {
        name: 'English',
        level: 'A1-C2 • TOEFL/IELTS',
        icon: '🇺🇸',
        color: 'from-blue-500 to-blue-600',
        href: '/languages/english'
    },
    {
        name: '中文 (Chinese)',
        level: 'HSK 1-6',
        icon: '🇨🇳',
        color: 'from-red-500 to-red-600',
        href: '/languages/chinese'
    },
    {
        name: 'Español',
        level: 'A1-C2 • DELE',
        icon: '🇪🇸',
        color: 'from-orange-500 to-orange-600',
        href: '/languages/spanish'
    },
    {
        name: 'Français',
        level: 'A1-C2 • DELF/DALF',
        icon: '🇫🇷',
        color: 'from-blue-600 to-blue-700',
        href: '/languages/french'
    },
    {
        name: 'Deutsch',
        level: 'A1-C2 • Goethe',
        icon: '🇩🇪',
        color: 'from-black to-gray-800',
        href: '/languages/german'
    },
    {
        name: 'Kiswahili',
        level: 'A1-C2 • East Africa',
        icon: '🇹🇿',
        color: 'from-green-500 to-green-600',
        href: '/languages/swahili'
    },
];

export default function LanguageAcademy() {
    return (
        <section className="py-32 bg-gradient-to-b from-slate-900 to-navy">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title mb-6">Language Academy</h2>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Master 6 global languages with AI WhatsApp tutors. A1 to C2 certification paths.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {languages.map((lang, index) => (
                        <motion.div
                            key={lang.name}
                            className="lang-card group cursor-pointer"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={lang.href} className="block h-full">
                                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-gradient-to-r rounded-2xl shadow-2xl group-hover:shadow-glow-gold transition-all duration-500">
                                    <span className="text-4xl font-black drop-shadow-lg">{lang.icon}</span>
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent group-hover:from-gold group-hover:to-yellow-400 transition-all duration-500">
                                    {lang.name}
                                </h3>

                                <p className="text-lg text-white/70 mb-8 font-medium uppercase tracking-wide">
                                    {lang.level}
                                </p>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-ping"></div>
                                    <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wide">
                                        AI Tutor Available
                                    </span>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="text-center mt-24"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                        24/7 WhatsApp AI Tutors respond in your language. Practice speaking, grammar, vocabulary instantly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="https://wa.me/255768868546" target="_blank" className="btn-gold" rel="noopener noreferrer">
                            Start English Free
                        </a>
                        <a href="/languages" className="btn-glass">
                            Explore All Languages
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

