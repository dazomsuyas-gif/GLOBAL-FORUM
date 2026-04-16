"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, User, Mail, Phone, MapPin, Edit3, Save, Camera, Image as ImageIcon,
    TrendingUp
} from 'lucide-react';
import { userDashboardData } from '@/data/userDashboardData';
import Link from 'next/link';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(userDashboardData.sampleProfile);
    const [avatarPreview, setAvatarPreview] = useState(profile.avatar);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/auth/signin?callbackUrl=/dashboard/profile');
        }
    }, [session, status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock save - replace with Prisma update
        setTimeout(() => {
            setIsEditing(false);
            setLoading(false);
        }, 1500);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setAvatarPreview(preview);
        }
    };

    if (status === "loading") {
        return <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="animate-pulse h-8 w-64 bg-slate-800 rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="h-32 w-32 bg-slate-800 rounded-3xl mx-auto"></div>
                    <div className="space-y-4">
                        <div className="h-12 bg-slate-800 rounded-xl"></div>
                        <div className="h-10 bg-slate-800 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-white to-slate-300/50 bg-clip-text text-transparent mb-2">
                            Profile
                        </h1>
                        <p className="text-xl text-slate-400 font-semibold">Manage your account settings</p>
                    </div>
                </div>
            </motion.div>

            {/* Profile Card */}
            <motion.form
                onSubmit={handleSubmit}
                className="glass-card p-12 rounded-4xl border border-slate-800 max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                {/* Avatar */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <div className="w-40 h-40 rounded-4xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-700 shadow-2xl mx-auto mb-6 group">
                            <img
                                src={avatarPreview}
                                alt="Profile"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {isEditing && (
                                <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/70">
                                    <Camera className="w-12 h-12 text-white" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                    />
                                </label>
                            )}
                        </div>
                        <p className="text-slate-400 text-sm">Click to change avatar (edit mode)</p>
                    </div>
                </div>

                {/* Profile Fields */}
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-6/5 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-slate-400 font-semibold mb-3 flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-6 py-5 rounded-3xl border-2 font-bold text-2xl text-white transition-all ${isEditing
                                        ? 'border-blue-500/50 bg-slate-900/50 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500'
                                        : 'border-slate-700/50 bg-slate-900/30 cursor-not-allowed'
                                    }`}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-slate-400 font-semibold mb-3 flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Email
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-6 py-5 rounded-3xl border-2 font-semibold text-xl transition-all ${isEditing
                                        ? 'border-emerald-500/50 bg-slate-900/50 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500'
                                        : 'border-slate-700/50 bg-slate-900/30 cursor-not-allowed'
                                    }`}
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 font-semibold mb-3 flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full px-6 py-5 rounded-3xl border-2 font-semibold text-xl transition-all ${isEditing
                                        ? 'border-purple-500/50 bg-slate-900/50 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500'
                                        : 'border-slate-700/50 bg-slate-900/30 cursor-not-allowed'
                                    }`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-slate-400 font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Location
                        </label>
                        <input
                            type="text"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            disabled={!isEditing}
                            className={`w-full px-6 py-5 rounded-3xl border-2 font-semibold text-lg transition-all ${isEditing
                                    ? 'border-indigo-500/50 bg-slate-900/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500'
                                    : 'border-slate-700/50 bg-slate-900/30 cursor-not-allowed'
                                }`}
                            placeholder="City, Country"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-400 font-semibold mb-3 flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" />
                            Bio
                        </label>
                        <textarea
                            rows={4}
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            disabled={!isEditing}
                            className={`w-full px-6 py-5 rounded-3xl border-2 font-semibold resize-none transition-all ${isEditing
                                    ? 'border-yellow-500/50 bg-slate-900/50 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500'
                                    : 'border-slate-700/50 bg-slate-900/30 cursor-not-allowed'
                                }`}
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                </div>

                {/* Stats */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="glass-card p-8 rounded-3xl text-center">
                        <div className="text-4xl font-black text-emerald-400 mb-2">24</div>
                        <div className="text-slate-400 font-semibold">Total Orders</div>
                    </div>
                    <div className="glass-card p-8 rounded-3xl text-center">
                        <div className="text-4xl font-black text-yellow-400 mb-2">$1,567</div>
                        <div className="text-slate-400 font-semibold">Lifetime Spend</div>
                    </div>
                    <div className="glass-card p-8 rounded-3xl text-center">
                        <div className="text-4xl font-black text-blue-400 mb-2">12</div>
                        <div className="text-slate-400 font-semibold">Reviews Written</div>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-12 border-t border-slate-700">
                    <motion.button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className={`glass-card flex-1 py-5 px-8 rounded-3xl border-2 font-bold text-xl transition-all flex items-center justify-center gap-3 ${isEditing
                                ? 'border-red-500/50 bg-red-500/10 hover:shadow-glow-red text-red-400 hover:border-red-400/50'
                                : 'border-blue-500/50 hover:shadow-glow-blue text-blue-400 hover:border-blue-400/50'
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Edit3 className={`w-6 h-6 ${isEditing ? 'rotate-180' : ''}`} />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </motion.button>

                    {isEditing && (
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="glass-card bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-5 px-8 rounded-3xl border-2 border-emerald-500/50 shadow-glow-emerald hover:shadow-glow-emerald/75 flex items-center justify-center gap-3 disabled:opacity-50 disabled:shadow-none"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-6 h-6" />
                                    Save Changes
                                </>
                            )}
                        </motion.button>
                    )}
                </div>
            </motion.form>
        </div>
    );
}

