/**
 * @file src/components/map/__tests__/ServiceAreaMap.test.tsx
 * @purpose Unit tests for the ServiceAreaMap component.
 * @version 1.0.0
 * @date 2025-07-13
 *
 * @description
 * This file contains unit tests for the ServiceAreaMap component. It mocks the
 * 'react-leaflet' library to verify that the map components (MapContainer,
 * TileLayer, Circle) are rendered with the correct props without needing a
 * real DOM or browser environment.
 *
 * @dependencies
 * - jest: Test runner.
 * - @testing-library/react: For rendering components in tests.
 * - react-leaflet: Mocked to verify props.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceAreaMap from '../ServiceAreaMap';
import { describe, it, expect, jest } from '@jest/globals';

// Mock the react-leaflet library
// This must be done AFTER imports to avoid hoisting issues where jest is undefined.
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(({ children, center, zoom }) => (
    <div data-testid="map-container" data-center={center.join(',')} data-zoom={zoom}>
      {children}
    </div>
  )),
  TileLayer: jest.fn(({ url, attribution }) => (
    <div data-testid="tile-layer" data-url={url} data-attribution={attribution} />
  )),
  Circle: jest.fn(({ center, radius, pathOptions }) => (
    <div
      data-testid="circle"
      data-center={center.join(',')}
      data-radius={radius}
      data-color={pathOptions.color}
    />
  )),
}));

describe('ServiceAreaMap', () => {
  it('renders the map components with the correct props', () => {
    render(<ServiceAreaMap />);

    const austinCoordinates = [30.2672, -97.7431];
    const radiusInMeters = 50 * 1609.34;

    // Verify MapContainer props
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
    expect(mapContainer).toHaveAttribute('data-center', austinCoordinates.join(','));
    expect(mapContainer).toHaveAttribute('data-zoom', '9');

    // Verify TileLayer props
    const tileLayer = screen.getByTestId('tile-layer');
    expect(tileLayer).toBeInTheDocument();
    expect(tileLayer).toHaveAttribute('data-url', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    expect(tileLayer).toHaveAttribute('data-attribution', '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');

    // Verify Circle props
    const circle = screen.getByTestId('circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('data-center', austinCoordinates.join(','));
    expect(circle).toHaveAttribute('data-radius', radiusInMeters.toString());
    expect(circle).toHaveAttribute('data-color', 'hsl(var(--primary))');
  });
});