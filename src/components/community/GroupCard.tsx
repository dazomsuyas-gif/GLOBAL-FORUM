"use client";
import { motion } from 'framer-motion';
import { Users, MessageCircle, Award, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Group {
    id: number;
    name: string;
    slug: string;
    language: string;
    flag: string;
    coverImage: string;
    avatar: string;
    description: string;
    memberCount: number;
    postCountToday: number;
    isJoined: boolean;
    createdAt: string;
}

interface GroupCardProps {
    group: Group;
    size?: 'sm' | 'md' | 'lg';
    showJoinButton?: boolean;
}

export default function GroupCard({ group, size = 'md', showJoinButton = true }: GroupCardProps) {
    const isLg = size === 'lg';
    const isSm = size === 'sm';

    return (
        <motion.div
            className={`glass-card group cursor-pointer overflow-hidden rounded-3xl transition-all border-2 border-transparent hover:border-emerald-400/50 hover:shadow-glow-emerald hover:scale-[1.02] hover:-translate-y-2 relative ${isLg ? 'p-0 h-[420px]' : 'p-8'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Cover Image */}
            <div className={`h-${isLg ? '64' : '40'} bg-gradient-to-r from-emerald-500/20 to-teal-600/20 relative overflow-hidden ${isLg ? 'rounded-t-3xl' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-2xl font-bold">
                            {group.avatar}
                        </div>
                        <div className="text-white drop-shadow-lg">
                            <div className="text-2xl lg:text-3xl font-black mb-1">{group.flag} {group.language}</div>
                            <div className="text-lg opacity-90 font-bold">Practice Group</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`${isLg ? 'p-8 pt-6' : 'p-0'}`}>
                <div className="mb-6 ${isLg ? 'min-h-[100px]' : ''}">
                    <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 line-clamp-2 group-hover:line-clamp-none transition-all">
                        {group.name}
                    </h3>
                    <p className={`text-lg text-white/80 leading-relaxed ${isLg ? 'line-clamp-3' : ''}`}>
                        {group.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 mb-8 text-white/70 text-sm">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        <span className="font-bold">{group.memberCount.toLocaleString()}</span> members
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-bold">{group.postCountToday}</span> posts today
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between">
                    <div className="flex -space-x-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl border-4 border-slate-900 shadow-lg ring-4 ring-slate-900/50"
                            />
                        ))}
                        {group.memberCount > 4 && (
                            <div className="w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-2xl border-4 border-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-slate-900/50">
                                +{group.memberCount - 4}
                            </div>
                        )}
                    </div>

                    {showJoinButton && (
                        <motion.button
                            className={`px-8 py-4 font-bold rounded-3xl shadow-lg transition-all flex items-center gap-3 ${group.isJoined
                                    ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-500'
                                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/50'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {group.isJoined ? (
                                <>
                                    ✓ Joined
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            ) : (
                                <>
                                    Join Group
                                    <Users className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Hover Overlay */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl z-10 flex items-end p-8"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            >
                <Link
                    href={`/community/groups/${group.slug}`}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-3 text-xl"
                >
                    <Globe className="w-6 h-6" />
                    Enter Group
                </Link>
            </motion.div>
        </motion.div>
    );
}

