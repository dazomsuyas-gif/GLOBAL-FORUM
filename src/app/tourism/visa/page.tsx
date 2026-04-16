"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Global, Send, Download, Phone } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import TravelBot from '../../../components/tourism/TravelBot';
import { VISA_COUNTRIES, VISA_FAQ } from '../../../data/tourism/visaData';
import { OWNER_INFO } from '../../../data/constants';

export default function VisaPage() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        passportNumber: '',
        nationality: '',
        email: '',
        phone: ''
    });

    const countries = Object.keys(VISA_COUNTRIES);
    const visaInfo = selectedCountry ? VISA_COUNTRIES[selectedCountry as keyof typeof VISA_COUNTRIES] : null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Visa application logic
        alert('Visa application submitted! Check your email for confirmation.');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <TravelBot />

            {/* Hero */}
            <section className="relative py-24 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <h1 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-2xl">
                            Tanzania Visa Services
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                            Fast & Easy Visa Processing – On Arrival or E-Visa
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-100 font-bold shadow-xl">
                                <Global className="mr-2 h-5 w-5" />
                                Check Requirements
                            </Button>
                            <Button size="lg" className="bg-white/20 backdrop-blur-sm border-white text-white hover:bg-white hover:text-blue-600">
                                Apply Now ($50)
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Visa Checker */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50"
                    >
                        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Visa Requirement Checker
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="space-y-4 mb-8">
                                    <label className="block text-lg font-semibold text-slate-800 mb-2">
                                        Select Your Nationality
                                    </label>
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="w-full p-4 border-2 border-slate-200 rounded-2xl text-lg focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    >
                                        <option value="">Choose your country...</option>
                                        {countries.map(country => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {visaInfo && (
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-8"
                                    >
                                        <h3 className="text-2xl font-bold text-emerald-800 mb-4">
                                            {visaInfo.required ? '✅ Visa Required' : '🎉 Visa Free'}
                                        </h3>
                                        <div className="space-y-4 text-lg">
                                            <div>
                                                <span className="font-semibold text-slate-700">Type:</span> {visaInfo.type}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-slate-700">Fee:</span> ${visaInfo.feeUSD} / {visaInfo.feeTZS.toLocaleString()} TZS
                                            </div>
                                            <div>
                                                <span className="font-semibold text-slate-700">Processing:</span> {visaInfo.processingDays} days
                                            </div>
                                        </div>
                                        <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg">
                                            {visaInfo.required ? 'Apply Now ($50)' : 'Plan Your Trip'}
                                        </Button>
                                    </motion.div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-3xl">
                                    <h3 className="text-2xl font-bold mb-4">Visa On Arrival</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Available at DAR, JRO, ZNZ airports</li>
                                        <li>• $50 USD cash/card</li>
                                        <li>• Most nationalities eligible</li>
                                        <li>• Passport 6+ months validity</li>
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-8 rounded-3xl">
                                    <h3 className="text-2xl font-bold mb-4">E-Visa Online</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• Apply online eservices.immigration.go.tz</li>
                                        <li>• Same $50 fee</li>
                                        <li>• 2-5 business days</li>
                                        <li>• Email delivery</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-center mb-16 text-slate-900"
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <div className="space-y-4">
                        {VISA_FAQ.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                whileInView={{ opacity: 1, height: 'auto' }}
                                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-all"
                            >
                                <h4 className="font-bold text-lg text-slate-900 mb-3">{faq.question}</h4>
                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-2xl mx-auto px-4 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    >
                        <h2 className="text-4xl font-black mb-6 drop-shadow-2xl">
                            Ready to Travel?
                        </h2>
                        <p className="text-xl mb-12 max-w-lg mx-auto drop-shadow-lg">
                            Apply for your Tanzania visa in 3 minutes. Get approval in 2-5 days.
                        </p>
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-bold px-12 py-6 text-xl shadow-2xl">
                            Apply for Visa ($50) →
                        </Button>
                    </motion.div>

                    <div className="mt-16 flex items-center justify-center space-x-8 text-sm">
                        <a href={`https://wa.me/${OWNER_INFO.whatsapp[0].replace(/\D/g, '')}?text=Hello! Need visa help for Tanzania travel.`}
                            target="_blank"
                            className="flex items-center space-x-2 hover:text-slate-200 transition-colors"
                        >
                            <Phone className="w-5 h-5" />
                            <span>WhatsApp Visa Help</span>
                        </a>
                        <span className="text-slate-400">•</span>
                        <Link href="/contact" className="hover:text-slate-200 transition-colors">
                            Email Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

