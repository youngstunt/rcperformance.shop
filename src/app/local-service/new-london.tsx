// Chadson v69.69: New London, CT - Mobile Mechanic Service Page

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Mobile Mechanic in New London, CT | RC Performance',
  description:
    'Top-rated mobile mechanic in New London, CT. RC Performance provides on-site auto repair, diagnostics, and maintenance services. Fast, reliable, and convenient.',
  townName: 'New London, CT',
};

const services = [
  'On-Site Vehicle Diagnostics',
  'Brake and Rotor Service',
  'Battery Replacement and Testing',
  'Alternator and Starter Repair',
  'Fluid Changes and Tune-Ups',
  'Emergency Roadside Assistance',
];

export default function NewLondonServicePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">
          New London's Premier Mobile Mechanic Service
        </h2>
        <p className="text-lg text-muted-foreground">
          Don't let car trouble disrupt your day. RC Performance offers
          professional mobile mechanic services throughout New London,
          Connecticut. We bring the auto shop to your doorstep, providing
          everything from routine maintenance to complex repairs with unparalleled
          convenience.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Our Mobile Services in New London</CardTitle>
          <CardDescription>
            Expert auto care, wherever you are in New London.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {services.map((service) => (
              <li key={service} className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4" />
                <span className="text-lg">{service}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <section>
        <h3 className="text-2xl font-bold mb-4">
          Proudly Serving the Whaling City
        </h3>
        <p className="text-muted-foreground">
          From the historic waterfront to the surrounding neighborhoods, RC
          Performance is dedicated to keeping New London's vehicles running
          smoothly. We are your local experts for reliable and efficient mobile
          auto repair.
        </p>
      </section>
    </div>
  );
}