"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const projects = [
  { id: "01", title: "Terra Ausente", category: "DOC", year: "2025", description: "Documentário sobre a vida no campo.", color: "#FF6B6B" },
  { id: "02", title: "Nexo", category: "COM", year: "2025", description: "Campanha institucional para marca de tecnologia.", color: "#4ECDC4" },
  { id: "03", title: "Rotina", category: "FILME", year: "2024", description: "Curta-metragem experimental.", color: "#A66CFF" },
  { id: "04", title: "Espectro", category: "VFX", year: "2024", description: "Efeitos visuais para série de TV.", color: "#FFB347" },
  { id: "05", title: "Dimensão", category: "DOC", year: "2024", description: "Documentário sobre arte contemporânea.", color: "#87CEEB" },
];

// Fibonacci-based organic blob - forma mais organica usando sequencia fibonacci
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
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

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

      {/* Floating Organic Bubbles - Ambiente sem gravidade */}
      <div className="flex justify-center items-center pb-32 px-4 min-h-[60vh]">
        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          {projects.map((project, index) => {
            const baseY = Math.sin(index * 0.8) * 15;
            const floatOffset = Math.cos(index * 1.2) * 20;
            
            return (
              <motion.div
                key={project.id}
                className="relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: hoveredIndex === index ? -80 : (hoveredIndex !== null ? baseY + floatOffset : baseY),
                  x: hoveredIndex === index ? 0 : (index % 2 === 0 ? floatOffset : -floatOffset),
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                style={{ zIndex: hoveredIndex === index ? 10 : 1 }}
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#141410]/90 backdrop-blur-sm"
                    >
                      <span className="text-white font-space text-xs whitespace-nowrap">
                        {project.title}
                      </span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#141410] rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Organic Bubble - Fibonacci pattern */}
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -8, 0, 8, 0],
                    rotate: [0, 3, 0, -3, 0],
                  }}
                  transition={{
                    duration: 4 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32">
                    <defs>
                      <radialGradient id={`fibGrad-${project.id}`} cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor={project.color} />
                        <stop offset="100%" stopColor={project.color} stopOpacity={0.6} />
                      </radialGradient>
                    </defs>
                    
                    {/* Multiple layers for organic feel */}
                    <motion.path
                      d={createFibonacciBlob(0, 1)}
                      fill={project.color}
                      opacity={0.15}
                      style={{ filter: `blur(8px)` }}
                      animate={{
                        d: [
                          createFibonacciBlob(0, 1),
                          createFibonacciBlob(0.3, 1.05),
                          createFibonacciBlob(0.6, 0.98),
                          createFibonacciBlob(0, 1),
                        ],
                      }}
                      transition={{
                        duration: 6 + index * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Main blob */}
                    <motion.path
                      d={createFibonacciBlob(0, 1)}
                      fill={`url(#fibGrad-${project.id})`}
                      style={{
                        filter: hoveredIndex === index 
                          ? `drop-shadow(0 25px 35px ${project.color}50)` 
                          : `drop-shadow(0 10px 20px rgba(0,0,0,0.1))`,
                      }}
                      animate={{
                        d: [
                          createFibonacciBlob(0, 1),
                          createFibonacciBlob(0.5, 1.03),
                          createFibonacciBlob(1, 0.97),
                          createFibonacciBlob(0, 1),
                        ],
                      }}
                      transition={{
                        duration: 5 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Inner highlight */}
                    <motion.path
                      d={createFibonacciBlob(0.2, 0.6)}
                      fill="white"
                      opacity={0.15}
                      animate={{
                        d: [
                          createFibonacciBlob(0.2, 0.6),
                          createFibonacciBlob(0.7, 0.63),
                          createFibonacciBlob(1.2, 0.58),
                          createFibonacciBlob(0.2, 0.6),
                        ],
                      }}
                      transition={{
                        duration: 5 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </svg>

                  {/* Play icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                    >
                      <span className="text-white text-xs md:text-sm ml-0.5">▶</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* ID dot */}
                <motion.div 
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: project.color }}
                  animate={{
                    scale: hoveredIndex === index ? 2 : 1,
                    opacity: hoveredIndex === index ? 1 : 0.5,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="pb-8 text-center">
        <span className="font-space text-xs text-[#8A8A7A]">
          Passe o mouse sobre as bolhas • Clique para reproduzir
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
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" />
            
            <motion.div
              className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "rgba(28, 28, 30, 0.98)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedProject.color }} />
                  <span className="font-bebas text-sm text-white">{selectedProject.id}</span>
                  <span className="font-space text-xs text-[#8A8A7A]">
                    {selectedProject.category} — {selectedProject.year}
                  </span>
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