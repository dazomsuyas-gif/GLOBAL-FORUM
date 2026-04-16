"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users, DollarSign, ShoppingBag, FileText, BookOpen,
    Globe, AlertCircle, BarChart3, TrendingUp, Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { adminData, categories, languages } from '../../../data/adminData';

const { stats, revenueMonthly, traffic, systemHealth } = adminData;

const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', '#06B6D4'];

export default function AdminDashboard() {
    const [dateRange, setDateRange] = useState('30');

    const recentOrders = [
        { id: '#ORD-00123', customer: 'John Doe', seller: 'TechShop TZ', amount: 'TZS 45,000', status: 'Delivered', date: '2h ago' },
        { id: '#ORD-00122', customer: 'Maria Lopez', seller: 'Mobile World', amount: '$129.99', status: 'Shipped', date: '4h ago' },
        { id: '#ORD-00121', customer: 'Ahmed Ali', seller: 'BookStore TZ', amount: 'TZS 12,500', status: 'Processing', date: '6h ago' },
        { id: '#ORD-00120', customer: 'Sarah Wilson', seller: 'Digital Goods', amount: '$49.99', status: 'Paid', date: '8h ago' },
        { id: '#ORD-00119', customer: 'David Kim', seller: 'TechShop TZ', amount: 'TZS 2,450,000', status: 'Delivered', date: '1 day ago' },
    ];

    const topProducts = [
        { name: 'iPhone 15 Pro', sales: 45, revenue: 225000000 },
        { name: 'Samsung S24', sales: 32, revenue: 57600000 },
        { name: 'MacBook Air', sales: 28, revenue: 140000000 },
        { name: 'Python Course', sales: 156, revenue: 2340000 },
        { name: 'HSK Level 1 Book', sales: 89, revenue: 4450000 },
    ];

    const popularArticles = [
        { title: 'AI Revolution 2024', views: 12.5k, author: 'Kelvin Msuya' },
        { title: 'Master HSK in 90 Days', views: 8.9k, author: 'Sarah Wilson' },
        { title: 'Crypto Trading Guide', views: 7.2k, author: 'David Kim' },
        { title: 'Spanish for Beginners', views: 6.8k, author: 'Maria Lopez' },
        { title: 'Building Global Forum', views: 5.9k, author: 'Kelvin Msuya' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
                            Dashboard
                        </h1>
                        <p className="text-2xl text-slate-400 font-semibold">Welcome back, Super Admin!</p>
                    </div>
                    <div className="flex gap-4">
                        <motion.button
                            className="glass-card px-8 py-4 rounded-3xl border border-slate-700 font-bold hover:shadow-glow-emerald transition-all flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Activity className="w-6 h-6" />
                            Export Report
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {[
                    { title: 'Total Users', value: stats.totalUsers.toLocaleString(), growth: '+12%', icon: Users, color: 'emerald' },
                    { title: 'Total Revenue', value: `TZS ${stats.totalRevenueTZS.toLocaleString()}`, growth: '+28%', icon: DollarSign, color: 'yellow' },
                    { title: 'Total Orders', value: stats.totalOrders.toLocaleString(), growth: '+45%', icon: ShoppingBag, color: 'blue' },
                    { title: 'Active Products', value: stats.totalProducts.toLocaleString(), growth: '+23%', icon: Globe, color: 'purple' },
                    { title: 'Articles Published', value: stats.totalArticles.toLocaleString(), growth: '+15%', icon: FileText, color: 'indigo' },
                    { title: 'Stories Live', value: stats.totalStories.toLocaleString(), growth: '+8%', icon: BookOpen, color: 'pink' },
                    { title: 'Languages Active', value: stats.activeLanguages.toString(), growth: '0%', icon: Globe, color: 'green' },
                    { title: 'Pending Disputes', value: stats.pendingDisputes?.toString() || '0', growth: '+12%', icon: AlertCircle, color: 'orange' },
                    { title: 'Pending Reviews', value: stats.pendingReviews.toString(), growth: '+3%', icon: AlertCircle, color: 'red' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        className="glass-card p-8 rounded-3xl border border-slate-800 hover:shadow-glow group cursor-pointer"
                        whileHover={{ y: -8 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className={`w-16 h-16 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-3xl flex items-center justify-center shadow-2xl`}>
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className={`text-${stat.color}-400 font-bold text-2xl ${stat.growth.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.growth}
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                            <p className="text-slate-400 text-xl font-semibold">{stat.title}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Revenue Chart */}
                <motion.div
                    className="glass-card p-8 rounded-3xl border border-slate-800"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-3xl font-bold text-white">Revenue (Monthly)</h3>
                        <select
                            className="bg-slate-800/50 border border-slate-700 px-4 py-2 rounded-2xl text-white"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="7">7 Days</option>
                            <option value="30">30 Days</option>
                            <option value="90">90 Days</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={revenueMonthly}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 66% 20%)" />
                            <XAxis dataKey="month" stroke="hsl(215 20% 65%)" fontSize={14} />
                            <YAxis stroke="hsl(215 20% 65%)" fontSize={14} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="hsl(142 71% 45%)"
                                strokeWidth={4}
                                dot={{ fill: 'hsl(142 71% 45%)', strokeWidth: 2 }}
                                activeDot={{ r: 8, strokeWidth: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* User Growth */}
                <motion.div
                    className="glass-card p-8 rounded-3xl border border-slate-800"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-6">New Users (Weekly)</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={traffic}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 66% 20%)" />
                            <XAxis dataKey="day" stroke="hsl(215 20% 65%)" fontSize={14} />
                            <YAxis stroke="hsl(215 20% 65%)" fontSize={14} />
                            <Tooltip />
                            <Bar dataKey="views" fill="hsl(259 73% 59%)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <motion.div
                    className="glass-card p-8 rounded-3xl border border-slate-800 xl:col-span-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                            <ShoppingBag className="w-10 h-10 text-emerald-400" />
                            Recent Orders
                        </h3>
                        <span className="text-slate-400 font-semibold">Last 24h</span>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                className="flex items-center justify-between p-6 rounded-3xl bg-slate-800/30 border border-slate-700 hover:bg-slate-800/50 transition-all group"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.05 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-bold text-white">
                                        {order.id.slice(-4)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl text-white">{order.customer}</p>
                                        <p className="text-slate-400">{order.seller}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-2xl text-emerald-400">{order.amount}</p>
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-400' :
                                            order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-slate-500/20 text-slate-400'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <p className="text-slate-500 text-sm">{order.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Top Products */}
                <motion.div
                    className="glass-card p-8 rounded-3xl border border-slate-800"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-8">Top Products</h3>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={product.name} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-lg">
                                        #{index + 1}
                                    </div>
                                    <span className="font-bold text-xl">{product.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-2xl text-emerald-400">{product.sales}</p>
                                    <p className="text-emerald-400 font-semibold">TZS {product.revenue.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Popular Articles */}
                <motion.div
                    className="glass-card p-8 rounded-3xl border border-slate-800 xl:row-span-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <FileText className="w-10 h-10 text-indigo-400" />
                        Popular Articles
                    </h3>
                    <div className="space-y-4">
                        {popularArticles.map((article) => (
                            <div key={article.title} className="flex items-center justify-between group hover:bg-slate-800/30 p-4 rounded-2xl transition-all">
                                <div className="flex items-center gap-4 truncate">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-white text-sm">
                                        Art
                                    </div>
                                    <div className="truncate">
                                        <p className="font-bold text-lg text-white truncate">{article.title}</p>
                                        <p className="text-slate-400 text-sm">{article.author}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-2xl text-indigo-400">{article.views}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* System Health */}
                <motion.div
                    className="glass-card p-8 rounded-3xl border border-slate-800"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <h3 className="text-3xl font-bold text-white mb-8">System Health</h3>
                    <div className="space-y-4">
                        {Object.entries(systemHealth).map(([key, status]) => (
                            <div key={key} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-700">
                                <span className="font-semibold capitalize text-slate-300">{key.replace('_', ' ')}</span>
                                <span className={status.includes('🟢') ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                                    {status}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                {[
                    { title: 'Create Article', href: '/admin/content/articles/new', icon: FileText, color: 'indigo' },
                    { title: 'Add Product', href: '/admin/marketplace/products/new', icon: ShoppingBag, color: 'emerald' },
                    { title: 'Manage Users', href: '/admin/community/users', icon: Users, color: 'blue' },
                ].map((action) => (
                    <motion.a
                        href={action.href}
                        className="glass-card p-10 rounded-4xl border border-slate-800 hover:shadow-glow hover:shadow-2xl transition-all group text-center"
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.98 }}
                        key={action.title}
                    >
                        <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-${action.color}-500 to-${action.color}-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform`}>
                            <action.icon className="w-14 h-14 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all">
                            {action.title}
                        </h4>
                        <p className="text-slate-400 text-lg">Get started in seconds</p>
                    </motion.a>
                ))}
            </motion.div>
        </div>
    );
}

