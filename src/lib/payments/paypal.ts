import * as paypal from '@paypal/checkout-server-sdk';

const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID!,
    process.env.PAYPAL_CLIENT_SECRET!
);

const client = new paypal.core.PayPalHttpClient(environment);

export async function createPayPalOrder(amount: number, currency: string = 'USD', orderId: string) {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        console.log('PayPal keys missing - using mock mode');
        return {
            id: `mock_order_${orderId}`,
            status: 'demo_mode',
            approve: '/mock-paypal-success',
            links: [{ href: '/mock-paypal-success', rel: 'approve', method: 'GET' }]
        };
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: currency,
                value: amount.toFixed(2),
            },
            description: `Order ${orderId}`,
        }],
    });

    try {
        const response = await client.execute(request);
        const order = response.result;
        return {
            id: order.id,
            status: order.status,
            approve: order.links.find((link: any) => link.rel === 'approve')?.href,
        };
    } catch (error) {
        console.error('PayPal error:', error);
        return {
            id: `error_${orderId}`,
            status: 'failed',
            error: (error as Error).message,
        };
    }
}

