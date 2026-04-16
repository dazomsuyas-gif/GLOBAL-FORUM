"use client";
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface LazyLoadProps {
    children: React.ReactNode;
    placeholder?: React.ReactNode;
    className?: string;
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}

const defaultSkeleton = (
    <motion.div
        className="animate-pulse bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        <div className="h-6 bg-slate-800/50 rounded-xl mx-2 mb-4"></div>
        <div className="h-4 bg-slate-800/30 rounded-lg mx-4 mb-3 w-4/5"></div>
        <div className="h-4 bg-slate-800/20 rounded-lg mx-4 w-3/5"></div>
    </motion.div>
);

export default function LazyLoad({
    children,
    placeholder = defaultSkeleton,
    className = '',
    threshold = 0.1,
    rootMargin = '50px',
    once = true,
}: LazyLoadProps) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        }
    }, [once]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin,
            threshold,
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [handleIntersection, rootMargin, threshold]);

    return (
        <motion.div
            ref={elementRef}
            className={className}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {!isVisible && placeholder}
            {isVisible && children}
        </motion.div>
    );
}

// Usage:
// <LazyLoad placeholder={<CustomSkeleton />}>
//   <ExpensiveComponent />
// </LazyLoad>

