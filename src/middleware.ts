import { NextRequest, NextResponse } from 'next/server';
import type { NextMiddleware } from 'next/server';

const middleware: NextMiddleware = async (request: NextRequest) => {
    const pathname = request.nextUrl.pathname;

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
        const adminToken = request.cookies.get('adminToken')?.value || localStorage.getItem('adminToken');

        if (!adminToken && pathname !== '/admin/login') {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Verify token (mock validation)
        if (adminToken !== 'mock-admin-token' && pathname !== '/admin/login') {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }

        // Role-based access for super admin only routes (example)
        const adminUser = request.cookies.get('adminUser')?.value;
        const superAdminPaths = ['/admin/settings/admins'];
        if (superAdminPaths.some(path => pathname.startsWith(path)) && adminUser && !adminUser.includes('Super Admin')) {
            const loginUrl = new URL('/admin/dashboard', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
};

export default middleware;

export const config = {
    matcher: [
        '/admin/:path*',
        '/api/admin/:path*'
    ]
};

