'use client';

import { motion } from 'framer-motion';
import { Truck, Wrench, Gauge } from 'lucide-react';
import { GradientMesh } from '@/components/svg';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const features = [
  {
    icon: Truck,
    title: 'Mobile Service',
    description: 'We come to you',
  },
  {
    icon: Wrench,
    title: 'Expert Techs',
    description: 'Certified professionals',
  },
  {
    icon: Gauge,
    title: 'Real Results',
    description: 'Dyno-verified gains',
  },
];

export default function Tagline() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <GradientMesh className="opacity-50" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                           linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          {/* Main headline */}
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-primary">PRECISION</span> TUNING
            <br />
            <span className="text-gradient-chrome">MAXIMUM</span> PERFORMANCE
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Eastern Connecticut's premier ECU tuning and performance shop.
            Mobile mechanic services available — we come to you.
          </motion.p>

          {/* Feature pills */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 px-5 py-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full"
              >
                <feature.icon size={20} className="text-primary" />
                <div className="text-left">
                  <div className="text-sm font-semibold">{feature.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div
        className="absolute left-0 top-1/2 w-32 h-px -translate-y-1/2"
        style={{
          background:
            'linear-gradient(to right, transparent, var(--chrome-dark))',
        }}
      />
      <div
        className="absolute right-0 top-1/2 w-32 h-px -translate-y-1/2"
        style={{
          background:
            'linear-gradient(to left, transparent, var(--chrome-dark))',
        }}
      />
    </section>
  );
}
