"use client";
import { notFound } from 'next/navigation';
import { stories } from '@/data/stories';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Share2, Bookmark } from 'lucide-react';
import StoryComments from '@/components/stories/StoryComments';
import ChapterAccordion from '@/components/stories/ChapterAccordion';
import ShareStory from '@/components/stories/ShareStory';
import FavoriteStories from '@/components/stories/FavoriteStories';

interface StoryPageProps {
    params: {
        slug: string;
    };
}

export default function StoryDetailPage({ params }: StoryPageProps) {
    const storySlug = params.slug;
    const story = stories.find(s => s.slug === storySlug);

    if (!story) {
        notFound();
    }

    const [showShareModal, setShowShareModal] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900">
            {/* Parallax Hero */}
            <section className="relative h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                    style={{
                        backgroundImage: `url(${story.coverImage})`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90" />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-8 leading-none"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {story.title}
                    </motion.h1>

                    {/* Genre Badge */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className={`px-6 py-3 rounded-full font-bold text-xl ${story.genre === 'romance' ? 'bg-gradient-to-r from-rose-500 to-pink-500' :
                                story.genre === 'horror' ? 'bg-gradient-to-r from-red-900 to-red-700' :
                                    story.genre === 'life' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                                        story.genre === 'adventure' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                                            'bg-gradient-to-r from-purple-500 to-indigo-500'
                            } text-white shadow-2xl`}>
                            {story.genre.toUpperCase()}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 justify-center mb-12 text-white/80 text-lg">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gold text-xl">{story.chapterCount}</span>
                            <span>Chapters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gold text-xl">{story.readTime}</span>
                            <span>min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gold text-xl">{story.views.toLocaleString()}</span>
                            <span>views</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-rose-400 fill-current" />
                            <span className="font-bold">{story.likes.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <Link
                            href={`/stories/${story.slug}/chapter/1`}
                            className="px-12 py-6 bg-gradient-to-r from-gold to-yellow-500 text-navy font-black text-xl rounded-3xl shadow-2xl hover:shadow-glow-gold hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                        >
                            📖 Start Reading
                        </Link>
                        <div className="flex gap-4">
                            <FavoriteStories storyId={story.id} />
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="flex items-center gap-2 px-8 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/20 transition-all text-white font-bold"
                            >
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                            <Bookmark className="w-12 h-12 p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all cursor-pointer text-white" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Synopsis */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        className="glass-card p-12 text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black text-white mb-8">Synopsis</h2>
                        <p className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                            {story.synopsis}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Chapters List */}
            <section className="py-24 bg-slate-900/50">
                <div className="max-w-5xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <ChapterAccordion story={story} />
                    </motion.div>
                </div>
            </section>

            {/* Related Stories */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-5xl font-black text-white mb-16 text-center">
                        More {story.genre.toUpperCase()} Stories
                    </h2>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                        {relatedStories.slice(0, 8).map((relatedStory) => (
                            <StoryCard key={relatedStory.id} story={relatedStory} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Comments */}
            <StoryComments storyId={story.id} />

            {/* Share Modal */}
            {showShareModal && (
                <ShareStory
                    storyTitle={story.title}
                    storyUrl={`https://globalforum.com/stories/${story.slug}`}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </div>
    );
}

