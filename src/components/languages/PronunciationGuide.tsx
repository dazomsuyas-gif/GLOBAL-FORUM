"use client";
import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Mic, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { languages } from '@/data/languages';

interface PronunciationData {
    vowels: Sound[];
    consonants: Sound[];
    stress: StressRule[];
    difficultSounds: DifficultSound[];
    practiceWords: PracticeWord[];
}

interface Sound {
    symbol: string;
    ipa: string;
    audioWord: string;
    description: string;
    mouthShape?: string;
    isVoiced?: boolean;
}

interface StressRule {
    rule: string;
    examples: string[];
}

interface DifficultSound {
    sound: string;
    commonError: string;
    tip: string;
    practiceWord: string;
}

interface PracticeWord {
    word: string;
    phonetic: string;
    meaning: string;
    difficulty: 'easy' | 'medium' | 'hard';
}

interface PronunciationGuideProps {
    languageSlug: string;
}

export default function PronunciationGuide({ languageSlug }: PronunciationGuideProps) {
    const [activeTab, setActiveTab] = useState('vowels');
    const [currentWord, setCurrentWord] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [recognition, setRecognition] = useState<any>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const language = languages.find(l => l.slug === languageSlug);

    // Mock pronunciation data (replace with src/data/pronunciationData.ts)
    const pronunciationData: PronunciationData = {
        vowels: [
            { symbol: 'a', ipa: '/æ/', audioWord: 'cat', description: 'Short a as in cat. Open mouth.', mouthShape: '🗣️' },
            { symbol: 'e', ipa: '/ɛ/', audioWord: 'bed', description: 'Short e as in bed.' },
            { symbol: 'i', ipa: '/ɪ/', audioWord: 'sit', description: 'Short i as in sit.' },
            // Add more for each language...
        ],
        consonants: [
            { symbol: 'th', ipa: '/θ/', audioWord: 'think', description: 'Unvoiced th. Tongue between teeth.', isVoiced: false },
            { symbol: 'r', ipa: '/r/', audioWord: 'red', description: 'American R sound.' },
            // Add more...
        ],
        stress: [
            { rule: 'Stress first syllable in nouns', examples: ['TAble', 'PENcil', 'WAter'] }
        ],
        difficultSounds: [
            { sound: 'th', commonError: 't or d sound', tip: 'Tongue between teeth, blow air', practiceWord: 'think' }
        ],
        practiceWords: [
            { word: 'think', phonetic: '/θɪŋk/', meaning: 'to consider', difficulty: 'hard' },
            { word: 'red', phonetic: '/rɛd/', meaning: 'color', difficulty: 'medium' },
            { word: 'very', phonetic: '/vɛri/', meaning: 'extremely', difficulty: 'easy' }
        ]
    };

    const speak = useCallback((text: string, rate = 1) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.lang = languageSlug === 'chinese' ? 'zh-CN' : `${languageSlug === 'german' ? 'de-DE' : 'en-US'}`;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);

        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }, [languageSlug]);

    const startRecording = useCallback(() => {
        const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.lang = languageSlug === 'chinese' ? 'zh-CN' : `${languageSlug === 'german' ? 'de-DE' : 'en-US'}`;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript.toLowerCase().trim();
            const targetWord = pronunciationData.practiceWords[currentWord].word.toLowerCase();

            // Simple scoring logic (replace with real API later)
            const score = transcript === targetWord ? 100 : transcript.includes(targetWord.slice(0, 3)) ? 70 : 40;
            setScore(score);

            if (score >= 80) {
                // Correct!
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.6 }
                });
            }
        };

        recognition.onend = () => setIsRecording(false);

        setRecognition(recognition);
        recognition.start();
        setIsRecording(true);
    }, [currentWord, languageSlug]);

    const nextWord = () => {
        setCurrentWord((prev) => (prev + 1) % pronunciationData.practiceWords.length);
        setScore(null);
    };

    if (!language) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900">
            {/* Hero */}
            <section className="relative py-24 lg:py-32 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 to-transparent" />
                <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-12">
                    {language.name} Pronunciation Guide
                </h1>
                <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-16">
                    Master {language.name} sounds with interactive audio, mouth diagrams, and practice exercises.
                </p>
            </section>

            {/* Tabs */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
                <div className="flex flex-wrap gap-4 justify-center mb-16">
                    {['vowels', 'consonants', 'stress', 'difficultSounds'] as const.map((tab) => (
                    <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-4 rounded-3xl font-bold transition-all ${activeTab === tab
                            ? 'bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy shadow-glow-gold'
                            : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                            }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
                    </motion.button>
          ))}
                </div>

                {/* Content by Tab */}
                {activeTab === 'vowels' && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {pronunciationData.vowels.map((vowel, index) => (
                            <motion.div
                                key={vowel.symbol}
                                className="glass-card p-10 text-center group hover:shadow-glow-gold transition-all"
                                whileHover={{ y: -8 }}
                            >
                                <div className="text-6xl mb-6">{vowel.mouthShape || '🗣️'}</div>
                                <h3 className="text-3xl font-black text-white mb-4">{vowel.symbol}</h3>
                                <p className="text-white/80 mb-6 text-lg italic">{vowel.ipa}</p>
                                <div className="flex gap-4 justify-center mb-8">
                                    <button
                                        onClick={() => speak(vowel.audioWord, 0.7)}
                                        className="p-4 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 transition-all flex items-center gap-2 text-white font-bold"
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                        <span>Slow (0.7x)</span>
                                    </button>
                                    <button
                                        onClick={() => speak(vowel.audioWord)}
                                        className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-2xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2 text-white font-bold"
                                    >
                                        <Volume2 className="w-5 h-5" />
                                        <span>Normal</span>
                                    </button>
                                </div>
                                <p className="text-xl text-white/90">{vowel.description}</p>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Practice Section */}
                <div className="mt-24">
                    <h2 className="text-5xl font-black text-white mb-16 text-center">Practice Time</h2>

                    <div className="glass-card p-12 mb-12">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-bold text-white mb-4">Practice Word #{currentWord + 1}</h3>
                            <motion.div
                                className="inline-block p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl mb-8"
                                animate={{ rotateY: score ? (score / 100) * 10 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-6xl font-black text-gold mb-6">{pronunciationData.practiceWords[currentWord].word}</div>
                                <div className="text-2xl text-white/70 italic">{pronunciationData.practiceWords[currentWord].phonetic}</div>
                            </motion.div>
                            <p className="text-xl text-white/80 mb-8">{pronunciationData.practiceWords[currentWord].meaning}</p>
                        </div>

                        <div className="flex flex-wrap gap-6 justify-center items-center mb-12">
                            <button
                                onClick={() => speak(pronunciationData.practiceWords[currentWord].word, 0.7)}
                                className="flex items-center gap-3 px-8 py-4 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 font-bold text-white transition-all"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Play Slow
                            </button>

                            <button
                                onClick={() => speak(pronunciationData.practiceWords[currentWord].word)}
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-2xl shadow-lg hover:shadow-green-500/50 font-bold text-white transition-all"
                            >
                                <Volume2 className="w-5 h-5" />
                                Play Normal
                            </button>

                            <button
                                onClick={startRecording}
                                disabled={isRecording}
                                className="flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-2xl shadow-lg hover:shadow-red-500/50 font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Mic className={`w-5 h-5 ${isRecording ? 'animate-pulse' : ''}`} />
                                {isRecording ? 'Listening...' : 'Record & Compare'}
                            </button>
                        </div>

                        {score !== null && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`text-center p-12 rounded-3xl font-bold text-3xl mb-12 shadow-2xl ${score >= 80 ? 'bg-green-500/20 border-4 border-green-500 text-green-400' :
                                    score >= 60 ? 'bg-yellow-500/20 border-4 border-yellow-500 text-yellow-400' :
                                        'bg-red-500/20 border-4 border-red-500 text-red-400'
                                    }`}
                            >
                                {score >= 80 && '🎉 Perfect Pronunciation!'}
                                {score >= 60 && score < 80 && '👍 Good Job! Almost Perfect!'}
                                {score < 60 && '📢 Keep Practicing!'}
                                <div className="text-6xl mt-6">{score}%</div>
                            </motion.div>
                        )}

                        <div className="flex justify-center">
                            <button
                                onClick={nextWord}
                                className="flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-gold via-yellow-400 to-orange-500 text-navy font-black text-xl rounded-3xl shadow-2xl hover:shadow-glow-gold hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                            >
                                Next Word ➡️
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

