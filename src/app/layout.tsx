"use client";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../../app/globals.css';
import CustomCursor from '../components/CustomCursor';
import { MotionConfig } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppBot from '../components/WhatsAppBot';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export const metadata: Metadata = {
    title: {
        default: 'Global Forum - Knowledge Without Borders',
        template: '%s | Global Forum'
    },
    description: 'Learn 6 languages with AI WhatsApp tutors, buy/sell globally, join the richest knowledge community worldwide.',
    keywords: 'language learning, marketplace, AI tutor, TOEFL, HSK, DELE, DELF, Goethe, Swahili, global forum, knowledge hub',
    authors: [{ name: 'Kelvin Juma Msuya' }],
    creator: 'Kelvin Juma Msuya',
    publisher: 'Global Forum',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://globalforum.com'),
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    openGraph: {
        title: 'Global Forum - Knowledge Without Borders',
        description: 'Language Academy + Marketplace + Global Community',
        url: 'https://globalforum.com',
        siteName: 'Global Forum',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Global Forum',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Global Forum - Knowledge Without Borders',
        description: 'Learn languages with AI WhatsApp tutors. Buy/sell globally. Join our knowledge community.',
        images: '/twitter-image.jpg',
        creator: '@officialmsuya',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'your-google-verification-code',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body className={`${inter.variable} font-body antialiased`}>
                {/* Custom Gold Cursor */}
                <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[99999]">
                    <div
                        className="gold-cursor hidden lg:block fixed w-[20px] h-[20px] bg-gold-bright/90 rounded-full mix-blend-difference shadow-lg shadow-yellow-500/50 pointer-events-none z-[99999] transition-all duration-200 ease-out scale-100 border-2 border-gold-bright/50"
                        id="cursor"
                    />
                    <div
                        className="gold-cursor-follower hidden lg:block fixed w-4 h-4 bg-gold rounded-full mix-blend-difference shadow-lg shadow-yellow-500/50 pointer-events-none z-[99999] transition-all duration-200 ease-out scale-75"
                        id="cursor-follower"
                    />
                </div>

                <MotionConfig reducedMotion="user">
                    <CustomCursor />
                    <Navbar />
                    <main className="min-h-screen pt-20 pb-20">
                        {children}
                    </main>
                    <Footer />
                    <WhatsAppBot />
                </MotionConfig>
            </body>
        </html >
    );
}

