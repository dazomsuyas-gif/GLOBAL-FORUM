import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface ReviewsPageProps {
    params: { sellerId: string };
    searchParams: { page?: string };
}

export default async function SellerReviewsPage({ params, searchParams }: ReviewsPageProps) {
    const sellerId = params.sellerId;
    const page = parseInt(searchParams.page || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    const [seller, reviews, totalReviews, avgRating] = await Promise.all([
        prisma.user.findUnique({
            where: { id: sellerId },
        }),
        prisma.review.findMany({
            where: {
                sellerId: sellerId,
            },
            include: {
                user: {
                    select: { name: true, image: true },
                },
                product: {
                    select: { title: true, id: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.review.count({
            where: { sellerId: sellerId },
        }),
        prisma.review.aggregate({
            where: { sellerId: sellerId },
            _avg: { rating: true },
            _count: { rating: true },
        }),
    ]);

    if (!seller) {
        return <div>Seller not found</div>;
    }

    const formatDate = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return days === 0 ? 'Today' : days === 1 ? 'Yesterday' : `${days} days ago`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900/50 to-slate-950 py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-24">
                    <Link href={`/marketplace/seller/${sellerId}`} className="inline-flex items-center gap-3 mb-12 text-emerald-400 font-bold text-2xl hover:text-emerald-300">
                        ← Back to Store
                    </Link>
                    <div className="glass-card p-12 rounded-6xl border border-emerald-400/30 max-w-2xl mx-auto">
                        <h1 className="text-5xl font-black bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent mb-8">
                            {seller.name} Reviews
                        </h1>
                        <div className="flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
                            <div className="flex items-center gap-4">
                                <div className="flex text-4xl">
                                    <span className="text-yellow-400">★★★★★</span>
                                </div>
                                <div>
                                    <div className="text-5xl font-black text-white">{avgRating._avg.rating?.toFixed(1) || '0.0'}</div>
                                    <div className="text-white/60">({totalReviews} reviews)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-8 mb-20">
                    {reviews.length === 0 ? (
                        <div className="glass-card p-20 rounded-4xl text-center border border-white/10">
                            <Star className="w-24 h-24 text-yellow-400/30 mx-auto mb-8" />
                            <h3 className="text-3xl font-bold text-white mb-4">No reviews yet</h3>
                            <p className="text-xl text-white/50">Be the first to leave a review for this seller.</p>
                        </div>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="glass-card p-8 rounded-4xl border border-white/10">
                                <div className="flex items-start gap-6 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center font-bold text-xl text-white flex-shrink-0">
                                        {review.user.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex text-2xl">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-500'}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="font-bold text-white text-lg">{review.user.name}</span>
                                            <span className="text-white/50 text-sm">{formatDate(review.createdAt)}</span>
                                        </div>
                                        <div className="text-white/70 text-lg mb-4">{review.comment}</div>
                                        <Link
                                            href={`/marketplace/product/${review.product.id}`}
                                            className="text-emerald-400 hover:text-emerald-300 font-bold text-sm inline-flex items-center gap-1"
                                        >
                                            {review.product.title}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalReviews > limit && (
                    <div className="flex justify-center gap-4">
                        {Array.from({ length: Math.ceil(totalReviews / limit) }, (_, i) => i + 1).map((p) => (
                            <Link
                                key={p}
                                href={`/marketplace/seller/${sellerId}/reviews?page=${p}`}
                                className={`px-6 py-3 rounded-3xl font-bold transition-all ${page === p
                                        ? 'bg-emerald-500 text-white shadow-emerald-500/50'
                                        : 'glass-card border border-white/20 text-white/70 hover:bg-white/10 hover:border-emerald-400'
                                    }`}
                            >
                                {p}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
