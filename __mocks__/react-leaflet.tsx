// Chadson v69.0.0: Mock for the react-leaflet library.
// This mock is used by Jest to prevent ESM-related errors during testing.
// It provides dummy components for MapContainer, TileLayer, and Circle,
// allowing tests to render components that use the map without crashing.

import React from 'react';

export const MapContainer = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="map-container">{children}</div>
);

export const TileLayer = () => <div data-testid="tile-layer" />;

export const Circle = () => <div data-testid="circle" />;