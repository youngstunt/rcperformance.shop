'use client';

import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import Tagline from '@/components/sections/Tagline';
import { SectionDivider } from '@/components/svg';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero - full width, no container */}
      <Hero />

      {/* Tagline section */}
      <Tagline />

      {/* Divider */}
      <div className="container mx-auto px-4">
        <SectionDivider />
      </div>

      {/* Services */}
      <Services />

      {/* Divider */}
      <div className="container mx-auto px-4">
        <SectionDivider />
      </div>

      {/* Contact */}
      <Contact />
    </main>
  );
}
