// Chadson v69.69: Map Section Component
// This component dynamically loads and displays the service area map.

import React from 'react';
import dynamic from 'next/dynamic';

const ServiceAreaMap = dynamic(() => import('@/components/map/ServiceAreaMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-muted rounded-lg flex items-center justify-center">Loading Map...</div>,
});

export default function Map() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Our Service Area</h2>
      <div className="h-[400px] w-full">
        <ServiceAreaMap />
      </div>
    </div>
  );
}