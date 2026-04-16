"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Award, Play, Trophy, Languages, TrendingUp, Share2, RotateCcw } from 'lucide-react';
import { languages } from '@/data/languages';
import confetti from 'canvas-confetti';
import Link from 'next/link';

interface TestResult {
    language: string;
    score: number;
    recommendedLevel: string;
    strengths: string[];
    weaknesses: string[];
}

const mockQuestions = {
    english: [
        // Vocabulary (10 questions)
        { type: 'vocab', question: 'What does "ubiquitous" mean?', options: ['Rare', 'Common everywhere', 'Expensive', 'Old-fashioned'], correct: 1 },
        { type: 'vocab', question: 'Synonym for "meticulous"?', options: ['Careless', 'Detailed', 'Quick', 'Lazy'], correct: 1 },
        // Grammar (8 questions)
        { type: 'grammar', question: 'Complete: "If it ___ tomorrow, we ___."', options: ['rains/will go', 'rained/would go', 'rains/go', 'rain/went'], correct: 1 },
        // Reading (4 questions)
        { type: 'reading', question: 'Short passage about climate change...', options: ['4 options'], correct: 0 }
    ],
    chinese: [
        { type: 'vocab', question: '妈 means:', options: ['Father', 'Mother', 'Brother', 'Sister'], correct: 1 },
        { type: 'grammar', question: 'Correct tone for 马:', options: ['mā', 'má', 'mǎ', 'mà'], correct: 2 }
    ],
    spanish: [
        { type: 'vocab', question: 'Perro means:', options: ['Cat', 'Dog', 'Bird', 'Fish'], correct: 1 }
    ],
    french: [
        { type: 'vocab', question: 'Chat means:', options: ['Dog', 'Cat', 'Bird', 'Fish'], correct: 1 }
    ],
    german: [
        { type: 'vocab', question: 'Hund means:', options: ['Cat', 'Dog', 'Bird', 'Fish'], correct: 1 }
    ],
    swahili: [
        { type: 'vocab', question: 'Mbwa means:', options: ['Cat', 'Dog', 'Bird', 'Fish'], correct: 1 }
    ]
};

const levelMapping = {
    english: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    chinese: ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'],
    spanish: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    french: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    german: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
    swahili: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
};

