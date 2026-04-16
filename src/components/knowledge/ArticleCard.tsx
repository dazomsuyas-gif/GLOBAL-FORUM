"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, User, Eye } from 'lucide-react';
import { Article } from '../../data/articles';

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <motion.div
            className="glass-card group cursor-pointer overflow-hidden hover:shadow-glow-xl transition-all duration-500 hover:-translate-y-4 relative"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Link href={`/knowledge/${article.category}/${article.slug}`} className="block h-full">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden group">
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    {/* Category Badge */}
                    <motion.div
                        className="absolute top-4 left-4 bg-gold/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                        whileHover={{ scale: 1.1 }}
                    >
                        {article.category.replace('-', ' ').toUpperCase()}
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <motion.h3
                        className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight line-clamp-2 group-hover:text-gold transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                    >
                        {article.title}
                    </motion.h3>

                    <p className="text-white/70 text-lg mb-6 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between mb-6 text-white/60 text-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{article.readTime} min read</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{article.views.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 rounded-full bg-white/20" />
                            <span>{article.author}</span>
                        </div>
                    </div>

                    {/* Read More */}
                    <motion.span
                        className="flex items-center gap-2 text-gold font-bold uppercase text-sm tracking-wider group-hover:translate-x-2 transition-transform duration-300"
                        whileHover={{ x: 8 }}
                    >
                        Read Article →
                    </motion.span>
                </div>

                {/* Hover Ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-transparent to-yellow-500/20 opacity-0 group-hover:opacity-100 blur-xl rounded-2xl transition-all duration-700 scale-110" />
            </Link>
        </motion.div>
    );
}

