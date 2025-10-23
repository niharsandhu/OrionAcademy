'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Parallax from 'parallax-js';
import Image from 'next/image';
import { AnimatedModalDemo } from '@/components/animated-modal';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [trail, setTrail] = useState([]);
  const moveTimeout = useRef(null);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  // Handle mouse movement and trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      setTrail((prevTrail) => [
        ...prevTrail.slice(-50), // keep last 50 positions to prevent memory bloat
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 100);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) container.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
    };
  }, []);

  // Initialize Parallax
  useEffect(() => {
    if (sceneRef.current && sceneRef.current.children.length) {
      const parallaxInstance = new Parallax(sceneRef.current);
      return () => parallaxInstance.destroy(); // cleanup
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-4rem)] bg-white text-black overflow-hidden relative"
    >
      {/* Spotlight effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          mask: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 90%)`,
          WebkitMask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 70%)`,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isMoving ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
          style={{
            backgroundImage: 'url("https://4kwallpapers.com/images/walls/thumbs_3t/10307.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Mouse trail */}
      {trail.map((pos) => (
        <div
          key={pos.id}
          className="trail absolute w-2 h-2 bg-white rounded-full pointer-events-none"
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-8 py-16 z-10">
        <div className="text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
            ORION <br /> ACADEMY
          </h1>
          <p className="mt-8 text-black text-lg font-semibold mx-auto">
            Where stars align for success.
          </p>
          <div className="mt-5 text-gray-500">
            <AnimatedModalDemo />
          </div>
        </div>
      </main>

      {/* Floating Image */}
      <div className="juice absolute top-[50%] left-[75%] z-10">
        <Image
          src="/file.png"
          alt="Juice Floating"
          height={800}
          width={600}
          className="w-auto h-full"
        />
      </div>

      {/* Parallax leaves */}
      <div className="leaves absolute inset-0 z-0">
        <ul ref={sceneRef} id="scene" className="relative">
          {[
            { src: '/m2.png', depth: 0.1, className: 'w-full h-full' },
            { src: '/m5.png', depth: 0.3, className: 'w-[120px] h-[120px]' },
            { src: '/m1.png', depth: -0.3, className: 'w-full h-[100px]' },
            { src: '/m4.png', depth: -0.5, className: 'w-auto h-[400px]' },
            { src: '/m3.png', depth: -0.7, className: 'w-[140px] h-[140px]' },
          ].map((layer, i) => (
            <li key={i} className="layer" data-depth={layer.depth}>
              <Image src={layer.src} alt={`Layer ${i + 1}`} width={100} height={100} className={layer.className} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
