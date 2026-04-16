"use client";
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface LikeButtonProps {
    articleId: number;
    initialLikes: number;
}

export default function LikeButton({ articleId, initialLikes }: LikeButtonProps) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(initialLikes);

    useEffect(() => {
        // Check localStorage for like status
        const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
        if (likedArticles.includes(articleId)) {
            setLiked(true);
        }
    }, [articleId]);

    const toggleLike = () => {
        setLiked(!liked);

        if (!liked) {
            // Add like
            const newLikes = likes + 1;
            setLikes(newLikes);

            // Save to localStorage
            const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
            if (!likedArticles.includes(articleId)) {
                likedArticles.push(articleId);
                localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
            }

            // Confetti burst
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#C9A84C', '#FFD700', '#FF6B6B'],
            });
        } else {
            // Remove like
            const newLikes = likes - 1;
            setLikes(newLikes);

            // Remove from localStorage
            const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
            const filtered = likedArticles.filter((id: number) => id !== articleId);
            localStorage.setItem('likedArticles', JSON.stringify(filtered));
        }
    };

    return (
        <motion.button
            onClick={toggleLike}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${liked
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/50 hover:shadow-rose-500/75 hover:scale-105'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:border-white/40 hover:scale-105'
                }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                boxShadow: liked ? '0 10px 30px rgba(239, 68, 68, 0.4)' : '0 5px 20px rgba(255, 255, 255, 0.1)'
            }}
        >
            <motion.div
                className={`w-8 h-8 rounded-full p-1 flex items-center justify-center transition-colors duration-300 ${liked ? 'bg-white/20' : 'bg-transparent'
                    }`}
                animate={{ rotate: liked ? 360 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <Heart className={`w-6 h-6 ${liked ? 'fill-red-400 text-red-300 stroke-red-400' : 'fill-transparent stroke-white/70'}`} />
            </motion.div>

            <span className="tracking-wide">
                {likes.toLocaleString()}
                <span className="text-sm font-normal ml-1">likes</span>
            </span>
        </motion.button>
    );
}

