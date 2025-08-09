// Chadson v69.0.0: Unit tests for the Footer component.

import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders the copyright notice', () => {
    render(<Footer />);
    const copyrightNotice = screen.getByText(/RC Performance LLC. All Rights Reserved./i);
    expect(copyrightNotice).toBeInTheDocument();
  });
});