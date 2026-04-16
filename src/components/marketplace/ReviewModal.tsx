"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: string;
    sellerId: string;
}

export default function ReviewModal({ isOpen, onClose, productId, sellerId }: ReviewModalProps) {
    const { data: session } = useSession();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [loadingPurchaseCheck, setLoadingPurchaseCheck] = useState(true);

    // Check if user purchased
    useEffect(() => {
        if (isOpen && session?.user?.id) {
            checkPurchase();
        }
    }, [isOpen, session]);

    const checkPurchase = async () => {
        try {
            const response = await fetch(`/api/orders/check-purchase?productId=${productId}&userId=${session.user.id}`);
            const data = await response.json();
            setHasPurchased(data.hasPurchased);
        } catch (error) {
            console.error('Purchase check error:', error);
        } finally {
            setLoadingPurchaseCheck(false);
        }
    };

    const submitReview = async () => {
        if (!rating || !comment.trim()) {
            toast.error('Please select rating and write a comment');
            return;
        }
        if (comment.length > 500) {
            toast.error('Comment must be less than 500 characters');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/reviews/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rating,
                    comment,
                    productId,
                    sellerId,
                }),
            });

            if (response.ok) {
                toast.success('Review submitted successfully!');
                setRating(0);
                setComment('');
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Failed to submit review');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loadingPurchaseCheck) {
        return null;
    }

    if (!hasPurchased) {
        return null; // Don't show modal if not purchased
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/70 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-4xl p-10 border border-white/20 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                                Write a Review
                            </h2>
                            <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                                <X className="w-8 h-8 text-white/70 hover:text-white" />
                            </button>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center justify-center mb-12">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        className="text-5xl p-4 hover:scale-110 transition-all"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className={`transition-colors duration-200 ${star <= (hoverRating || rating) ? 'text-yellow-400 drop-shadow-lg' : 'text-gray-500'
                                            }`}>
                                            ★
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Comment */}
                        <div className="space-y-4 mb-12">
                            <label className="text-xl font-bold text-white block mb-4">Your feedback</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                maxLength={500}
                                rows={6}
                                placeholder="Share your experience with this product and seller..."
                                className="w-full p-6 bg-white/5 border border-white/20 rounded-3xl text-white placeholder-white/50 focus:border-emerald-400 focus:outline-none resize-vertical text-lg font-medium"
                            />
                            <div className="text-right">
                                <span className={`text-sm ${comment.length > 450 ? 'text-red-400' : 'text-white/50'}`}>
                                    {comment.length}/500
                                </span>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            onClick={submitReview}
                            disabled={isSubmitting || !rating}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-8 px-12 rounded-4xl text-2xl shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isSubmitting ? (
                                'Submitting...'
                            ) : (
                                <>
                                    <Send className="w-8 h-8" />
                                    Submit Review
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
