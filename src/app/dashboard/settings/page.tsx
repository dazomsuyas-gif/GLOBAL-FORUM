"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Bell, Mail, PhoneCall, Shield, CreditCard, Globe,
    Save, ToggleLeft, ToggleRight, LogOut, Database
} from 'lucide-react';
import { userDashboardData } from '@/data/userDashboardData';
import Link from 'next/link';

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [settings, setSettings] = useState(userDashboardData.notificationPrefs);
    const [savedPaymentMethods, setSavedPaymentMethods] = useState(['Stripe', 'Nala Money']);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/auth/signin?callbackUrl=/dashboard/settings');
        }
    }, [session, status, router]);

    const handleSave = async () => {
        setLoading(true);
        // Mock save
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const toggleSetting = (key: string) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key as keyof typeof settings]
        }));
    };

    if (status === "loading") {
        return <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="animate-pulse h-8 w-64 bg-slate-800 rounded-xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="h-16 bg-slate-800 rounded-2xl p-4"></div>
                    ))}
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
                            Settings
                        </h1>
                        <p className="text-xl text-slate-400 font-semibold">Customize your preferences</p>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Notifications */}
                <motion.section
                    className="glass-card p-10 rounded-4xl border border-slate-800"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <Bell className="w-10 h-10 text-yellow-400" />
                        Notifications
                    </h2>

                    <div className="space-y-6">
                        {[
                            { key: 'orderUpdates', label: 'Order Updates', icon: ShoppingBag, desc: 'Order status changes, shipping updates' },
                            { key: 'newMessages', label: 'New Messages', icon: Mail, desc: 'Direct messages and replies' },
                            { key: 'communityPosts', label: 'Community Posts', icon: Globe, desc: 'New posts in followed groups' },
                            { key: 'priceAlerts', label: 'Price Alerts', icon: TrendingUp, desc: 'Price drops on saved items' },
                            { key: 'promotional', label: 'Promotions', icon: CreditCard, desc: 'Special offers and discounts' },
                        ].map(({ key, label, icon: Icon, desc }) => (
                            <motion.div
                                key={key}
                                className="glass-card p-6 rounded-3xl border border-slate-700 hover:shadow-glow-blue/50 transition-all group"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl text-white">{label}</h4>
                                            <p className="text-slate-400 text-sm">{desc}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => toggleSetting(key)}
                                        className={`w-14 h-9 rounded-2xl border-2 transition-all flex items-center px-3 shadow-inner ${settings[key as keyof typeof settings]
                                                ? 'bg-emerald-500 border-emerald-400 shadow-emerald-500/25 translate-x-6'
                                                : 'bg-slate-800 border-slate-600 shadow-slate-900/25'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full bg-white shadow-lg transition-transform ${settings[key as keyof typeof settings] ? 'translate-x-1' : ''
                                            }`}></div>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Payment Methods */}
                <motion.section
                    className="glass-card p-10 rounded-4xl border border-slate-800 lg:col-span-1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <CreditCard className="w-10 h-10 text-emerald-400" />
                        Payment Methods
                    </h2>

                    <div className="space-y-4 mb-8">
                        {savedPaymentMethods.map((method, index) => (
                            <motion.div
                                key={method}
                                className="glass-card p-6 rounded-3xl border border-slate-700 hover:shadow-glow-emerald/50 flex items-center justify-between"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${method === 'Stripe' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                            method === 'Nala Money' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                                                'bg-gradient-to-br from-purple-500 to-pink-600'
                                        }`}>
                                        <span className="font-bold text-white text-lg capitalize">{method === 'Nala Money' ? 'Nala' : method[0]}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-xl text-white capitalize">{method}</h4>
                                        <p className="text-slate-400 text-sm">**** **** **** {index + 1234}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30">
                                        Default
                                    </span>
                                    <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
                                        <Edit3 className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        className="w-full glass-card p-5 rounded-3xl border-2 border-slate-700 hover:shadow-glow-purple hover:border-purple-500/50 transition-all flex items-center justify-center gap-3 text-purple-400 font-bold"
                        whileHover={{ scale: 1.02 }}
                    >
                        <CreditCard className="w-6 h-6" />
                        Add Payment Method
                    </motion.button>
                </motion.section>
            </div>

            {/* Security & Privacy */}
            <motion.section
                className="glass-card p-10 rounded-4xl border border-slate-800 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                    <Shield className="w-12 h-12 text-indigo-400" />
                    Security & Privacy
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Database className="w-8 h-8 text-blue-400" />
                            Data & Storage
                        </h4>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex justify-between py-3 border-b border-slate-700">
                                <span>Orders History</span>
                                <span className="font-mono text-sm">24 items</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-slate-700">
                                <span>Messages</span>
                                <span className="font-mono text-sm">156 conversations</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-slate-700">
                                <span>Saved Items</span>
                                <span className="font-mono text-sm">12 items</span>
                            </div>
                            <div className="flex justify-between py-3">
                                <span>Storage Used</span>
                                <span className="font-mono text-sm text-emerald-400">2.4 MB / 50 MB</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Globe className="w-8 h-8 text-green-400" />
                            Privacy Settings
                        </h4>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700 cursor-pointer group hover:bg-slate-800/70">
                                <div>
                                    <div className="font-semibold text-white">Profile Visibility</div>
                                    <div className="text-sm text-slate-400">Who can see your profile</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-400 font-mono">Public</span>
                                    <ToggleRight className="w-8 h-8 text-emerald-400" />
                                </div>
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700 cursor-pointer group hover:bg-slate-800/70">
                                <div>
                                    <div className="font-semibold text-white">Activity Status</div>
                                    <div className="text-sm text-slate-400">Show when you're online</div>
                                </div>
                                <ToggleRight className="w-8 h-8 text-emerald-400" />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-12 mt-12 border-t-2 border-red-500/20">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 max-w-2xl mx-auto text-center">
                        <LogOut className="w-16 h-16 text-red-400 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-red-300 mb-4">Delete Account</h3>
                        <p className="text-red-400 mb-8 max-w-md mx-auto">
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <motion.button
                            className="glass-card px-12 py-4 rounded-2xl border-2 border-red-500 bg-red-500/10 text-red-400 font-bold hover:bg-red-500/20 hover:shadow-glow-red transition-all"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Delete My Account
                        </motion.button>
                    </div>
                </div>
            </motion.section>

            {/* Save Changes Button */}
            <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <motion.button
                    onClick={handleSave}
                    disabled={loading}
                    className="glass-card bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-6 px-12 rounded-4xl border-2 border-emerald-500/50 shadow-glow-emerald hover:shadow-glow-emerald/75 px-16 text-xl disabled:opacity-50 disabled:shadow-none transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? (
                        <>
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3 inline-block"></div>
                            Saving...
                        </>
                    ) : (
                        'Save All Changes'
                    )}
                </motion.button>
            </motion.div>
        </div>
    );
}

