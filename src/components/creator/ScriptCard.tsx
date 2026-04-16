import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Script } from '../../data/scripts';
import { Download, Play, Clock, TypewriterIcon } from 'lucide-react';

interface ScriptCardProps {
    script: Script;
}

export default function ScriptCard({ script }: ScriptCardProps) {
    return (
        <motion.div
            className="glass-card group cursor-pointer h-[400px] overflow-hidden relative"
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <Link href={`/creator/${script.category}/${script.slug}`} className="absolute inset-0 z-10 block" />

            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-gold/20 group-hover:from-gold/20" />

                <div className="absolute top-6 left-6 right-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                        {script.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                        <div className="flex items-center gap-1">
                            <Typewriter className="w-4 h-4" />
                            <span>{script.wordCount.toLocaleString()} words</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{script.estimatedDuration}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${script.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                            script.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                'bg-red-500/20 text-red-300 border-red-500/30'
                            } border`}>
                            {script.difficulty}
                        </span>

                        <div className="flex items-center gap-1 text-gold font-bold">
                            <Download className="w-4 h-4" />
                            <span>{script.downloadCount.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <motion.h3
                    className="text-2xl font-black text-white mb-4 line-clamp-3 leading-tight group-hover:text-gold transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                >
                    {script.title}
                </motion.h3>

                <motion.p
                    className="text-white/70 text-lg mb-6 line-clamp-2 leading-relaxed"
                    whileHover={{ scale: 1.01 }}
                >
                    {script.hook}
                </motion.p>

                <div className="flex items-center gap-4">
                    <motion.div
                        className="flex items-center gap-2 text-gold text-sm font-bold px-4 py-2 bg-white/10 backdrop-blur rounded-xl border border-gold/30 group-hover:bg-gold/20 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Play className="w-4 h-4" />
                        View Script
                    </motion.div>

                    <span className="text-white/50 text-xs font-mono uppercase tracking-wider">
                        {script.publishDate}
                    </span>
                </div>

                {script.isPopular && (
                    <motion.div
                        className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/50"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, delay: 0.3 }}
                    >
                        <span className="text-xs font-bold text-navy uppercase tracking-wider rotate-6">🔥</span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

