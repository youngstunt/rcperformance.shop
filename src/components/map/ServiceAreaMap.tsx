/**
 * @file src/components/map/ServiceAreaMap.tsx
 * @purpose A client-side-only component to render the service area map using React-Leaflet.
 * @version 1.0.0
 * @date 2025-07-13
 *
 * @description
 * This component renders an OpenStreetMap centered on Austin, TX. It displays a
 * 50-mile radius circle to visualize the company's service area. It is designed
 * to be loaded dynamically with `next/dynamic` to prevent SSR issues with the
 * Leaflet library, which requires a browser environment.
 *
 * @dependencies
 * - react: For component creation.
 * - react-leaflet: A React wrapper for the Leaflet library.
 * - leaflet: The core mapping library.
 */

"use client";

import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ServiceAreaMap = () => {
  const easternCtCoordinates: [number, number] = [41.6, -72.1];
  const radiusInMeters = 50 * 1609.34; // 50 miles to meters

  return (
    <MapContainer
      center={easternCtCoordinates}
      zoom={8}
      style={{ height: '400px', width: '100%', borderRadius: '0.5rem' }}
      scrollWheelZoom={false}
      aria-label="Service area map centered on Eastern Connecticut"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Circle
        center={easternCtCoordinates}
        radius={radiusInMeters}
        pathOptions={{
          color: 'hsl(var(--primary))',
          fillColor: 'hsl(var(--primary))',
          fillOpacity: 0.2,
        }}
      />
    </MapContainer>
  );
};

export default ServiceAreaMap;