"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star, Crown, TrendingUp, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
interface ProductCardProps {
    product: any; // Mock data type
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-TZ', {
            style: 'currency',
            currency: 'TZS',
            notation: 'compact'
        }).format(price);
    };

    return (
        <motion.div
            className="group glass-card overflow-hidden rounded-4xl p-8 hover:shadow-glow-emerald hover:-translate-y-4 transition-all duration-500 border border-white/10 relative"
            whileHover={{ scale: 1.05 }}
        >
            {/* Promotion Badge */}
            {product.isPromoted && (
                <motion.div
                    className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black px-4 py-2 rounded-full text-xs uppercase tracking-wider shadow-2xl z-20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <div className="flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        PROMOTED
                    </div>
                </motion.div>
            )}

            {/* Trending Badge */}
            {product.isTrending && (
                <motion.div
                    className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black px-4 py-2 rounded-full text-xs uppercase tracking-wider shadow-2xl z-20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 animate-pulse" />
                        TRENDING
                    </div>
                </motion.div>
            )}

            {/* Image */}
            <div className="relative mb-8 aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 border-2 border-white/10">
                <Image
                    src={product.images[imageIndex] || product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.images.length > 1 && (
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                        {product.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setImageIndex(idx)}
                                className={`flex-1 h-2 rounded-full transition-all ${idx === imageIndex
                                    ? 'bg-emerald-400 shadow-lg scale-125'
                                    : 'bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Seller Info */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                    {product.sellerId.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <div className="font-bold text-white text-lg">Tech World TZ</div>
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-xl">★★★★★</span>
                        <span className="font-bold text-emerald-400">4.9</span>
                        <span className="text-white/60 text-sm">(127)</span>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="mb-8">
                <h3 className="text-2xl font-black text-white line-clamp-2 mb-4 leading-tight">
                    {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${product.condition === 'New'
                        ? 'bg-emerald-500 text-white'
                        : product.condition === 'Refurbished'
                            ? 'bg-blue-500 text-white'
                            : 'bg-orange-500 text-white'
                        }`}>
                        {product.condition}
                    </div>
                    {product.stock < 5 && (
                        <div className="px-3 py-1 rounded-full text-xs bg-red-500 text-white font-bold">
                            Low Stock ({product.stock})
                        </div>
                    )}
                </div>

                {/* Price */}
                <div className="mb-6">
                    <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                        {formatPrice(product.priceLocal)}
                    </div>
                    <div className="flex items-center gap-4 text-white/60 text-lg font-bold">
                        <span className="flex items-center gap-1">
                            <span>$</span>{product.priceInternational.USD.toLocaleString()}
                            <MapPin className="w-4 h-4" />
                        </span>
                        <span className="text-emerald-400">€{product.priceInternational.EUR.toFixed(0)}</span>
                        <span className="text-emerald-400">£{product.priceInternational.GBP.toFixed(0)}</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-white/70 text-sm mb-8">
                    <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {product.viewCount.toLocaleString()} views
                    </div>
                    <div className="flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4" />
                        {product.salesCount} sold
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
                <motion.button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-5 px-8 rounded-3xl shadow-lg hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <ShoppingCart className="w-6 h-6 inline mr-2" />
                    Add to Cart
                </motion.button>
                <motion.button
                    className="w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-3xl shadow-lg border border-white/20 hover:border-emerald-400 transition-all flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsInWishlist(!isInWishlist)}
                >
                    <Heart className={`w-7 h-7 transition-colors ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-white/70'}`} />
                </motion.button>
            </div>

            {/* Quick Link */}
            <Link
                href={`/marketplace/product/${product.id}`}
                className="text-emerald-400 font-bold text-sm uppercase tracking-wide flex items-center gap-2 group-hover:text-emerald-300 transition-colors"
            >
                View Details
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
}

