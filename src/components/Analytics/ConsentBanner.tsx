'use client';
import { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [preferences, setPreferences] = useState({
        analytics: false,
        marketing: false,
        functional: true,
    });

    useEffect(() => {
        const saved = localStorage.getItem('cookieConsent');
        if (!saved) {
            setIsVisible(true);
        }
    }, []);

    const savePreferences = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        setIsVisible(false);
        // Trigger GA consent
        if (preferences.analytics) {
            window.gtag('consent', 'default', {
                'analytics_storage': 'granted',
            });
        }
    };

    const acceptAll = () => {
        setPreferences({ analytics: true, marketing: true, functional: true });
        savePreferences();
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 border-t border-slate-700 z-50 shadow-2xl p-6"
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">We value your privacy</h3>
                        <p className="text-slate-300 text-sm">This site uses cookies for analytics, ads and better experience.</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <div className="flex space-x-6 text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={preferences.analytics}
                                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                className="rounded border-slate-600 text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-slate-300">Analytics</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={preferences.marketing}
                                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                className="rounded border-slate-600 text-blue-500 focus:ring-blue-500"
                            />
                            <span className="text-slate-300">Marketing</span>
                        </label>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={acceptAll}
                            className="px-6 py-2.5 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Accept All
                        </button>
                        <button
                            onClick={savePreferences}
                            className="px-6 py-2.5 bg-slate-700/50 hover:bg-slate-600 border border-slate-600 text-slate-200 rounded-xl font-semibold hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Save Preferences
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

