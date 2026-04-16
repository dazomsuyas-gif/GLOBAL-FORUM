"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, MoreVertical, Mic, Send, Smile, Image as ImageIcon, ArrowLeft, Check, CheckCheck } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';
import confetti from 'canvas-confetti';

interface Message {
    id: string;
    content: string;
    sender: 'me' | 'other';
    timestamp: string;
    read: boolean;
    reactions?: string[];
}

const mockMessages: Message[] = [
    { id: '1', content: '¡Hola Ana! Gracias por ayudarme con los tiempos verbales ayer. 😊', sender: 'me', timestamp: '10:45 AM', read: true },
    { id: '2', content: '¡De nada! Me alegra mucho que te haya servido. ¿Cómo te fue con el ejercicio de pretérito perfecto?', sender: 'other', timestamp: '10:47 AM', read: true },
    { id: '3', content: 'Bien, aunque todavía me confundo con "haber" + participio. ¿Me puedes dar algunos ejemplos más?', sender: 'me', timestamp: '10:48 AM', read: true },
    { id: '4', content: '¡Por supuesto! He comido / Has estudiado / Hemos viajado. ¿Quieres que hagamos un mini-quiz ahora?', sender: 'other', timestamp: '10:50 AM', read: false },
    { id: '5', content: '¡Sí! Estoy lista. 🎯', sender: 'me', timestamp: '10:51 AM', read: true },
    { id: '6', content: '¡Perfecto! Primera pregunta: "Ella ___ (vivir) en Madrid durante dos años."', sender: 'other', timestamp: '10:52 AM', read: false },
    { id: '7', content: '...', sender: 'other', timestamp: '10:55 AM', read: false },
    { id: '8', content: '¡He vivido! ¿Correcto?', sender: 'me', timestamp: '10:56 AM', read: true }
];

