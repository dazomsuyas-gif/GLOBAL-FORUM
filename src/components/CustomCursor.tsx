"use client";
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps { }

export default function CustomCursor({ }: CustomCursorProps) {
    useEffect(() => {
        const cursor = document.getElementById('cursor') as HTMLElement;
        const follower = document.getElementById('cursor-follower') as HTMLElement;

        if (!cursor || !follower) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;

        const moveCursor = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const render = () => {
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';

            requestAnimationFrame(render);
        };

        document.addEventListener('mousemove', moveCursor);
        render();

        // Interactive elements
        const links = document.querySelectorAll('a, button');
        const handleMouseEnter = () => {
            cursor?.classList.add('expand');
            follower?.classList.add('expand');
        };

        const handleMouseLeave = () => {
            cursor?.classList.remove('expand');
            follower?.classList.remove('expand');
        };

        links.forEach(link => {
            link.addEventListener('mouseenter', handleMouseEnter);
            link.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            document.removeEventListener('mousemove', moveCursor);
            links.forEach(link => {
                link.removeEventListener('mouseenter', handleMouseEnter);
                link.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return null;
}

