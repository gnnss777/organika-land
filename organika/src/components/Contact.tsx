"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        [title1Ref.current, title2Ref.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
      )
      .fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <section ref={containerRef} className="relative w-full bg-[#141410] py-24 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-8 md:px-20 text-center">
        <div>
          <h2 ref={title1Ref} className="font-playfair text-[40px] md:text-[70px] text-[#F0EDE6] leading-tight">
            Vamos criar algo
          </h2>
          <h2 ref={title2Ref} className="font-playfair text-[40px] md:text-[70px] text-[#2E5E3A] leading-tight">
            que vive.
          </h2>
        </div>

        <p ref={descRef} className="font-space text-sm text-[#8A8A7A] mt-6 mb-10">
          Projetos que emocionam. Histórias que permanecem.
        </p>

        <div ref={ctaRef} className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button className="px-10 py-4 border border-[#2E5E3A] font-bebas text-base tracking-[3px] text-[#2E5E3A] hover:bg-[#2E5E3A] hover:text-[#141410] transition-all cursor-pointer">
            INICIAR PROJETO
          </button>
          <a className="font-space text-sm text-[#8A8A7A] hover:text-[#2E5E3A] transition-colors">
            contato@organika.studio
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-[#2E5E3A]/20">
        <div className="py-6 text-center">
          <p className="font-bebas text-xs tracking-[6px] text-[#4A4A40]">
            © ORGANIKA 2026 — CURITIBA
          </p>
        </div>
      </div>
    </section>
  );
}