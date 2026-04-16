"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Mic, BookOpen, Users, Clock, CheckCircle } from 'lucide-react';
// import { languages } from '@/data/languages';

export default function LanguagePracticeGroup() {
    const [activeTab, setActiveTab] = useState('challenges');

    const weeklyChallenge = {
        title: "Past Tense Storytelling Challenge",
        description: "Write a 5-sentence story using past tense. Best stories get featured!",
        deadline: "Friday, 8 PM",
        participants: 234,
        submissions: 89,
        language: "English"
    };

    const practiceRequests = [
        {
            id: 1,
            title: "Spanish Conversation Partner - 7 PM Tonight",
            language: "Spanish",
            level: "B1",
            participants: 3,
            maxParticipants: 4,
            time: "Today 7:00 PM UTC"
        },
        {
            id: 2,
            title: "HSK4 Reading Practice Group",
            language: "Chinese",
            level: "HSK4",
            participants: 8,
            maxParticipants: 12,
            time: "Tomorrow 9:00 AM UTC"
        }
    ];

    return (
        <motion.div
            className="glass-card p-12 rounded-4xl shadow-2xl border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-12">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-white/20">
                    🎯
                </div>
                <div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                        Language Practice Zone
                    </h2>
                    <p className="text-2xl text-white/80">Weekly challenges, conversation partners, and peer feedback</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-white/5 backdrop-blur-xl rounded-3xl p-1 mb-12 border border-white/10">
                {[
                    { tab: 'challenges', icon: Award, label: 'Challenges' },
                    { tab: 'requests', icon: Users, label: 'Practice Requests' },
                    { tab: 'vocabulary', icon: BookOpen, label: 'Vocab Sharing' },
                    { tab: 'pronunciation', icon: Mic, label: 'Pronunciation' }
                ].map(({ tab, icon: Icon, label }) => (
                    <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-6 px-8 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === tab
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 shadow-xl'
                            : 'text-white/70 hover:text-white hover:bg-white/20'
                            }`}
                        whileHover={{ scale: 1.02 }}
                    >
                        <Icon className="w-6 h-6" />
                        {label}
                    </motion.button>
                ))}
            </div>

            {/* Challenges Tab */}
            {activeTab === 'challenges' && (
                <div className="space-y-8">
                    {/* Current Weekly Challenge */}
                    <motion.div
                        className="glass-card p-12 rounded-3xl border-2 border-emerald-400/30 shadow-glow-emerald bg-gradient-to-br from-emerald-500/5 to-teal-500/5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="flex items-start gap-6 mb-8">
                            <Award className="w-20 h-20 text-emerald-400 shadow-2xl mt-2 flex-shrink-0" />
                            <div>
                                <h3 className="text-4xl font-black text-white mb-4">
                                    {weeklyChallenge.title}
                                </h3>
                                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                                    {weeklyChallenge.description}
                                </p>
                                <div className="flex flex-wrap gap-6 items-center text-lg">
                                    <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-2xl">
                                        <Clock className="w-6 h-6" />
                                        <span className="font-bold">Closes {weeklyChallenge.deadline}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-2xl">
                                        <Users className="w-6 h-6" />
                                        <span className="font-bold">{weeklyChallenge.participants} participants</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-2xl">
                                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                                        <span className="font-bold">{weeklyChallenge.submissions} submissions</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                            <motion.button
                                className="px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Submit Your Entry
                            </motion.button>
                            <motion.button
                                className="px-12 py-6 border-2 border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-bold rounded-3xl hover:shadow-glow-white transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                View Entries
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Past Challenges */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Vocabulary Flashcard Challenge", status: "completed", winners: 3 },
                            { title: "Pronunciation Contest", status: "ongoing", participants: 156 },
                            { title: "Grammar Quiz Battle", status: "completed", winners: 5 }
                        ].map((challenge, index) => (
                            <motion.div
                                key={index}
                                className="glass-card p-8 rounded-3xl hover:shadow-glow-emerald hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-emerald-400/50"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center font-bold text-xl text-white shadow-lg mt-1">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white mb-2">{challenge.title}</h4>
                                        <div className="flex items-center gap-4 text-sm text-white/70">
                                            {challenge.status === 'completed' && (
                                                <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/30">
                                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                                    <span>Completed</span>
                                                </div>
                                            )}
                                            {challenge.status === 'ongoing' && (
                                                <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-xl border border-yellow-500/30">
                                                    <Clock className="w-5 h-5 text-yellow-400" />
                                                    <span>{challenge.participants} active</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <motion.button
                                    className="w-full px-8 py-6 bg-gradient-to-r from-emerald-500/80 to-teal-600/80 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-3xl shadow-lg hover:shadow-emerald-500/50 transition-all"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    View Challenge
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Practice Requests Tab */}
            {activeTab === 'requests' && (
                <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {practiceRequests.map((request) => (
                            <motion.div
                                key={request.id}
                                className="glass-card p-10 rounded-3xl hover:shadow-glow-emerald transition-all cursor-pointer border-2 border-transparent hover:border-emerald-400/50"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-start gap-6 mb-8">
                                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl">
                                        👥
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-black text-white mb-4">{request.title}</h3>
                                        <div className="flex items-center gap-6 text-xl mb-6">
                                            <div className="flex items-center gap-2">
                                                {languages.find(l => l.name === request.language)?.flag}
                                                <span className="font-bold">{request.language}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold">{request.participants}/{request.maxParticipants}</span>
                                            </div>
                                        </div>
                                        <div className="text-lg text-white/80 mb-8">
                                            Need practice partner for conversation. Level {request.level} • {request.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                    <motion.button
                                        className="flex-1 px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-3xl shadow-lg hover:shadow-emerald-500/50 transition-all"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        Request to Join
                                    </motion.button>
                                    <motion.button
                                        className="px-8 py-6 border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white font-bold rounded-3xl hover:bg-white/20 transition-all flex-1"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        View Details
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Vocabulary Tab */}
            {activeTab === 'vocabulary' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        className="glass-card p-12 rounded-3xl text-center border-2 border-purple-400/30"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <div className="text-7xl mb-8">📚</div>
                        <h3 className="text-4xl font-black text-white mb-6">Word of the Day</h3>
                        <div className="text-6xl font-black text-purple-400 mb-8">食べる</div>
                        <p className="text-xl text-white/90 mb-12">taberu - to eat (Japanese)</p>
                        <div className="flex gap-4">
                            <motion.button className="flex-1 p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-3xl shadow-lg hover:shadow-purple-500/50 transition-all" whileHover={{ scale: 1.02 }}>
                                Add to Vocab
                            </motion.button>
                            <motion.button className="flex-1 p-6 border-2 border-white/20 bg-white/10 text-white font-bold rounded-3xl hover:bg-white/20 transition-all" whileHover={{ scale: 1.02 }}>
                                Practice
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* User Submitted Vocab */}
                    <motion.div className="glass-card p-8 rounded-3xl lg:col-span-2" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-3 h-12 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-full" />
                            <h3 className="text-3xl font-black text-white">Community Vocab</h3>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { word: '食べる', meaning: 'to eat', language: 'Japanese', upvotes: 24 },
                                { word: 'hablar', meaning: 'to speak', language: 'Spanish', upvotes: 18 },
                                { word: 'sprechen', meaning: 'to speak', language: 'German', upvotes: 15 }
                            ].map((vocab, index) => (
                                <motion.div key={index} className="p-6 hover:bg-white/10 rounded-2xl transition-all cursor-pointer group" whileHover={{ scale: 1.02 }}>
                                    <div className="text-3xl font-black text-purple-400 mb-3">{vocab.word}</div>
                                    <div className="text-lg text-white/80 mb-4">{vocab.meaning}</div>
                                    <div className="flex items-center gap-2 text-sm text-white/60">
                                        <span>{vocab.language}</span>
                                        <div className="flex items-center gap-1 ml-auto">
                                            <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg group-hover:scale-110 transition-transform" />
                                            <span>{vocab.upvotes}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Pronunciation Tab */}
            {activeTab === 'pronunciation' && (
                <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div className="glass-card p-12 rounded-3xl" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
                            <div className="flex items-center gap-4 mb-8">
                                <Mic className="w-12 h-12 text-emerald-400 shadow-2xl" />
                                <h3 className="text-4xl font-black text-white">Pronunciation Feedback</h3>
                            </div>
                            <p className="text-xl text-white/90 mb-12">Record your pronunciation and get feedback from native speakers.</p>
                            <motion.button className="w-full p-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-emerald-500/50 transition-all text-xl" whileHover={{ scale: 1.02 }}>
                                🎤 Record Audio
                            </motion.button>
                        </motion.div>

                        <motion.div className="glass-card p-12 rounded-3xl" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
                            <div className="flex items-center gap-4 mb-8">
                                <PlayCircle className="w-12 h-12 text-purple-400 shadow-2xl" />
                                <h3 className="text-4xl font-black text-white">Native Speaker Samples</h3>
                            </div>
                            <p className="text-xl text-white/90 mb-12">Listen to native pronunciation and compare.</p>
                            <div className="space-y-4">
                                {['Hello', 'Thank you', 'Good morning'].map((phrase, index) => (
                                    <motion.button key={index} className="w-full p-6 bg-white/10 hover:bg-white/20 rounded-2xl text-left text-white font-bold transition-all flex items-center gap-4" whileHover={{ scale: 1.01 }}>
                                        <PlayCircle className="w-8 h-8 text-purple-400 flex-shrink-0" />
                                        <span>{phrase}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

