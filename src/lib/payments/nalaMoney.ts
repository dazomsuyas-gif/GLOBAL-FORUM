import axios from 'axios';

export async function createNalaPayment(amount: number, currency: string = 'TZS', orderId: string, phone: string) {
    if (!process.env.NALA_MONEY_API_KEY) {
        console.log('NALA_MONEY_API_KEY missing - using mock mode');
        return {
            id: `mock_nala_${orderId}`,
            status: 'demo_mode',
            url: 'nala://pay/mock',
            message: 'Payment simulation - Nala Money ready for TZ payments'
        };
    }

    try {
        const response = await axios.post('https://sandbox.api.nala.com/v2/payments', {
            amount,
            currency,
            phone_number: phone,
            reference: orderId,
            callback_url: `${process.env.NEXTAUTH_URL}/api/payments/nala-callback`,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.NALA_MONEY_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        return {
            id: response.data.payment_id,
            status: response.data.status,
            url: response.data.checkout_url,
        };
    } catch (error) {
        console.error('Nala Money error:', error);
        return {
            id: `error_nala_${orderId}`,
            status: 'failed',
            error: (error as Error).message,
        };
    }
}

