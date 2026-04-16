"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Users, ShoppingBag, BarChart3, Settings, BookOpen, Globe, AlertTriangle, Mail, Key, Database, Zap, LayoutDashboard, FileText, MessageCircle, DollarSign, Activity, Shield, Users2, ShieldCheck } from 'lucide-react';

const sidebarNav = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Content', href: '/admin/content', icon: FileText },
    { name: 'Language Academy', href: '/admin/languages', icon: BookOpen },
    { name: 'Marketplace', href: '/admin/marketplace', icon: ShoppingBag },
    { name: 'Community', href: '/admin/community', icon: Users2 },
    { name: 'Payments', href: '/admin/payments', icon: DollarSign },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Admin Users', href: '/admin/settings/admins', icon: ShieldCheck },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const [currentUser] = useState({
        name: 'Kelvin Msuya',
        role: 'Super Admin',
        avatar: 'K'
    });
    const router = useRouter();
    const pathname = usePathname();

    const logout = () => {
        // Mock logout
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950">
            {/* Sidebar */}
            <motion.aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
                animate={{ width: isOpen ? 288 : 80 }}
                initial={false}
            >
                <div className="p-8 border-b border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center font-black text-2xl">
                            GF
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-left"
                                >
                                    <h1 className="text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        Global Forum
                                    </h1>
                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Admin Panel</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <nav className="p-8 space-y-4 mt-8">
                    {sidebarNav.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`glass-card flex items-center gap-4 p-6 rounded-3xl group hover:shadow-glow-emerald transition-all border-2 ${isActive
                                        ? 'border-emerald-400/50 bg-emerald-500/10 shadow-emerald-500/25 text-emerald-400'
                                        : 'border-slate-800 hover:border-emerald-400/30 hover:bg-emerald-500/5'
                                    }`}
                            >
                                <Icon className={`w-8 h-8 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400 transition-colors'}`} />
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.2 }}
                                            className="font-bold text-xl"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-8 left-8 right-8">
                    <div className="glass-card flex items-center gap-4 p-6 rounded-3xl border border-slate-800">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                            {currentUser.avatar}
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <div className="text-left">
                                        <p className="font-bold text-white text-lg">{currentUser.name}</p>
                                        <p className="text-slate-400 text-sm">{currentUser.role}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.button
                            onClick={logout}
                            className="ml-auto p-3 rounded-2xl bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <LogOut className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    className="lg:hidden fixed top-6 left-6 p-4 bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl z-60"
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </motion.button>
            </motion.aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${isOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
                <div className="min-h-screen">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

