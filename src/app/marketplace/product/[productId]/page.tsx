"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, ChevronLeft, MapPin, Truck, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

interface ProductPageProps {
    params: { productId: string };
}

interface Product {
    id: string;
    title: string;
    slug: string;
    description: string;
    priceUSD: number;
    priceTZS: number;
    images: string[];
    category: string;
    stock: number;
    seller: {
        id: string;
        name: string;
        image?: string;
        sellerRating?: number;
        reviewCount?: number;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const productId = params.productId;

    let product: Product | null = null;

    try {
        product = await prisma.product.findUnique({
            where: { id: productId },
            include: {
                seller: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        sellerRating: true,
                        reviewCount: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error('Product fetch error:', error);
    }

    if (!product) {
        notFound();
    }

    const formatPrice = (price: number) => new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', notation: 'compact' }).format(price);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900/50 to-slate-950 py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Breadcrumb */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <Link href="/marketplace" className="flex items-center gap-3 text-emerald-400 font-bold text-lg hover:text-emerald-300 transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                        Back to Marketplace
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Images */}
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <div className="relative w-full aspect-video rounded-4xl overflow-hidden glass-card border border-white/10">
                            <Image
                                src={product.images[0] || '/fallback-image.jpg'}
                                alt={product.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.slice(1, 5).map((img, idx) => (
                                    <div key={idx} className="relative w-24 aspect-square rounded-2xl overflow-hidden border-2 border-white/20 hover:border-emerald-400 transition-all">
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 lg:sticky lg:top-32">
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent mb-6 leading-tight">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 mb-8">
                                {/* Seller Rating - placeholder for now */}
                                <div className="flex items-center gap-2">
                                    <div className="flex text-2xl">
                                        <span className="text-yellow-400">★★★★★</span>
                                    </div>
                                    <span className="text-white font-bold">4.9</span>
                                    <span className="text-white/60">(127)</span>
                                </div>
                                <div className="h-6 w-px bg-white/20" />
                                {product.stock > 0 ? (
                                    <div className="flex items-center gap-2 text-emerald-400">
                                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                                        In stock ({product.stock})
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-400">
                                        <Truck className="w-5 h-5" />
                                        Out of stock
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="p-8 glass-card rounded-4xl border border-white/10">
                            <div className="text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
                                {formatPrice(product.priceTZS)}
                            </div>
                            <div className="flex items-center gap-4 text-white/70 text-xl">
                                <span>${product.priceUSD.toLocaleString()}</span>
                                <span className="text-emerald-400">Fast delivery</span>
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="p-6 glass-card rounded-3xl border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center font-bold text-2xl">
                                    {product.seller.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-black text-xl text-white">{product.seller.name}</div>
                                    <div className="flex text-yellow-400 text-lg">
                                        ★★★★☆ 4.8 (24 sales)
                                    </div>
                                </div>
                            </div>
                            <Link href={`/marketplace/seller/${product.seller.id}`} className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                                View seller store →
                            </Link>
                        </div>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-1 gap-4">
                            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black py-8 px-12 rounded-4xl text-2xl shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center justify-center gap-4">
                                <ShoppingCart className="w-8 h-8" />
                                Add to Cart
                            </button>
                            <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-8 px-12 rounded-4xl text-2xl border border-white/20 hover:border-emerald-400 transition-all flex items-center justify-center gap-4">
                                <Heart className="w-8 h-8" />
                                Add to Wishlist
                            </button>
                        </div>

                        {/* Tabs - Reviews placeholder */}
                        <div className="glass-card p-8 rounded-4xl border border-white/10">
                            <div className="flex text-2xl font-black mb-6 border-b border-white/10 pb-6">
                                <button className="pb-4 border-b-4 border-emerald-400 mr-8">Details</button>
                                <button className="pb-4 text-white/60 hover:text-white transition-colors">Reviews (0)</button>
                            </div>
                            <div className="text-white/70 leading-relaxed max-w-2xl">
                                {product.description}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
