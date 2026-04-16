import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MotionConfig } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Global Forum - Language Academy, Marketplace & Community',
    description: 'Learn 6 languages with AI WhatsApp tutors, buy/sell globally, join the richest knowledge community.',
    keywords: 'language learning, marketplace, AI tutor, TOEFL, HSK, DELE, DELF, Goethe, Swahili, global forum',
    authors: [{ name: 'Kelvin Juma Msuya' }],
    creator: 'Kelvin Juma Msuya',
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: 'Global Forum',
        description: 'The ultimate global learning and commerce platform',
        images: '/api/og?title=Global+Forum',
        locale: 'en_US',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <MotionConfig reducedMotion="user">
                    <div className="gold-cursor" id="cursor"></div>
                    <div className="gold-cursor-follower" id="cursor-follower"></div>
                    {children}
                </MotionConfig>
            </body>
        </html>
    )
}
