import React, { useState, useEffect, useRef } from 'react';

const WhatsAppBot: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        // Show after 5 seconds
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const whatsappNumbers = [
        { number: '15551234567', region: 'USA', name: 'USA Support' },
        { number: '442079460958', region: 'UK', name: 'UK Support' },
        { number: '2348091234567', region: 'Nigeria', name: 'Nigeria Support' },
        { number: '919876543210', region: 'India', name: 'India Support' },
        { number: '521234567890', region: 'Mexico', name: 'Mexico Support' },
        { number: '55123456789', region: 'Brazil', name: 'Brazil Support' },
        { number: '49123456789', region: 'Germany', name: 'Germany Support' },
        { number: '3312345678', region: 'France', name: 'France Support' },
        { number: '861234567890', region: 'China', name: 'China Support' },
        { number: '254712345678', region: 'Kenya', name: 'Kenya Support' },
        { number: '2712345678', region: 'South Africa', name: 'South Africa Support' },
        { number: '34987654321', region: 'Spain', name: 'Spain Support' },
        { number: '393331234567', region: 'Italy', name: 'Italy Support' },
        { number: '551112345678', region: 'Australia', name: 'Australia Support' },
        { number: '821012345678', region: 'South Korea', name: 'South Korea Support' },
    ];

    return (
        <>
            {/* Floating WhatsApp Button */}
            <button
                onClick={toggleChat}
                className={`fixed right-6 bottom-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
            >
                <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
            </button>

            {/* WhatsApp Chat Widget */}
            {isOpen && (
                <div className="fixed right-6 bottom-24 w-80 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden transform transition-all duration-300 animate-in slide-in-from-bottom-4">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Global Forum Support</h4>
                                <p className="text-green-100 text-sm">We're here to help!</p>
                            </div>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="text-white hover:text-gray-200 p-1 -m-1 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="h-96 p-6 flex flex-col">
                        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
                            <div className="text-green-600 bg-green-50 p-4 rounded-2xl rounded-tr-none max-w-xs ml-auto">
                                Hi! 👋 Welcome to Global Forum. How can we help you today?
                            </div>
                            <div className="text-gray-800 bg-gray-100 p-4 rounded-2xl rounded-tl-none max-w-xs">
                                I'm interested in joining the forum!
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2 mb-4">
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                <span>Chat with Support</span>
                            </button>
                        </div>

                        {/* Regional Support */}
                        <div className="border-t pt-4">
                            <p className="text-xs text-gray-500 mb-3 text-center">Choose your region:</p>
                            <div className="space-y-2">
                                {whatsappNumbers.map(({ number, region, name }, index) => (
                                    <a
                                        key={index}
                                        href={`https://wa.me/${number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm"
                                    >
                                        <span className="font-medium">{name}</span>
                                        <span className="text-green-600 font-semibold">{region}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WhatsAppBot;

