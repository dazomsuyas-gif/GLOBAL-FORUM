"use client";
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface StatsCardProps {
    title: string;
    value: string;
    growth: string;
    icon: React.ElementType;
    color: string;
}

export default function StatsCard({ title, value, growth, icon: Icon, color }: StatsCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("animate");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            className="glass-card p-8 rounded-3xl border border-slate-800 hover:shadow-glow group cursor-pointer relative overflow-hidden"
            variants={{
                hidden: { opacity: 0, y: 50 },
                animate: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.6,
                        ease: "easeOut"
                    }
                }
            }}
            initial="hidden"
            animate={controls}
        >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/5 to-${color}-600/5 rounded-3xl blur-xl`} />

            {/* Icon */}
            <div className="relative z-10 flex items-center justify-between mb-6">
                <motion.div
                    className={`w-20 h-20 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                </motion.div>

                <motion.div
                    className={`font-bold text-xl ${growth.includes('+') ? 'text-emerald-400' : 'text-red-400'} flex items-center gap-1`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {growth.includes('+') ? (
                        <>
                            <TrendingUp className="w-5 h-5" />
                            <span>{growth}</span>
                        </>
                    ) : (
                        <TrendingDown className="w-5 h-5 rotate-180" />
            {growth}
          )}
                </motion.div>
            </div>

            {/* Value */}
            <motion.p
                className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {value}
            </motion.p>

            {/* Title */}
            <motion.p
                className="text-slate-400 text-xl font-semibold leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {title}
            </motion.p>

            {/* Hover effect */}
            <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                animate={isInView ? { rotate: 360 } : {}}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    );
}

