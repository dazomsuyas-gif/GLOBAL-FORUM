import { motion } from 'framer-motion'

export default function Home() {
    return (
        <main className="min-h-screen pt-20 pb-12 px-4 sm:px-8 lg:px-16 xl:px-24">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-indigo-900/50"></div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center z-10 max-w-4xl mx-auto px-4"
                >
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-8 drop-shadow-2xl"
                    >
                        GLOBAL
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">FORUM</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Master 6 World Languages with AI Tutors • Global Marketplace • Ultimate Knowledge Hub
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card gold-glow px-12 py-6 text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-400 text-black shadow-2xl hover:shadow-gold animate-pulse"
                        >
                            Start Learning Free
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card px-12 py-6 text-xl font-bold border-2 border-yellow-400/50 hover:border-yellow-400 text-yellow-400"
                        >
                            Explore Marketplace
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="mt-20 text-center"
                    >
                        <p className="text-yellow-400 font-bold text-lg mb-2">Trusted by learners worldwide</p>
                        <div className="flex flex-wrap gap-8 justify-center text-2xl">
                            <span>🌍 Global</span>
                            <span>⭐ 4.9/5 Rating</span>
                            <span>🚀 10K+ Students</span>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-32 relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4"
                >
                    <div className="text-center mb-32">
                        <motion.h2
                            initial={{ scale: 0.9 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6"
                        >
                            Everything You Need
                        </motion.h2>
                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                            One platform for language mastery, global commerce, and infinite knowledge
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Language Academy */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="glass-card gold-glow group hover:scale-105 transition-all duration-500"
                        >
                            <div className="text-center p-10">
                                <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                                    🗣️
                                </div>
                                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Language Academy</h3>
                                <p className="text-lg text-white/80 mb-6">Master English, Chinese, Spanish, French, German & Swahili with AI WhatsApp tutors (24/7)</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">TOEFL/IELTS</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">HSK 1-6</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">8000+ Vocab</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Marketplace */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="glass-card gold-glow group hover:scale-105 transition-all duration-500"
                        >
                            <div className="text-center p-10">
                                <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                                    🛒
                                </div>
                                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Global Marketplace</h3>
                                <p className="text-lg text-white/80 mb-6">Buy & sell digital products, cultural items, food. AI price prediction. 15+ payment methods worldwide</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">M-PESA</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Visa/MC</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Crypto</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Knowledge Hub */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="glass-card gold-glow group hover:scale-105 transition-all duration-500"
                        >
                            <div className="text-center p-10">
                                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                                    📚
                                </div>
                                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Knowledge Hub</h3>
                                <p className="text-lg text-white/80 mb-6">Richest content: science, empires, economies, stories, trends, culture, health, tourism</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">100+ Categories</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">Daily Updates</span>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm">AI Curated</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-r from-purple-900/80 to-blue-900/80 rounded-3xl mx-8 lg:mx-24 glass-card">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-8"
                    >
                        Ready to Transform?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl md:text-2xl text-white/90 mb-12"
                    >
                        Join 10K+ students mastering languages and building global businesses today
                    </motion.p>
                    <div className="flex flex-col lg:flex-row gap-6 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card gold-glow px-12 py-6 text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-2xl"
                        >
                            🆓 Start Free Trial
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card px-12 py-6 text-2xl font-bold border-2 border-yellow-400 hover:border-yellow-500 text-yellow-400 hover:bg-yellow-400/10"
                        >
                            📱 WhatsApp +255768868546
                        </motion.button>
                    </div>
                </div>
            </section>
        </main>
    )
}
