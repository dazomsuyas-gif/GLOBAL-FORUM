import { OWNER_INFO } from '../../../data/constants';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const metadata = {
    title: 'Contact Us - Global Forum',
    description: 'Get in touch with Global Forum team. Contact via WhatsApp, email or our form. Located in Arusha, Tanzania.'
};

export default function ContactPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden pt-32 pb-24">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-6">
                        Contact Us
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Have questions? Ready to collaborate? Reach out to the Global Forum team.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-24 bg-white/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {/* WhatsApp */}
                        <div className="group bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Phone className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">WhatsApp</h3>
                            <div className="space-y-3">
                                {OWNER_INFO.whatsapp.map((number, index) => (
                                    <a
                                        key={index}
                                        href={`https://wa.me/${number.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                                    >
                                        {number}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="group bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Email</h3>
                            <div className="space-y-3">
                                {OWNER_INFO.emails.map((email, index) => (
                                    <a
                                        key={index}
                                        href={`mailto:${email}`}
                                        className="block p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                                    >
                                        {email}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="group bg-gradient-to-br from-purple-500 to-pink-600 text-white p-8 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Our Location</h3>
                            <p className="text-lg mb-6">{OWNER_INFO.address}</p>
                            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                                <p className="text-gray-500 text-sm">Arusha, Tanzania Map</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-6">
                            Send us a Message
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </div>

                    <form className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Message
                            </label>
                            <textarea
                                rows={8}
                                placeholder="Tell us about your inquiry..."
                                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-lg shadow-lg hover:shadow-xl resize-vertical"
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex justify-center">
                            <button
                                type="submit"
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 flex items-center space-x-3"
                            >
                                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                <span>Send Message</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
