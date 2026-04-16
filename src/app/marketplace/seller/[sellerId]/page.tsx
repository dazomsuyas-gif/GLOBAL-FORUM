"use client";
import { motion } from 'framer-motion';
import { Star, TrendingUp, ShoppingBag, MapPin, Crown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface SellerPageProps {
    params: { sellerId: string };
}

export default async function SellerPage({ params }: SellerPageProps) {
    const sellerId = params.sellerId;

    let seller = await prisma.user.findUnique({
        where: { id: sellerId },
        include: {
            products: {
                take: 12,
                orderBy: { createdAt: 'desc' },
                include: { seller: true },
            },
            _count: {
                select: { products: true, reviewsReceived: true },
            },
        },
    });

    if (!seller || seller.role !== 'SELLER') {
        notFound();
    }

    const formatRating = (rating?: number, count?: number) => {
        return rating ? `${rating.toFixed(1)} (${count || 0})` : 'No reviews';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950 py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Seller Header */}
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
                    <div className="inline-flex items-center gap-6 mb-12 p-12 glass-card rounded-6xl border-2 border-emerald-400/30 shadow-2xl">
                        <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-400 rounded-4xl flex items-center justify-center font-black text-5xl shadow-2xl">
                            {seller.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="text-left">
                            <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-4">
                                {seller.name}
                            </h1>
                            <div className="flex items-center gap-6 text-2xl mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 text-3xl">★★★★★</span>
                                    <span className="font-bold text-white">{formatRating(seller.sellerRating, seller.reviewCount)}</span>
                                </div>
                                <div className="text-white/60">●</div>
                                <div className="flex items-center gap-2">
                                    <ShoppingBag className="w-8 h-8" />
                                    <span className="font-bold">{seller._count.products} products</span>
                                </div>
                            </div>
                            <Link href={`/marketplace/seller/${seller.id}/reviews`} className="text-emerald-400 font-bold text-xl hover:text-emerald-300 transition-all">
                                View all reviews →
                            </Link>
                        </div>
                    </div>
                </motion.div>

                {/* Products Grid */}
                <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center gap-6 mb-16">
                        <div className="w-4 h-20 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-3xl" />
                        <h2 className="text-5xl font-black text-white">Store Products</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {seller.products.length === 0 ? (
                            <div className="col-span-full text-center py-32">
                                <ShoppingBag className="w-24 h-24 text-white/30 mx-auto mb-8" />
                                <h3 className="text-3xl font-bold text-white/50 mb-4">No products yet</h3>
                                <p className="text-xl text-white/30">This seller hasn't listed any products.</p>
                            </div>
                        ) : (
                            seller.products.map((product) => (
                                <div key={product.id} className="glass-card p-6 rounded-4xl hover:shadow-glow-emerald group">
                                    <div className="aspect-video rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
                                        <Image
                                            src={product.images[0] || '/fallback-image.jpg'}
                                            alt={product.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <h3 className="font-bold text-xl text-white mb-2 line-clamp-2">{product.title}</h3>
                                    <div className="text-2xl font-black text-emerald-400 mb-4">
                                        {new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS' }).format(product.priceTZS)}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex text-yellow-400">
                                            ★★★★☆ 4.8
                                        </span>
                                        <Link
                                            href={`/marketplace/product/${product.id}`}
                                            className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
                                        >
                                            View →
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
