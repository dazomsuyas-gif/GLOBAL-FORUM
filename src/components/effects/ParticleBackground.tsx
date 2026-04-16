"use client";
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { motion } from 'framer-motion';

const particlesInit = async (main: Engine): Promise<void> => {
    await loadSlim(main);
};

const options = {
    fullScreen: {
        enable: false,
        zIndex: -1,
    },
    background: {
        color: {
            value: 'transparent',
        },
    },
    fpsLimit: 120,
    detectRetina: true,
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: 'repulse',
            },
            resize: true,
        },
        modes: {
            grab: {
                distance: 200,
                links: {
                    opacity: 0.5,
                },
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
            push: {
                quantity: 4,
            },
            remove: {
                quantity: 2,
            },
        },
    },
    particles: {
        color: {
            value: '#C9A84C',
        },
        links: {
            color: '#FFD700',
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce',
            },
            random: false,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: ['circle', 'triangle', 'square'],
        },
        size: {
            value: { min: 1, max: 5 },
        },
    },
    preset: 'stars',
    retina_detect: true,
};

export default function ParticleBackground() {
    const particlesLoaded = useCallback(async (containerOrData: Engine) => {
        await loadSlim(containerOrData);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        >
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={options}
                className="w-full h-full"
            />
        </motion.div>
    );
}

