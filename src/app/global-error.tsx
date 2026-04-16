'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-red-900 px-4 py-16 text-white">
                    <div className="max-w-md w-full text-center space-y-8">
                        <div className="w-24 h-24 mx-auto bg-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
                            <span className="text-4xl">!</span>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-4">
                                Something went wrong!
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 max-w-sm mx-auto leading-relaxed">
                                An unexpected error has occurred.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <button
                                onClick={() => reset()}
                                className="w-full bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="w-full bg-white/20 backdrop-blur-xl hover:bg-white/30 border border-white/20 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:shadow-white/30 hover:-translate-y-1"
                            >
                                Go Home
                            </button>
                        </div>
                        <div className="text-xs text-slate-500">
                            <details>
                                <summary className="cursor-pointer hover:text-slate-400">Debug info</summary>
                                <pre className="mt-4 p-4 bg-slate-800/50 rounded-xl text-left text-xs overflow-auto max-h-40 font-mono">
                                    {error.digest && <div>Digest: {error.digest}</div>}
                                    {error.message && <div>Message: {error.message}</div>}
                                    {error.stack && <div>Stack: {error.stack}</div>}
                                </pre>
                            </details>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
