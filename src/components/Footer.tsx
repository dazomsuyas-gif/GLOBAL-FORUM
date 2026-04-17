import React from 'react';
import Link from 'next/link';
import { OWNER_INFO } from '../data/constants';

const Footer: React.FC<{}> = () => {
    const whatsappNumbers = OWNER_INFO.whatsapp.map(number => ({
        number,
        region: 'Tanzania'
    }));

    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Brand & Description */}
                    <div className="md:col-span-1">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            Global Forum
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Connecting minds worldwide. Join millions of users engaging in meaningful discussions across all topics.
                        </p>
                        <div className="space-y-2 mb-6">
                            <p className="text-sm text-gray-300">
                                <span className="font-semibold">Founded:</span> {OWNER_INFO.foundingYear} by {OWNER_INFO.name}
                            </p>
                            <p className="text-sm text-gray-300">
                                <span className="font-semibold">Location:</span> {OWNER_INFO.address}
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/knowledge" className="text-gray-400 hover:text-white transition-colors">Knowledge</Link></li>
                            <li><Link href="/politics-history" className="text-gray-400 hover:text-white transition-colors">Politics & History</Link></li>
                            <li><Link href="/economics-education-realestate" className="text-gray-400 hover:text-white transition-colors">Econ/Edu/RE</Link></li>
                            <li><Link href="/sports-entertainment-health" className="text-gray-400 hover:text-white transition-colors">Sports/Ent/Health</Link></li>
                            <li><Link href="/technology-science" className="text-gray-400 hover:text-white transition-colors">Tech & Science</Link></li>
                            <li><Link href="/tourism" className="text-gray-400 hover:text-white transition-colors">Tourism ✈️</Link></li>
                            <li><Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors">Marketplace</Link></li>
                            <li><Link href="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>

                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Support</h4>
                        <ul className="space-y-3">
                            <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* WhatsApp Numbers */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact WhatsApp</h4>
                        <div className="space-y-3">
                            {whatsappNumbers.map(({ number, region }, index) => (
                                <a
                                    key={index}
                                    href={`https://wa.me/${number.replace(/\D/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 p-3 bg-green-600/20 rounded-xl hover:bg-green-600/30 transition-all group"
                                >
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{number}</p>
                                        <p className="text-sm text-gray-400">{region}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                        {/* Emails */}
                        <div className="mt-6 pt-6 border-t border-gray-700">
                            <h5 className="text-md font-semibold mb-4 text-gray-200">Emails</h5>
                            <div className="space-y-2">
                                {OWNER_INFO.emails.map((email, index) => (
                                    <a
                                        key={index}
                                        href={`mailto:${email}`}
                                        className="flex items-center space-x-3 p-3 bg-blue-600/20 rounded-xl hover:bg-blue-600/30 transition-all group"
                                    >
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                            </svg>
                                        </div>
                                        <span className="text-white font-medium">{email}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {OWNER_INFO.foundingYear} Global Forum. All rights reserved. | Made with ❤️ for the world</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
