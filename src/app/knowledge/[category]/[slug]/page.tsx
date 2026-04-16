"use client";
import { notFound } from 'next/navigation';
import { categories, type Category } from '@/data/categories';
import { articles, type Article } from '@/data/articles';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import ReadingProgress from '@/components/knowledge/ReadingProgress';
import TableOfContents from '@/components/knowledge/TableOfContents';
import ShareButtons from '@/components/knowledge/ShareButtons';
import LikeButton from '@/components/knowledge/LikeButton';
import RelatedArticles from '@/components/knowledge/RelatedArticles';
import ArticleComments from '@/components/knowledge/ArticleComments';

interface ArticlePageProps {
    params: {
        category: string;
        slug: string;
    };
}

export async function generateStaticParams() {
    return articles.map(article => ({
        category: article.category,
        slug: article.slug
    }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
    const categorySlug = params.category;
    const slug = params.slug;

    const category = categories.find(c => c.slug === categorySlug);
    const article = articles.find(a => a.category === categorySlug && a.slug === slug);

    if (!article || !category) {
        notFound();
    }

    const relatedArticles = articles
        .filter(a => a.category === categorySlug && a.id !== article.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen">
            <ReadingProgress />

            <article className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                {/* Hero Image */}
                <motion.div
                    className="relative h-[60vh] lg:h-[70vh] rounded-3xl overflow-hidden mb-16 shadow-2xl"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

                    {/* Category Badge */}
                    <Link
                        href={`/knowledge/${category.slug}`}
                        className="absolute top-8 left-8 inline-flex items-center gap-2 px-6 py-3 bg-gold/90 backdrop-blur-sm text-navy font-bold rounded-full shadow-lg hover:shadow-glow-gold hover:scale-105 transition-all duration-300"
                    >
                        {category.icon}
                        {category.name}
                    </Link>
                </motion.div>

                {/* Article Header */}
                <motion.header
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.h1
                        className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        {article.title}
                    </motion.h1>

                    <div className="flex flex-wrap gap-6 justify-center items-center text-white/70 mb-12">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-xl font-bold text-navy">
                                K
                            </div>
                            <span>{article.author}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>{article.readTime} min read</span>
                            <span>•</span>
                            <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>{article.views.toLocaleString()} views</span>
                        </div>
                    </div>

                    {/* Share & Like */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center">
                        <div className="flex gap-3">
                            <ShareButtons articleUrl={`https://globalforum.com/knowledge/${article.category}/${article.slug}`} title={article.title} />
                        </div>
                        <div className="flex items-center gap-4">
                            <LikeButton articleId={article.id} initialLikes={article.likes} />
                        </div>
                    </div>
                </motion.header>

                {/* Main Content Area */}
                <motion.div
                    className="lg:grid lg:grid-cols-12 lg:gap-12 mb-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    {/* Table of Contents */}
                    <motion.aside
                        className="lg:col-span-3 xl:col-span-2 hidden lg:block sticky top-32 pt-8"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <TableOfContents content={article.content} />
                    </motion.aside>

                    {/* Article Content */}
                    <motion.main
                        className="lg:col-span-9 xl:col-span-8 prose prose-lg max-w-none"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Mobile TOC Toggle */}
                    <motion.div className="lg:hidden mb-8">
                        <TableOfContents content={article.content} />
                    </motion.div>
                </motion.div>

                {/* Author Bio */}
                <motion.section
                    className="py-24 border-t border-white/10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl font-black text-white mb-8 text-center">About the Author</h2>
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gold to-yellow-500 flex items-center justify-center text-4xl font-bold text-navy flex-shrink-0">
                                K
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-bold text-white mb-4">{article.author}</h3>
                                <p className="text-xl text-white/70 leading-relaxed">
                                    Kelvin Juma Msuya is the founder of Global Forum. Passionate about knowledge sharing, language learning, and African development.
                                    Writes about wealth, technology, history, and culture.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Related Articles */}
                <RelatedArticles
                    category={category.slug}
                    currentArticleId={article.id}
                    relatedArticles={relatedArticles}
                />

                {/* Comments */}
                <ArticleComments articleId={article.id} />
            </article>
        </div>
    );
}

