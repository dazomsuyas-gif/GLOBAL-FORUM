"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ content }: { content: string }) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Parse headings from content
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;

        const newHeadings: Heading[] = Array.from(tempElement.querySelectorAll('h2, h3')).map((el) => {
            const level = parseInt(el.tagName.replace('H', ''));
            return {
                id: el.id || el.textContent?.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') || '',
                text: el.textContent?.trim() || '',
                level
            };
        });

        setHeadings(newHeadings);
    }, [content]);

    useEffect(() => {
        if (!headings.length) return;

        observer.current = new IntersectionObserver(
            (entries) => {
                const visibleHeading = entries.find(entry => entry.isIntersecting);
                if (visibleHeading) {
                    setActiveId(visibleHeading.target.id);
                }
            },
            {
                rootMargin: '0px 0px -50% 0px',
                threshold: 0.1
            }
        );

        headings.forEach(heading => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.current?.observe(element);
            }
        });

        return () => {
            observer.current?.disconnect();
        };
    }, [headings]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsOpen(false);
    };

    if (!headings.length) return null;

    return (
        <motion.aside
            className={`glass-card p-6 rounded-3xl border border-white/10 backdrop-blur-xl ${isOpen ? 'lg:block' : 'lg:block'
                }`}
            initial={false}
            animate={{
                x: isOpen ? 0 : 20
            }}
        >
            <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    📑 On this page
                </h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-all"
                >
                    <Menu className="w-5 h-5 text-white" />
                </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-6 hidden lg:block flex items-center gap-2">
                📑 On this page
            </h3>

            <nav className="space-y-2 max-h-[400px] overflow-y-auto">
                {headings.map((heading) => (
                    <motion.button
                        key={heading.id}
                        className={`w-full text-left p-3 rounded-2xl flex items-start gap-3 transition-all group ${activeId === heading.id
                                ? 'bg-gradient-to-r from-gold/20 to-yellow-500/20 border-gold/50 text-gold font-semibold shadow-glow-gold'
                                : 'hover:bg-white/5 border border-transparent text-white/80 hover:text-white'
                            }`}
                        onClick={() => scrollToHeading(heading.id)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 transition-all ${activeId === heading.id ? 'bg-gold scale-125' : 'bg-white/30 group-hover:bg-white/50'
                            }`} />

                        <span className="text-sm leading-tight line-clamp-2">
                            {heading.text}
                        </span>
                    </motion.button>
                ))}
            </nav>
        </motion.aside>
    );
}

