"use client";
import { notFound } from 'next/navigation';
import { languages } from '@/data/languages';
import PronunciationGuide from '@/components/languages/PronunciationGuide';
import Link from 'next/link';
import { Mic, Play, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PronunciationPageProps {
    params: {
        lang: string;
    };
}

export default function LanguagePronunciationPage({ params }: PronunciationPageProps) {
    const languageSlug = params.lang;
    const language = languages.find(l => l.slug === languageSlug);

    if (!language) {
        notFound();
    }

    const languageFeatures = {
        english: {
            title: "English Pronunciation Mastery",
            subtitle: "44 Phonemes • American & British • Stress Patterns",
            difficultSounds: [
                { name: "Th Sounds", desc: "Unvoiced /θ/ (think) vs Voiced /ð/ (this)", icon: "👅" },
                { name: "R Sound", desc: "American R vs British non-rhotic", icon: "👄" },
                { name: "Vowel Pairs", desc: "Ship/Sheep, Bit/Beat contrasts", icon: "🔊" }
            ]
        },
        chinese: {
            title: "Chinese Tone Perfection",
            subtitle: "4 Tones + Neutral • Pinyin Mastery • 4000+ Characters",
            difficultSounds: [
                { name: "Tone Pairs", desc: "mā vs má vs mǎ vs mà", icon: "🎵" },
                { name: "Initials & Finals", desc: "21 initials + 36 finals combinations", icon: "🅰️" },
                { name: "Neutral Tone", desc: "Light fifth tone usage", icon: "🎯" }
            ]
        },
        spanish: {
            title: "Spanish Rolling R Perfection",
            subtitle: "24 Phonemes • Vibrante Múltiple • ñ & ch sounds",
            difficultSounds: [
                { name: "Rolling R", desc: "Single vs double tap R", icon: "🌀" },
                { name: "Ñ sound", desc: "Like 'canyon' in English", icon: "🧠" },
                { name: "Accent Stress", desc: "Written vs spoken stress", icon: "🎼" }
            ]
        },
        french: {
            title: "French Nasal Vowels Guide",
            subtitle: "36 Phonemes • Liaison • Silent Letters",
            difficultSounds: [
                { name: "Nasal Vowels", desc: "an/in/on/un", icon: "👃" },
                { name: "Liaison", desc: "Silent consonant linking", icon: "🔗" },
                { name: "R Gargle", desc: "French uvular R", icon: "🔊" }
            ]
        },
        german: {
            title: "German Umlaut Mastery",
            subtitle: "25 Phonemes • 4 Cases • ä ö ü ß",
            difficultSounds: [
                { name: "Umlauts", desc: "ä ö ü mouth positions", icon: "😮" },
                { name: "Ch Sounds", desc: "ich vs ach", icon: "💨" },
                { name: "ß Sharp S", desc: "Eszett pronunciation", icon: "✂️" }
            ]
        },
        swahili: {
            title: "Swahili Clear Sounds",
            subtitle: "24 Phonemes • No Tones • Noun Classes",
            difficultSounds: [
                { name: "Ng Sound", desc: "Like 'sing'", icon: "🗣️" },
                { name: "Stress", desc: "Second last syllable", icon: "🎵" },
                { name: "Ny Sound", desc: "Like 'canyon'", icon: "🧠" }
            ]
        }
    };

    const feature = languageFeatures[languageSlug as keyof typeof languageFeatures];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            {/* Hero */}
            <section className="relative py-32 lg:py-48 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply"
                    style={{ backgroundImage: `url(${language.heroImage})` }}
                />
                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-4 px-8 py-5 bg-white/10 backdrop-blur-xl rounded-4xl border border-white/20 mb-12">
                        <span className="text-4xl">{language.flag}</span>
                        <span className="text-3xl font-black uppercase tracking-wide">{language.name}</span>
                    </div>

                    <motion.h1
                        className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {feature.title}
                    </motion.h1>

                    <motion.p
                        className="text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto mb-16 leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {feature.subtitle}
                    </motion.p>

                    {/* Difficult Sounds */}
                    <motion.div
                        className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {feature.difficultSounds.map((sound, index) => (
                            <motion.div
                                key={sound.name}
                                className="glass-card p-10 group hover:shadow-glow-gold transition-all cursor-pointer"
                                whileHover={{ y: -8 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-5xl mb-6 opacity-80">{sound.icon}</div>
                                <h3 className="text-3xl font-bold text-white mb-6">{sound.name}</h3>
                                <p className="text-xl text-white/80 mb-8 leading-relaxed">{sound.desc}</p>
                                <button className="w-full px-8 py-4 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy font-bold rounded-2xl hover:shadow-glow-gold hover:scale-105 transition-all group-hover:bg-opacity-90">
                                    Practice {sound.name}
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Main Guide */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <PronunciationGuide languageSlug={languageSlug} />
                </div>
            </section>

            {/* Practice CTA */}
            <section className="py-24 bg-slate-900/50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Ready to Speak Fluently?
                    </h2>
                    <p className="text-2xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
                        Practice pronunciation with our interactive recorder and get instant feedback.
                    </p>

                    <div className="flex flex-col lg:flex-row gap-8 justify-center">
                        <Link
                            href={`/languages/${languageSlug}/pronunciation/practice`}
                            className="px-16 py-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 hover:-translate-y-2 transition-all duration-500"
                        >
                            🎤 Start Practice Session
                        </Link>

                        <Link
                            href={`/languages/${languageSlug}`}
                            className="px-16 py-8 border-2 border-gold/50 bg-white/10 backdrop-blur-xl text-white font-bold text-xl rounded-3xl hover:bg-white/20 hover:border-gold hover:shadow-glow-gold transition-all"
                        >
                            ← Back to {language.name}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