export default function PlacementTest() {
    const [step, setStep] = useState<'language' | 'test' | 'results'>('language');
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [timeLeft, setTimeLeft] = useState(45);
    const [timerActive, setTimerActive] = useState(false);
    const [results, setResults] = useState<TestResult | null>(null);

    const language = languages.find(l => l.slug === selectedLanguage);
    const questions = mockQuestions[selectedLanguage as keyof typeof mockQuestions] || [];

    const handleAnswer = (answer: number) => {
        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);

        if (currentQuestion + 1 >= questions.length) {
            // Complete test
            const score = (newAnswers.filter((ans, idx) => ans === questions[idx].correct).length / questions.length) * 100;
            const levelIndex = Math.min(Math.floor(score / 20), 5);
            const recommendedLevel = levelMapping[selectedLanguage as keyof typeof levelMapping]?.[levelIndex] || 'A1';

            const testResult: TestResult = {
                language: selectedLanguage,
                score: Math.round(score),
                recommendedLevel,
                strengths: ['Vocabulary recognition', 'Basic grammar'],
                weaknesses: ['Advanced reading comprehension', 'Listening skills']
            };

            setResults(testResult);
            localStorage.setItem('placement-test-results', JSON.stringify(testResult));
            setStep('results');

            // Confetti for completion
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }

        setTimerActive(false);
    };

    useEffect(() => {
        if (timerActive && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            handleAnswer(0); // Skip if time up
        }
    }, [timerActive, timeLeft]);

    const startTest = (lang: string) => {
        setSelectedLanguage(lang);
        setCurrentQuestion(0);
        setAnswers([]);
        setStep('test');
        setTimeLeft(45);
    };

    if (step === 'language') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
                <motion.div
                    className="glass-card p-16 max-w-4xl w-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="mb-16">
                        <div className="text-7xl mb-12">🎯</div>
                        <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-8">
                            Language Placement Test
                        </h1>
                        <p className="text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-16">
                            Take our adaptive test to discover your level and get personalized learning recommendations.
                            25 questions • 15 minutes • Instant results!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {languages.map((language) => (
                            <motion.button
                                key={language.slug}
                                onClick={() => startTest(language.slug)}
                                className="glass-card p-12 group hover:shadow-glow-emerald hover:scale-105 transition-all flex flex-col items-center text-center h-[300px] border-2 border-white/20 hover:border-emerald-400"
                                whileHover={{ y: -10 }}
                            >
                                <div className="text-6xl mb-6">{language.flag}</div>
                                <h3 className="text-3xl font-bold text-white mb-4">{language.name}</h3>
                                <div className="flex items-center gap-4 text-emerald-400 font-bold mb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-8 h-8" />
                                    <span>25 Questions</span>
                                </div>
                                <p className="text-lg text-white/70">{language.description}</p>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    if (step === 'test') {
        const question = questions[currentQuestion];

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                <div className="max-w-4xl mx-auto pt-24">
                    {/* Progress Bar */}
                    <div className="mb-16">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex-1 bg-white/10 rounded-full h-4">
                                <div
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-4 rounded-full transition-all"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                            <div className="text-2xl font-bold text-white min-w-[100px]">
                                Q {currentQuestion + 1} / {questions.length}
                            </div>
                        </div>

                        {timerActive && (
                            <motion.div
                                className={`text-center p-4 rounded-2xl font-bold text-3xl ${timeLeft < 15 ? 'bg-red-500/20 border-4 border-red-500' : 'bg-yellow-500/20 border-4 border-yellow-500'}`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                            >
                                ⏱️ {timeLeft}s
                            </motion.div>
                        )}
                    </div>

                    {/* Question */}
                    <motion.div
                        className="glass-card p-16 mb-20 text-center"
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-6xl mb-12" role="img" aria-label={question.type}>
                            {question.type === 'vocab' ? '📚' : question.type === 'grammar' ? '✍️' : '📖'}
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-12 leading-tight">
                            {question.question}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {question.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    disabled={timerActive && timeLeft === 0}
                                    className="p-10 rounded-3xl font-bold text-xl shadow-xl hover:shadow-emerald-500/50 transition-all flex-1 border-2 border-white/20 hover:border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="text-3xl mr-6">{String.fromCharCode(65 + index)}.</span>
                                    {option}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (step === 'results' && results) {
        const levelDescription = {
            'A1': 'Beginner - Basic phrases',
            'A2': 'Elementary - Simple sentences',
            'B1': 'Intermediate - Everyday conversations',
            'B2': 'Upper Intermediate - Complex topics',
            'C1': 'Advanced - Professional fluency',
            'C2': 'Mastery - Near-native',
            'HSK1': 'HSK 1 - Basic greetings',
            'HSK2': 'HSK 2 - Simple conversations',
            'HSK3': 'HSK 3 - Everyday life',
            'HSK4': 'HSK 4 - Work topics',
            'HSK5': 'HSK 5 - Advanced discussions',
            'HSK6': 'HSK 6 - Professional fluency'
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
                <motion.div
                    className="glass-card p-16 max-w-5xl w-full text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="mb-20">
                        <div className="text-8xl mb-12">🏆</div>
                        <h1 className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-8">
                            Test Complete!
                        </h1>
                        <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-16">
                            Your {language?.name || selectedLanguage.toUpperCase()} placement test is finished!
                        </p>
                    </div>

                    {/* Results */}
                    <motion.div
                        className="grid lg:grid-cols-2 gap-16 mb-20 items-start"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Score & Level */}
                        <div className="text-center lg:text-left">
                            <div className={`text-8xl mb-8 ${results.score >= 80 ? 'text-emerald-400 animate-bounce' :
                                    results.score >= 60 ? 'text-amber-400' :
                                        'text-orange-400'
                                }`}>
                                {results.score}%
                            </div>

                            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-12 rounded-4xl shadow-2xl border-8 border-white/10">
                                <h2 className="text-5xl font-black text-white mb-8">Recommended Level</h2>
                                <div className="text-7xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-8">
                                    {results.recommendedLevel}
                                </div>
                                <p className="text-xl text-white/80 leading-relaxed">
                                    {levelDescription[results.recommendedLevel as keyof typeof levelDescription]}
                                </p>
                            </div>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div>
                            <h3 className="text-4xl font-bold text-white mb-12 flex items-center gap-4">
                                <Brain className="w-12 h-12 text-emerald-400" />
                                Analysis
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-emerald-400 mb-6">✅ Strengths</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {results.strengths.map((strength, index) => (
                                            <motion.div key={index} className="glass-card p-8 text-emerald-400 font-bold text-xl">
                                                {strength}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-3xl font-bold text-orange-400 mb-6">⚠️ Areas to Improve</h4>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {results.weaknesses.map((weakness, index) => (
                                            <motion.div key={index} className="glass-card p-8 text-orange-400 font-bold text-xl border-2 border-orange-400/30">
                                                {weakness}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        <Link
                            href={`/languages/${selectedLanguage}/${results.recommendedLevel.toLowerCase()}`}
                            className="group flex flex-col items-center p-12 rounded-4xl bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 hover:-translate-y-4 transition-all duration-500 col-span-2 lg:col-span-1 text-white font-black text-2xl"
                        >
                            <Award className="w-24 h-24 mb-8 opacity-90 group-hover:scale-110 transition-transform" />
                            <div>🚀 Start Learning at</div>
                            <div className="text-5xl">{results.recommendedLevel}</div>
                        </Link>

                        <motion.button
                            onClick={() => {
                                setStep('language');
                                setResults(null);
                            }}
                            className="flex flex-col items-center p-12 rounded-4xl bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:bg-white/20 hover:border-white hover:shadow-glow-white transition-all text-white font-bold text-2xl shadow-xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            <RotateCcw className="w-24 h-24 mb-8" />
                            <div>Retake Test</div>
                        </motion.button>

                        <motion.button
                            onClick={() => {
                                const text = `I just completed my ${language?.name} placement test! Score: ${results.score}% - Recommended level: ${results.recommendedLevel} 🎓`;
                                window.open(`https://wa.me/255768868546?text=${encodeURIComponent(text)}`, '_blank');
                            }}
                            className="flex flex-col items-center p-12 rounded-4xl bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl hover:shadow-purple-500/50 hover:scale-105 hover:-translate-y-2 transition-all text-white font-bold text-2xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Share2 className="w-24 h-24 mb-8" />
                            <div>Share Results</div>
                            <div className="text-sm opacity-80">(WhatsApp)</div>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return null;
}

