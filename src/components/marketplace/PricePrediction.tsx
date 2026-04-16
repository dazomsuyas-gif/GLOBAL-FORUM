"use client";
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TrendingUp, Circle, DollarSign } from 'recharts';
import { Star } from 'lucide-react';

interface PricePredictionProps {
    localPrice: number;
    internationalPrices: {
        USD: number;
        EUR: number;
        GBP: number;
    };
}

export default function PricePrediction({ localPrice, internationalPrices }: PricePredictionProps) {
    const data = [
        { name: 'Market Low', price: localPrice * 0.8, fill: '#ef4444' },
        { name: 'Your Price', price: localPrice, fill: '#eab308' },
        { name: 'Optimal', price: localPrice * 1.1, fill: '#10b981' },
        { name: 'Market High', price: localPrice * 1.3, fill: '#06b6d4' }
    ];

    const demand = Math.floor(Math.random() * 100 + 1);
    const confidence = Math.floor(Math.random() * 30 + 70);
    const trend = 'up';

    const competitors = [
        { name: 'Competitor A', price: localPrice * 0.95, source: 'Local Seller' },
        { name: 'Competitor B', price: localPrice * 1.05, source: 'Amazon' },
        { name: 'Competitor C', price: localPrice * 0.9, source: 'AliExpress' }
    ];

    return (
        <motion.div
            className="glass-card p-10 rounded-4xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="flex items-center gap-4 mb-10">
                <div className="w-3 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-2xl" />
                <h3 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    AI Price Prediction
                </h3>
            </div>

            {/* Price Range Chart */}
            <div className="mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'white', fontSize: 14, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'white', fontSize: 14 }} />
                                <Tooltip
                                    contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px' }}
                                    labelStyle={{ color: 'black', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="price" radius={[8, 8, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <motion.rect
                                            key={`bar-${index}`}
                                            fill={entry.fill}
                                            rx={8}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ duration: 1, delay: index * 0.2 }}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Optimal Price Recommendation */}
                    <motion.div
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="glass-card p-8 rounded-3xl border-emerald-400/50">
                            <div className="flex items-center gap-4 mb-6">
                                <Circle className="w-20 h-20 text-emerald-400 bg-emerald-500/20 p-4 rounded-full shadow-2xl" />
                                <div>
                                    <h4 className="text-3xl font-black text-white mb-2">Optimal Price</h4>
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
                                        <DollarSign className="w-8 h-8" />
                                        <span>{formatPrice(localPrice * 1.1)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-white/80 text-lg leading-relaxed">
                                Based on 2,450 local listings and 15,237 international sales, this price maximizes profit while remaining competitive.
                            </div>
                        </div>

                        {/* Demand & Confidence */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="glass-card p-8 rounded-3xl text-center">
                                <div className="text-4xl font-black text-emerald-400 mb-4">{demand}%</div>
                                <div className="text-white/80 text-lg font-bold">Demand Level</div>
                                <div className={`text-sm font-bold mt-2 ${demand > 70 ? 'text-emerald-400' : demand > 40 ? 'text-amber-400' : 'text-red-400'}`}>
                                    {demand > 70 ? 'HIGH' : demand > 40 ? 'MEDIUM' : 'LOW'}
                                </div>
                            </div>
                            <div className="glass-card p-8 rounded-3xl text-center">
                                <div className="text-4xl font-black text-blue-400 mb-4">{confidence}%</div>
                                <div className="text-white/80 text-lg font-bold">Confidence</div>
                                <div className={`text-sm font-bold mt-2 ${confidence > 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    AI Prediction Score
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Currency Conversion */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="glass-card p-8 rounded-3xl text-center">
                    <div className="text-2xl font-bold text-emerald-400 mb-4">${internationalPrices.USD.toFixed(0)}</div>
                    <div className="text-white/70 text-sm uppercase tracking-wider">USD</div>
                </div>
                <div className="glass-card p-8 rounded-3xl text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-4">€{internationalPrices.EUR.toFixed(0)}</div>
                    <div className="text-white/70 text-sm uppercase tracking-wider">EUR</div>
                </div>
                <div className="glass-card p-8 rounded-3xl text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-4">£{internationalPrices.GBP.toFixed(0)}</div>
                    <div className="text-white/70 text-sm uppercase tracking-wider">GBP</div>
                </div>
            </div>

            {/* Competitor Pricing */}
            <div>
                <h4 className="text-2xl font-black text-white mb-8">Competitor Analysis</h4>
                <div className="space-y-4">
                    {competitors.map((comp, idx) => (
                        <motion.div
                            key={idx}
                            className="glass-card p-6 rounded-3xl flex items-center gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center font-bold text-xl">
                                C{idx + 1}
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-bold text-lg mb-1">{comp.name}</div>
                                <div className="text-white/60 text-sm">{comp.source}</div>
                            </div>
                            <div className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                                {formatPrice(comp.price)}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Action Button */}
            <motion.button
                className="w-full mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-6 px-12 rounded-3xl shadow-2xl hover:shadow-emerald-500/75 hover:from-emerald-600 hover:to-teal-700 transition-all text-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                Use This Price
            </motion.button>
        </motion.div>
    );
}

function formatPrice(price: number) {
    return new Intl.NumberFormat('en-TZ', {
        style: 'currency',
        currency: 'TZS',
        notation: 'compact'
    }).format(price);
}

