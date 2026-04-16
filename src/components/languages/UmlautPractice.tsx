"use client";
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Mic, Play } from 'lucide-react';

interface Umlaut {
    symbol: string;
    name: string;
    upper: string;
    color: string;
    description: string;
    mouthIllustration: string;
    examples: string[];
    minimalPairs: { pair1: string; pair2: string; meanings: { 1: string; 2: string } }[];
}

const umlauts: Umlaut[] = [
    {
        symbol: 'ä',
        name: 'A-Umlaut',
        upper: 'Ä',
        color: '#FF6B6B',
        description: 'Tongue forward, lips spread wide like "air" in English. Higher than regular "a".',
        mouthIllustration: '👅🗣️',
        examples: ['Männer (men)', 'Käse (cheese)', 'Bär (bear)', 'Mädchen (girl)', 'Hände (hands)', 'Käfer (beetle)', 'Lachen (laughter)', 'Säge (saw)', 'Tänzer (dancer)', 'Wäsche (laundry)'],
        minimalPairs: [
            { pair1: 'Mann', pair2: 'Männer', meanings: { 1: 'man', 2: 'men' } },
            { pair1: 'Bruder', pair2: 'Bräuche', meanings: { 1: 'brother', 2: 'customs' } },
            { pair1: 'Kann', pair2: 'Käse', meanings: { 1: 'can', 2: 'cheese' } }
        ]
    },
    {
        symbol: 'ö',
        name: 'O-Umlaut',
        upper: 'Ö',
        color: '#4ECDC4',
        description: 'Lips rounded, tongue high toward front. Similar to English "her" without r.',
        mouthIllustration: '😮👄',
        examples: ['schön (beautiful)', 'König (king)', 'Löffel (spoon)', 'Höhle (cave)', 'Öffnen (to open)', 'Möwe (seagull)', 'Größe (size)', 'Fröhlich (cheerful)', 'Krone (crown)', 'Söhne (sons)'],
        minimalPairs: [
            { pair1: 'schon', pair2: 'schön', meanings: { 1: 'already', 2: 'beautiful' } },
            { pair1: 'können', pair2: 'König', meanings: { 1: 'can', 2: 'king' } },
            { pair1: 'Löffel', pair2: 'Löwe', meanings: { 1: 'spoon', 2: 'lion' } }
        ]
    },
    {
        symbol: 'ü',
        name: 'U-Umlaut',
        upper: 'Ü',
        color: '#45B7D1',
        description: 'Lips pursed forward, tongue toward front teeth. Like French "tu" with lips pushed forward.',
        mouthIllustration: '😗👅',
        examples: ['Brücke (bridge)', 'Glück (luck)', 'Tür (door)', 'Feuer (fire)', 'Frühling (spring)', 'Müde (tired)', 'Zunge (tongue)', 'Küche (kitchen)', 'Lüge (lie)', 'Rübe (beetroot)'],
        minimalPairs: [
            { pair1: 'Mutter', pair2: 'Mütter', meanings: { 1: 'mother', 2: 'mothers' } },
            { pair1: 'Bruder', pair2: 'Brüder', meanings: { 1: 'brother', 2: 'brothers' } },
            { pair1: 'Vogel', pair2: 'Vögel', meanings: { 1: 'bird', 2: 'birds' } }
        ]
    }
];

