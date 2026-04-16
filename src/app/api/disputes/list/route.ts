import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = 10
        const status = searchParams.get('status') || ''
        const skip = (page - 1) * limit

        const where: any = status ? { status } : {}

        if (session.user.role !== 'ADMIN') {
            where.userId = session.user.id
        }

        const [disputes, total] = await Promise.all([
            prisma.dispute.findMany({
                where,
                skip,
                take: limit,
                include: {
                    order: true,
                    user: { select: { id: true, name: true, email: true } },
                    seller: { select: { id: true, name: true, email: true } }
                },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.dispute.count({ where })
        ])

        return NextResponse.json({
            disputes,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

