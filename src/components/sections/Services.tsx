// Chadson v69.0.0: Guerrilla Automotive Services Section
// Purpose: Display the list of services offered by the business.
// Refactored to integrate with the tab-based layout and shadcn/ui design system.

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const services = [
  {
    title: "ECU Remapping",
    description: "Unlock the hidden power of your engine with our expert ECU remapping services. We fine-tune your vehicle's engine control unit to optimize fuel-to-air ratios, ignition timing, and boost pressure, resulting in significant gains in horsepower and torque."
  },
  {
    title: "Forced Induction",
    description: "Ready for a serious power boost? We specialize in turbocharger and supercharger installations and upgrades, whether adding to a naturally aspirated engine or upgrading your stock turbo."
  },
  {
    title: "Performance Exhaust",
    description: "Improve your engine's breathing with a high-flow performance exhaust system. A less restrictive exhaust reduces back pressure, allowing your engine to produce more power and sound great."
  },
  {
    title: "Suspension Tuning",
    description: "Enhance your car's handling and stability with our suspension tuning services. From coilovers to sway bars, we can help you achieve the perfect balance of comfort and performance."
  }
];

export default function Services() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {services.map((service) => (
        <Card key={service.title} className="transition-all hover:border-primary/80 hover:scale-[1.02]">
          <CardHeader>
            <h3 className="leading-none font-semibold text-white">{service.title}</h3>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}