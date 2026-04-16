"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageCard from '@/components/languages/LanguageCard';
import { languages } from '@/data/languages';

export default function LanguagesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/50 to-slate-900 relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-32 lg:py-48">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-indigo-500/10 to-slate-900/50" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        Language Academy
                    </motion.h1>

                    <motion.p
                        className="text-2xl md:text-3xl lg:text-4xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        Master <span className="text-gold font-bold">6 Languages</span> with AI Tutors.
                        From A1 Beginner to C2 Fluent. <span className="text-gold font-bold">3,360+</span> Lessons Ready.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mb-24"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="glass-card p-10 text-center group hover:shadow-glow-gold transition-all duration-500">
                            <div className="text-6xl mb-4">🌍</div>
                            <div className="text-5xl font-black text-gold mb-3">6</div>
                            <div className="text-2xl text-white/80 uppercase tracking-wide group-hover:text-white transition-colors">Languages</div>
                        </div>

                        <div className="glass-card p-10 text-center group hover:shadow-glow-gold transition-all duration-500">
                            <div className="text-6xl mb-4">📚</div>
                            <div className="text-5xl font-black text-gold mb-3">3,360+</div>
                            <div className="text-2xl text-white/80 uppercase tracking-wide group-hover:text-white transition-colors">Lessons</div>
                        </div>

                        <div className="glass-card p-10 text-center group hover:shadow-glow-gold transition-all duration-500">
                            <div className="text-6xl mb-4">📖</div>
                            <div className="text-5xl font-black text-gold mb-3">30,000+</div>
                            <div className="text-2xl text-white/80 uppercase tracking-wide group-hover:text-white transition-colors">Vocabulary</div>
                        </div>

                        <div className="glass-card p-10 text-center group hover:shadow-glow-gold transition-all duration-500">
                            <div className="text-6xl mb-4">🤖</div>
                            <div className="text-5xl font-black text-gold mb-3">24/7</div>
                            <div className="text-2xl text-white/80 uppercase tracking-wide group-hover:text-white transition-colors">AI Tutors</div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="text-center mb-24"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        <Link
                            href="/languages/placement-test"
                            className="inline-flex items-center gap-4 px-16 py-8 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy font-black text-2xl lg:text-3xl rounded-3xl shadow-2xl hover:shadow-glow-gold hover:scale-105 hover:-translate-y-2 transition-all duration-500 tracking-wide uppercase"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            🎯 Find Your Level - Free Placement Test
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Language Cards */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.h2
                        className="text-5xl lg:text-6xl font-black text-white mb-20 text-center bg-gradient-to-r from-white via-gold to-yellow-500 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Choose Your Language Journey
                    </motion.h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
                        {languages.map((language, index) => (
                            <motion.div
                                key={language.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <LanguageCard language={language} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-r from-slate-900/80 to-slate-800/80">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl lg:text-7xl font-black text-white mb-8">
                            Ready to Speak Like a Native?
                        </h2>
                        <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of students mastering languages with our proven AI-powered curriculum.
                            Start with a free placement test and discover your perfect learning path.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link
                                href="/languages/placement-test"
                                className="px-16 py-8 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy font-black text-2xl rounded-3xl shadow-2xl hover:shadow-glow-gold hover:scale-105 hover:-translate-y-2 transition-all duration-500 tracking-wide"
                            >
                                🎯 Start Free Placement Test
                            </Link>
                            <Link
                                href="/languages/compare"
                                className="px-16 py-8 border-2 border-white/30 bg-white/10 backdrop-blur-xl text-white font-bold text-xl rounded-3xl hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
                            >
                                📊 Compare Languages
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

