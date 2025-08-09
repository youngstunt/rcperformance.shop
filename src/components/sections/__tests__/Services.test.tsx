// Chadson v69.0.0: Unit tests for the Services component.
// Updated to reflect the refactoring with shadcn/ui components.

import React from 'react';
import { render, screen } from '@testing-library/react';
import Services from '../Services';

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

describe('Services', () => {
  it('renders all service cards with titles and descriptions', () => {
    render(<Services />);
    
    services.forEach(service => {
      // Check for the title (which is a heading)
      const title = screen.getByRole('heading', { name: service.title, level: 3 });
      expect(title).toBeInTheDocument();

      // Check for the description
      const description = screen.getByText(service.description);
      expect(description).toBeInTheDocument();
    });
  });
});