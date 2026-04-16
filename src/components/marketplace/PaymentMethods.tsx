'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface PaymentMethodsProps {
    amount: number;
    currency: 'USD' | 'TZS';
    products: any[];
    phone?: string;
    onPaymentSuccess?: (paymentData: any) => void;
}

export default function PaymentMethods({ amount, currency, products, phone, onPaymentSuccess }: PaymentMethodsProps) {
    const [loading, setLoading] = useState<string>('');
    const { data: session } = useSession();

    const handlePayment = async (method: string) => {
        if (!session) {
            toast.error('Please sign in first');
            return;
        }

        setLoading(method);

        try {
            const res = await fetch('/api/payments/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    method,
                    amount,
                    currency,
                    orderId: `temp-${Date.now()}`,
                    phone,
                    products
                }),
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
            } else if (data.message === 'Payment simulation - Add your API keys for real payments') {
                toast.success('✅ Demo payment successful! Order created.');
                onPaymentSuccess?.(data);
            } else if (data.url) {
                window.location.href = data.url;
            } else if (data.client_secret) {
                // Stripe Elements integration needed in checkout page
                toast.success('Stripe Payment Intent created');
                onPaymentSuccess?.(data);
            }
        } catch (error) {
            toast.error('Payment initiation failed');
        } finally {
            setLoading('');
        }
    };

    return (
        <div className="space-y-4 p-6 bg-white rounded-2xl shadow-lg border">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                💳 Choose Payment Method
                <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {currency}
                </span>
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
                {/* Stripe */}
                <button
                    onClick={() => handlePayment('stripe')}
                    disabled={loading === 'stripe'}
                    className="group flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 1h12v10H4V5z" />
                        </svg>
                    </div>
                    <span className="font-semibold text-gray-900 group-hover:text-indigo-600 mb-1">Credit/Debit Card</span>
                    <span className="text-xs text-gray-500 text-center">Visa • MasterCard • Amex</span>
                    {loading === 'stripe' && <div className="mt-2 w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>}
                </button>

                {/* PayPal */}
                <button
                    onClick={() => handlePayment('paypal')}
                    disabled={loading === 'paypal'}
                    className="group flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                        <span className="text-white font-bold text-sm">PP</span>
                    </div>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">PayPal</span>
                    <span className="text-xs text-gray-500 text-center">Global payments</span>
                    {loading === 'paypal' && <div className="mt-2 w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                </button>

                {/* Nala Money */}
                <button
                    onClick={() => handlePayment('nala')}
                    disabled={loading === 'nala'}
                    className="group flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                        <span className="text-white font-bold text-xs">NALA</span>
                    </div>
                    <span className="font-semibold text-gray-900 group-hover:text-green-600 mb-1">Nala Money</span>
                    <span className="text-xs text-gray-500 text-center">TZS instant</span>
                    {loading === 'nala' && <div className="mt-2 w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>}
                </button>
            </div>

            <div className="pt-4 border-t text-xs text-gray-500 text-center">
                🔒 Secure 3DS • {currency === 'USD' ? `$${amount.toFixed(2)}` : `TZS ${amount.toLocaleString()}`}
            </div>
        </div>
    );
}

