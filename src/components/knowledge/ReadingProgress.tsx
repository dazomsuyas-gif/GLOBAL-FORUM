"use client";
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-50 h-1 origin-left shadow-lg pointer-events-none"
            style={{ scaleX }}
            initial={false}
        >
            <div className="h-full bg-gradient-to-r from-gold via-yellow-400 to-green-400 shadow-glow-gold" />
        </motion.div>
    );
}

