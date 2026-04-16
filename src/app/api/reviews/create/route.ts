import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { rating, comment, productId, sellerId } = await req.json();

        // Validate input
        if (!rating || rating < 1 || rating > 5 || typeof rating !== 'number') {
            return NextResponse.json({ error: 'Rating must be 1-5' }, { status: 400 });
        }
        if (!comment || comment.trim().length < 10 || comment.length > 500) {
            return NextResponse.json({ error: 'Comment must be 10-500 characters' }, { status: 400 });
        }
        if (!productId || !sellerId) {
            return NextResponse.json({ error: 'Product and seller required' }, { status: 400 });
        }

        // Check if user purchased this product (completed order)
        const hasPurchased = await prisma.order.findFirst({
            where: {
                userId: session.user.id,
                status: { in: ['completed', 'delivered'] },
                products: {
                    path: ['some', 'id'],
                    equals: productId,
                },
            },
        });

        if (!hasPurchased) {
            return NextResponse.json({ error: 'You must purchase and receive this product to review' }, { status: 403 });
        }

        // Check if user already reviewed this product
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: session.user.id,
                productId,
            },
        });

        if (existingReview) {
            return NextResponse.json({ error: 'You already reviewed this product' }, { status: 409 });
        }

        // Create review
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product || product.sellerId !== sellerId) {
            return NextResponse.json({ error: 'Invalid product or seller' }, { status: 400 });
        }

        const review = await prisma.review.create({
            data: {
                rating,
                comment: comment.trim(),
                userId: session.user.id,
                productId,
                sellerId: product.sellerId,
            },
            include: {
                user: {
                    select: { name: true, image: true },
                },
            },
        });

        // Update seller average rating
        const sellerReviews = await prisma.review.aggregate({
            where: { sellerId: product.sellerId },
            _avg: { rating: true },
            _count: { id: true },
        });

        const avgRating = Number(sellerReviews._avg.rating || 0);
        const reviewCount = sellerReviews._count.id;

        await prisma.user.update({
            where: { id: product.sellerId },
            data: {
                sellerRating: avgRating,
                reviewCount,
            },
        });

        return NextResponse.json({
            success: true,
            review,
            message: 'Review created successfully'
        });

    } catch (error) {
        console.error('Create review error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