export default function ChatConversation({ params }: { params: { userId: string } }) {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [typing, setTyping] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: true
        };

        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');

        // Simulate response
        setTimeout(() => {
            const response: Message = {
                id: (Date.now() + 1).toString(),
                content: "¡Perfecto! Esa respuesta está correcta. He vivido es el pretérito perfecto compuesto. ¿Listo para la siguiente pregunta? 😊",
                sender: 'other',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: false
            };
            setMessages(prev => [...prev, response]);
        }, 1500);
    };

    const startVoiceRecording = () => {
        const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');

            setInputMessage(transcript);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        setRecognition(recognition);
        recognition.start();
        setIsRecording(true);
    };

    const stopVoiceRecording = () => {
        if (recognition) {
            recognition.stop();
        }
        setIsRecording(false);
    };

    const otherUser = {
        name: "Ana Garcia 🇪🇸",
        avatar: "🇪🇸",
        online: true,
        typing: typing
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col lg:flex-row">
            {/* Header */}
            <motion.div
                className="glass-card p-6 lg:p-8 flex items-center gap-4 border-b border-white/5 lg:border-b-0 lg:border-r lg:h-screen sticky top-0 z-20 lg:z-auto bg-slate-900/95 backdrop-blur-xl lg:min-w-[400px]"
                initial={false}
            >
                <button className="lg:hidden p-3 hover:bg-white/10 rounded-2xl -ml-3">
                    <ArrowLeft className="w-7 h-7 text-white/60 hover:text-white" />
                </button>

                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl font-bold text-white shadow-2xl border-4 border-white/20 lg:border-6 lg:border-white/30">
                    {otherUser.avatar}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="font-black text-2xl lg:text-3xl text-white truncate">{otherUser.name}</div>
                    <div className="flex items-center gap-2 text-emerald-400 text-lg font-bold">
                        <div className={`w-3 h-3 rounded-full ${otherUser.online ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                        {otherUser.online ? 'Online' : 'Offline'}
                    </div>
                </div>

                <div className="flex items-center gap-3 lg:flex-col">
                    <motion.button className="p-4 hover:bg-white/10 rounded-2xl lg:rounded-3xl text-white/60 hover:text-white transition-all" whileHover={{ scale: 1.1 }}>
                        <Phone className="w-6 h-6" />
                    </motion.button>
                    <motion.button className="p-4 hover:bg-white/10 rounded-2xl lg:rounded-3xl text-white/60 hover:text-white transition-all" whileHover={{ scale: 1.1 }}>
                        <Video className="w-6 h-6" />
                    </motion.button>
                    <motion.button className="p-4 hover:bg-white/10 rounded-2xl lg:rounded-3xl text-white/60 hover:text-white transition-all" whileHover={{ scale: 1.1 }}>
                        <MoreVertical className="w-6 h-6" />
                    </motion.button>
                </div>
            </motion.div>

            <div className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 p-6 lg:p-12 overflow-y-auto space-y-6 lg:pb-32">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            className={`flex ${message.sender === 'me' ? 'justify-end' : ''} gap-4 animate-in slide-in-from-${message.sender === 'me' ? 'right' : 'left'}`}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`${message.sender === 'me' ? 'order-last' : ''} w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0 shadow-lg`}>
                                {message.sender === 'me' ? '👤' : otherUser.avatar}
                            </div>

                            <div className="max-w-2xl lg:max-w-3xl">
                                <div className={`p-6 lg:p-8 rounded-4xl shadow-2xl relative ${message.sender === 'me'
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-br-2xl'
                                        : 'bg-slate-700/50 backdrop-blur-xl text-white border border-white/10 rounded-bl-2xl'
                                    }`}>
                                    <div className="text-lg leading-relaxed whitespace-pre-wrap">{message.content}</div>

                                    {/* Reactions */}
                                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100">
                                        {['👍', '❤️', '😂', '😮', '😢', '😡'].map(reaction => (
                                            <motion.button
                                                key={reaction}
                                                className="p-2 hover:scale-125 transition-transform text-xl"
                                                whileHover={{ scale: 1.25 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {reaction}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Read Receipt */}
                                    {message.sender === 'me' && message.read && (
                                        <div className="absolute bottom-4 right-4 flex gap-1">
                                            <CheckCheck className="w-5 h-5 text-emerald-300" />
                                        </div>
                                    )}
                                </div>

                                <div className="text-xs text-white/50 mt-2">
                                    {message.timestamp}
                                    {message.sender === 'me' && !message.read && (
                                        <>
                                            {' '}
                                            <Check className="w-4 h-4 inline text-emerald-400" />
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {typing && (
                        <div className="flex gap-4 animate-pulse">
                            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0 shadow-lg">
                                🇪🇸
                            </div>
                            <div className="bg-slate-700/50 backdrop-blur-xl rounded-bl-2xl px-6 py-4 text-white border border-white/10 max-w-md">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="glass-card p-6 rounded-3xl mx-6 lg:mx-12 mb-12 lg:mb-24 border-t border-white/10">
                    <div className="flex items-end gap-4">
                        {/* Attachments */}
                        <motion.button
                            className="p-4 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white transition-all lg:p-3"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ImageIcon className="w-7 h-7" />
                        </motion.button>

                        {/* Emoji */}
                        <motion.button
                            className="p-4 hover:bg-white/10 rounded-2xl text-white/60 hover:text-white transition-all lg:p-3"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Smile className="w-7 h-7" />
                        </motion.button>

                        {/* Voice */}
                        <motion.button
                            onMouseDown={startVoiceRecording}
                            onMouseUp={stopVoiceRecording}
                            className={`p-4 lg:p-3 rounded-2xl transition-all shadow-lg ${isRecording
                                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white scale-110 shadow-red-500/50'
                                    : 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white border border-white/20'
                                }`}
                            whileHover={!isRecording ? { scale: 1.1 } : {}}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Mic className={`w-7 h-7 ${isRecording ? 'animate-pulse' : ''}`} />
                        </motion.button>

                        {/* Text Input */}
                        <div className="flex-1 relative">
                            <textarea
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type a message..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                className="w-full p-5 pr-20 lg:p-4 lg:pr-16 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl text-white placeholder-white/50 resize-none focus:outline-none focus:border-emerald-400 transition-all min-h-[56px] max-h-32"
                                rows={1}
                            />
                            <Send
                                className={`absolute bottom-4 right-6 w-8 h-8 text-emerald-400 cursor-pointer transition-all ${inputMessage.trim()
                                        ? 'hover:scale-110 hover:text-emerald-300'
                                        : 'opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

