import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const adminPhone = process.env.ADMIN_PHONE || '+255768868546';

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function sendSMS(to: string, message: string): Promise<{ success: boolean, sid?: string, mock?: boolean, error?: any }> {
    if (!client || !fromNumber) {
        console.log(`[MOCK SMS] To: ${to}, Message: ${message}`);
        return { success: true, mock: true };
    }

    try {
        const result = await client.messages.create({
            body: message,
            from: fromNumber,
            to: to,
        });
        console.log(`[SMS SENT] SID: ${result.sid}`);
        return { success: true, sid: result.sid };
    } catch (error) {
        console.error('[SMS ERROR]', error);
        return { success: false, error };
    }
}

export async function sendAdminAlert(eventType: string, data: Record<string, any>): Promise<{ success: boolean }> {
    let message = '';

    switch (eventType) {
        case 'new_order':
            message = `🛒 New order #${data.orderNumber} for $${data.total} from ${data.customerEmail}. View in admin panel.`;
            break;
        case 'new_dispute':
            message = `⚠️ New dispute #${data.disputeNumber} for order #${data.orderNumber}. Reason: ${data.reason}. Take action.`;
            break;
        case 'low_stock':
            message = `📦 Low stock alert: ${data.productName} has only ${data.stock} left. Restock soon.`;
            break;
        case 'out_of_stock':
            message = `❌ Out of stock: ${data.productName} is sold out. Restock immediately.`;
            break;
        default:
            message = `[Admin Alert] ${JSON.stringify(data)}`;
    }

    return sendSMS(adminPhone, message);
}

