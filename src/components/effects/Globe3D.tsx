"use client";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars, Ring } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef } from 'react';

function Globe() {
    const globeRef = useRef<any>();

    return (
        <mesh ref={globeRef}>
            {/* Earth */}
            <Sphere args={[1, 64, 64]}>
                <meshStandardMaterial
                    map="https://www.solarsystemscope.com/textures/2k_earth_daymap.jpg"
                    emissive="#111"
                    emissiveIntensity={0.1}
                />
            </Sphere>

            {/* Clouds */}
            <Sphere args={[1.01, 64, 64]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    map="https://www.solarsystemscope.com/textures/2k_earth_clouds.jpg"
                    transparent
                    opacity={0.4}
                />
            </Sphere>

            {/* Tanzania Highlight */}
            <mesh position={[0.3, -0.15, 0.8]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.8} />
            </mesh>

            {/* Atmosphere Glow */}
            <Sphere args={[1.03, 64, 64]}>
                <meshBasicMaterial color="#4facfe" transparent opacity={0.1} />
            </Sphere>
        </mesh>
    );
}

export default function Globe3D() {
    return (
        <motion.div
            className="w-full h-[80vh] md:h-screen relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
        >
            <Canvas
                camera={{ position: [2.5, 0, 3], fov: 50 }}
                gl={{ alpha: false, antialias: true }}
                className="w-full h-full"
            >
                <color attach="background" args={['#0a0a0a']} />

                {/* Lights */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {/* Stars */}
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={7}
                    saturation={0}
                    fade
                    speed={1}
                />

                {/* Globe */}
                <Globe />

                {/* Orbit Controls */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
            </Canvas>

            {/* Tanzania Label */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
            >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                    <div className="w-3 h-3 bg-gold-bright rounded-full animate-ping"></div>
                    <span className="text-gold font-bold text-lg">Tanzania HQ</span>
                    <span className="text-xs text-white/70 ml-2">-6.37° 34.88°</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

