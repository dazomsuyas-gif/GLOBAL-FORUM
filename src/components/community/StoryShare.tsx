"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Close, Edit3, MessageCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Story {
    id: string;
    user: {
        name: string;
        avatar: string;
        username: string;
    };
    image: string;
    textOverlay?: {
        content: string;
        fontSize: number;
        color: string;
        x: number;
        y: number;
    };
    stickers: string[];
    views: number;
    seenBy: string[];
    expiresAt: string;
    isViewed: boolean;
    isMine: boolean;
}

interface StoryHighlight {
    id: string;
    title: string;
    icon: string;
    stories: Story[];
}

const mockStories: Story[] = [
    {
        id: 'your-story',
        user: { name: "Your Story", avatar: "👤", username: "@you" },
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop",
        isMine: true,
        isViewed: false,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        views: 0,
        seenBy: [],
        stickers: []
    },
    {
        id: 'ana-spanish',
        user: { name: "Ana Garcia 🇪🇸", avatar: "🇪🇸", username: "@anagarcia" },
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop",
        textOverlay: {
            content: "Spanish B2 Practice 📚\nDELE prep time!",
            fontSize: 36,
            color: "#FFD700",
            x: 50,
            y: 60
        },
        stickers: ['🇪🇸', '📖'],
        isViewed: false,
        expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
        views: 847,
        seenBy: ['kelvinmsuya', 'liweihsk', 'pierredelf']
    },
    {
        id: 'li-chinese',
        user: { name: "Li Wei 🇨🇳", avatar: "🇨🇳", username: "@liweihsk" },
        image: "https://images.unsplash.com/photo-1578631593821-d316f078d484?w=1080&h=1920&fit=crop",
        textOverlay: {
            content: "HSK4 Tones 🎵\nPractice makes perfect!",
            fontSize: 32,
            color: "#FF6B6B",
            x: 40,
            y: 70
        },
        stickers: ['🎵', '📝'],
        isViewed: true,
        expiresAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        views: 1234,
        seenBy: ['kelvinmsuya', 'anagarcia', 'pierredelf', 'mariasilva']
    },
    {
        id: 'pierre-french',
        user: { name: "Pierre Dupont 🇫🇷", avatar: "🇫🇷", username: "@pierredelf" },
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop",
        textOverlay: {
            content: "DELF B2 Prep\nNasal vowels practice 👃",
            fontSize: 28,
            color: "#4ECDC4",
            x: 30,
            y: 55
        },
        stickers: ['👃', '🇫🇷'],
        isViewed: false,
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
        views: 456,
        seenBy: ['kelvinmsuya']
    }
];

