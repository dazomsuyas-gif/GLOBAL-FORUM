import { z } from 'zod'

const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url(),

    // NextAuth
    NEXTAUTH_SECRET: z.string().min(32),
    NEXTAUTH_URL: z.string().url(),
    NEXT_PUBLIC_APP_URL: z.string().url(),

    // OAuth
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    FACEBOOK_CLIENT_ID: z.string(),
    FACEBOOK_CLIENT_SECRET: z.string(),
    APPLE_CLIENT_ID: z.string(),
    APPLE_CLIENT_SECRET: z.string(),

    // Payments
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    PAYPAL_CLIENT_ID: z.string(),
    PAYPAL_CLIENT_SECRET: z.string(),
    PAYPAL_MODE: z.enum(['sandbox', 'live']),
    NALA_MONEY_API_KEY: z.string(),
    NALA_MONEY_API_URL: z.string().url(),

    // External APIs
    AMADEUS_API_KEY: z.string(),
    AMADEUS_API_SECRET: z.string(),

    // Email
    RESEND_API_KEY: z.string(),

    // SMS
    TWILIO_ACCOUNT_SID: z.string(),
    TWILIO_AUTH_TOKEN: z.string(),
    TWILIO_PHONE_NUMBER: z.string(),

    // Cloudinary
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),

    // Admin
    ADMIN_EMAIL: z.string().email(),
    ADMIN_PHONE: z.string(),

    // WhatsApp
    WHATSAPP_NUMBER_1: z.string(),
    WHATSAPP_NUMBER_2: z.string(),

    // Analytics (optional)
    NEXT_PUBLIC_GA_ID: z.string().optional(),
})

export const env = envSchema.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> { }
    }
}

// Usage in app
if (typeof window === 'undefined') {
    env  // validates on server startup
}

