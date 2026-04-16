"use client";
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageWithFallbackProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    fill?: boolean;
    className?: string;
    priority?: boolean;
    quality?: number;
    sizes?: string;
    fallbackSrc?: string;
    blurDataURL?: string;
    placeholder?: 'blur' | 'empty';
}

const fallbackImage = '/images/fallback-image.jpg'; // Add this image to public folder

export default function ImageWithFallback({
    src,
    alt,
    width,
    height,
    fill = false,
    className = '',
    priority = false,
    quality = 85,
    sizes,
    fallbackSrc = fallbackImage,
    blurDataURL,
    placeholder = 'blur',
    ...props
}: ImageWithFallbackProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = () => {
        setImgSrc(fallbackSrc);
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <motion.div
            className="relative overflow-hidden rounded-2xl group"
            initial="loading"
            animate={isLoading ? "loading" : "loaded"}
        >
            {/* Loading skeleton */}
            <motion.div
                variants={{
                    loading: { opacity: 1, skeleton: "shimmer" },
                    loaded: { opacity: 0 }
                }}
                className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 animate-pulse"
                transition={{ duration: 0.6 }}
            >
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
            </motion.div>

            {/* Image */}
            <Image
                {...props}
                src={imgSrc}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                priority={priority}
                quality={quality}
                sizes={sizes}
                className={`
          ${className}
          object-cover transition-all duration-500
          group-hover:scale-105 group-hover:brightness-110
          ${isLoading ? 'opacity-0 blur-xl scale-105' : 'opacity-100 blur-none scale-100'}
        `}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                onError={handleError}
                onLoad={handleLoad}
                unoptimized={imgSrc === fallbackSrc}
            />
        </motion.div>
    );
}

// Usage examples:
// <ImageWithFallback src="/product.jpg" alt="Product" width={400} height={300} />
// <ImageWithFallback src={product.image} alt={product.title} fill className="object-cover" />

