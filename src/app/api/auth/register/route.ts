import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { mail } from "@/lib/email" // later

export async function POST(req: NextRequest) {
    try {
        const { name, email, password, phone } = await req.json()

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                phone,
                role: "USER"
            }
        })

        // Send welcome email later

        return NextResponse.json({ message: "User created successfully", userId: user.id })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Internal server error" }, { status: 500 })
    }
}

