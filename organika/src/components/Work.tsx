"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { gsap, ScrollTrigger } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", title: "Terra Ausente", category: "DOC", year: "2025", description: "Documentário sobre a vida no campo.", color: "#FF6B6B" },
  { id: "02", title: "Nexo", category: "COM", year: "2025", description: "Campanha institucional para marca de tecnologia.", color: "#4ECDC4" },
  { id: "03", title: "Rotina", category: "FILME", year: "2024", description: "Curta-metragem experimental.", color: "#A66CFF" },
  { id: "04", title: "Espectro", category: "VFX", year: "2024", description: "Efeitos visuais para série de TV.", color: "#FFB347" },
  { id: "05", title: "Dimensão", category: "DOC", year: "2024", description: "Documentário sobre arte contemporânea.", color: "#87CEEB" },
];

function createFibonacciBlob(phase: number = 0, scale: number = 1) {
  const points = 12;
  const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  let d = "M";
  
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2 + phase;
    const fibIndex = i % fibSequence.length;
    const radiusBase = 45;
    const radiusVariation = (fibSequence[fibIndex] / 144) * 30;
    const radius = (radiusBase + radiusVariation * Math.sin(phase + i * 0.5)) * scale;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    d += `${x.toFixed(1)},${y.toFixed(1)} `;
  }
  d += "Z";
  return d;
}

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const positions = [
    { x: -280, y: -100 },
    { x: -120, y: 120 },
    { x: 0, y: -60 },
    { x: 160, y: 100 },
    { x: 300, y: -120 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F0EDE6] overflow-hidden"
    >
      <div className="py-12 text-center">
        <span className="font-bebas text-xs tracking-[8px] text-[#2E5E3A]">
          PROJETOS
        </span>
      </div>

      {/* Caotic Floating Organic Bubbles */}
      <div className="relative w-full min-h-[60vh] overflow-hidden">
        {projects.map((project, index) => {
          const pos = positions[index];
          
          return (
            <motion.div
              key={project.id}
              className="absolute cursor-pointer"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedProject(project)}
              animate={{
                y: hoveredIndex === index 
                  ? pos.y - 60 
                  : [
                      pos.y + Math.sin(index * 2) * 15,
                      pos.y + Math.cos(index * 3) * 20,
                      pos.y + Math.sin(index * 1.5) * 10,
                      pos.y + Math.cos(index * 2.5) * 25,
                      pos.y + Math.sin(index * 2) * 15,
                    ],
                x: hoveredIndex === index 
                  ? pos.x 
                  : [
                      pos.x + Math.cos(index * 1.5) * 20,
                      pos.x + Math.sin(index * 2) * 15,
                      pos.x + Math.cos(index * 2) * 25,
                      pos.x + Math.sin(index * 1) * 10,
                      pos.x + Math.cos(index * 2.5) * 20,
                    ],
                rotate: [0, 3, -3, 2, -2, 0],
              }}
              transition={{
                y: {
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                x: {
                  duration: 5 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 8 + index,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-2 -z-10"
                  >
                    <span className="text-white font-bebas text-lg tracking-widest drop-shadow-lg">
                      {project.title}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="relative"
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <svg viewBox="0 0 100 100" className="w-48 h-48 md:w-64 md:h-64">
                  <defs>
                    <radialGradient id={`fibGrad-${project.id}`} cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="white" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="black" stopOpacity={0.15} />
                    </radialGradient>
                    <clipPath id={`clip-${project.id}`}>
                      <motion.path
                        d={createFibonacciBlob(0, 1)}
                        animate={{
                          d: [
                            createFibonacciBlob(0, 1),
                            createFibonacciBlob(0.6, 1.04),
                            createFibonacciBlob(1.2, 0.96),
                            createFibonacciBlob(0, 1),
                          ],
                        }}
                        transition={{ duration: 6 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </clipPath>
                  </defs>
                  
                  <motion.path
                    d={createFibonacciBlob(0, 1)}
                    fill={project.color}
                    style={{
                      filter: `drop-shadow(0 25px 40px ${project.color}50)`,
                    }}
                    animate={{
                      d: [
                        createFibonacciBlob(0, 1),
                        createFibonacciBlob(0.6, 1.04),
                        createFibonacciBlob(1.2, 0.96),
                        createFibonacciBlob(0, 1),
                      ],
                    }}
                    transition={{ duration: 6 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.path
                    d={createFibonacciBlob(0, 1)}
                    fill={`url(#fibGrad-${project.id})`}
                    clipPath={`url(#clip-${project.id})`}
                    animate={{
                      d: [
                        createFibonacciBlob(0, 1),
                        createFibonacciBlob(0.6, 1.04),
                        createFibonacciBlob(1.2, 0.96),
                        createFibonacciBlob(0, 1),
                      ],
                    }}
                    transition={{ duration: 6 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.path
                    d={createFibonacciBlob(0.3, 0.5)}
                    fill="white"
                    opacity={0.15}
                    animate={{
                      d: [
                        createFibonacciBlob(0.3, 0.5),
                        createFibonacciBlob(0.9, 0.53),
                        createFibonacciBlob(1.5, 0.47),
                        createFibonacciBlob(0.3, 0.5),
                      ],
                    }}
                    transition={{ duration: 6 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center shadow-lg">
                    <span className="text-white text-base md:text-lg ml-0.5">▶</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <div className="pb-8 text-center">
        <span className="font-space text-xs text-[#8A8A7A]">
          Clique nas bolhas para reproduzir
        </span>
      </div>

      {/* Modal Player */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" />
            
            <motion.div
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
              style={{ backgroundColor: "rgba(28, 28, 30, 0.98)", border: "1px solid rgba(255, 255, 255, 0.08)" }}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedProject.color }} />
                  <span className="font-bebas text-sm text-white">{selectedProject.id}</span>
                  <span className="font-space text-xs text-[#8A8A7A]">{selectedProject.category} — {selectedProject.year}</span>
                </div>
                <button onClick={() => setSelectedProject(null)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20">
                  ✕
                </button>
              </div>

              <div className="aspect-video flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${selectedProject.color}30, ${selectedProject.color}10)` }}>
                <motion.button
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selectedProject.color, boxShadow: `0 20px 60px ${selectedProject.color}50` }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white text-5xl ml-1">▶</span>
                </motion.button>
              </div>

              <div className="p-7">
                <h2 className="font-playfair text-4xl text-white italic mb-3">{selectedProject.title}</h2>
                <p className="font-space text-base text-[#8A8A7A]">{selectedProject.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}