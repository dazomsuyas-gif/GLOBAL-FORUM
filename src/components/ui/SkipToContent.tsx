'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SkipToContent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleFocus = (event: FocusEvent) => {
            if (event.target instanceof HTMLElement && event.target.hasAttribute('data-skip')) {
                setIsVisible(true);
            }
        };

        document.addEventListener('focusin', handleFocus);
        return () => document.removeEventListener('focusin', handleFocus);
    }, []);

    return (
        <motion.a
            href="#main-content"
            className={`fixed left-4 top-4 z-[99999] bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
                }`}
            initial={{ translateY: -64 }}
            animate={{ translateY: isVisible ? 0 : -64 }}
            role="button"
            tabIndex={0}
            onBlur={() => setIsVisible(false)}
            onMouseDown={(e) => e.preventDefault()}
        >
            Skip to main content
        </motion.a>
    );
}