export default function StoryShare() {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [showViewer, setShowViewer] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [autoAdvance, setAutoAdvance] = useState(false);
    const [storyProgress, setStoryProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout>();

    // Load stories from localStorage
    useEffect(() => {
        const savedStories = localStorage.getItem('community-stories');
        if (savedStories) {
            // Merge with mock stories
        }
    }, []);

    const handleStoryClick = (index: number) => {
        setCurrentStoryIndex(index);
        setShowViewer(true);
        setAutoAdvance(true);
    };

    const nextStory = useCallback(() => {
        if (currentStoryIndex < mockStories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        } else {
            setShowViewer(false);
            setAutoAdvance(false);
        }
    }, [currentStoryIndex]);

    const prevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
        }
    };

    useEffect(() => {
        if (showViewer && autoAdvance) {
            intervalRef.current = setInterval(() => {
                setStoryProgress(100);
                setTimeout(nextStory, 500);
            }, 5000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [showViewer, autoAdvance, currentStoryIndex, nextStory]);

    const currentStory = mockStories[currentStoryIndex];

    const createStory = () => {
        const newStory: Story = {
            id: Date.now().toString(),
            user: { name: "Your Name", avatar: "👤", username: "@you" },
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1920&fit=crop",
            textOverlay: {
                content: "My first story! 📱✨",
                fontSize: 36,
                color: "#FFD700",
                x: 50,
                y: 60
            },
            stickers: ['📱', '✨'],
            isMine: true,
            isViewed: false,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            views: 0,
            seenBy: []
        };

        localStorage.setItem('community-stories', JSON.stringify([newStory, ...mockStories]));
        setShowCreate(false);

        // Add confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };

    return (
        <>
            {/* Story Rings Bar */}
            <div className="sticky top-20 lg:top-24 z-40 px-6 lg:px-8 bg-slate-900/80 backdrop-blur-xl rounded-b-3xl border-b border-white/5 pt-2">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {/* Your Story */}
                    <motion.button
                        onClick={() => setShowCreate(true)}
                        className="group flex flex-col items-center gap-2 flex-shrink-0 w-20 hover:scale-110 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center text-white font-bold text-2xl ring-4 ring-purple-400/50 animate-gradient-xy">
                            <Plus className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-bold text-white text-center leading-tight px-1">Your Story</span>
                    </motion.button>

                    {/* Stories */}
                    {mockStories.slice(1).map((story, index) => (
                        <motion.button
                            key={story.id}
                            onClick={() => handleStoryClick(index + 1)}
                            className={`group flex flex-col items-center gap-2 flex-shrink-0 w-20 hover:scale-110 transition-all cursor-pointer ${story.isViewed ? 'opacity-60' : ''
                                }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={`w-20 h-20 rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center text-xl font-bold ring-4 ${story.isMine
                                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 ring-emerald-400/50 animate-gradient-xy'
                                    : !story.isViewed
                                        ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 ring-purple-400/50 animate-gradient-xy shadow-purple-500/30'
                                        : 'bg-slate-700 ring-slate-600/50 shadow-slate-500/20'
                                }`}>
                                {story.user.avatar}
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs font-bold text-white text-center leading-tight px-1 truncate max-w-20">
                                    {story.user.name.split(' ')[0]}
                                </span>
                                {story.views > 0 && (
                                    <span className="text-[10px] text-white/70 group-hover:opacity-100 opacity-0 transition-opacity">
                                        {story.views.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Story Viewer Modal */}
            <AnimatePresence>
                {showViewer && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-8 lg:p-12 overflow-hidden"
                        onClick={(e) => e.target === e.currentTarget && setShowViewer(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onMouseMove={() => setAutoAdvance(false)}
                        onMouseLeave={() => setAutoAdvance(true)}
                    >
                        {/* Progress Bar */}
                        <div className="absolute top-20 lg:top-28 left-6 right-6 h-2 bg-white/20 backdrop-blur-xl rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-glow-purple"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: storyProgress / 100 }}
                                transition={{ duration: 5 }}
                            />
                        </div>

                        {/* Story Content */}
                        <motion.div
                            className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center rounded-3xl overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            {/* Story Image */}
                            <Image
                                src={currentStory.image}
                                alt={currentStory.user.name}
                                fill
                                className="object-cover rounded-3xl shadow-2xl"
                            />

                            {/* Text Overlay */}
                            {currentStory.textOverlay && (
                                <div
                                    className="absolute"
                                    style={{
                                        left: `${currentStory.textOverlay.x}%`,
                                        top: `${currentStory.textOverlay.y}%`,
                                        fontSize: currentStory.textOverlay.fontSize,
                                        color: currentStory.textOverlay.color,
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                                    }}
                                    className="font-black drop-shadow-2xl whitespace-pre-line pointer-events-none z-20"
                                >
                                    {currentStory.textOverlay.content}
                                </div>
                            )}

                            {/* Stickers */}
                            {currentStory.stickers.map((sticker, index) => (
                                <div
                                    key={index}
                                    className="absolute w-24 h-24 flex items-center justify-center pointer-events-none z-20 drop-shadow-2xl"
                                    style={{
                                        left: `${20 + index * 25}%`,
                                        top: `${40 + Math.sin(index) * 10}%`,
                                        transform: `rotate(${index * 15}deg)`
                                    }}
                                >
                                    <span className="text-4xl">{sticker}</span>
                                </div>
                            ))}

                            {/* Navigation Arrows */}
                            <motion.button
                                className="absolute left-8 w-16 h-16 bg-black/50 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all z-30"
                                onClick={prevStory}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </motion.button>

                            <motion.button
                                className="absolute right-8 w-16 h-16 bg-black/50 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:bg-white/30 transition-all z-30"
                                onClick={nextStory}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronRight className="w-8 h-8" />
                            </motion.button>

                            {/* Story Info */}
                            <div className="absolute bottom-12 left-12 right-12 flex items-center justify-between text-white z-20">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white ring-4 ring-purple-400/50 shadow-xl">
                                        {currentStory.user.avatar}
                                    </div>
                                    <div>
                                        <div className="font-black text-xl">{currentStory.user.name}</div>
                                        <div className="text-sm opacity-75">@{currentStory.user.username}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-6 h-6" />
                                        <span className="font-bold">{currentStory.views.toLocaleString()} views</span>
                                    </div>
                                    <motion.button
                                        className="p-4 bg-black/50 backdrop-blur-xl rounded-3xl hover:bg-white/30 transition-all flex items-center gap-2 text-white"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <MessageCircle className="w-6 h-6" />
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setShowViewer(false)}
                                        className="p-4 bg-black/50 backdrop-blur-xl rounded-3xl hover:bg-white/30 transition-all text-white"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Close className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Story Creation Modal */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-8 lg:p-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => e.target === e.currentTarget && setShowCreate(false)}
                    >
                        <motion.div
                            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-12 lg:p-16 rounded-4xl relative"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500 bg-clip-text text-transparent">
                                    Create Story
                                </h2>
                                <motion.button
                                    onClick={() => setShowCreate(false)}
                                    className="p-4 hover:bg-white/20 rounded-3xl transition-all"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Close className="w-8 h-8 text-white/80 hover:text-white" />
                                </motion.button>
                            </div>

                            {/* Preview Area */}
                            <div className="mb-12 relative">
                                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center text-4xl text-white/30 border-4 border-dashed border-white/20 shadow-2xl">
                                    📱 Story Preview
                                </div>
                                <motion.button
                                    className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-xl rounded-3xl hover:bg-white/30 transition-all text-white flex items-center gap-2"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <ImageIcon className="w-6 h-6" />
                                    <span>Upload Image</span>
                                </motion.button>
                            </div>

                            {/* Customization */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {/* Text Overlay */}
                                <div>
                                    <label className="block text-xl font-bold text-white mb-4">Text Overlay</label>
                                    <textarea
                                        placeholder="Add text to your story..."
                                        className="w-full p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none resize-none font-bold text-2xl min-h-[120px]"
                                    />
                                    <div className="flex items-center gap-4 mt-6 text-sm">
                                        <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                                            <input type="color" className="w-10 h-10 rounded-2xl border-2 border-white/20 cursor-pointer" defaultValue="#FFD700" />
                                            Color
                                        </label>
                                        <label className="flex items-center gap-2 text-white/70 cursor-pointer">
                                            <select className="bg-white/10 border border-white/20 rounded-2xl p-2 text-white font-bold">
                                                <option>Bold</option>
                                                <option>Regular</option>
                                                <option>Italic</option>
                                            </select>
                                            Style
                                        </label>
                                    </div>
                                </div>

                                {/* Stickers */}
                                <div>
                                    <label className="block text-xl font-bold text-white mb-4">Stickers</label>
                                    <div className="grid grid-cols-4 gap-4">
                                        {['📚', '🇪🇸', '🎯', '✨', '🔥', '💯', '👏', '🌟'].map((sticker) => (
                                            <motion.button
                                                key={sticker}
                                                className="w-20 h-20 text-4xl bg-white/10 hover:bg-white/20 rounded-2xl border-2 border-transparent hover:border-emerald-400/50 transition-all font-bold shadow-lg hover:shadow-emerald-400/30"
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {sticker}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Language Stickers */}
                            <div className="border-t border-white/10 pt-12">
                                <h4 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                                    <Globe className="w-10 h-10" />
                                    Language Learning Stickers
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        "📚 Learning Chinese HSK3",
                                        "🇪🇸 Spanish DELE B2 Progress 65%",
                                        "🎵 German Umlaut Master",
                                        "👑 French DELF Fluent",
                                        "🌍 Swahili Storyteller",
                                        "⚡ Polyglot Level 6"
                                    ].map((sticker, index) => (
                                        <motion.button
                                            key={index}
                                            className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 hover:border-purple-400/70 hover:bg-purple-500/30 rounded-2xl text-white font-bold transition-all group"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <div className="text-3xl mb-2">{sticker.includes('Chinese') ? '🇨🇳' : sticker.includes('Spanish') ? '🇪🇸' : '🌟'}</div>
                                            <div className="text-sm leading-tight">{sticker}</div>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Post Button */}
                            <motion.button
                                onClick={createStory}
                                className="w-full mt-12 px-16 py-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-600 hover:from-purple-600 hover:via-pink-600 hover:to-orange-700 text-white font-black text-3xl rounded-4xl shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                📱 Post to Story
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Story Highlights (Bottom of Profile) */}
            <div className="px-6 lg:px-8 pb-24">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                        <Award className="w-12 h-12 text-purple-400 shadow-2xl" />
                        Story Highlights
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6">
                        {[
                            { title: "HSK Practice", icon: "📚", stories: 3 },
                            { title: "DELE Prep", icon: "🇪🇸", stories: 5 },
                            { title: "Travel", icon: "✈️", stories: 2 },
                            { title: "Polyglot", icon: "🌍", stories: 8 }
                        ].map((highlight, index) => (
                            <motion.button
                                key={index}
                                className="group flex flex-col items-center gap-3 p-8 hover:bg-white/10 rounded-3xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-400/50 hover:shadow-glow-purple"
                                whileHover={{ scale: 1.05, y: -8 }}
                            >
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-white/20 group-hover:ring-8 ring-purple-400/30">
                                    {highlight.icon}
                                </div>
                                <div className="text-xl font-bold text-white">{highlight.title}</div>
                                <div className="flex items-center gap-1 text-sm text-white/60">
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                    <span>{highlight.stories}</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

