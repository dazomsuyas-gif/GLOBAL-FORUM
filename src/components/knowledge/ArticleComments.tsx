"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2, User } from 'lucide-react';

interface Comment {
    id: string;
    name: string;
    email?: string;
    comment: string;
    timestamp: number;
}

interface ArticleCommentsProps {
    articleId: number;
}

export default function ArticleComments({ articleId }: ArticleCommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({ name: '', email: '', comment: '' });
    const [submitting, setSubmitting] = useState(false);

    const commentsKey = `comments-${articleId}`;
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load comments from localStorage
        try {
            const saved = localStorage.getItem(commentsKey);
            if (saved) {
                setComments(JSON.parse(saved));
            }
        } catch (error) {
            console.error('Error loading comments:', error);
        }
    }, [articleId, commentsKey]);

    useEffect(() => {
        // Scroll to bottom when new comment added
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }, [comments]);

    const timeAgo = (timestamp: number): string => {
        const now = Date.now();
        const diff = now - timestamp;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    };

    const submitComment = async () => {
        if (!newComment.name.trim() || !newComment.comment.trim()) return;

        setSubmitting(true);

        try {
            const comment: Comment = {
                id: Date.now().toString(),
                name: newComment.name.trim(),
                email: newComment.email.trim() || undefined,
                comment: newComment.comment.trim(),
                timestamp: Date.now()
            };

            const updatedComments = [comment, ...comments];
            setComments(updatedComments);
            localStorage.setItem(commentsKey, JSON.stringify(updatedComments));

            // Reset form
            setNewComment({ name: '', email: '', comment: '' });

            // Toast notification
            // toast.success('Comment added! Thanks for sharing your thoughts.');
        } catch (error) {
            console.error('Error saving comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const deleteComment = (commentId: string) => {
        if (confirm('Delete this comment?')) {
            const updatedComments = comments.filter(c => c.id !== commentId);
            setComments(updatedComments);
            localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
        }
    };

    return (
        <motion.section
            className="py-24 border-t border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    className="text-4xl lg:text-5xl font-black text-white mb-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {comments.length} Comments
                </motion.h2>

                {/* Comment Form */}
                <motion.div
                    className="glass-card p-8 mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Add your comment</h3>

                    <div className="grid md:grid-cols-3 gap-6">
                        <input
                            type="text"
                            placeholder="Your name"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            className="glass-input md:col-span-1 focus:border-gold"
                        />

                        <input
                            type="email"
                            placeholder="Email (optional)"
                            value={newComment.email}
                            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                            className="glass-input md:col-span-1 focus:border-gold"
                        />

                        <div className="md:col-span-1 flex gap-2">
                            <textarea
                                placeholder="Share your thoughts..."
                                value={newComment.comment}
                                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                                rows={3}
                                className="glass-input flex-1 resize-none focus:border-gold"
                            />
                            <motion.button
                                onClick={submitComment}
                                disabled={submitting || !newComment.name.trim() || !newComment.comment.trim()}
                                className="group p-4 bg-gradient-to-r from-gold to-yellow-500 text-navy font-bold rounded-2xl shadow-lg hover:shadow-glow-gold hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex-shrink-0"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {submitting ? (
                                    <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Comments List */}
                <div className="space-y-8" ref={scrollRef}>
                    {comments.length === 0 ? (
                        <motion.div
                            className="text-center py-32"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                        >
                            <div className="text-6xl mb-8">💭</div>
                            <h3 className="text-3xl font-bold text-white mb-4">No comments yet</h3>
                            <p className="text-xl text-white/60">Be the first to share your thoughts!</p>
                        </motion.div>
                    ) : (
                        comments.map((comment) => (
                            <motion.article
                                key={comment.id}
                                className="glass-card p-8 hover:shadow-glow-gold transition-all duration-300"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-yellow-500 flex items-center justify-center text-xl font-bold text-navy flex-shrink-0">
                                        {comment.name[0].toUpperCase()}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-white truncate">{comment.name}</h4>
                                            <span className="text-xs text-white/50">{timeAgo(comment.timestamp)}</span>
                                        </div>
                                        {comment.email && (
                                            <p className="text-xs text-white/40 mb-4 truncate">{comment.email}</p>
                                        )}
                                    </div>

                                    <motion.button
                                        onClick={() => deleteComment(comment.id)}
                                        className="p-2 hover:bg-white/10 rounded-xl transition-all group ml-auto"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Trash2 className="w-4 h-4 text-white/50 group-hover:text-red-400 transition-colors" />
                                    </motion.button>
                                </div>

                                <p className="text-lg text-white/90 leading-relaxed">{comment.comment}</p>
                            </motion.article>
                        ))
                    )}
                </div>
            </div>
        </motion.section>
    );
}

