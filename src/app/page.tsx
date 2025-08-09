"use client";

// Chadson v69.0.0: Guerrilla Automotive Business Profile
// Main page with a new vertical, scroll-based layout.

import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { Separator } from "@/components/ui/separator";

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    className="py-12"
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <SectionWrapper>
        <Hero />
      </SectionWrapper>

      <Separator className="my-8" />

      <SectionWrapper>
        <Services />
      </SectionWrapper>

      <Separator className="my-8" />

      <SectionWrapper>
        <Contact />
      </SectionWrapper>
    </main>
  );
}
