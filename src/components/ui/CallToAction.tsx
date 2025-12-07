// Chadson v69.69: Call to Action Component
// This component provides a prominent call to action with a phone number.

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-primary text-primary-foreground py-12 mt-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready for Convenient Auto Service?
        </h2>
        <p className="text-lg mb-6">
          Call or Text Us Today for a Free Estimate!
        </p>
        <Link href="tel:+19594561442">
          <Button
            variant="secondary"
            className="text-2xl font-bold py-6 px-8"
          >
            (959) 456-1442
          </Button>
        </Link>
      </div>
    </section>
  );
}