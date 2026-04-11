"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  { id: "01", title: "EDIÇÃO", subtitle: "O corte que dói." },
  { id: "02", title: "VFX", subtitle: "Mundos que parecem ter existido." },
  { id: "03", title: "COLOR", subtitle: "Revelamos a alma." },
  { id: "04", title: "MIX", subtitle: "O som que resta." },
];

export default function Services() {
  return (
    <section className="relative w-full bg-[#0a0a0a] py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[#4AFF7A] blur-[200px]" style={{ bottom: '-20%', left: '-10%' }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-bebas text-xs tracking-[12px] text-[#4AFF7A]">
            O QUE FAZEMOS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateY((x - centerX) / 30);
    setRotateX((centerY - y) / 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative p-8 border border-[#2E5E3A]/30 hover:border-[#4AFF7A]/50 transition-all duration-300 group"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        <div className="absolute top-4 right-4 font-bebas text-5xl text-[#2E5E3A] opacity-30 group-hover:opacity-50 transition-opacity">
          {service.id}
        </div>

        <div className="relative z-10">
          <h3 className="font-playfair text-3xl text-white group-hover:text-[#4AFF7A] transition-colors mb-3">
            {service.title}
          </h3>
          <p className="font-space text-sm text-[#8A8A7A]">
            {service.subtitle}
          </p>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-[#4AFF7A]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
}