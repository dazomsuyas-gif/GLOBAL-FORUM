"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Heart, MessageCircle, Users, Award, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Notification {
    id: string;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'message' | 'group_invite' | 'practice_reminder';
    user: {
        name: string;
        avatar: string;
        username: string;
    };
    content: string;
    timestamp: string;
    read: boolean;
    targetUrl?: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const router = useRouter();

    // Mock notifications data
    useEffect(() => {
        const mockNotifications: Notification[] = [
            {
                id: '1',
                type: 'like',
                user: { name: "Ana Garcia 🇪🇸", avatar: "🇪🇸", username: "@anagarcia" },
                content: "liked your post about Spanish subjunctive",
                timestamp: "2 mins ago",
                read: false,
                targetUrl: "/community/feed/123"
            },
            {
                id: '2',
                type: 'comment',
                user: { name: "Li Wei 🇨🇳", avatar: "🇨🇳", username: "@liweihsk" },
                content: "Great HSK tone explanation! 🎯",
                timestamp: "5 mins ago",
                read: false,
                targetUrl: "/community/feed/124"
            },
            {
                id: '3',
                type: 'message',
                user: { name: "Pierre Dupont 🇫🇷", avatar: "🇫🇷", username: "@pierredelf" },
                content: "new message: \"Merci pour le feedback!\"",
                timestamp: "12 mins ago",
                read: true,
                targetUrl: "/community/messages/pierre"
            },
            {
                id: '4',
                type: 'follow',
                user: { name: "Maria Silva 🇧🇷", avatar: "🇧🇷", username: "@mariabrasil" },
                content: "started following you",
                timestamp: "1 hour ago",
                read: true
            },
            {
                id: '5',
                type: 'group_invite',
                user: { name: "Group Admin 👑", avatar: "👑", username: "@admin" },
                content: "invited you to join 'HSK 6 Elite'",
                timestamp: "3 hours ago",
                read: false,
                targetUrl: "/community/groups/5"
            },
            {
                id: '6',
                type: 'practice_reminder',
                user: { name: "Language Bot 🤖", avatar: "🤖", username: "@bot" },
                content: "Your Spanish practice session is waiting! 🇪🇸",
                timestamp: "yesterday",
                read: false
            }
        ];

        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }, []);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
        setUnreadCount(prev => prev - 1);
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'like': return Heart;
            case 'comment': return MessageCircle;
            case 'follow': return Users;
            case 'message': return MessageCircle;
            case 'group_invite': return Users;
            case 'practice_reminder': return Award;
            default: return Bell;
        }
    };

    return (
        <div className="relative">
            {/* Bell Button */}
            <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-4 hover:bg-white/10 rounded-3xl transition-all group cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <Bell className="w-8 h-8 text-white/70 group-hover:text-emerald-400 transition-colors" />

                {/* Unread Badge */}
                {unreadCount > 0 && (
                    <motion.div
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold w-8 h-8 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/50 animate-bounce"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </motion.div>
                )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
                {showNotifications && (
                    <motion.div
                        className="absolute top-full right-0 mt-4 w-96 bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 p-6 lg:p-8 max-h-96 overflow-y-auto z-50"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <Bell className="w-8 h-8 text-emerald-400" />
                                <div>
                                    <h3 className="text-2xl font-black text-white">Notifications</h3>
                                    <div className={`text-sm font-bold ${unreadCount === 0 ? 'text-emerald-400' : 'text-white/70'}`}>
                                        {unreadCount === 0 ? 'You\'re all caught up! 🎉' : `${unreadCount} unread`}
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                onClick={markAllRead}
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-bold transition-all flex items-center gap-2 text-sm"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Check className="w-4 h-4" />
                                Mark all read
                            </motion.button>
                        </div>

                        {/* Notifications List */}
                        <div className="space-y-4 max-h-72 overflow-y-auto">
                            {notifications.map((notification) => {
                                const Icon = getIconForType(notification.type);
                                return (
                                    <motion.div
                                        key={notification.id}
                                        className={`glass-card p-6 rounded-2xl cursor-pointer transition-all group flex gap-4 items-start border-l-4 ${notification.read
                                                ? 'border-slate-600/50 hover:border-slate-400/50'
                                                : 'border-emerald-400/70 bg-emerald-500/5 shadow-emerald-400/20 hover:shadow-emerald-400/40'
                                            }`}
                                        onClick={() => {
                                            if (notification.targetUrl) {
                                                router.push(notification.targetUrl);
                                            }
                                            markAsRead(notification.id);
                                        }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {/* Icon */}
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${!notification.read
                                                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/30'
                                                : 'bg-slate-700/50 text-slate-300 shadow-slate-500/20'
                                            }`}>
                                            <Icon className="w-7 h-7" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-3 mb-2">
                                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0 bg-gradient-to-br from-slate-600 to-slate-500 shadow-lg">
                                                    {notification.user.avatar}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-lg text-white truncate">{notification.user.name}</div>
                                                    <div className="text-sm text-white/70 truncate">{notification.content}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs text-white/50">
                                                <span>{notification.timestamp}</span>
                                                {notification.type === 'message' && (
                                                    <span className="px-3 py-1 bg-white/10 rounded-full font-mono">NEW</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Action Icon */}
                                        {!notification.read && (
                                            <motion.div
                                                className="w-12 h-12 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <Check className="w-6 h-6 text-emerald-400" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}

                            {/* Empty State */}
                            {notifications.length === 0 && (
                                <motion.div
                                    className="text-center py-24"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <Bell className="w-24 h-24 text-white/30 mx-auto mb-8 animate-pulse" />
                                    <h3 className="text-3xl font-black text-white mb-4">No notifications</h3>
                                    <p className="text-xl text-white/60">Everything is quiet for now. Great job staying on top of things! 🎉</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="pt-8 mt-8 border-t border-white/10 flex items-center gap-4">
                            <motion.button
                                className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-emerald-500/50 transition-all"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => {
                                    router.push('/community/notifications');
                                    setShowNotifications(false);
                                }}
                            >
                                View All Notifications
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

