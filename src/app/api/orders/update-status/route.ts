import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { sendSMS } from '@/lib/sms';

export async function PUT(request: NextRequest, { params }: { params?: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { orderId, status: newStatus, trackingNumber } = await request.json();

        // Validate order exists and user owns or admin
        const order = await prisma.order.findUnique({
            where: { id: orderId || params?.id },
            include: { user: true }
        });
        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }
        if (order.userId !== session.user.id && session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        if (order.status === newStatus) {
            return NextResponse.json({ message: 'No status change' });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId || params?.id },
            data: { status: newStatus },
        });

        // Send customer SMS if shipped or delivered and phone available
        if ((newStatus === 'shipped' || newStatus === 'delivered') && order.user.phone) {
            let message = '';
            if (newStatus === 'shipped') {
                message = `🚚 Your order #${order.orderNumber} has been shipped. Tracking: ${trackingNumber || 'TBD'}`;
            } else if (newStatus === 'delivered') {
                message = `✅ Your order #${order.orderNumber} has been delivered. Thank you for shopping at Global Forum!`;
            }
            await sendSMS(order.user.phone, message);
        }

        return NextResponse.json(updatedOrder);
    } catch (error) {
        console.error('Order status update error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

