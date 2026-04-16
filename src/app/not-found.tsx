'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900 px-4 py-16 text-white">
            <div className="max-w-md w-full text-center space-y-8">
                <div className="w-32 h-32 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
                    <span className="text-5xl">404</span>
                </div>
                <div>
                    <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-sm mx-auto leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Return Home</span>
                </Link>
            </div>
        </div>
    );
}
