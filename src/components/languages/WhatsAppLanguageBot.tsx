"use client";
import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppLanguageBotProps {
    language: string;
    currentLevel?: string;
}

export default function WhatsAppLanguageBot({ language, currentLevel }: WhatsAppLanguageBotProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [conversation, setConversation] = useState<string[]>([]);

    const botNumbers = [
        { name: "Kelvin (AI Tutor)", number: "255768868546", country: "🇹🇿" },
        { name: "Jubleth (AI Tutor)", number: "255767456512", country: "🇹🇿" }
    ];

    const quickReplies = [
        "Explain grammar rule",
        "Translate this sentence",
        "Help with pronunciation",
        "Give me practice exercises",
        "What's my level?"
    ];

    useEffect(() => {
        // Load conversation history from localStorage
        const savedConversation = localStorage.getItem(`language-bot-${language}`);
        if (savedConversation) {
            setConversation(JSON.parse(savedConversation));
        }
    }, [language]);

    const sendToWhatsApp = (message: string) => {
        const prefilledMessage = `Hi! I am learning ${language.toUpperCase()}. ${currentLevel ? `My level: ${currentLevel}. ` : ''}${message}
    
Help me learn better! 🚀`;

        const whatsappUrl = `https://wa.me/255${botNumbers[0].number}?text=${encodeURIComponent(prefilledMessage)}`;
        window.open(whatsappUrl, '_blank');
    };

    const addToConversation = (message: string) => {
        const newConversation = [...conversation, message];
        setConversation(newConversation);
        localStorage.setItem(`language-bot-${language}`, JSON.stringify(newConversation));
    };

    return (
        <div className="fixed bottom-24 right-6 z-50 group">
            {/* Main Bot Button */}
            <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-2xl border-4 border-white/20 hover:shadow-green-500/50 hover:scale-110 hover:-translate-y-2 transition-all duration-300 flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageCircle className="w-10 h-10 text-white drop-shadow-lg" />

                {/* Online Indicator */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 border-4 border-slate-900 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 border-4 border-slate-900 rounded-full" />
            </motion.button>

            {/* Expanded Panel */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="absolute bottom-28 right-0 w-96 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-xl">
                                🤖
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">AI Language Tutor</h3>
                                <p className="text-green-100 text-sm font-medium">Online - 24/7</p>
                            </div>
                        </div>
                        <p className="text-green-100 text-sm">Ask anything about {language.toUpperCase()}!</p>
                    </div>

                    {/* Quick Replies */}
                    <div className="p-6 space-y-3 border-t border-slate-200">
                        {quickReplies.map((reply, index) => (
                            <motion.button
                                key={reply}
                                onClick={() => {
                                    sendToWhatsApp(reply);
                                    addToConversation(`You: ${reply}`);
                                }}
                                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-blue-100 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all group text-left shadow-sm hover:shadow-md"
                                whileHover={{ x: 8 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                    Q{index + 1}
                                </div>
                                <span className="font-medium text-slate-800 group-hover:text-blue-700">{reply}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Conversation Preview */}
                    {conversation.length > 0 && (
                        <div className="p-6 border-t border-slate-200 bg-gradient-to-b from-slate-50/50 to-transparent">
                            <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                Recent Chats
                            </h4>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {conversation.slice(-3).map((msg, index) => (
                                    <div key={index} className="text-sm text-slate-700 p-3 bg-white rounded-xl shadow-sm">
                                        {msg}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* WhatsApp Numbers */}
                    <div className="p-6 space-y-3 border-t border-slate-200">
                        <h4 className="font-bold text-slate-800 mb-4">Live Tutors (Click to Message)</h4>
                        {botNumbers.map((bot, index) => (
                            <motion.button
                                key={bot.number}
                                onClick={() => sendToWhatsApp("Hi! I'm starting my language learning journey.")}
                                className="w-full flex items-center gap-4 p-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl hover:from-emerald-600 hover:to-green-700 shadow-xl hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all duration-300 font-semibold"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-lg font-bold">
                                    {bot.country}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-bold">{bot.name}</div>
                                    <div className="text-sm opacity-90">+255 {bot.number}</div>
                                </div>
                                <Phone className="w-5 h-5" />
                            </motion.button>
                        ))}
                    </div>

                    {/* Close Button */}
                    <div className="p-4 bg-slate-100/50">
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="w-full text-slate-700 font-bold py-3 px-6 rounded-2xl border-2 border-slate-300 hover:bg-slate-200 hover:border-slate-400 transition-all duration-200"
                        >
                            ✕ Close Chat
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Tooltip */}
            <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg text-slate-800 font-bold text-sm whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
            >
                {language.toUpperCase()} AI Tutor
                <span className="ml-2">🤖</span>
            </motion.div>
        </div>
    );
}

