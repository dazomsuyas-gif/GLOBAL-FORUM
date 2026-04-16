"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { OWNER_INFO } from '../../../../data/constants';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Hardcoded admin credentials from OWNER_INFO
        if (email === OWNER_INFO.admin.email && password === OWNER_INFO.admin.password) {
            toast.success('Login successful! Redirecting...');
            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 1500);
        } else {
            toast.error('Invalid email or password');
        }

        setLoading(false);
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
                            Admin Login
                        </h2>
                        <p className="text-xl text-slate-400">Access Global Forum Admin Dashboard</p>
                    </div>
                    <form className="mt-8 space-y-8 bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center">
                                <Mail className="w-5 h-5 mr-2" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 border border-white/30 rounded-2xl bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
                                    placeholder="admin@globalforum.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-3 flex items-center">
                                <Lock className="w-5 h-5 mr-2" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-5 py-4 border border-white/30 rounded-2xl bg-white/5 backdrop-blur-sm text-white placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/30 transition-all duration-300 text-lg shadow-lg hover:shadow-xl pr-12"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5 text-slate-400" /> : <Eye className="w-5 h-5 text-slate-400" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full flex justify-center py-4 px-8 border border-transparent rounded-2xl shadow-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl hover:from-emerald-600 hover:to-teal-700 focus:ring-4 focus:ring-emerald-500/50 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-emerald-500/50 hover:shadow-2xl hover:-translate-y-1 items-center space-x-3"
                        >
                            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                        </button>
                    </form>
                    <div className="text-center text-sm text-slate-400 space-y-4">
                        <p>Demo Credentials:</p>
                        <div className="bg-slate-800/50 p-4 rounded-xl text-left max-w-sm mx-auto font-mono text-xs">
                            <div>Email: {OWNER_INFO.admin.email}</div>
                            <div className="text-emerald-400">Pass: {OWNER_INFO.admin.password}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
