"use client";
import { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, Bot, User, CheckCircle, Clock, Truck, Package, CreditCard, RotateCcw, Send } from 'lucide-react';

const WHATSAPP_NUMBERS = {
    kelvin: '+255768868546',
    jubleth: '+255767456512'
};

type BotMessage = {
    id: string;
    type: 'bot' | 'user';
    text: string;
    timestamp: Date;
};

type QuickReply = {
    id: string;
    icon: string;
    title: string;
    handler: () => void;
};

export default function WhatsAppMarketplaceBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<BotMessage[]>([]);
    const [inputText, setInputText] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const quickReplies: QuickReply[] = [
        { id: 'track', icon: '🔍', title: 'Track My Order', handler: () => handleTrackOrder },
        { id: 'product', icon: '📦', title: 'Product Inquiry', handler: handleProductInquiry },
        { id: 'delivery', icon: '🚚', title: 'Delivery Status', handler: handleDeliveryStatus },
        { id: 'returns', icon: '🔄', title: 'Returns & Refunds', handler: handleReturns },
        { id: 'payment', icon: '💳', title: 'Payment Help', handler: handlePaymentHelp },
        { id: 'negotiate', icon: '💰', title: 'Price Negotiation', handler: handleNegotiation },
        { id: 'human', icon: '👨‍💼', title: 'Speak to Human', handler: handleHumanAgent }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const addBotMessage = (text: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'bot',
            text,
            timestamp: new Date()
        }]);
    };

    const addUserMessage = (text: string) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'user',
            text,
            timestamp: new Date()
        }]);
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        addUserMessage(inputText);
        const tempInput = inputText;
        setInputText('');

        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const response = generateResponse(tempInput);
            addBotMessage(response);
        }, 1500);
    };

    const handleQuickReply = (reply: QuickReply) => {
        reply.handler();
        setIsOpen(false);
    };

    const generateResponse = (message: string): string => {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('track') || lowerMsg.includes('order')) {
            if (!orderNumber) return "Please share your order number (e.g., ORD-12345) to track it.";
            const status = getOrderStatus(orderNumber);
            return `📦 Order ${orderNumber}: ${status.status}\nEstimated delivery: ${status.eta}\nReply with 'more details' for full tracking.`;
        }

        if (lowerMsg.includes('product')) return "📱 What product are you interested in? Share the name or link for instant info, price, and stock availability.";

        if (lowerMsg.includes('delivery') || lowerMsg.includes('shipping')) return "🚚 Delivery options:\n• Shop Pickup: TZS 5,000 (1-3 days)\n• Tanzania: TZS 8,000 (2-5 days)\n• East Africa: TZS 18,000 (5-10 days)\n• Worldwide: TZS 35,000 (10-21 days)";

        if (lowerMsg.includes('return') || lowerMsg.includes('refund')) return "🔄 Returns: 7-day money back guarantee. Contact seller within 48h of delivery. Reply with order number for refund process.";

        if (lowerMsg.includes('pay') || lowerMsg.includes('payment')) return "💳 15+ payment methods:\n• Nala Money • M-PESA • Amazon Pay\n• PayPal • Cards • Crypto (BTC/USDT)\nAll secure with 3D Secure.";

        if (lowerMsg.includes('price') || lowerMsg.includes('negotiate')) return "💰 Price negotiation: Reply with product name and your offer. Sellers respond within 2h. Local prices in TZS + International USD/EUR/GBP.";

        return "🤖 Thanks for contacting Global Forum Marketplace! Choose a quick reply or type your question. For urgent help, tap 'Speak to Human' 👨‍💼";
    };

    const getOrderStatus = (orderId: string) => {
        const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        return {
            status: statuses[Math.floor(Math.random() * statuses.length)],
            eta: ['1-3 days', '3-5 days', 'Today'][Math.floor(Math.random() * 3)]
        };
    };

    const handleTrackOrder = () => {
        addBotMessage("🔍 Please share your order number (e.g., ORD-12345) to track it.");
        setIsOpen(true);
    };

    const handleProductInquiry = () => {
        addBotMessage("📦 What product are you interested in? Share name or link for instant info, price, stock, and seller details.");
    };

    const handleDeliveryStatus = () => {
        addBotMessage("🚚 Reply with your order number to check delivery status and estimated arrival time.");
    };

    const handleReturns = () => {
        addBotMessage("🔄 Returns within 7 days. Share order number for instant refund process or replacement.");
    };

    const handlePaymentHelp = () => {
        addBotMessage("💳 Payment issues? We support 15+ methods. Share order number and payment method for help.");
    };

    const handleNegotiation = () => {
        addBotMessage("💰 Price negotiation active! Share product name and your offer. Sellers respond within 2h.");
    };

    const handleHumanAgent = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBERS.kelvin}?text=Hi%20Global%20Forum,%20I%20need%20human%20help`, '_blank');
    };

    const handleEscalate = () => {
        addBotMessage("👨‍💼 Transferring to human agent...");
        setTimeout(() => {
            addBotMessage("Live agent connected! Kelvin or Jubleth will help you shortly. 😊");
        }, 2000);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                className={`fixed right-6 bottom-6 z-50 w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 focus:outline-none ${isVisible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-12 opacity-0 scale-75'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    boxShadow: '0 25px 50px -12px rgba(37,211,102,0.4)'
                }}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageCircle className="w-10 h-10 text-white drop-shadow-lg" />
            </motion.button>

            {/* Chat Widget */}
            {isOpen && (
                <motion.div
                    className="fixed right-6 bottom-32 w-96 h-[600px] bg-white/95 backdrop-blur-3xl rounded-4xl shadow-2xl z-50 overflow-hidden border border-green-200"
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-white drop-shadow-lg">Global Forum Bot</h3>
                                <p className="text-green-100 text-sm">Online • Response time: 30s</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 -m-2 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-[420px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-green-50/50 to-white/50">
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl shadow-lg ${message.type === 'user'
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white ml-auto'
                                    : 'bg-white border border-gray-200'
                                    }`}>
                                    <p className="text-lg leading-relaxed">{message.text}</p>
                                    <p className={`text-xs mt-2 font-medium ${message.type === 'user'
                                        ? 'text-emerald-100'
                                        : 'text-gray-500'
                                        }`}>
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="glass-card p-4 rounded-3xl bg-white/80 border border-gray-200">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" />
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies */}
                    <div className="px-6 pb-6 bg-white/50">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                            {quickReplies.slice(0, 6).map((reply) => (
                                <motion.button
                                    key={reply.id}
                                    onClick={() => handleQuickReply(reply)}
                                    className="glass-card p-4 rounded-2xl border border-green-200 hover:shadow-glow-green hover:bg-green-50 transition-all flex items-center gap-3 text-left"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <span className="text-2xl">{reply.icon}</span>
                                    <span className="font-semibold text-green-800">{reply.title}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 p-4 bg-white border border-green-200 rounded-3xl text-lg focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/50 transition-all placeholder:text-green-500/50"
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <motion.button
                                onClick={sendMessage}
                                disabled={!inputText.trim() || isTyping}
                                className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-3xl shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Send className="w-6 h-6 rotate-45" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Human Agent Quick Links */}
            <div className="fixed bottom-32 right-6 space-y-3 z-40">
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBERS.kelvin}?text=Hi%20Kelvin,%20Global%20Forum%20Marketplace`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full shadow-lg hover:shadow-emerald-500/50 hover:scale-110 transition-all flex items-center justify-center"
                    title="Kelvin (+255768868546)"
                >
                    K
                </a>
                <a
                    href={`https://wa.me/${WHATSAPP_NUMBERS.jubleth}?text=Hi%20Jubleth,%20Global%20Forum%20Marketplace`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-blue-500/50 hover:scale-110 transition-all flex items-center justify-center"
                    title="Jubleth (+255767456512)"
                >
                    J
                </a>
            </div>
        </div >
  );
}

