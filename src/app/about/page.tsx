import { OWNER_INFO } from '../../../data/constants';
import { Users, Globe, Award, Calendar } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'About Global Forum - Knowledge Without Borders',
    description: 'Learn about Global Forum, our mission, founder Msuya Kelvin Juma, and our vision for global knowledge sharing and language learning.'
};

export default function AboutPage() {
    const bio = `Kelvin Juma Msuya founded Global Forum in 2026 with a vision to create a borderless platform for knowledge, language learning, and global commerce. Based in Arusha, Tanzania, Kelvin built this platform to help people learn 6 languages, connect with a global community, buy and sell products worldwide, and access AI-powered learning tools 24/7.`;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden pt-32 pb-24">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-6">
                        About Global Forum
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 max-w-4xl mx-auto leading-relaxed mb-12">
                        Knowledge Without Borders – Connecting 1 Million Minds Worldwide
                    </p>
                </div>
            </section>

            {/* Founder Bio */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-6">
                            Meet Our Founder
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto md:mx-0 mb-8 md:mb-0 shadow-2xl">
                                <span className="text-3xl md:text-5xl font-black text-white">MK</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-center md:text-left">
                                {OWNER_INFO.name}
                            </h3>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">{bio}</p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                                    Contact Founder
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
                                <Calendar className="w-12 h-12 text-blue-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Founded in {OWNER_INFO.foundingYear}</h4>
                                    <p className="text-gray-600">Vision started in Arusha, Tanzania – now serving millions globally.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-50 to-green-50 rounded-2xl">
                                <Globe className="w-12 h-12 text-emerald-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Global Reach</h4>
                                    <p className="text-gray-600">190+ countries, 6 languages, AI tutors, marketplace for worldwide commerce.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-50 to-purple-50 rounded-2xl">
                                <Users className="w-12 h-12 text-purple-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Our Mission</h4>
                                    <p className="text-gray-600">Borderless knowledge exchange – learn, connect, thrive.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Preview */}
            <section className="py-24 bg-gradient-to-r from-gray-900 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                                1M+
                            </div>
                            <p className="text-xl text-gray-400">Active Users</p>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                                6
                            </div>
                            <p className="text-xl text-gray-400">Languages</p>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                                24/7
                            </div>
                            <p className="text-xl text-gray-400">AI Support</p>
                        </div>
                        <div className="group">
                            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                                190+
                            </div>
                            <p className="text-xl text-gray-400">Countries</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                        Ready to Join the Global Forum?
                    </h2>
                    <p className="text-xl mb-12 opacity-90">
                        Become part of the largest knowledge community in the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link href="/languages" className="px-12 py-6 bg-white text-blue-600 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:-translate-y-2">
                            Start Learning
                        </Link>
                        <Link href="/contact" className="px-12 py-6 border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:-translate-y-2">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
