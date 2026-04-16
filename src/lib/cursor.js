("use client");
import { useEffect } from 'react';

export default function useGoldCursor() {
    useEffect(() => {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');

        if (!cursor || !follower) return;

        const moveCursor = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 100);
        };

        document.addEventListener('mousemove', moveCursor);

        return () => {
            document.removeEventListener('mousemove', moveCursor);
        };
    }, []);
}

