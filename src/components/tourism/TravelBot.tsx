"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Phone, Bot } from 'lucide-react';
import { OWNER_INFO } from '../../data/constants';

interface QuickReply {
    text: string;
    type: 'quick' | 'whatsapp';
    message?: string;
}

const QUICK_REPLIES: QuickReply[] = [
    {
        text: 'Best time to visit Tanzania?',
        type: 'quick',
        message: 'June-October is the best dry season for safaris. July-March is perfect for Zanzibar beaches. Migration in Serengeti peaks July-September!'
    },
    {
        text: 'Visa requirements',
        type: 'quick',
        message: 'Most nationalities get Visa on Arrival for $50 USD at airports. E-visa also available online. Check /tourism/visa for details.'
    },
    {
        text: 'Cheapest flights to Zanzibar',
        type: 'quick',
        message: 'Domestic flights from DAR/JRO to ZNZ start at $85. Check /tourism/flights for live prices from Precision Air, Coastal Aviation.'
    },
    {
        text: 'Recommended safari tours',
        type: 'quick',
        message: 'Top choice: Serengeti Safari 3 days ($450) or Grand Safari 7 days ($950). See /tourism/tours for all packages.'
    },
    {
        text: 'Hotel near Kilimanjaro',
        type: 'quick',
        message: 'Mount Meru Hotel in Arusha ($130/night midrange) or Serena Hotel ($280 luxury). Book at /tourism/hotels.'
    },
    {
        text: 'Weather in Serengeti',
        type: 'quick',
        message: 'Current dry season - perfect for game drives. Temps 20-30°C day, cooler nights. No rain forecast this week!'
    }
];

export default function TravelBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = (message: string, role: 'user' | 'bot') => {
        setMessages(prev => [...prev, { role, text: message }]);
    };

    const handleQuickReply = (reply: QuickReply) => {
        sendMessage(reply.text, 'user');
        setTimeout(() => {
            sendMessage(reply.message || 'Great question! Check our tourism section for details.', 'bot');
        }, 800);
    };

    const sendInput = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input, 'user');
            setInput('');
            setTimeout(() => {
                sendMessage('Thank you for your message! Our AI assistant will reply soon or escalate to human agent. You can also WhatsApp us directly!', 'bot');
            }, 1000);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end space-y-3"
        >
            {/* Floating WhatsApp buttons */}
            <motion.a
                href={`https://wa.me/${OWNER_INFO.whatsapp[0].replace(/\D/g, '')}?text=Hello! I need help with tourism booking in Tanzania.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-emerald-500 hover:bg-emerald-600 shadow-2xl rounded-full flex items-center justify-center text-white group hover:scale-110 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
            >
                <Phone className="w-6 h-6" />
                <span className="absolute -bottom-12 right-0 bg-slate-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
                    WhatsApp 1
                </span>
            </motion.a>

            <motion.a
                href={`https://wa.me/${OWNER_INFO.whatsapp[1].replace(/\D/g, '')}?text=Hello! I need tourism assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-green-500 hover:bg-green-600 shadow-xl rounded-full flex items-center justify-center text-white group hover:scale-105 transition-all duration-300"
                whileTap={{ scale: 0.95 }}
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.86 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                <span className="absolute -bottom-12 right-0 bg-slate-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">
                    WhatsApp 2
                </span>
            </motion.a>

            {/* Main Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-emerald-500 text-white shadow-2xl rounded-full flex items-center justify-center text-xl font-bold hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 z-10 relative ${isOpen ? 'scale-90' : ''}`}
                whileTap={{ scale: 0.95 }}
            >
                {isOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
            </motion.button>

            {/* Chat Window */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-96 h-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col absolute bottom-32 right-0 z-20"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-emerald-500 p-5 flex items-center space-x-3">
                        <Bot className="w-6 h-6 text-white" />
                        <div>
                            <h3 className="text-lg font-bold text-white">AI Travel Assistant</h3>
                            <p className="text-blue-100 text-sm">24/7 Tanzania expert</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-slate-100 p-3 rounded-2xl rounded-tr-none max-w-xs">
                                <p className="text-sm text-slate-800">
                                    Hello! I&apos;m your Tanzania travel expert 🤖 How can I help with your trip?
                                </p>
                            </div>
                        </div>
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} space-x-3`}>
                                <div className={`p-3 rounded-2xl max-w-xs ${message.role === 'user' ? 'rounded-tl-none bg-gradient-to-r from-purple-500 to-emerald-500 text-white' : 'bg-slate-100 text-slate-800'}`}>
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Replies */}
                    <div className="p-4 border-t border-slate-200 bg-slate-50">
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {QUICK_REPLIES.slice(0, 4).map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickReply(reply)}
                                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium hover:bg-slate-100 transition-colors text-slate-700 flex items-center space-x-2"
                                >
                                    {reply.text.length > 20 ? `${reply.text.slice(0, 20)}...` : reply.text}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <form onSubmit={sendInput} className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            />
                            <button
                                type="submit"
                                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-emerald-500 hover:from-purple-600 hover:to-emerald-600 rounded-xl flex items-center justify-center transition-all duration-200"
                            >
                                <Send className="w-5 h-5 text-white" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

