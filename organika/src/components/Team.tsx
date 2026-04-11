"use client";

import { motion } from "framer-motion";

export default function Team() {
  return (
    <section className="relative w-full bg-[#F0EDE6] py-24 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-8 md:px-20">
        <div className="text-center mb-16">
          <span className="font-bebas text-xs tracking-[8px] text-[#2E5E3A] block mb-4">
            _timeira
          </span>
          <h2 className="font-playfair text-[48px] md:text-[80px] text-[#141410]">
            OS ARTESÃOS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "LUCAS", role: "Direção de Arte" },
            { name: "MÁRCIA", role: "Color Grading" },
            { name: "BRUNO", role: "Edição" },
            { name: "BIANCA", role: "VFX" },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#2E5E3A] to-[#141410]" />
              <p className="font-space text-xs text-[#2E5E3A] tracking-widest mb-1">
                {member.name}
              </p>
              <p className="font-playfair text-sm text-[#141410] italic">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}