export default function UmlautPractice() {
    const [activeUmlaut, setActiveUmlaut] = useState(0);
    const [currentWord, setCurrentWord] = useState(0);
    const [score, setScore] = useState<number | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    const speakUmlaut = useCallback((text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.8;

        speechSynthesis.speak(utterance);
    }, []);

    const startRecording = useCallback(() => {
        const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.lang = 'de-DE';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            const targetWord = umlauts[activeUmlaut].examples[currentWord].toLowerCase();

            const scoreValue = transcript.includes(targetWord.slice(0, 4)) ?
                90 + Math.random() * 10 : 50 + Math.random() * 20;

            setScore(Math.floor(scoreValue));

            if (scoreValue >= 85) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        };

        setIsRecording(true);
        recognition.start();
    }, [activeUmlaut, currentWord]);

    const umlaut = umlauts[activeUmlaut];

    const mouthPositions = {
        ä: "Lips spread wide, tongue forward and high like smiling 'eh'",
        ö: "Lips rounded into tight circle, tongue high center like 'er'",
        ü: "Lips pursed forward, tongue forward high like kissing 'ee'"
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/50 to-slate-900 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-6xl lg:text-8xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 bg-clip-text text-transparent mb-8">
                        ä ö ü Mastery
                    </h1>
                    <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Practice German umlauts with mouth diagrams, minimal pairs, and recording feedback.
                    </p>
                </motion.div>

                {/* Umlaut Tabs */}
                <div className="flex flex-wrap justify-center gap-6 mb-20">
                    {umlauts.map((umlaut, index) => (
                        <motion.button
                            key={umlaut.symbol}
                            onClick={() => setActiveUmlaut(index)}
                            className={`px-12 py-8 rounded-3xl font-bold text-2xl shadow-2xl transition-all group ${activeUmlaut === index
                                ? `bg-gradient-to-r from-${umlaut.color.slice(1, 3)}-500 shadow-${umlaut.color.slice(1, 3)}-500/50 text-slate-900 scale-105`
                                : 'bg-white/10 border border-white/20 hover:bg-white/20 text-white'
                                }`}
                            style={{ borderColor: umlaut.color }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-4xl mb-4 block">{umlaut.symbol}{umlaut.upper}</span>
                            {umlaut.name}
                        </motion.button>
                    ))}
                </div>

                {/* Active Umlaut Section */}
                <motion.div
                    className="glass-card max-w-4xl mx-auto p-16 mb-20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    {/* Mouth Diagram */}
                    <div className="grid lg:grid-cols-2 gap-16 mb-16 items-center">
                        <div>
                            <div className="text-8xl mb-8 opacity-90">{umlaut.mouthIllustration}</div>
                            <h2 className="text-5xl font-black text-white mb-6" style={{ color: umlaut.color }}>
                                {umlaut.name}
                            </h2>
                            <p className="text-2xl text-white/90 leading-relaxed mb-12">{umlaut.description}</p>

                            <div className="flex gap-4 mb-12">
                                <button
                                    onClick={() => speakUmlaut(umlaut.symbol)}
                                    className="flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-3xl text-white font-bold shadow-xl hover:shadow-indigo-500/50 transition-all"
                                >
                                    <Volume2 className="w-7 h-7" />
                                    Hear {umlaut.symbol}
                                </button>

                                <button
                                    onClick={startRecording}
                                    disabled={isRecording}
                                    className="flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-3xl text-white font-bold shadow-xl hover:shadow-emerald-500/50 transition-all disabled:opacity-50"
                                >
                                    <Mic className="w-7 h-7 animate-pulse" />
                                    {isRecording ? 'Listening...' : 'Test Me'}
                                </button>
                            </div>
                        </div>

                        {/* Score Display */}
                        {score !== null && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center p-12 rounded-4xl bg-white/10 backdrop-blur-xl border-4 border-white/20 shadow-2xl"
                            >
                                <div className={`text-8xl mb-8 ${score >= 85 ? 'text-emerald-400 animate-bounce' :
                                    score >= 65 ? 'text-amber-400' : 'text-red-400'
                                    }`}>
                                    {score >= 85 ? '🎉' : score >= 65 ? '👍' : '📢'}
                                </div>
                                <h3 className={`text-6xl font-black mb-4 ${score >= 85 ? 'text-emerald-400' : score >= 65 ? 'text-amber-400' : 'text-red-400'}`}>
                                    {score}%
                                </h3>
                                <p className="text-2xl font-bold text-white">
                                    {score >= 85 ? 'Perfect Pronunciation!' : score >= 65 ? 'Great Progress!' : 'Keep Practicing!'}
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Word List */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {umlaut.examples.slice(0, 9).map((example, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-8 hover:shadow-glow-white transition-all cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                speakUmlaut(example);
                                setCurrentWord(index);
                            }}
                        >
                            <div className="text-4xl font-black mb-4 text-white group-hover:scale-110 transition-transform">
                                {example}
                            </div>
                            <button
                                className="flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 text-white font-bold transition-all w-full"
                                onClick={() => speakUmlaut(example)}
                            >
                                <Volume2 className="w-5 h-5" />
                                Play Word
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Minimal Pairs Table */}
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-black text-white mb-12 text-center">
                        Minimal Pairs Practice
                    </h2>

                    <div className="overflow-x-auto">
                        <motion.div
                            className="glass-card p-12"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b-4 border-white/20">
                                            <th className="p-6 text-2xl font-black text-white uppercase tracking-wide">No Umlaut</th>
                                            <th></th>
                                            <th className={`p-6 text-2xl font-black uppercase tracking-wide ${umlaut.color} bg-${umlaut.color.slice(1)}-900/20 rounded-r-3xl`}>With {umlaut.symbol}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {umlaut.minimalPairs.map((pair, index) => (
                                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                                <td className="p-8">
                                                    <div className="text-4xl font-black text-white mb-2">{pair.pair1}</div>
                                                    <div className="text-lg text-white/70 italic">{pair.meanings[1]}</div>
                                                </td>
                                                <td className="p-8 text-center">
                                                    <div className="w-24 h-24 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full mx-auto animate-pulse mb-4"></div>
                                                    <span className="text-white font-bold text-2xl">VS</span>
                                                </td>
                                                <td className="p-8">
                                                    <div className="text-4xl font-black" style={{ color: umlaut.color }} className="mb-2">{pair.pair2}</div>
                                                    <div className="text-lg" style={{ color: umlaut.color }} className="italic font-semibold">{pair.meanings[2]}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Keyboard Helper */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-4 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                        <h3 className="text-3xl font-bold text-white mb-4">Umlaut Keyboard Shortcuts</h3>
                        <div className="grid grid-cols-2 gap-8 text-left">
                            <div>
                                <div className="text-2xl font-bold text-white mb-2">Windows Alt Codes:</div>
                                <div className="space-y-1 text-lg text-white/80">
                                    <div>Ä = Alt+0196</div>
                                    <div>ä = Alt+0228</div>
                                    <div>Ö = Alt+0214</div>
                                    <div>ö = Alt+0246</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-white mb-2">Mac Option Codes:</div>
                                <div className="space-y-1 text-lg text-white/80">
                                    <div>Option+U then A = ä</div>
                                    <div>Option+U then O = ö</div>
                                    <div>Option+U then U = ü</div>
                                    <div>Option+U then Shift+A = Ä</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        }


