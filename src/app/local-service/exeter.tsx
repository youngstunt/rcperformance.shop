// Chadson v69.69: Exeter, CT - Mobile Mechanic Service Page

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import CallToAction from '@/components/ui/CallToAction';

export const metadata = {
  title: 'Mobile Mechanic in Exeter, CT | RC Performance',
  description:
    'Your local mobile mechanic in Exeter, CT. RC Performance provides reliable, on-site auto repair and maintenance services for all makes and models.',
  townName: 'Exeter, CT',
};

const services = [
  'Mobile Oil Change',
  'Brake and Suspension Repair',
  'Engine Diagnostics and Repair',
  'Performance Tuning',
  'Scheduled Vehicle Maintenance',
  'Emergency Roadside Repair',
];

export default function ExeterServicePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Professional Mobile Mechanic in Exeter, CT
        </h2>
        <p className="text-lg text-muted-foreground">
          RC Performance brings professional auto repair and maintenance
          services to your location in Exeter, Connecticut. Skip the hassle of
          a traditional garage and let our expert mechanics come to you,
          providing top-quality service with ultimate convenience.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Our On-Site Services in Exeter</CardTitle>
          <CardDescription>
            Complete auto care, delivered to your doorstep.
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
          Committed to Serving the Exeter Community
        </h3>
        <p className="text-muted-foreground">
          As a locally-focused business, we are dedicated to providing the
          residents of Exeter with honest, reliable, and convenient mobile
          mechanic services. Your satisfaction is our top priority.
        </p>
      </section>
      <CallToAction />
    </div>
  );
}