"use client";

import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Work from "@/components/Work";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <Manifesto />
      <Work />
      <Team />
      <Contact />
    </main>
  );
}