import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createStripePaymentIntent } from '@/lib/payments/stripe';
import { createPayPalOrder } from '@/lib/payments/paypal';
import { createNalaPayment } from '@/lib/payments/nalaMoney';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { sendAdminAlert } from '@/lib/sms';
import { decrementStockAndAlert, restoreStock } from '@/lib/inventory';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { method, amount, currency = 'USD', orderId, phone, products } = await req.json();

        // Create order in DB
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        const totalTZS = currency === 'TZS' ? amount : amount * 2700; // approx USD to TZS

        const order = await prisma.order.create({
            data: {
                orderNumber,
                userId: session.user.id,
                products,
                totalUSD: amount,
                totalTZS,
                paymentMethod: method,
                deliveryAddress: {}, // from session or form
                status: 'pending',
            },
        });

        const customerEmail = session.user.email ?? 'unknown@example.com';

        // Send admin alert and handle inventory
        await sendAdminAlert('new_order', {
            orderNumber: order.orderNumber,
            total: order.totalUSD,
            customerEmail
        });
        await decrementStockAndAlert(products);

        let paymentData;

        switch (method.toLowerCase()) {
            case 'stripe':
                paymentData = await createStripePaymentIntent(amount, currency, orderNumber);
                break;
            case 'paypal':
                paymentData = await createPayPalOrder(amount, currency, orderNumber);
                break;
            case 'nala':
                paymentData = await createNalaPayment(amount, currency, orderNumber, phone || '');
                break;
            default:
                return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
        }

        return NextResponse.json({
            orderId: order.id,
            orderNumber: order.orderNumber,
            paymentId: paymentData.id,
            status: paymentData.status,
            ...(paymentData.url && { url: paymentData.url }),
            ...(paymentData.client_secret && { client_secret: paymentData.client_secret }),
            message: paymentData.status === 'demo_mode' ? 'Payment simulation - Add your API keys for real payments' : undefined,
        });
    } catch (error) {
        console.error('Payment creation error:', error);
        if (products) {
            await restoreStock(products);
        }
        return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
    }
}

