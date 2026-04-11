"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative w-full bg-[#141410] py-24 overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-8 md:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-[40px] md:text-[70px] text-[#F0EDE6] leading-tight">
            Vamos criar algo
          </h2>
          <h2 className="font-playfair text-[40px] md:text-[70px] text-[#2E5E3A] leading-tight">
            que vive.
          </h2>
        </motion.div>

        <motion.p 
          className="font-space text-sm text-[#8A8A7A] mt-6 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Projetos que emocionam. Histórias que permanecem.
        </motion.p>

        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="px-10 py-4 border border-[#2E5E3A] font-bebas text-base tracking-[3px] text-[#2E5E3A] hover:bg-[#2E5E3A] hover:text-[#141410] transition-all">
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