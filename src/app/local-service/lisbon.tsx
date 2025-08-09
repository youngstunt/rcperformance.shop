// Chadson v69.69: Lisbon, CT - Mobile Mechanic Service Page

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
  title: 'Mobile Mechanic in Lisbon, CT | RC Performance',
  description:
    'Convenient and reliable mobile mechanic services in Lisbon, CT. From routine maintenance to emergency repairs, RC Performance comes to you. Call today!',
  townName: 'Lisbon, CT',
};

const services = [
  'Oil and Filter Changes',
  'Tire Rotation and Repair',
  'Battery and Electrical Service',
  'ECU Tuning and Diagnostics',
  'Brake Services',
  'General Auto Repair',
];

export default function LisbonServicePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Lisbon's Go-To Mobile Mechanic
        </h2>
        <p className="text-lg text-muted-foreground">
          RC Performance is proud to offer comprehensive mobile mechanic
          services to the Lisbon, Connecticut community. We understand that car
          trouble is a major inconvenience, which is why we bring our tools and
          expertise directly to your location, saving you time and hassle.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Complete Mobile Auto Care in Lisbon</CardTitle>
          <CardDescription>
            Your trusted partner for on-the-go auto services.
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
          Dedicated Service for the Lisbon Area
        </h3>
        <p className="text-muted-foreground">
          Whether you're near the I-395 corridor or in the quieter parts of
          town, our mobile service is ready to assist you. Trust RC Performance
          for all your automotive needs in Lisbon, CT.
        </p>
      </section>
      <CallToAction />
    </div>
  );
}