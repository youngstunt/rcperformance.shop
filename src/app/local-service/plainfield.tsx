// Plainfield, CT - Mobile Mechanic Service Page

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
  title: 'Mobile Mechanic in Plainfield, CT | RC Performance',
  description:
    'Expert mobile mechanic services in Plainfield, CT. RC Performance comes to you for convenient, reliable auto repair, maintenance, and performance tuning.',
  townName: 'Plainfield, CT',
};

const services = [
  'Check Engine Light Diagnostics',
  'Brake Repair and Replacement',
  'Suspension and Steering',
  'Engine Performance and Tuning',
  'Scheduled Maintenance',
  'Pre-Purchase Inspections',
];

export default function PlainfieldServicePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Your Trusted Mobile Mechanic in Plainfield, CT
        </h2>
        <p className="text-lg text-muted-foreground">
          Save time and skip the auto shop. RC Performance brings expert
          automotive services directly to you in Plainfield, Connecticut. Whether
          you're at home, at work along Route 12, or anywhere in the Plainfield
          area, our fully-equipped mobile service vehicle is ready to handle all
          your car repair and maintenance needs.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Mobile Mechanic Services We Offer in Plainfield</CardTitle>
          <CardDescription>
            Convenient, professional, and reliable auto care at your location.
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
          Serving Plainfield and Surrounding Areas
        </h3>
        <p className="text-muted-foreground">
          Our mobile mechanic service covers all of Plainfield, including
          Moosup and Central Village. We proudly serve the Plainfield community
          and surrounding towns like Sterling, Killingly, and Brooklyn with
          top-tier automotive expertise and unmatched convenience.
        </p>
      </section>
      <CallToAction />
    </div>
  );
}
