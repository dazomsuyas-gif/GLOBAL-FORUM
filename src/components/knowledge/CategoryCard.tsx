import { motion } from 'framer-motion';
import Link from 'next/link';
import { Category } from '@/data/categories';

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <motion.div
            className="glass-card p-10 text-center group cursor-pointer relative overflow-hidden h-[300px] flex flex-col items-center justify-center transition-all duration-500 hover:shadow-glow-gold hover:border-gold/50 hover:bg-gradient-to-br hover:from-white/5"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
        >
            <Link href={`/knowledge/${category.slug}`} className="absolute inset-0 z-10"></Link>

            {/* Icon */}
            <motion.div
                className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                {category.icon}
            </motion.div>

            {/* Name */}
            <motion.h3
                className="text-2xl lg:text-3xl font-black mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-gold group-hover:to-yellow-400 transition-all duration-500"
                whileHover={{ scale: 1.05 }}
            >
                {category.name}
            </motion.h3>

            {/* Description */}
            <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-md">
                {category.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gold-bright rounded-full animate-ping"></div>
                <span className="text-gold font-bold text-lg">
                    {category.articleCount.toLocaleString()} articles
                </span>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl bg-gradient-to-r from-gold/10 via-transparent to-yellow-500/10" />

            {/* Glow Ring */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 -scale-100 group-hover:scale-105 blur-xl bg-gradient-radial-gold" />
        </motion.div>
    );
}

