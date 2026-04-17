"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      linesRef.current.forEach((line, index) => {
        gsap.fromTo(
          line,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#141410] py-32 overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto px-8 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-bebas text-xs tracking-[8px] text-[#2E5E3A]">
            MANIFESTO
          </span>
        </motion.div>

        <div className="space-y-6">
          {[
            { text: "Organika nasceu da quietude", size: "text-3xl md:text-5xl" },
            { text: "profunda", size: "text-4xl md:text-6xl", highlight: true },
            { text: "de quem acredita", size: "text-2xl md:text-3xl text-[#8A8A7A]" },
            { text: "que o cinema é um ato de alma.", size: "text-3xl md:text-5xl" },
          ].map((line, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`font-playfair text-[#F0EDE6] ${line.size} ${
                line.highlight ? "text-[#2E5E3A]" : ""
              }`}
            >
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}