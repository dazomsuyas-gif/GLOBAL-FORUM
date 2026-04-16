"use client";
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Mic, Play, RotateCcw } from 'lucide-react';

interface Tone {
    number: number;
    pinyin: string;
    character: string;
    meaning: string;
    color: string;
    contour: string;
    exampleWords: string[];
}

const tones: Tone[] = [
    {
        number: 1,
        pinyin: "mā",
        character: "妈",
        meaning: "mother",
        color: "#FF0000", // Red
        contour: "¯",
        exampleWords: ["妈 mā", "麻 má", "马 mǎ", "骂 mà", "吗 ma"]
    },
    {
        number: 2,
        pinyin: "má",
        character: "麻",
        meaning: "hemp/flax",
        color: "#FFA500", // Orange
        contour: "ˊ",
        exampleWords: ["买 mǎi", "卖 mài", "太 tài", "四 sì"]
    },
    {
        number: 3,
        pinyin: "mǎ",
        character: "马",
        meaning: "horse",
        color: "#00AA00", // Green
        contour: "ˇ",
        exampleWords: ["喝 hē", "你 nǐ", "五 wǔ", "好 hǎo"]
    },
    {
        number: 4,
        pinyin: "mà",
        character: "骂",
        meaning: "to scold",
        color: "#0000FF", // Blue
        contour: "ˋ",
        exampleWords: ["四 sì", "十 shí", "快 kuài", "大 dà"]
    },
    {
        number: 5,
        pinyin: "ma",
        character: "吗",
        meaning: "question particle",
        color: "#808080", // Gray
        contour: "·",
        exampleWords: ["是 shì", "的 de", "了 le", "吗 ma"]
    }
];

interface TonePracticeProps { }

