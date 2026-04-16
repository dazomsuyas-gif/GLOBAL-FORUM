"use client";
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Languages, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

interface Post {
    id: number;
    user: {
        name: string;
        avatar: string;
        username: string;
        level: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: 18;
    language?: string;
    timestamp: string;
}

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
        setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    };

    return (
        <motion.article
            className="glass-card hover:shadow-emerald-500/30 transition-all group mb-8 border border-white/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Post Header */}
            <div className="flex items-center gap-4 p-6 pb-4 border-b border-white/5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    {post.user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-xl truncate">{post.user.name}</div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <span>@{post.user.username}</span>
                        <Languages className="w-4 h-4" />
                        <span>{post.user.level}</span>
                    </div>
                </div>
                <div className="p-2 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
                    <MoreVertical className="w-5 h-5 text-white/60 hover:text-white" />
                </div>
            </div>

            {/* Post Content */}
            <div className="p-6">
                <p className="text-xl text-white leading-relaxed mb-6 whitespace-pre-wrap">
                    {post.content}
                </p>

                {post.image && (
                    <div className="rounded-3xl overflow-hidden bg-slate-800 mb-6 shadow-2xl group-hover:shadow-emerald-500/20 transition-shadow">
                        <Image
                            src={post.image}
                            alt="Post image"
                            width={600}
                            height={400}
                            className="w-full h-80 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                )}

                {/* Language Badge */}
                {post.language && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl text-sm font-bold mb-6 shadow-lg">
                        <Languages className="w-4 h-4" />
                        <span>{post.language.toUpperCase()}</span>
                    </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-8">
                        {/* Like Button */}
                        <motion.button
                            onClick={handleLike}
                            className={`flex items-center gap-3 px-6 py-4 rounded-3xl font-bold transition-all shadow-lg ${liked
                                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-500/50 scale-110'
                                    : 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white hover:text-rose-400 text-white/80'
                                }`}
                            whileHover={{ scale: liked ? 1.05 : 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
                            <span>{likesCount.toLocaleString()}</span>
                        </motion.button>

                        {/* Comment Button */}
                        <motion.button
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center gap-3 px-6 py-4 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white rounded-3xl font-bold text-white/80 hover:text-white transition-all shadow-md hover:shadow-emerald-500/30"
                            whileHover={{ scale: 1.05 }}
                        >
                            <MessageCircle className="w-6 h-6" />
                            <span>{post.comments}</span>
                        </motion.button>

                        {/* Share Button */}
                        <motion.button
                            className="flex items-center gap-3 px-6 py-4 bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white rounded-3xl font-bold text-white/80 hover:text-emerald-400 transition-all shadow-md hover:shadow-emerald-500/30"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => {
                                const url = `http://localhost:3000/community/post/${post.id}`;
                                navigator.share ? navigator.share({ title: post.content.slice(0, 50), url }) : navigator.clipboard.writeText(url);
                            }}
                        >
                            <Share2 className="w-6 h-6" />
                            <span>{post.shares}</span>
                        </motion.button>
                    </div>

                    {/* Save Button */}
                    <motion.button
                        className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 hover:border-white text-white/80 hover:text-white transition-all shadow-md hover:shadow-emerald-500/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Bookmark className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>
        </motion.article>
    );
}

