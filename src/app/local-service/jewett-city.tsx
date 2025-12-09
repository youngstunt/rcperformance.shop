// Jewett City, CT - Mobile Mechanic Service Page

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
  title: 'Mobile Mechanic in Jewett City, CT | RC Performance',
  description:
    'Expert mobile mechanic services in Jewett City, CT. RC Performance comes to you for convenient, reliable auto repair, maintenance, and performance tuning.',
  townName: 'Jewett City, CT',
};

const services = [
  'Check Engine Light Diagnostics',
  'Brake Repair and Replacement',
  'Suspension and Steering',
  'Engine Performance and Tuning',
  'Scheduled Maintenance',
  'Pre-Purchase Inspections',
];

export default function JewettCityServicePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Your Trusted Mobile Mechanic in Jewett City, CT
        </h2>
        <p className="text-lg text-muted-foreground">
          Why drive to an auto shop when the shop can come to you? RC Performance
          brings expert automotive services directly to you in Jewett City,
          Connecticut. Whether you're at home along the Quinebaug River, at work
          in the village center, or anywhere in the area, our fully-equipped
          mobile service vehicle is ready to handle all your car repair and
          maintenance needs.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Mobile Mechanic Services We Offer in Jewett City</CardTitle>
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
          Serving Jewett City and Surrounding Areas
        </h3>
        <p className="text-muted-foreground">
          Our mobile mechanic service covers all of Jewett City and the greater
          Griswold area. We proudly serve Jewett City and surrounding communities
          including Voluntown, Lisbon, Norwich, and Preston with top-tier
          automotive expertise and unmatched convenience.
        </p>
      </section>
      <CallToAction />
    </div>
  );
}
