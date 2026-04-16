import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const sellerId = searchParams.get('sellerId');
        const productId = searchParams.get('productId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        const skip = (page - 1) * limit;

        const where: any = {};
        if (sellerId) where.sellerId = sellerId;
        if (productId) where.productId = productId;

        const [reviews, total, avgRating] = await Promise.all([
            prisma.review.findMany({
                where,
                include: {
                    user: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                    product: {
                        select: {
                            title: true,
                            id: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.review.count({ where }),
            prisma.review.aggregate({
                where,
                _avg: { rating: true },
                _count: { id: true },
            }),
        ]);

        return NextResponse.json({
            reviews,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
            averageRating: Number(avgRating._avg.rating || 0),
            reviewCount: avgRating._count.id,
        });
    } catch (error) {
        console.error('Get reviews error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
