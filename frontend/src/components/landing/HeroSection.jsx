'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Parallax from "parallax-js";
import Image from "next/image";
import { AnimatedModalDemo } from '@/components/animated-modal';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [trail, setTrail] = useState([]);
  let moveTimeout;
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      setTrail((prevTrail) => [
        ...prevTrail,
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(moveTimeout);
    };
  }, []);

  useEffect(() => {
    const scene = document.getElementById("scene");
    if (scene && scene.children?.length) {
      new Parallax(scene);
    }
  }, []);

  return (
    <div ref={containerRef} className="h-[calc(100vh-4rem)] bg-white text-black overflow-hidden relative">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          mask: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, black 10%, transparent 90%)`,
          WebkitMask: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, black 30%, transparent 70%)`
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
      {/* Mouse Trail */}
      {trail.map((pos) => (
        <div
          key={pos.id}
          className="trail"
          style={{
            left: pos.x,
            top: pos.y,
          }}
        />
      ))}
      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-8 py-16">
        <div className="relative z-10">
          <h1 className="text-center">
            <span className="block text-7xl md:text-8xl font-black tracking-tighter text-white style-text
              -webkit-text-stroke-[3px] -webkit-text-stroke-black drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              ORION
            </span>
            <span className="block text-7xl md:text-8xl font-black tracking-tighter text-white style-text mt-2
              -webkit-text-stroke-[3px] -webkit-text-stroke-black drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              ACADEMY
            </span>
          </h1>
          <p className="text-center mt-8 text-black text-lg font-semibold mx-auto">
            Where stars align for success.
          </p>
          <div className="text-center mt-5 text-gray-500">
            <AnimatedModalDemo />
          </div>
        </div>
      </main>
      <div className="juice absolute top-[50%] left-[75%] z-10">
        <Image
          src="/file.png"
          alt="Juice Floating"
          height={800}
          width={600}
          className="w-auto h-full"
        />
      </div>
      <div className="leaves absolute inset-0 z-0">
        <ul id="scene" className="relative">
          <li className="layer" data-depth="0.1">
            <Image
              src="/m2.png"
              alt="Layer 1"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </li>
          <li className="layer" data-depth="0.3">
            <Image
              src="/m5.png"
              alt="Layer 2"
              width={120}
              height={120}
              className="w-[120px] h-[120px]"
            />
          </li>
          <li className="layer" data-depth="-0.3">
            <Image
              src="/m1.png"
              alt="Layer 3"
              width={100}
              height={100}
              className="w-full h-[100px]"
            />
          </li>
          <li className="layer" data-depth="-0.5">
            <Image
              src="/m4.png"
              alt="Layer 4"
              width={220}
              height={165}
              className="w-auto h-[400px]"
            />
          </li>
          <li className="layer" data-depth="-0.7">
            <Image
              src="/m3.png"
              alt="Layer 5"
              width={140}
              height={140}
              className="w-[140px] h-[140px]"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
