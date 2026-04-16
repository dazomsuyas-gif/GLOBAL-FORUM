import { motion } from 'framer-motion';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-8"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center backdrop-blur-sm"
                >
                    <span className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">GF</span>
                </motion.div>
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent"
                    >
                        Loading Global Forum...
                    </motion.div>
                    <div className="flex justify-center space-x-2">
                        <motion.div
                            className="w-3 h-3 bg-white/60 rounded-full"
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        />
                        <motion.div
                            className="w-3 h-3 bg-white/60 rounded-full"
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                            className="w-3 h-3 bg-white/60 rounded-full"
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
