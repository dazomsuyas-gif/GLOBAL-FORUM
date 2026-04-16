import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await request.json()
        const { orderId, reason, description, evidence = [], amount } = data

        // Validate user owns order
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { user: true }
        })
        if (!order || order.userId !== session.user.id) {
            return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 403 })
        }

        // Validate delivered within 30 days
        if (order.status !== 'delivered') {
            return NextResponse.json({ error: 'Can only dispute delivered orders' }, { status: 400 })
        }
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        if (order.createdAt < thirtyDaysAgo) {
            return NextResponse.json({ error: 'Too late to file dispute (30 days limit)' }, { status: 400 })
        }

        // Check no existing dispute
        const existing = await prisma.dispute.findFirst({ where: { orderId } })
        if (existing) {
            return NextResponse.json({ error: 'Dispute already filed for this order' }, { status: 400 })
        }

        // Get sellerId from order products (assume first product seller)
        const sellerId = order.products[0]?.sellerId // from Json, adjust as needed

        // Generate unique disputeNumber
        const latest = await prisma.dispute.findFirst({
            orderBy: { id: 'desc' }
        })
        const year = new Date().getFullYear()
        const seq = latest ? parseInt(latest.disputeNumber.match(/\\d+$/)![0]) + 1 : 1
        const disputeNumber = `DIS-${year}${seq.toString().padStart(3, '0')}`

        const dispute = await prisma.dispute.create({
            data: {
                disputeNumber,
                orderId,
                userId: session.user.id,
                sellerId: sellerId || '',
                reason,
                description,
                evidence,
                amount: order.totalUSD || amount
            },
            include: { order: true }
        })

        // Admin email notification
        // await sendEmail({ to: 'admin@globalforum.com', subject: `New Dispute ${disputeNumber}`, html: `...` })

        return NextResponse.json(dispute, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

