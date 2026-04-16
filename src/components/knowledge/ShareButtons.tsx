"use client";
import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Link2, Copy, Facebook, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface ShareButtonsProps {
    articleUrl: string;
    title: string;
}

export default function ShareButtons({ articleUrl, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareToTwitter = () => {
        const text = encodeURIComponent(`${title} ${articleUrl}`);
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
    };

    const shareToWhatsApp = () => {
        const text = encodeURIComponent(`${title}\n\n${articleUrl}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    };

    const shareToFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
    };

    const shareToLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`, '_blank');
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(articleUrl);
            setCopied(true);
            toast.success('Link copied to clipboard!', {
                duration: 2000,
                style: {
                    background: 'linear-gradient(135deg, #C9A84C 0%, #FFD700 100%)',
                    color: '#000',
                    fontWeight: 'bold'
                }
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <motion.div
            className="flex gap-2 lg:gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
        >
            <motion.button
                onClick={shareToTwitter}
                className="group p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                whileHover={{ rotate: 5 }}
            >
                <Twitter className="w-6 h-6 text-white group-hover:text-gold transition-colors" />
            </motion.button>

            <motion.button
                onClick={shareToWhatsApp}
                className="group p-4 rounded-xl bg-green-500/20 hover:bg-green-500/40 border border-green-400/50 hover:border-green-400/80 transition-all duration-300 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
            >
                <MessageCircle className="w-6 h-6 text-green-300 group-hover:text-green-100 transition-colors" />
            </motion.button>

            <motion.button
                onClick={copyToClipboard}
                className={`group p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center relative ${copied ? 'bg-green-500/30 border-green-400/50' : ''}`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ rotateY: 10 }}
            >
                <Link2 className="w-6 h-6 text-white group-hover:text-gold transition-colors" />
                {copied && (
                    <motion.div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        Copied!
                    </motion.div>
                )}
            </motion.button>

            <motion.button
                onClick={shareToFacebook}
                className="group p-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 hover:border-blue-500/80 transition-all duration-300 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
            >
                <svg className="w-6 h-6 fill-current text-blue-300 group-hover:text-blue-100" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            </motion.button>

            <motion.button
                onClick={shareToLinkedIn}
                className="group p-4 rounded-xl bg-blue-700/20 hover:bg-blue-700/40 border border-blue-600/50 hover:border-blue-600/80 transition-all duration-300 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
                whileHover={{ y: -2 }}
            >
                <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </motion.button>
        </motion.div>
    );
}

