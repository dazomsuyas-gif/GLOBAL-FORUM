import { Star } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';

interface SellerRatingProps {
    sellerId: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

async function SellerRatingContent({ sellerId, size = 'md', className = '' }: SellerRatingProps) {
    let rating = 0;
    let count = 0;

    try {
        const seller = await prisma.user.findUnique({
            where: { id: sellerId },
            select: { sellerRating: true, reviewCount: true },
        });
        rating = seller?.sellerRating || 0;
        count = seller?.reviewCount || 0;
    } catch (error) {
        console.error('Seller rating fetch error:', error);
    }

    const starSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-3xl';
    const ratingTextSize = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} className={`text-yellow-400 ${starSize} -mr-1`}>
                        ★
                    </span>
                ))}
                {hasHalfStar && (
                    <span className={`text-yellow-400 ${starSize} -mr-1`}>
                        ⭑
                    </span>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className={`text-gray-500 ${starSize} -mr-1`}>
                        ★
                    </span>
                ))}
            </div>
            <span className={`font-bold text-white ${ratingTextSize}`}>
                {rating.toFixed(1)}
            </span>
            {count > 0 && (
                <span className={`text-white/60 ${ratingTextSize}`}>
                    ({count})
                </span>
            )}
        </div>
    );
}

export default function SellerRating({ sellerId, size = 'md', className = '' }: SellerRatingProps) {
    return (
        <Suspense fallback={<div className="flex gap-2"><span className="text-gray-500 text-xl">★ ★ ★ ★ ★</span><span>—</span></div>}>
            <SellerRatingContent sellerId={sellerId} size={size} className={className} />
        </Suspense>
    );
}
