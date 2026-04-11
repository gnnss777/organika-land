"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 25;
    let current = 0;

    const timer = setInterval(() => {
      current += interval;
      const percent = Math.min((current / duration) * 100, 100);
      setProgress(percent);

      if (percent >= 100) {
        clearInterval(timer);
        setTimeout(() => setIsReady(true), 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isReady && onComplete) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [isReady, onComplete]);

  const letter = "ORGANIKA";

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-[#0a0a0a] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isReady ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 text-center">
            <div className="mb-8 overflow-hidden">
              {letter.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block font-playfair text-5xl md:text-7xl text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ 
                    y: progress > (i + 1) * (100 / letter.length) ? 0 : 50,
                    opacity: progress > (i + 1) * (100 / letter.length) ? 1 : 0
                  }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <div className="max-w-[200px] mx-auto mb-4">
              <div className="h-px bg-[#2E5E3A]/30">
                <motion.div
                  className="h-full bg-[#4AFF7A]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            <motion.p
              className="font-space text-xs text-[#4AFF7A]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}