import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/WelcomeEmail';
import { OrderConfirmation } from '@/emails/OrderConfirmation';
import { PasswordReset } from '@/emails/PasswordReset';
import { BookingConfirmation } from '@/emails/BookingConfirmation';

export const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendWelcomeEmail(to: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
        console.log('RESEND_API_KEY missing - email mock');
        return { id: 'mock_welcome_' + Date.now() };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Global Forum <hello@globalforum.co>',
            to,
            subject: `Welcome to Global Forum, ${name}!`,
            react: <WelcomeEmail name={ name } />,
    });

    if (error) throw error;
    return data;
} catch (error) {
    console.error('Welcome email error:', error);
    return null;
}
}

export async function sendOrderConfirmation(to: string, orderNumber: string, totalUSD: number, totalTZS: number, products: any[]) {
    if (!process.env.RESEND_API_KEY) {
        console.log('Order confirmation mock');
        return { id: 'mock_order_' + orderNumber };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Global Forum Orders <orders@globalforum.co>',
            to,
            subject: `Order #${orderNumber} Confirmed`,
            react: <OrderConfirmation orderNumber={ orderNumber } totalUSD = { totalUSD } totalTZS = { totalTZS } products = { products } />,
    });

    if (error) throw error;
    return data;
} catch (error) {
    console.error('Order email error:', error);
    return null;
}
}

export async function sendPasswordReset(to: string, name: string, resetUrl: string) {
    if (!process.env.RESEND_API_KEY) {
        console.log('Password reset mock');
        return { id: 'mock_reset_' + Date.now() };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Global Forum <noreply@globalforum.co>',
            to,
            subject: 'Reset Your Global Forum Password',
            react: <PasswordReset name={ name } resetUrl = { resetUrl } />,
    });

    if (error) throw error;
    return data;
} catch (error) {
    console.error('Password reset email error:', error);
    return null;
}
}

export async function sendBookingConfirmation(to: string, name: string, bookingDetails: any) {
    if (!process.env.RESEND_API_KEY) {
        console.log('Booking confirmation mock');
        return { id: 'mock_booking_' + Date.now() };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Global Forum Travel <travel@globalforum.co>',
            to,
            subject: 'Your Travel Booking Confirmation',
            react: <BookingConfirmation name={ name } bookingDetails = { bookingDetails } />,
    });

    if (error) throw error;
    return data;
} catch (error) {
    console.error('Booking email error:', error);
    return null;
}
}

