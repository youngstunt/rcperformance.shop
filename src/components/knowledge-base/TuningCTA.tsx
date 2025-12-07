'use client';

import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TuningCTAProps {
  vehicleName?: string;
  variant?: 'default' | 'compact';
}

export default function TuningCTA({ vehicleName, variant = 'default' }: TuningCTAProps) {
  const headline = vehicleName
    ? `Ready to Tune Your ${vehicleName}?`
    : 'Ready to Unlock Your Vehicle\'s Potential?';

  if (variant === 'compact') {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 my-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground">{headline}</p>
            <p className="text-sm text-muted-foreground">Professional tuning services available.</p>
          </div>
          <Link href="tel:+19594561442">
            <Button size="sm" className="whitespace-nowrap">
              <Phone size={14} className="mr-2" />
              (959) 456-1442
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-xl p-6 md:p-8 my-8">
      <div className="max-w-2xl">
        <h3
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {headline}
        </h3>
        <p className="text-muted-foreground mb-6">
          RC Performance offers professional ECU tuning, dyno services, and performance modifications
          throughout Eastern Connecticut. Whether you need a custom tune, off-the-shelf calibration,
          or full bolt-on support, we've got you covered.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/#contact">
            <Button size="lg" className="group">
              Get a Free Quote
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="tel:+19594561442">
            <Button variant="outline" size="lg">
              <Phone size={18} className="mr-2" />
              (959) 456-1442
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
