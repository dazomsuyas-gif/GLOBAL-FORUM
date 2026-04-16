"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ImagePlus, Languages, Poll, Lock, Bold, Italic, Underline } from 'lucide-react';
import Image from 'next/image';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPost: (postData: any) => void;
}

export default function CreatePostModal({ isOpen, onClose, onPost }: CreatePostModalProps) {
    const [content, setContent] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [language, setLanguage] = useState('');
    const [topic, setTopic] = useState('discussion');
    const [privacy, setPrivacy] = useState('public');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUline, setIsUline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const topics = ['discussion', 'question', 'language-practice', 'story', 'poll'];
    const languages = ['English', 'Chinese', 'Spanish', 'French', 'German', 'Swahili', 'Other'];

    useEffect(() => {
        // Load draft from localStorage
        const draft = localStorage.getItem('post-draft');
        if (draft && isOpen) {
            const parsed = JSON.parse(draft);
            setContent(parsed.content || '');
            setLanguage(parsed.language || '');
            setTopic(parsed.topic || 'discussion');
            setPrivacy(parsed.privacy || 'public');
        }
    }, [isOpen]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages = [...images, ...files.slice(0, 5 - images.length)];
        setImages(newImages);

        // Generate previews
        newImages.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImages(prev => [...prev, e.target!.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const postData = {
                content,
                images: previewImages,
                language,
                topic,
                privacy,
                timestamp: new Date().toISOString()
            };

            onPost(postData);
            clearForm();
            onClose();
            setIsLoading(false);
        }, 1500);
    };

    const clearForm = () => {
        setContent('');
        setImages([]);
        setPreviewImages([]);
        setLanguage('');
        setTopic('discussion');
        setPrivacy('public');
        localStorage.removeItem('post-draft');
    };

    useEffect(() => {
        // Auto-save draft
        if (content || language || topic !== 'discussion') {
            localStorage.setItem('post-draft', JSON.stringify({
                content,
                language,
                topic,
                privacy
            }));
        }
    }, [content, language, topic, privacy]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 lg:p-12 relative"
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-4xl font-black bg-gradient-to-r from-white via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                                Create Post
                            </h2>
                            <motion.button
                                onClick={onClose}
                                className="p-3 hover:bg-white/20 rounded-2xl transition-all"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <X className="w-7 h-7 text-white/80 hover:text-white" />
                            </motion.button>
                        </div>

                        {/* Content Editor */}
                        <div className="space-y-8 mb-12">
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-4 p-4 bg-white/5 rounded-2xl">
                                    <Bold
                                        className={`w-6 h-6 cursor-pointer p-2 rounded-xl transition-all ${isBold ? 'bg-yellow-500 text-slate-900' : 'hover:bg-white/20'}`}
                                        onClick={() => setIsBold(!isBold)}
                                    />
                                    <Italic
                                        className={`w-6 h-6 cursor-pointer p-2 rounded-xl transition-all ${isItalic ? 'bg-yellow-500 text-slate-900' : 'hover:bg-white/20'}`}
                                        onClick={() => setIsItalic(!isItalic)}
                                    />
                                    <Underline
                                        className={`w-6 h-6 cursor-pointer p-2 rounded-xl transition-all ${isUline ? 'bg-yellow-500 text-slate-900' : 'hover:bg-white/20'}`}
                                        onClick={() => setIsUline(!isUline)}
                                    />
                                </div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="What's on your mind? Share a language tip, story, or ask for help..."
                                    className="w-full h-48 p-8 bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl text-xl text-white placeholder-white/50 font-medium resize-none focus:outline-none focus:border-emerald-400 transition-all"
                                    style={{
                                        fontWeight: isBold ? 'bold' : 'normal',
                                        fontStyle: isItalic ? 'italic' : 'normal',
                                        textDecoration: isUline ? 'underline' : 'none'
                                    }}
                                    maxLength={2000}
                                />
                                <div className="text-right text-sm text-white/50 mt-2">
                                    {content.length}/2000
                                </div>
                            </div>

                            {/* Image Preview */}
                            <AnimatePresence>
                                {previewImages.length > 0 && (
                                    <motion.div
                                        className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {previewImages.slice(0, 5).map((img, index) => (
                                            <div key={index} className="relative group rounded-2xl overflow-hidden bg-slate-800 shadow-xl">
                                                <Image
                                                    src={img}
                                                    alt={`Preview ${index + 1}`}
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <button
                                                    onClick={() => {
                                                        setPreviewImages(prev => prev.filter((_, i) => i !== index));
                                                        setImages(prev => prev.filter((_, i) => i !== index));
                                                    }}
                                                    className="absolute top-2 right-2 w-10 h-10 bg-red-500/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <label className="block p-8 border-2 border-dashed border-white/20 rounded-3xl bg-white/5 hover:border-emerald-400 hover:bg-white/10 transition-all cursor-pointer group">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <ImagePlus className="w-16 h-16 text-white/60 group-hover:text-emerald-400 transition-colors" />
                                    <div>
                                        <div className="text-xl font-bold text-white mb-2">Add Photos</div>
                                        <div className="text-white/60 max-w-md mx-auto">Drag & drop or click to upload (Max 5 images)</div>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={images.length >= 5}
                                />
                                {images.length >= 5 && (
                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                                        <div className="text-white font-bold text-xl">Max 5 images reached</div>
                                    </div>
                                )}
                            </label>
                        </div>

                        {/* Options */}
                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {/* Language */}
                            <div>
                                <label className="block text-white/80 font-bold mb-4 flex items-center gap-3">
                                    <Languages className="w-6 h-6 text-emerald-400" />
                                    Language Practice
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold focus:border-emerald-400 focus:outline-none transition-all"
                                >
                                    <option value="">Any Language</option>
                                    {languages.map((lang) => (
                                        <option key={lang.slug} value={lang.slug}>
                                            {lang.flag} {lang.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Topic */}
                            <div>
                                <label className="block text-white/80 font-bold mb-4">Topic</label>
                                <select
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="w-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold focus:border-emerald-400 focus:outline-none transition-all"
                                >
                                    {topics.map((t) => (
                                        <option key={t} value={t}>
                                            {t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Privacy */}
                            <div className="relative">
                                <label className="block text-white/80 font-bold mb-4 flex items-center gap-3">
                                    <Lock className="w-6 h-6" />
                                    Privacy
                                </label>
                                <select
                                    value={privacy}
                                    onChange={(e) => setPrivacy(e.target.value)}
                                    className="w-full p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold focus:border-emerald-400 focus:outline-none transition-all"
                                >
                                    <option value="public">🌍 Public</option>
                                    <option value="friends">👥 Friends Only</option>
                                    <option value="private">🔒 Only Me</option>
                                </select>
                            </div>
                        </div>

                        {/* Post Button */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={isLoading || !content.trim()}
                            className={`w-full py-8 px-16 rounded-4xl font-black text-2xl shadow-2xl transition-all flex items-center justify-center gap-4 mx-auto max-w-md ${isLoading || !content.trim()
                                ? 'bg-slate-600/50 text-white/50 cursor-not-allowed shadow-none'
                                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-700 hover:shadow-emerald-500/50 hover:scale-105 hover:-translate-y-1'
                                }`}
                            whileHover={{ scale: isLoading || !content.trim() ? 1 : 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-10 h-10" />
                                    Create Post
                                </>
                            )}
                        </motion.button>

                        {/* Draft Indicator */}
                        {localStorage.getItem('post-draft') && (
                            <p className="text-center text-white/60 text-sm mt-8 animate-pulse">
                                💾 Draft saved automatically
                            </p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

