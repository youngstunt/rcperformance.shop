// Chadson v69.0.0: Unit tests for the Header component.

import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the business name', () => {
    render(<Header />);
    // The business name is split across elements, so we get it by the link role
    // and check its text content.
    const businessNameLink = screen.getByRole('link', { name: /RC Performance/i });
    expect(businessNameLink).toBeInTheDocument();
    expect(businessNameLink).toHaveTextContent('RC Performance');
  });

  it('renders the phone number as a link', () => {
    render(<Header />);
    const phoneNumber = screen.getByRole('link', { name: /\+1-860-775-5770/i });
    expect(phoneNumber).toBeInTheDocument();
    expect(phoneNumber).toHaveAttribute('href', 'tel:+1-8607755770');
  });

  it('renders the email address as a link', () => {
    render(<Header />);
    const emailAddress = screen.getByRole('link', { name: /inquiries@rcperformance.shop/i });
    expect(emailAddress).toBeInTheDocument();
    expect(emailAddress).toHaveAttribute('href', 'mailto:inquiries@rcperformance.shop');
  });
});