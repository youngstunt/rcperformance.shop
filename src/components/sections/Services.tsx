'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  ECUChipIcon,
  TurboIcon,
  ExhaustIcon,
  SuspensionIcon,
  DynoIcon,
  DataLogIcon,
} from '@/components/svg';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const services = [
  {
    title: 'ECU Remapping',
    icon: ECUChipIcon,
    description:
      'Unlock the hidden power of your engine with expert ECU remapping. We fine-tune fuel-to-air ratios, ignition timing, and boost pressure for significant gains.',
    features: ['Custom calibration', 'Data logging', 'Remote tuning available'],
  },
  {
    title: 'Forced Induction',
    icon: TurboIcon,
    description:
      'Ready for serious power? We specialize in turbocharger and supercharger installations, from stock upgrades to full custom setups.',
    features: ['Turbo upgrades', 'Supercharger kits', 'Boost control systems'],
  },
  {
    title: 'Performance Exhaust',
    icon: ExhaustIcon,
    description:
      'Improve engine breathing with high-flow exhaust systems. Reduce back pressure for more power and an aggressive sound.',
    features: ['Cat-back systems', 'Headers & downpipes', 'Custom fabrication'],
  },
  {
    title: 'Suspension Tuning',
    icon: SuspensionIcon,
    description:
      'Enhance handling and stability with precision suspension work. Achieve the perfect balance of comfort and performance.',
    features: ['Coilover installs', 'Sway bars', 'Alignment services'],
  },
  {
    title: 'Dyno Tuning',
    icon: DynoIcon,
    description:
      'Real-world power verification on our chassis dyno. See exactly what your modifications deliver with professional dyno sessions.',
    features: ['Before/after pulls', 'Air-fuel analysis', 'Printed results'],
  },
  {
    title: 'Data Logging',
    icon: DataLogIcon,
    description:
      'Advanced diagnostic and data acquisition services. Monitor every aspect of your engine\'s performance in real-time.',
    features: ['Live monitoring', 'Log analysis', 'Fault diagnosis'],
  },
];

export default function Services() {
  return (
    <section className="py-20" id="services">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            OUR SERVICES
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Comprehensive performance solutions tailored to your vehicle and goals
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <Card className="h-full group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-4 text-chrome group-hover:text-primary transition-colors duration-300">
                    <service.icon size={56} />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold group-hover:text-primary transition-colors"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {service.title}
                  </h3>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm flex items-center gap-2 text-foreground/80"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
