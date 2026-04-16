"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { languages } from '@/data/languages';

interface LanguageCardProps {
    language: typeof languages[0];
}

export default function LanguageCard({ language }: LanguageCardProps) {
    return (
        <motion.div
            className="glass-card group cursor-pointer relative overflow-hidden rounded-4xl shadow-2xl hover:shadow-glow-gold transition-all duration-700"
            whileHover={{ scale: 1.05, y: -20 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Gradient Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundColor: language.color }}
            />

            {/* Hero Image */}
            <div
                className="relative h-64 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${language.heroImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-10 text-center">
                {/* Flag & Name */}
                <div className="mb-8">
                    <div className="text-6xl mb-6">{language.flag}</div>
                    <h3 className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 mb-6">
                        {language.name}
                    </h3>
                </div>

                {/* Level Badges */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {language.levels.map((level, index) => (
                        <motion.span
                            key={level}
                            className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 font-bold text-lg group-hover:border-gold/50 transition-all"
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {level}
                        </motion.span>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div>
                        <div className="text-3xl font-black text-gold mb-2">{language.totalLessons}</div>
                        <div className="text-white/70 uppercase tracking-wide text-sm">Lessons</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-gold mb-2">{language.totalVocabulary.toLocaleString()}</div>
                        <div className="text-white/70 uppercase tracking-wide text-sm">Vocabulary</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-gold mb-2">{language.totalHours}h</div>
                        <div className="text-white/70 uppercase tracking-wide text-sm">To Fluency</div>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-12">
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {language.features.slice(0, 4).map((feature, index) => (
                            <motion.div
                                key={feature}
                                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="w-10 h-10 bg-gradient-to-r from-gold to-yellow-500 rounded-xl flex items-center justify-center font-bold text-navy text-lg">
                                    {index + 1}
                                </div>
                                <span className="text-white font-medium">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <Link
                    href={`/languages/${language.slug}`}
                    className="group inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-white via-gray-100 to-gray-200 text-navy font-black text-xl lg:text-2xl rounded-3xl shadow-2xl hover:shadow-glow-gold hover:scale-105 hover:-translate-y-2 transition-all duration-500 tracking-wide uppercase"
                >
                    🚀 Start Learning {language.name}
                    <motion.div
                        className="w-4 h-4 bg-navy rounded-full group-hover:translate-x-2 transition-transform duration-300"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                </Link>

                {/* Exam Badge */}
                <div className="mt-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white/90 font-bold rounded-2xl border border-white/20 text-sm uppercase tracking-wide">
                        {language.examAlignment}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

