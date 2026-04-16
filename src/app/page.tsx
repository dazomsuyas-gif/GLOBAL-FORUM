"use client";
import React from 'react';
import ParticleBackground from '../components/effects/ParticleBackground';
import HeroSection from '../components/sections/HeroSection';
import Globe3D from '../components/effects/Globe3D';
import PillarsSection from '../components/sections/PillarsSection';
import StatsSection from '../components/sections/StatsSection';

export default function Home() {
    return (
        <>
            <ParticleBackground />
            <HeroSection />
            <Globe3D />
            <PillarsSection />
            <StatsSection />
        </>
    );
}

