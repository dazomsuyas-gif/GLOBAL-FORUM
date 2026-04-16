// Mock admin data for Phase 11
export const adminData = {
    users: [
        { id: 1, name: 'Kelvin Msuya', email: 'kelvin@globalforum.com', role: 'Super Admin', status: 'Active', joined: '2024-01-15' },
        { id: 2, name: 'Jubleth John', email: 'jubleth@globalforum.com', role: 'Admin', status: 'Active', joined: '2024-02-01' },
        { id: 3, name: 'Sarah Wilson', email: 'sarah@globalforum.com', role: 'Admin', status: 'Suspended', joined: '2024-03-10' },
    ],
    orders: [
        { id: 'ORD-001', customer: 'John Doe', seller: 'TechShop TZ', amount: 45000, currency: 'TZS', status: 'Delivered', date: '2024-10-15' },
        { id: 'ORD-002', customer: 'Maria Lopez', seller: 'Global Electronics', amount: 129, currency: 'USD', status: 'Shipped', date: '2024-10-14' },
    ],
    products: [
        { id: 1, title: 'iPhone 15 Pro', seller: 'TechShop TZ', price: 2500000, currency: 'TZS', status: 'Approved' },
        { id: 2, title: 'Samsung Galaxy S24', seller: 'Mobile World', price: 1800000, currency: 'TZS', status: 'Pending' },
    ],
    stats: {
        totalUsers: 12456,
        totalRevenueTZS: 245670000,
        totalRevenueUSD: 45000,
        totalOrders: 2345,
        totalProducts: 156,
        totalArticles: 245,
        totalStories: 89,
        activeLanguages: 6,
        pendingReviews: 12,
        pendingDisputes: 8,
    },
    revenueMonthly: [
        { month: 'Oct 2024', revenue: 245670000 },
        { month: 'Sep 2024', revenue: 198450000 },
        { month: 'Aug 2024', revenue: 167890000 },
    ],
    traffic: [
        { day: '2024-10-15', views: 4567 },
        { day: '2024-10-14', views: 3892 },
        { day: '2024-10-13', views: 5123 },
    ],
    systemHealth: {
        server: '🟢 Online',
        database: '🟢 Connected',
        cache: '🟢 Active',
        payments: '🟢 Active'
    }
};

export const categories = [
    'Technology', 'Business', 'Health', 'Travel', 'Food', 'Sports', 'Entertainment', 'Education',
    'Finance', 'Lifestyle', 'Science', 'Politics', 'Environment', 'Culture'
];

export const languages = [
    { name: 'English', lessons: 120, students: 4567, completion: 78 },
    { name: 'Chinese (HSK)', lessons: 156, students: 2345, completion: 65 },
    { name: 'Spanish (DELE)', lessons: 98, students: 3456, completion: 82 },
    { name: 'French (DELF)', lessons: 112, students: 2890, completion: 71 },
    { name: 'German (Goethe)', lessons: 134, students: 1987, completion: 69 },
    { name: 'Swahili', lessons: 76, students: 5678, completion: 89 },
];

