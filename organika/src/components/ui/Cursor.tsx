"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("a") || target.closest("button") || target.closest("[data-cursor]")) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };
    
    // Delay mais baixo = cursor mais responsivo
    const animate = () => {
      currentX += (targetX - currentX) * 0.5;
      currentY += (targetY - currentY) * 0.5;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${currentX - 10}px, ${currentY - 10}px)`;
      }
      
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    animate();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed w-5 h-5 rounded-full pointer-events-none z-[9999] transition-all duration-150 ${
        isHovering ? "w-12 h-12 bg-[#2E5E3A]/20 border-[#2E5E3A]" : "border-2 border-[#2E5E3A] bg-transparent"
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        mixBlendMode: "difference" as any,
      }}
    />
  );
}