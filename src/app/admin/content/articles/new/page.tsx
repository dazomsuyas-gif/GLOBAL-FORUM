"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, ImagePlus, Youtube, Table, Code2, List, Link, Bold, Italic, Strikethrough, Heading1, Heading2 } from 'lucide-react';

export default function NewArticle() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('Draft');
    const [publishDate, setPublishDate] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [wordCount, setWordCount] = useState(0);

    const categories = ['Technology', 'Business', 'Health', 'Travel', 'Food', 'Sports', 'Entertainment', 'Education', 'Finance', 'Lifestyle', 'Science', 'Politics', 'Environment', 'Culture'];

    useEffect(() => {
        // Auto-generate slug from title
        const slugFromTitle = title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setSlug(slugFromTitle);
    }, [title]);

    useEffect(() => {
        // Word count
        setWordCount(content.split(/\s+/).filter(word => word.length > 0).length);
    }, [content]);

    const handleSaveDraft = () => {
        setIsSaving(true);
        // Mock save
        setTimeout(() => {
            console.log('Draft saved:', { title, slug, content });
            setIsSaving(false);
        }, 1000);
    };

    const handlePublish = () => {
        setIsSaving(true);
        // Mock publish
        setTimeout(() => {
            console.log('Article published:', { title, slug, status: 'Published' });
            setIsSaving(false);
        }, 1000);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
                    {status === 'Draft' ? 'New Article' : 'Edit Article'}
                </h1>
                <p className="text-2xl text-slate-400">Create engaging content for Global Forum readers</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                {/* Left Column - Main Fields */}
                <div className="space-y-8">
                    {/* Title */}
                    <div>
                        <label className="text-2xl font-bold text-white mb-4 block flex items-center gap-3">
                            <Heading1 className="w-8 h-8 text-emerald-400" />
                            Article Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter compelling article title..."
                            className="w-full h-20 p-8 text-3xl font-bold bg-white/10 border border-white/20 rounded-3xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-400/20 text-white placeholder-slate-500"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                            <Link className="w-8 h-8 text-blue-400" />
                            Slug (URL)
                        </label>
                        <div className="relative">
                            <span className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-500 font-mono">globalforum.com/article/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="auto-generated-from-title"
                                className="w-full h-16 pl-64 pr-8 text-xl font-mono bg-white/10 border border-white/20 rounded-3xl focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 text-white placeholder-slate-500"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                            <List className="w-8 h-8 text-purple-400" />
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full h-16 p-8 text-xl bg-white/10 border border-white/20 rounded-3xl focus:border-purple-400 focus:ring-4 focus:ring-purple-400/20 text-white"
                        >
                            <option value="">Select category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Author */}
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                            <User className="w-8 h-8 text-pink-400" />
                            Author
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author name or username"
                            className="w-full h-16 p-8 text-xl bg-white/10 border border-white/20 rounded-3xl focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 text-white placeholder-slate-500"
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                            <Bold className="w-8 h-8 text-yellow-400" />
                            Excerpt (200 chars)
                        </label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value.slice(0, 200))}
                            placeholder="Short summary for search results and social sharing..."
                            maxLength={200}
                            className="w-full h-32 p-8 text-lg bg-white/10 border border-white/20 rounded-3xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 text-white placeholder-slate-500 resize-none"
                            rows={4}
                        />
                        <div className="text-right mt-2 text-sm text-slate-500">
                            {excerpt.length}/200 characters
                        </div>
                    </div>
                </div>

                {/* Right Column - Advanced Fields */}
                <div className="space-y-8">
                    {/* Featured Image */}
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                            <ImagePlus className="w-8 h-8 text-orange-400" />
                            Featured Image
                        </label>
                        <div className="space-y-4">
                            <div className="aspect-video bg-white/5 rounded-3xl border-4 border-dashed border-white/20 border-4 flex items-center justify-center text-slate-500 hover:border-orange-400 transition-all group">
                                {featuredImage ? (
                                    <img src={featuredImage} alt="Featured" className="w-full h-full object-cover rounded-3xl shadow-2xl" />
                                ) : (
                                    <div className="text-center">
                                        <ImagePlus className="w-24 h-24 mx-auto mb-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                                        <p className="text-xl font-semibold">Click to upload</p>
                                        <p className="text-sm text-slate-500">PNG, JPG up to 2MB</p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="url"
                                value={featuredImage}
                                onChange={(e) => setFeaturedImage(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="w-full h-14 p-6 text-lg bg-white/10 border border-white/20 rounded-3xl focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 text-white placeholder-slate-500 font-mono"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                            <Tag className="w-8 h-8 text-indigo-400" />
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="ai, technology, future, machine learning"
                            className="w-full h-16 p-8 text-xl bg-white/10 border border-white/20 rounded-3xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/20 text-white placeholder-slate-500"
                        />
                    </div>

                    {/* Status & Publish Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                                <Clock className="w-8 h-8 text-blue-400" />
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full h-16 p-8 text-xl bg-white/10 border border-white/20 rounded-3xl focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 text-white"
                            >
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Pending Review">Pending Review</option>
                            </select>
                        </div>
                        {status === 'Scheduled' && (
                            <div>
                                <label className="text-xl font-bold text-white mb-4 block flex items-center gap-3">
                                    <Calendar className="w-8 h-8 text-green-400" />
                                    Publish Date
                                </label>
                                <input
                                    type="datetime-local"
                                    value={publishDate}
                                    onChange={(e) => setPublishDate(e.target.value)}
                                    className="w-full h-16 p-8 text-xl bg-white/10 border border-white/20 rounded-3xl focus:border-green-400 focus:ring-4 focus:ring-green-400/20 text-white"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Editor */}
            <div className="glass-card p-12 rounded-4xl border border-slate-800 mb-12">
                <label className="text-3xl font-bold text-white mb-8 block flex items-center gap-4">
                    <Edit3 className="w-12 h-12 text-violet-400" />
                    Article Content
                </label>
                <div className="min-h-[600px] bg-white/5 border-2 border-dashed border-white/10 rounded-4xl p-12 text-slate-400 font-mono text-xl">
                    {/* Rich Text Editor Placeholder */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-12 p-8 bg-slate-900/50 rounded-3xl">
                            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                <Heading2 className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-black text-white mb-2">Rich Text Editor</h2>
                                <p className="text-2xl text-slate-400">TipTap editor with full formatting support coming soon</p>
                            </div>
                        </div>

                        {/* Toolbar Placeholder */}
                        <div className="flex gap-2 p-4 bg-slate-900/70 rounded-3xl mb-8">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/20">
                                <Bold className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/20">
                                <Italic className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/20">
                                <ImagePlus className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/20">
                                <Youtube className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/20">
                                <Link className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/20">
                                <Table className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/20">
                                <Code2 className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Word Count */}
                        <div className="flex justify-between items-center p-6 bg-slate-900/50 rounded-3xl">
                            <span className="text-2xl font-bold text-white">
                                {wordCount} words
                            </span>
                            <span className="text-xl text-slate-400 font-mono">
                                Reading time: {Math.round(wordCount / 200)} min
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEO Settings */}
            <div className="glass-card p-12 rounded-4xl border border-slate-800 mb-12">
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                    <Search className="w-12 h-12 text-yellow-400" />
                    SEO Settings
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block">
                            SEO Title
                        </label>
                        <input
                            type="text"
                            value={seoTitle}
                            onChange={(e) => setSeoTitle(e.target.value)}
                            placeholder="Page title for search results"
                            className="w-full h-16 p-8 text-xl bg-white/10 border border-white/20 rounded-3xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 text-white placeholder-slate-500"
                        />
                    </div>
                    <div>
                        <label className="text-xl font-bold text-white mb-4 block">
                            Meta Description
                        </label>
                        <textarea
                            value={seoDescription}
                            onChange={(e) => setSeoDescription(e.target.value)}
                            placeholder="Description for search results (160 chars)"
                            maxLength={160}
                            className="w-full h-32 p-8 text-lg bg-white/10 border border-white/20 rounded-3xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 text-white placeholder-slate-500 resize-none"
                            rows={4}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-end">
                <motion.button
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                    className="flex-1 sm:flex-none px-12 py-8 text-2xl font-bold bg-slate-800/50 hover:bg-slate-700 border border-slate-700 rounded-4xl text-slate-300 hover:text-white transition-all shadow-lg hover:shadow-slate-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isSaving ? (
                        <>
                            <div className="w-8 h-8 border-4 border-slate-400/30 border-t-slate-400 rounded-full animate-spin mr-4" />
                            Saving Draft...
                        </>
                    ) : (
                        'Save Draft'
                    )}
                </motion.button>

                <motion.button
                    onClick={handlePublish}
                    disabled={isSaving || !title || !content}
                    className="flex-1 sm:flex-none px-12 py-8 text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-4xl shadow-2xl hover:shadow-emerald-500/50 transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isSaving ? (
                        <>
                            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mr-4" />
                            Publishing...
                        </>
                    ) : status === 'Published' ? 'Update Article' : 'Publish Article'}
                </motion.button>

                <motion.button
                    className="px-12 py-8 text-2xl font-bold bg-blue-600/90 hover:bg-blue-700 text-white rounded-4xl shadow-xl hover:shadow-blue-500/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Eye className="w-8 h-8 inline mr-4" />
                    Preview
                </motion.button>
            </div>
        </div>
    );
}

