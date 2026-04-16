"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, UserPlus, Search, Phone, Video, MoreVertical, Edit3 } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

const mockChats = [
    {
        id: 'ana-garcia',
        user: {
            name: "Ana Garcia 🇪🇸",
            avatar: "🇪🇸",
            username: "@anagarcia",
            level: "B2 Spanish",
            online: true,
            lastMessage: "¡Hola! ¿Quieres practicar conversación española?",
            timestamp: "2 mins",
            unreadCount: 3
        }
    },
    {
        id: 'li-wei',
        user: {
            name: "Li Wei 🇨🇳",
            avatar: "🇨🇳",
            username: "@liweihsk",
            level: "HSK 4",
            online: false,
            lastMessage: "Great practice! Tone 3 is tricky but you're getting it 🎯",
            timestamp: "1h ago",
            unreadCount: 0
        }
    },
    {
        id: 'pierre-dupont',
        user: {
            name: "Pierre Dupont 🇫🇷",
            avatar: "🇫🇷",
            username: "@pierredelf",
            level: "DELF B2",
            online: true,
            lastMessage: "Merci pour l'aide avec les nasales! 👃",
            timestamp: "30 mins",
            unreadCount: 1
        }
    }
];

export default function MessagesInbox() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

    const filteredChats = mockChats.filter(chat =>
        chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex">
            {/* Chat List Sidebar */}
            <motion.aside
                className="w-full lg:w-96 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl border-r border-white/10 flex-shrink-0 flex flex-col"
                initial={false}
            >
                {/* Header */}
                <div className="p-8 border-b border-white/5 sticky top-0 bg-slate-900/95 backdrop-blur-xl z-20">
                    <div className="flex items-center gap-4 mb-6">
                        <MessageCircle className="w-10 h-10 text-emerald-400" />
                        <h1 className="text-3xl font-black bg-gradient-to-r from-white via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                            Messages
                        </h1>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 pr-12 py-4 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-all font-semibold"
                        />
                        <UserPlus className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors" />
                    </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                    {filteredChats.map((chat) => (
                        <motion.button
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={`w-full p-6 rounded-3xl transition-all hover:shadow-emerald-500/30 flex gap-4 items-start border border-transparent group hover:border-emerald-400/50 hover:bg-white/5 cursor-pointer ${selectedChat === chat.id ? 'ring-4 ring-emerald-500/30 bg-white/10 border-emerald-400/50 shadow-emerald-500/50' : ''
                                }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Avatar */}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-lg ${chat.user.online
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white ring-4 ring-emerald-400/50 shadow-emerald-500/50'
                                    : 'bg-slate-700 text-slate-300 ring-4 ring-slate-600/50 shadow-slate-500/20'
                                }`}>
                                {chat.user.avatar}
                            </div>

                            {/* Chat Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-black text-xl text-white truncate flex-1">{chat.user.name}</span>
                                    <span className="text-xs text-white/60 font-mono">{chat.user.timestamp}</span>
                                </div>
                                <div className="text-lg text-white/80 truncate mb-2">{chat.user.lastMessage}</div>
                                <div className="text-sm text-emerald-400 font-bold flex items-center gap-2">
                                    {chat.user.level}
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                                </div>
                            </div>

                            {/* Unread Badge */}
                            {chat.user.unreadCount > 0 && (
                                <div className="flex flex-col items-center gap-1 ml-4">
                                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                        {chat.user.unreadCount}
                                    </div>
                                    <div className="w-2 h-20 bg-gradient-to-b from-emerald-400 to-transparent" />
                                </div>
                            )}
                        </motion.button>
                    ))}

                    {/* Empty State */}
                    {filteredChats.length === 0 && (
                        <motion.div
                            className="text-center py-32"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <MessageCircle className="w-32 h-32 text-white/30 mx-auto mb-12" />
                            <h3 className="text-3xl font-black text-white mb-4">No messages yet</h3>
                            <p className="text-xl text-white/60 mb-12 max-w-md mx-auto">
                                Start a conversation with language learners or join a practice group to get started.
                            </p>
                            <motion.button
                                className="px-12 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                <UserPlus className="w-6 h-6 inline mr-2" />
                                Find Someone to Message
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </motion.aside>

            {/* Chat Area */}
            <AnimatePresence mode="wait">
                {selectedChat && !isDesktop && (
                    <motion.div
                        key="mobile-chat"
                        className="flex-1 p-8 flex flex-col"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                    >
                        {/* Chat Header */}
                        <div className="flex items-center gap-4 p-6 pb-4 border-b border-white/5 mb-8">
                            <button className="lg:hidden p-3 hover:bg-white/10 rounded-2xl -ml-4">
                                <ChevronLeft className="w-7 h-7 text-white/60 hover:text-white" />
                            </button>
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg" />
                            <div>
                                <h2 className="text-2xl font-black text-white">Ana Garcia</h2>
                                <div className="flex items-center gap-2 text-white/60 text-sm">
                                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                                    <span>Online</span>
                                </div>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <Phone className="w-7 h-7 p-3 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white cursor-pointer transition-all" />
                                <Video className="w-7 h-7 p-3 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white cursor-pointer transition-all" />
                                <MoreVertical className="w-7 h-7 p-3 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white cursor-pointer transition-all" />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto space-y-6 mb-12 px-4">
                            {/* Mock messages */}
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                                    🇪🇸
                                </div>
                                <div className="max-w-md">
                                    <div className="bg-slate-700/50 backdrop-blur-xl rounded-3xl px-6 py-4 text-white">
                                        ¡Hola! ¿Quieres practicar conversación española esta noche? Tengo tiempo después de las 7 PM.
                                    </div>
                                    <div className="text-xs text-white/50 ml-16 mt-1">2 mins ago</div>
                                </div>
                            </div>

                            <div className="justify-end flex gap-4">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 backdrop-blur-xl rounded-3xl px-6 py-4 text-white max-w-md">
                                    ¡Sí, perfecto! Hablemos de temas cotidianos. ¿Qué prefieres?
                                </div>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="glass-card p-6 rounded-3xl border-t border-white/10">
                            <div className="flex items-end gap-4">
                                <div className="flex items-center gap-2 p-3 bg-white/10 rounded-2xl cursor-pointer hover:bg-white/20 transition-all">
                                    <ImagePlus className="w-6 h-6 text-white/60 hover:text-white" />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        placeholder="Type a message..."
                                        className="w-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 resize-none focus:outline-none focus:border-emerald-400 transition-all h-20"
                                    />
                                </div>
                                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl cursor-pointer hover:shadow-emerald-500/50 hover:scale-105 transition-all shadow-lg">
                                    <Mic className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {(!selectedChat || isDesktop) && (
                    <motion.div
                        key="no-chat"
                        className="flex-1 flex flex-col items-center justify-center p-20 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <MessageCircle className="w-48 h-48 text-white/20 mb-12" />
                        <h2 className="text-5xl font-black text-white mb-6">No conversation selected</h2>
                        <p className="text-2xl text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed">
                            Choose a contact from the left sidebar to start messaging or click the + button to find someone new.
                        </p>
                        <motion.button
                            className="px-20 py-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-2xl rounded-3xl shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 transition-all"
                            whileHover={{ scale: 1.05 }}
                        >
                            <UserPlus className="w-10 h-10 inline mr-4" />
                            New Message
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

