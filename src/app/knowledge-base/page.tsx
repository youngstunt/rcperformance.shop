'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TuningCTA } from '@/components/knowledge-base';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const categories = [
  {
    name: 'American Muscle',
    description: 'Ford, GM, and Mopar performance tuning',
    articles: [
      {
        title: 'Ford Mustang GT Tuning',
        slug: 'ford-mustang-gt-tuning',
        description: 'HP Tuners & SCT for 5.0L Coyote S197/S550',
      },
      {
        title: 'F-150 EcoBoost Tuning',
        slug: 'ford-f150-ecoboost-tuning',
        description: '2.7L & 3.5L twin-turbo truck performance',
      },
      {
        title: 'Focus ST & RS Tuning',
        slug: 'ford-focus-st-rs-tuning',
        description: 'COBB & Stratified for EcoBoost hot hatches',
      },
      {
        title: 'Chevrolet Camaro Tuning',
        slug: 'chevy-camaro-tuning',
        description: 'HP Tuners for LS3, LT1, LT4, and ZL1',
      },
      {
        title: 'Chevrolet Corvette Tuning',
        slug: 'chevy-corvette-tuning',
        description: 'C6, C7, C8 tuning - LS, LT engine families',
      },
      {
        title: 'Silverado & Sierra Tuning',
        slug: 'chevy-silverado-gmc-sierra-tuning',
        description: '5.3L, 6.2L V8 and Duramax diesel',
      },
      {
        title: 'Challenger & Charger Tuning',
        slug: 'dodge-challenger-charger-tuning',
        description: 'HEMI 5.7, 6.4 392, Hellcat & Demon',
      },
      {
        title: 'RAM 1500 Tuning',
        slug: 'ram-1500-tuning',
        description: 'HEMI, EcoDiesel, and TRX supercharged',
      },
    ],
  },
  {
    name: 'JDM Performance',
    description: 'Japanese domestic market tuning guides',
    articles: [
      {
        title: 'Honda Civic Type R & Si Tuning',
        slug: 'honda-civic-type-r-si-tuning',
        description: 'Hondata & KTuner for K20C1 & L15B7',
      },
      {
        title: 'Toyota GR Supra & GR86 Tuning',
        slug: 'toyota-supra-gr86-tuning',
        description: 'MHD, bootmod3 for B58 & EcuTek for FA24',
      },
      {
        title: 'Nissan 370Z, 400Z & GT-R Tuning',
        slug: 'nissan-370z-gtr-tuning',
        description: 'UpRev, EcuTek, COBB for VQ & VR engines',
      },
      {
        title: 'Subaru WRX & STI Tuning',
        slug: 'subaru-wrx-sti-tuning',
        description: 'COBB & EcuTek for EJ257, FA20, FA24',
      },
      {
        title: 'Mitsubishi Evo Tuning',
        slug: 'mitsubishi-evo-tuning',
        description: 'EcuTek & ECUFlash for 4G63 & 4B11',
      },
    ],
  },
  {
    name: 'European Performance',
    description: 'German engineering, enhanced',
    articles: [
      {
        title: 'BMW Tuning Guide',
        slug: 'bmw-tuning',
        description: 'MHD, bootmod3 for N54, N55, S55, B58',
      },
      {
        title: 'VW & Audi Tuning Guide',
        slug: 'vw-audi-tuning',
        description: 'APR, Unitronic, IE for EA888 & more',
      },
    ],
  },
  {
    name: 'General Resources',
    description: 'Educational content and local guides',
    articles: [
      {
        title: 'Best Driving Roads in Eastern CT',
        slug: 'best-driving-roads-eastern-ct',
        description: 'Scenic routes in our own backyard',
      },
    ],
  },
];

export default function KnowledgeBasePage() {
  return (
    <div className="py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-1 bg-primary mx-auto mb-6" />
        <h1
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          TUNING KNOWLEDGE BASE
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          Comprehensive guides for ECU tuning across all major platforms. Learn about the best
          tuning solutions for your vehicle, from HP Tuners to MHD to Hondata.
        </p>
      </motion.div>

      {/* Categories */}
      {categories.map((category, categoryIndex) => (
        <motion.section
          key={category.name}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <h2
              className="text-xl md:text-2xl font-bold text-primary"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {category.name}
            </h2>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {category.articles.map((article, articleIndex) => (
              <motion.div key={article.slug} variants={fadeInUp}>
                <Link href={`/knowledge-base/${article.slug}`}>
                  <Card className="h-full hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 group">
                    <CardHeader>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* CTA */}
      <TuningCTA />
    </div>
  );
}
