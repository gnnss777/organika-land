"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useScroll, useTransform, motion } from "framer-motion";
import { gsap, ScrollTrigger } from "gsap";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function OrganicShape({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#2E5E3A" transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      tl.from(labelRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      })
      .from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
      }, "-=0.4")
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6");

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        opacity: 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#F0EDE6]">
      <motion.div 
        className="absolute inset-0"
        style={{ opacity }}
      >
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <OrganicShape position={[4, 2, -5]} />
          <OrganicShape position={[-3, -1, -4]} />
          <OrganicShape position={[0, -3, -6]} />
        </Canvas>
      </motion.div>

      <motion.div 
        className="relative z-10 h-full flex flex-col items-center justify-center"
        style={{ y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center px-6"
        >
          <span ref={labelRef} className="font-bebas text-xs tracking-[10px] text-[#2E5E3A] mb-4 block">
            PÓS-PRODUÇÃO CINEMATOGRÁFICA
          </span>
          
          <h1 ref={titleRef} className="font-playfair text-[64px] md:text-[100px] lg:text-[140px] text-[#141410] leading-[0.95] mb-4">
            ORGANIKA
          </h1>
          
          <p ref={subtitleRef} className="font-space text-base text-[#2E5E3A]">
            Craft orgânico. Cinema de verdade.
          </p>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8 md:px-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <span className="font-bebas text-3xl text-[#E8E4DC]">2026</span>
          <span className="font-space text-xs text-[#8A8A7A] tracking-widest">SCROLL</span>
        </motion.div>
      </motion.div>
    </section>
  );
}