export default function TonePractice({ }: TonePracticeProps) {
    const [activeTone, setActiveTone] = useState(0);
    const [tonePair, setTonePair] = useState([0, 1]);
    const [userScore, setUserScore] = useState<Record<number, number>>({});
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    const speakTone = useCallback((toneIndex: number, speed = 1) => {
        const utterance = new SpeechSynthesisUtterance(tones[toneIndex].pinyin);
        utterance.rate = speed;
        utterance.lang = 'zh-CN';
        utterance.pitch = toneIndex === 0 ? 1.0 : toneIndex === 1 ? 0.8 : toneIndex === 2 ? 0.6 : toneIndex === 3 ? 1.0 : 0.7;

        utterance.onstart = () => console.log('Speaking tone', toneIndex);
        utterance.onend = () => console.log('Finished speaking');

        speechSynthesis.speak(utterance);
    }, []);

    const startToneRecording = useCallback(() => {
        const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.lang = 'zh-CN';
        recognition.continuous = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            const targetPinyin = tones[activeTone].pinyin.toLowerCase();

            // Simple matching logic (replace with real pitch detection)
            const score = transcript.includes(targetPinyin) ? 90 : 60;
            setUserScore(prev => ({ ...prev, [activeTone]: score }));

            if (score >= 80) {
                confetti({
                    particleCount: 80,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0.5, y: 0.6 }
                });
            }
        };

        recognition.start();
        setIsRecording(true);
        setRecognition(recognition);
    }, [activeTone]);

    const nextTonePair = () => {
        const firstTone = Math.floor(Math.random() * 5);
        const secondTone = Math.floor(Math.random() * 5);
        setTonePair([firstTone, secondTone]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.h1
                    className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-pink-400 text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    🎵 Chinese Tone Practice
                </motion.h1>

                {/* Tone Cards */}
                <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8 mb-24">
                    {tones.map((tone, index) => (
                        <motion.div
                            key={tone.number}
                            className="glass-card p-12 text-center group hover:shadow-glow-purple transition-all relative cursor-pointer rounded-3xl"
                            onClick={() => setActiveTone(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ borderColor: tone.color }}
                        >
                            {/* Contour Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 opacity-50 group-hover:opacity-80 transition-opacity" />

                            {/* Tone Number */}
                            <div className="text-6xl font-black mb-6" style={{ color: tone.color }}>
                                {tone.number}
                            </div>

                            {/* Character & Pinyin */}
                            <div className="text-7xl font-black mb-4" style={{ color: tone.color }}>
                                {tone.character}
                            </div>
                            <div className="text-4xl font-bold mb-6 opacity-90" style={{ color: tone.color }}>
                                {tone.contour}{tone.pinyin}
                            </div>

                            <p className="text-xl text-white/90 mb-8 font-semibold">{tone.meaning}</p>

                            {/* Score Badge */}
                            {userScore[tone.number] && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className={`px-8 py-4 rounded-2xl font-bold text-2xl mb-6 shadow-2xl ${userScore[tone.number] >= 80 ? 'bg-green-500/20 border-4 border-green-500 text-green-400' :
                                        'bg-yellow-500/20 border-4 border-yellow-500 text-yellow-400'
                                        }`}
                                >
                                    {userScore[tone.number]}%
                                </motion.div>
                            )}

                            {/* Practice Buttons */}
                            <div className="flex gap-4 justify-center">
                                <motion.button
                                    onClick={() => speakTone(index, 0.7)}
                                    className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-2xl border border-white/30 text-white font-bold transition-all"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Slow
                                </motion.button>

                                <motion.button
                                    onClick={() => speakTone(index)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-2xl shadow-lg hover:shadow-purple-500/50 text-white font-bold transition-all"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Volume2 className="w-5 h-5" />
                                    Play
                                </motion.button>

                                <motion.button
                                    onClick={startToneRecording}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-2xl shadow-lg hover:shadow-red-500/50 text-white font-bold transition-all"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Mic className="w-5 h-5" />
                                    Test Me
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Tone Pair Practice */}
                <section className="py-24">
                    <h2 className="text-5xl font-black text-white mb-16 text-center bg-gradient-to-r from-white via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Tone Pair Practice
                    </h2>

                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            className="glass-card p-16 text-center mb-16"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            <div className="grid grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="text-7xl font-black mb-8" style={{ color: tones[tonePair[0]].color }}>
                                        {tones[tonePair[0]].character}
                                    </div>
                                    <div className="text-4xl font-bold mb-6" style={{ color: tones[tonePair[0]].color }}>
                                        {tones[tonePair[0]].contour}{tones[tonePair[0]].pinyin}
                                    </div>
                                </div>

                                <div className="h-24 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"></div>

                                <div>
                                    <div className="text-7xl font-black mb-8" style={{ color: tones[tonePair[1]].color }}>
                                        {tones[tonePair[1]].character}
                                    </div>
                                    <div className="text-4xl font-bold mb-6" style={{ color: tones[tonePair[1]].color }}>
                                        {tones[tonePair[1]].contour}{tones[tonePair[1]].pinyin}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 justify-center mt-16">
                                <motion.button
                                    onClick={() => {
                                        speakTone(tonePair[0]);
                                        speakTone(tonePair[1], 0.8);
                                    }}
                                    className="px-12 py-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-3xl font-bold text-white shadow-lg hover:shadow-purple-500/50 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    🎵 Play Both Tones
                                </motion.button>

                                <motion.button
                                    onClick={startToneRecording}
                                    className="px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-3xl font-bold text-white shadow-lg hover:shadow-emerald-500/50 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    🎤 Record My Tones
                                </motion.button>

                                <motion.button
                                    onClick={nextTonePair}
                                    className="px-12 py-6 bg-white/10 border border-white/20 hover:bg-white/20 rounded-3xl font-bold text-white transition-all"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    🔄 New Pair
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Tone Contour Graph */}
                <section className="py-24 bg-slate-900/50">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-5xl font-black text-white mb-16 text-center">
                            Tone Contour Visualization
                        </h2>

                        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-8">
                            {tones.map((tone) => (
                                <div key={tone.number} className="glass-card p-12 text-center">
                                    <div className="text-6xl font-black mb-6" style={{ color: tone.color }}>
                                        {tone.contour}
                                    </div>

                                    <svg viewBox="0 0 300 200" className="mx-auto mb-8 w-64 h-32">
                                        {/* Pitch contour line */}
                                        <path
                                            d={tone.number === 1 ? "M 50 50 L 150 50 L 250 50" :
                                                tone.number === 2 ? "M 50 150 L 150 50 L 250 80" :
                                                    tone.number === 3 ? "M 50 120 L 150 160 L 250 80" :
                                                        tone.number === 4 ? "M 50 50 L 150 150 L 250 180" :
                                                            "M 50 120 L 150 140 L 250 140"}
                                            stroke={tone.color}
                                            strokeWidth="6"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="animate-draw"
                                        />
                                        {/* Pitch axis */}
                                        <line x1="50" y1="50" x2="50" y2="180" stroke="#666" strokeWidth="2" />
                                        <line x1="50" y1="180" x2="250" y2="180" stroke="#666" strokeWidth="2" />
                                        {/* Labels */}
                                        <text x="30" y="55" fill="#aaa" fontSize="14" fontWeight="bold">5</text>
                                        <text x="30" y="115" fill="#aaa" fontSize="14" fontWeight="bold">3</text>
                                        <text x="30" y="175" fill="#aaa" fontSize="14" fontWeight="bold">1</text>
                                    </svg>

                                    <button
                                        onClick={() => speakTone(tone.number)}
                                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-2xl text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all"
                                    >
                                        🎧 Hear Tone {tone.number}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            );
        }


