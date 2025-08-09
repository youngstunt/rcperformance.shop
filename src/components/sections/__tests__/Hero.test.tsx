// Chadson v69.0.0: Unit tests for the Hero component.
// Updated to reflect the refactoring with shadcn/ui components.

import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero', () => {
  it('renders the main headline', () => {
    render(<Hero />);
    const headline = screen.getByText(/Guerrilla Automotive/i);
    expect(headline).toBeInTheDocument();
  });

  it('renders the subheading', () => {
    render(<Hero />);
    const subheading = screen.getByText(/Mobile & Remote Performance Tuning in Austin, TX/i);
    expect(subheading).toBeInTheDocument();
  });
});