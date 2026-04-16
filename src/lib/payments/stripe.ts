import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-04-10',
});

export async function createStripePaymentIntent(amount: number, currency: string = 'usd', orderId: string) {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.log('STRIPE_SECRET_KEY missing - using mock mode');
        return {
            id: `mock_pi_${orderId}`,
            client_secret: 'mock_client_secret',
            status: 'demo_mode',
            url: '/mock-payment-success'
        };
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // cents
            currency,
            metadata: {
                orderId,
            },
            payment_method_types: ['card'],
        });

        return {
            id: paymentIntent.id,
            client_secret: paymentIntent.client_secret!,
            status: paymentIntent.status,
        };
    } catch (error) {
        console.error('Stripe error:', error);
        return {
            id: `error_${orderId}`,
            status: 'failed',
            error: (error as Error).message,
        };
    }
}

