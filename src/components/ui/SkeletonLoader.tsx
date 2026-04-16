import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
    className?: string;
    count?: number;
    height?: string;
    width?: string;
}

export default function SkeletonLoader({
    className = '',
    count = 1,
    height = 'h-12',
    width = 'w-full',
}: SkeletonLoaderProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    className={`${height} ${width} ${className} bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-clip-text bg-[length:200%_100%] animate-pulse rounded-xl shadow-lg`}
                    initial={{ skeleton: 0 }}
                    animate={{ skeleton: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                    style={{
                        backgroundSize: '200% 100%',
                        backgroundPosition: '200% 0',
                    }}
                />
            ))}
        </>
    );
}
