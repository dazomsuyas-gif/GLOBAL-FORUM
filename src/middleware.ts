import { NextRequest, NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';
import { getToken } from "next-auth/jwt";

const middleware: NextMiddleware = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;

    // Protected routes
    const protectedPaths = ['/admin', '/dashboard', '/marketplace/seller'];
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));

    if (isProtected) {
        try {
            const token = await getToken({ req: request });
            if (!token && !pathname.includes('/login') && !pathname.includes('/signin')) {
                const signinUrl = new URL('/auth/signin', request.url);
                signinUrl.searchParams.set('callbackUrl', pathname);
                return NextResponse.redirect(signinUrl);
            }

            // Admin role check
            if (pathname.startsWith('/admin') && token?.role !== 'ADMIN') {
                const dashboardUrl = new URL('/dashboard', request.url);
                return NextResponse.redirect(dashboardUrl);
            }
        } catch (error) {
            const signinUrl = new URL('/auth/signin', request.url);
            return NextResponse.redirect(signinUrl);
        }
    }

    return NextResponse.next();
};


export default middleware;

export const config = {
    matcher: [
        '/admin/:path*',
        '/dashboard/:path*',
        '/marketplace/seller/:path*',
        '/api/admin/:path*'
    ]
};

