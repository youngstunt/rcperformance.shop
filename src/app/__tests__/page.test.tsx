// Chadson v69.0.0: Unit tests for the main Home page.
// This file tests the responsive layout by confirming all components are rendered.

import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock the components to isolate the page layout testing
jest.mock('@/components/sections/Hero', () => () => <div>Mock Hero</div>);
jest.mock('@/components/sections/Services', () => () => <div>Mock Services</div>);
jest.mock('@/components/sections/Contact', () => () => <div>Mock Contact</div>);

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the Hero component', () => {
    expect(screen.getByText('Mock Hero')).toBeInTheDocument();
  });

  it('renders the Services component', () => {
    expect(screen.getByText('Mock Services')).toBeInTheDocument();
  });

  it('renders the Contact component', () => {
    expect(screen.getByText('Mock Contact')).toBeInTheDocument();
  });
});