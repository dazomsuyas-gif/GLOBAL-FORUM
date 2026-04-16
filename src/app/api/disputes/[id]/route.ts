import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { sendEmail } from '@/lib/email'

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Admin only' }, { status: 403 })
        }

        const { status, resolution, adminNotes } = await request.json()

        const dispute = await prisma.dispute.update({
            where: { id: params.id },
            data: { status, resolution, adminNotes, updatedAt: new Date() },
            include: { user: true, order: true }
        })

        // User email notification
        // await sendEmail({
        //   to: dispute.user.email,
        //   subject: `Dispute ${dispute.disputeNumber} Resolved`,
        //   html: `Status: ${status}. Resolution: ${resolution}. Notes: ${adminNotes}`
        // })

        // Stub refund
        if (status === 'resolved' && resolution === 'refund_issued') {
            // Integrate with stripe/paypal/nala
            console.log(`Refund issued for order ${dispute.order.orderNumber}: $${dispute.amount}`)
        }

        return NextResponse.json(dispute)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

