'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroBackground } from '@/components/svg';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const stats = [
  { value: '500+', label: 'Tunes Completed' },
  { value: '15+', label: 'Years Experience' },
  { value: '100%', label: 'Satisfaction' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* SVG Background */}
      <HeroBackground />

      {/* Additional gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--background) 0%, rgba(15,15,20,0.85) 40%, rgba(15,15,20,0.4) 70%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Accent line */}
          <motion.div
            variants={fadeInUp}
            className="w-20 h-1 bg-primary mb-8"
          />

          {/* Main headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-primary">UNLEASH</span> YOUR
            <br />
            <span className="text-gradient-chrome">ENGINE'S</span> POTENTIAL
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
          >
            Expert ECU tuning, forced induction, and performance modifications
            in Eastern Connecticut. Mobile and remote services available.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group text-base px-6 glow-primary"
            >
              <Link href="#contact">
                Get a Quote
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-6 border-chrome/30 hover:border-primary/50 hover:bg-primary/5"
            >
              <Link href="tel:+18607755770">
                <Phone size={18} className="mr-2" />
                860-775-5770
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div
                  className="text-2xl sm:text-3xl font-bold text-primary"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, var(--background), transparent)',
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-primary rounded-full mt-1.5"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
