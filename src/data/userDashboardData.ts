// User Dashboard Mock Data - PART 6
import { OrderStatus } from '@prisma/client';

export interface UserOrder {
    id: string;
    orderNumber: string;
    totalUSD: number;
    totalTZS: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: string;
    createdAt: string;
    products: Array<{ title: string; quantity: number; price: number }>;
}

export const userDashboardData = {
    stats: {
        totalOrders: 24,
        totalSpentUSD: 1567.45,
        totalSpentTZS: 4230000,
        activeListings: 3,
        totalReviews: 12,
    },
    monthlySpending: [
        { month: 'Oct 2024', spending: 450 },
        { month: 'Sep 2024', spending: 320 },
        { month: 'Aug 2024', spending: 280 },
        { month: 'Jul 2024', spending: 410 },
        { month: 'Jun 2024', spending: 375 },
        { month: 'May 2024', spending: 290 },
    ],
    recentOrders: [
        { id: 'ORD-00123', orderNumber: '#ORD-00123', totalUSD: 129.99, totalTZS: 350000, status: 'delivered', paymentMethod: 'stripe', createdAt: '2024-10-15T10:30:00Z', products: [{ title: 'iPhone 15 Case', quantity: 1, price: 129.99 }] },
        { id: 'ORD-00122', orderNumber: '#ORD-00122', totalUSD: 45.00, totalTZS: 121500, status: 'shipped', paymentMethod: 'nala', createdAt: '2024-10-14T15:45:00Z', products: [{ title: 'Python Course', quantity: 1, price: 45.00 }] },
        { id: 'ORD-00121', orderNumber: '#ORD-00121', totalUSD: 89.99, totalTZS: 242973, status: 'processing', paymentMethod: 'paypal', createdAt: '2024-10-13T09:20:00Z', products: [{ title: 'MacBook Sleeve', quantity: 1, price: 89.99 }] },
        { id: 'ORD-00120', orderNumber: '#ORD-00120', totalUSD: 25.50, totalTZS: 68850, status: 'pending', paymentMethod: 'stripe', createdAt: '2024-10-12T18:10:00Z', products: [{ title: 'Ebook Bundle', quantity: 1, price: 25.50 }] },
        { id: 'ORD-00119', orderNumber: '#ORD-00119', totalUSD: 199.00, totalTZS: 537300, status: 'delivered', paymentMethod: 'nala', createdAt: '2024-10-11T14:00:00Z', products: [{ title: 'Samsung Charger', quantity: 1, price: 199.00 }] },
    ] as UserOrder[],
    sampleProfile: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+255 712 345 678',
        bio: 'Language learner and tech enthusiast',
        location: 'Dar es Salaam, Tanzania',
        avatar: '/fallback-image.jpg',
    },
    notificationPrefs: {
        orderUpdates: true,
        newMessages: true,
        communityPosts: false,
        priceAlerts: true,
        promotional: false,
    }
};

export const statusColors = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    shipped: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
};

