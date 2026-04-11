"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  { id: "01", category: "DOC", title: "Terra Ausente", year: "2025", color: "#2E5E3A" },
  { id: "02", category: "COM", title: "Nexo", year: "2025", color: "#4AFF7A" },
  { id: "03", category: "FILME", title: "Rotina", year: "2024", color: "#2E5E3A" },
  { id: "04", category: "VFX", title: "Espectro", year: "2024", color: "#4AFF7A" },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-[#2E5E3A]/20">
        <motion.div 
          className="h-full bg-[#4AFF7A]"
          style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
      </div>

      <div className="py-20 px-8 md:px-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-bebas text-xs tracking-[12px] text-[#4AFF7A]">
            PROJETOS
          </span>
        </motion.div>

        <motion.div 
          className="flex items-center gap-6 md:gap-10"
          style={{ x }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`relative flex-shrink-0 group cursor-pointer ${
                index % 2 === 0 ? "w-[280px] h-[380px]" : "w-[360px] h-[440px]"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div 
                className="absolute inset-0 transition-all duration-500 group-hover:scale-105"
                style={{ 
                  backgroundColor: project.color,
                  opacity: 0.15 + (index * 0.05)
                }} 
              />
              
              <div className="absolute inset-0 border border-[#2E5E3A]/30 group-hover:border-[#4AFF7A]/50 transition-colors duration-300" />
              
              <div className="absolute top-6 left-6">
                <span className="font-bebas text-xs text-[#4AFF7A] tracking-widest">
                  {project.id}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-space text-xs text-[#8A8A7A] tracking-widest">
                      {project.category}
                    </span>
                    <h3 className="font-playfair text-2xl text-white mt-2 group-hover:text-[#4AFF7A] transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-bebas text-xl text-[#2E5E3A]">
                    {project.year}
                  </span>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0a0a0a]/80"
              >
                <span className="font-bebas text-lg text-[#4AFF7A] tracking-[4px]">
                  VER PROJETO
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}