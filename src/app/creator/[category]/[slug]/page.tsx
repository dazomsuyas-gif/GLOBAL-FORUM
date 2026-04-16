"use client";
import { notFound } from 'next/navigation';
import { scripts } from '@/data/scripts';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ScriptSection from '@/components/creator/ScriptSection';
import PDFGenerator from '@/components/creator/PDFGenerator';
import CopyScript from '@/components/creator/CopyScript';
import FavoriteButton from '@/components/creator/FavoriteScripts';
import RelatedScripts from '@/components/creator/RelatedScripts';

interface ScriptPageProps {
    params: {
        category: string;
        slug: string;
    };
}

export default function ScriptDetailPage({ params }: ScriptPageProps) {
    const categorySlug = params.category;
    const slug = params.slug;

    const script = scripts.find(s => s.category === categorySlug && s.slug === slug);

    if (!script) {
        notFound();
    }

    const [showPDFModal, setShowPDFModal] = useState(false);
    const [expandedBroll, setExpandedBroll] = useState<number[]>([]);

    const toggleBroll = (sectionIndex: number) => {
        if (expandedBroll.includes(sectionIndex)) {
            setExpandedBroll(expandedBroll.filter(i => i !== sectionIndex));
        } else {
            setExpandedBroll([...expandedBroll, sectionIndex]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-900">
            {/* Hero */}
            <section className="relative py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent" />
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl lg:text-7xl font-black text-white mb-6">
                            {script.title}
                        </h1>

                        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-8">
                            <span className="text-2xl">{categorySlug === 'richest-people' ? '💰' : '📽️'}</span>
                            <span className="font-bold text-lg uppercase tracking-wide">{categorySlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12">
                            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                <div className="text-3xl font-black text-gold mb-2">{script.wordCount.toLocaleString()}</div>
                                <div className="text-white/70 text-sm uppercase tracking-wider">Words</div>
                            </div>

                            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                <div className="text-3xl font-bold text-gold mb-2">{script.estimatedDuration}</div>
                                <div className="text-white/70 text-sm uppercase tracking-wider">Duration</div>
                            </div>

                            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                <span className={`px-4 py-2 rounded-xl font-bold text-sm ${script.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                        script.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-red-500/20 text-red-400'
                                    }`}>
                                    {script.difficulty}
                                </span>
                            </div>

                            <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                                <div className="text-2xl font-black text-gold mb-1">{script.downloadCount.toLocaleString()}</div>
                                <div className="text-white/70 text-sm uppercase tracking-wider flex items-center gap-1">
                                    Downloads
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Script Content */}
            <motion.section
                className="max-w-5xl mx-auto px-6 lg:px-8 pb-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {/* Hook - Highlighted */}
                <motion.div
                    className="glass-card p-12 mb-16 text-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h2 className="text-3xl font-black text-gold mb-8 uppercase tracking-wide inline-block border-b-4 border-gold pb-4">
                        Hook (0:00 - 0:15)
                    </h2>
                    <p className="text-2xl text-white/90 italic leading-relaxed max-w-4xl mx-auto">
                        "{script.hook}"
                    </p>
                </motion.div>

                {/* Timestamped Sections */}
                <div className="space-y-8 mb-24">
                    {script.sections.map((section, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-8 hover:shadow-glow-gold transition-all duration-300"
                            whileHover={{ y: -4 }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-start gap-6 mb-6">
                                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/30 to-yellow-500/30 flex items-center justify-center font-mono text-2xl font-bold text-gold mt-1">
                                    {section.timestamp}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-white mb-4">{section.title}</h3>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
                                        Script
                                    </h4>
                                    <p className="text-xl text-white/90 leading-relaxed whitespace-pre-wrap">
                                        {section.content}
                                    </p>
                                </div>

                                <div>
                                    <motion.div
                                        className="cursor-pointer flex items-center gap-2 text-white/70 mb-4 p-3 rounded-xl hover:bg-white/10 transition-all"
                                        onClick={() => toggleBroll(index)}
                                    >
                                        <span>📹 B-Roll & Visuals</span>
                                        <span className={`w-2 h-2 rounded-full transition-all ${expandedBroll.includes(index) ? 'bg-green-400 scale-125' : 'bg-white/30'}`} />
                                    </motion.div>

                                    <motion.div
                                        className="space-y-3 overflow-hidden"
                                        initial={false}
                                        animate={{ height: expandedBroll.includes(index) ? 'auto' : '0' }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="glass-card p-6">
                                            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                                                Visual Suggestions
                                            </h5>
                                            <ul className="text-white/80 space-y-2 text-sm">
                                                {section.bRoll.split(',').map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                                                        {item.trim()}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Short Form Cut */}
                <motion.section
                    className="glass-card p-12 mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                >
                    <h2 className="text-4xl font-black text-white mb-8 text-center uppercase tracking-wide">
                        Short Form Cut (60 seconds)
                    </h2>
                    <div className="text-center">
                        <CopyScript
                            textToCopy={script.shortFormCut}
                            label="Copy TikTok/Reels Script"
                        />
                        <p className="text-xl text-white/80 mt-4 italic bg-gradient-to-r from-green-500/20 to-blue-500/20 p-6 rounded-2xl">
                            {script.shortFormCut}
                        </p>
                    </div>
                </motion.section>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-wrap gap-6 justify-center mb-24 p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                >
                    <PDFGenerator script={script} />

                    <CopyScript
                        textToCopy={script.sections.map(s => `${s.timestamp}\n${s.title}\n${s.content}\n\nB-ROLL: ${s.bRoll}`).join('\n\n---\n\n')}
                        label="Copy Full Script"
                    />

                    <FavoriteButton scriptId={script.id} />
                </motion.div>

                {/* Hashtags */}
                <motion.section className="mb-16">
                    <h2 className="text-4xl font-black text-white mb-8 text-center">
                        Recommended Hashtags (15)
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto">
                        {script.hashtags.map((hashtag, idx) => (
                            <CopyScript
                                key={idx}
                                textToCopy={hashtag}
                                label={hashtag}
                                showIcon={false}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* Thumbnail Ideas */}
                <motion.section className="mb-16">
                    <h2 className="text-4xl font-black text-white mb-8 text-center">
                        Thumbnail Text Ideas
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {script.thumbnailIdeas.map((idea, idx) => (
                            <div key={idx} className="glass-card p-8 text-center hover:shadow-glow-gold">
                                <CopyScript textToCopy={idea} label="Copy Thumbnail" />
                                <div className="mt-4 p-6 bg-gradient-to-r from-black/50 to-transparent rounded-2xl text-2xl font-black text-white uppercase tracking-wider text-center">
                                    {idea}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CTA Options */}
                <motion.section className="mb-24">
                    <h2 className="text-4xl font-black text-white mb-8 text-center">
                        CTA Script Options
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {script.ctaOptions.map((cta, idx) => (
                            <CopyScript
                                key={idx}
                                textToCopy={cta}
                                label={`Copy CTA Option ${idx + 1}`}
                            />
                        ))}
                    </div>
                </motion.section>

                {/* Related Scripts */}
                <RelatedScripts
                    category={script.category}
                    currentScriptId={script.id}
                />
            </motion.section>
        </div>
    );
}

