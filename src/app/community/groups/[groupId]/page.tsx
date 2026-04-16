"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Image as ImageIcon, Info, Award, Mic, PlayCircle } from 'lucide-react';
import PostCard from '@/components/community/PostCard';
import GroupCard from '@/components/community/GroupCard';
import LanguagePracticeGroup from '@/components/community/LanguagePracticeGroup';
import CreatePostModal from '@/components/community/CreatePostModal';
import Image from 'next/image';
import Link from 'next/link';

interface GroupPageProps {
    params: {
        groupId: string;
    };
}

interface GroupMember {
    id: string;
    name: string;
    avatar: string;
    role: 'admin' | 'member' | 'pending';
    joinedAt: string;
}

const mockGroupMembers: GroupMember[] = [
    { id: '1', name: 'Group Admin', avatar: '👑', role: 'admin', joinedAt: '2024-01-15' },
    { id: '2', name: 'Ana Garcia', avatar: '🇪🇸', role: 'member', joinedAt: '2024-01-20' },
    { id: '3', name: 'Li Wei', avatar: '🇨🇳', role: 'member', joinedAt: '2024-01-22' },
    // ... more members
];

export default function GroupPage({ params }: GroupPageProps) {
    const [activeTab, setActiveTab] = useState('feed');
    const [isMember, setIsMember] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [searchMembers, setSearchMembers] = useState('');

    const group = {
        id: params.groupId,
        name: "English Fluency Hub",
        slug: "english-fluency-hub",
        coverImage: "/group-covers/english-hub.jpg",
        avatar: "🇺🇸",
        description: "Practice speaking English with 15K+ learners worldwide. Conversation practice, IELTS/TOEFL prep, grammar help desk.",
        rules: [
            "Be respectful to all members",
            "No spam or self-promotion",
            "English practice only (use /lang command for other languages)",
            "No political discussions"
        ],
        memberCount: 15234,
        postCountToday: 234,
        admins: ['Group Admin', 'Co-Admin'],
        isAdmin: false, // Check from user context
        createdAt: "2024-01-15"
    };

    const filteredMembers = mockGroupMembers.filter(member =>
        member.name.toLowerCase().includes(searchMembers.toLowerCase())
    );

    const handleJoinGroup = () => {
        setIsMember(true);
    };

    const mockGroupPosts = [
        {
            id: 1,
            user: { name: "Ana Garcia", avatar: "🇪🇸", username: "@anagarcia", level: "B2" },
            content: "Anyone preparing for IELTS speaking? Need practice partner for Part 2 cue cards! #IELTS",
            likes: 45,
            comments: 12,
            timestamp: "2h ago"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
            {/* Group Header */}
            <motion.section
                className="relative"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Cover Image */}
                <div className="h-64 md:h-80 lg:h-96 bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/group-covers/english-hub.jpg')] bg-cover bg-center opacity-70 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Header Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 -mt-24 lg:-mt-32">
                    <div className="glass-card max-w-6xl mx-auto p-12 lg:p-20 -m-4 lg:-m-8 rounded-4xl">
                        <div className="flex flex-wrap items-start gap-8 lg:flex-nowrap">
                            {/* Group Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 lg:w-44 lg:h-44 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center text-5xl lg:text-6xl font-black shadow-2xl border-8 border-white/20">
                                    {group.avatar}
                                </div>
                            </div>

                            {/* Group Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                                        {group.name}
                                    </h1>
                                    <div className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 backdrop-blur-xl rounded-3xl border border-emerald-400/30">
                                        <span className="text-2xl font-bold text-emerald-400">English Practice</span>
                                    </div>
                                </div>

                                <p className="text-2xl text-white/90 mb-12 max-w-4xl leading-relaxed">
                                    {group.description}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-center lg:text-left">
                                    <div>
                                        <div className="text-5xl font-black text-emerald-400 mb-2">{group.memberCount.toLocaleString()}</div>
                                        <div className="text-xl text-white/70 uppercase tracking-wide font-bold">Members</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-black text-emerald-400 mb-2">{group.postCountToday}</div>
                                        <div className="text-xl text-white/70 uppercase tracking-wide font-bold">Posts Today</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-black text-emerald-400 mb-2">{group.admins.length}</div>
                                        <div className="text-xl text-white/70 uppercase tracking-wide font-bold">Admins</div>
                                    </div>
                                    <div>
                                        <div className="text-5xl font-black text-emerald-400 mb-2">
                                            {new Date(group.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                        </div>
                                        <div className="text-xl text-white/70 uppercase tracking-wide font-bold">Created</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 items-center">
                                    <motion.button
                                        onClick={handleJoinGroup}
                                        className={`px-12 py-6 text-2xl font-black rounded-4xl shadow-2xl transition-all flex items-center gap-4 ${isMember
                                                ? 'bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white'
                                                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isMember ? '✓ Joined' : 'Join Group'}
                                        <Users className="w-8 h-8" />
                                    </motion.button>

                                    <motion.button
                                        className="px-12 py-6 bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white font-bold rounded-4xl shadow-xl hover:shadow-glow-white transition-all flex items-center gap-4"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        Share Group
                                    </motion.button>

                                    {!isMember && (
                                        <motion.button
                                            className="px-12 py-6 bg-rose-500/90 hover:bg-rose-600 text-white font-bold rounded-4xl shadow-xl hover:shadow-rose-500/50 transition-all flex items-center gap-4"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Report Group
                                        </motion.button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 -mt-16 relative z-10 mb-12">
                <div className="glass-card p-2 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl flex border border-white/10">
                    {[
                        { tab: 'feed', icon: MessageCircle, label: 'Feed', count: 234 },
                        { tab: 'members', icon: Users, label: 'Members', count: group.memberCount },
                        { tab: 'about', icon: Info, label: 'About' },
                        { tab: 'media', icon: ImageIcon, label: 'Media' },
                        { tab: 'practice', icon: Award, label: 'Language Practice' }
                    ].map(({ tab, icon: Icon, label, count }) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-6 px-8 rounded-2xl font-bold transition-all flex items-center gap-3 ${activeTab === tab
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/30 shadow-xl scale-[1.02]'
                                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-md'
                                }`}
                            whileHover={{ scale: activeTab === tab ? 1.02 : 1.05 }}
                        >
                            <Icon className="w-7 h-7" />
                            <span>{label}</span>
                            {count && <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm font-bold">{count.toLocaleString()}</span>}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24 space-y-12">
                {activeTab === 'feed' && (
                    <>
                        {/* Create Post */}
                        <div className="glass-card p-8 mb-12 rounded-3xl">
                            <div className="flex items-start gap-4 p-6 bg-white/5 rounded-3xl">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center font-bold text-xl text-white">
                                    👤
                                </div>
                                <motion.button
                                    onClick={() => setShowPostModal(true)}
                                    className="flex-1 text-left p-4 bg-white/10 rounded-2xl text-white font-bold hover:bg-white/20 transition-all"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    Share something with {group.memberCount.toLocaleString()} members...
                                </motion.button>
                            </div>
                        </div>

                        {/* Group Posts */}
                        <div className="space-y-8">
                            {mockGroupPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'members' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="glass-card p-12 rounded-3xl">
                            <div className="flex items-center gap-4 mb-12">
                                <Users className="w-12 h-12 text-emerald-400" />
                                <div>
                                    <h2 className="text-4xl font-black text-white">{group.memberCount.toLocaleString()} Members</h2>
                                    <p className="text-xl text-white/70">Search members and invite friends</p>
                                </div>
                            </div>

                            <div className="relative mb-8">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/50" />
                                <input
                                    type="text"
                                    placeholder="Search members by name..."
                                    value={searchMembers}
                                    onChange={(e) => setSearchMembers(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none transition-all font-semibold"
                                />
                            </div>

                            <div className="space-y-6 max-h-96 overflow-y-auto">
                                {filteredMembers.slice(0, 12).map((member) => (
                                    <motion.div
                                        key={member.id}
                                        className="flex items-center gap-4 p-6 hover:bg-white/10 rounded-2xl transition-all cursor-pointer group"
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold ${member.role === 'admin' ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' :
                                                'bg-emerald-500/20 border-2 border-emerald-400/30 text-emerald-400'
                                            }`}>
                                            {member.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-xl text-white truncate">{member.name}</div>
                                            <div className="flex items-center gap-2 text-white/60">
                                                <span className={`${member.role === 'admin' ? 'text-purple-400' : 'text-emerald-400'} font-bold`}>
                                                    {member.role.toUpperCase()}
                                                </span>
                                                <Calendar className="w-4 h-4" />
                                                <span>{new Date(member.joinedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <motion.button
                                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/50 transition-all whitespace-nowrap"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Message
                                        </motion.button>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.button
                                className="w-full mt-8 px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-emerald-500/50 transition-all"
                                whileHover={{ scale: 1.02 }}
                            >
                                Invite Friends to Group
                            </motion.button>
                        </div>
                    </div>
                )}

                {activeTab === 'practice' && <LanguagePracticeGroup />}
            </div>

            {/* Post Modal */}
            <CreatePostModal
                isOpen={showPostModal}
                onClose={() => setShowPostModal(false)}
                onPost={(postData) => console.log('Group post created:', postData)}
            />
        </div>
    );
}

