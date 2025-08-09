// Chadson v69.69: Mystic, CT - Mobile Mechanic Service Page

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
  title: 'Mobile Mechanic in Mystic, CT | RC Performance',
  description:
    'Expert mobile auto repair in Mystic, CT. RC Performance offers convenient, on-site services for all your vehicle needs, from diagnostics to performance tuning.',
  townName: 'Mystic, CT',
};

const services = [
  'Full-Service Mobile Diagnostics',
  'Brake Repair and Maintenance',
  'Suspension Services',
  'Engine Tuning and Repair',
  'Routine Maintenance',
  'Emergency Mobile Repair',
];

export default function MysticServicePage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Mystic's Choice for Mobile Auto Repair
        </h2>
        <p className="text-lg text-muted-foreground">
          Enjoy the convenience of expert auto care without leaving your home or
          office in Mystic, Connecticut. RC Performance is a fully mobile
          mechanic service, bringing top-quality repairs, maintenance, and
          diagnostics directly to you.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>On-Site Automotive Services in Mystic</CardTitle>
          <CardDescription>
            Your reliable solution for mobile auto care.
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
          Serving the Historic Seaport and Beyond
        </h3>
        <p className="text-muted-foreground">
          From the charming downtown to the surrounding residential areas, RC
          Performance is committed to providing the Mystic community with
          reliable, high-quality mobile mechanic services.
        </p>
      </section>
    </div>
  );
}