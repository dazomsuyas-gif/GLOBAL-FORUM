"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
    { value: '6', suffix: '+', label: 'Languages' },
    { value: '250', suffix: '+', label: 'Articles' },
    { value: '20', suffix: '+', label: 'Stories' },
    { value: '10000', suffix: '+', label: 'Members' },
];

export default function StatsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [counts, setCounts] = useState({ 0: 0, 1: 0, 2: 0, 3: 0 });

    useEffect(() => {
        if (!isInView) return;

        stats.forEach((_, index) => {
            let start = 0;
            const end = parseInt(stats[index].value);
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    start = end;
                    clearInterval(timer);
                }
                setCounts(prev => ({
                    ...prev,
                    [index]: Math.floor(start)
                }));
            }, 16);

            return () => clearInterval(timer);
        });
    }, [isInView]);

    return (
        <section ref={ref} className="py-32 bg-gradient-to-r from-slate-900 via-navy to-slate-900">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
                        By The Numbers
                    </h2>
                    <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
                        Global Forum is already empowering thousands worldwide
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="glass-card text-center py-16 px-8 group cursor-default"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <motion.div
                                className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gold via-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6"
                                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                {counts[index].toLocaleString()}{stat.suffix}
                            </motion.div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                                {stat.label}
                            </h3>

                            <div className="flex items-center justify-center gap-4 mt-4">
                                <div className="w-4 h-4 bg-gold-bright rounded-full animate-pulse"></div>
                                <span className="text-white/60 text-sm uppercase tracking-wider font-mono">
                                    Live
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

