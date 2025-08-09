// Chadson v69.0.0: Unit tests for the Header component.

import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders the business name', () => {
    render(<Header />);
    // The business name is split across elements, so we get it by the link role
    // and check its text content.
    const businessNameLink = screen.getByRole('link', { name: /Guerrilla Automotive/i });
    expect(businessNameLink).toBeInTheDocument();
    expect(businessNameLink).toHaveTextContent('Guerrilla Automotive');
  });

  it('renders the phone number as a link', () => {
    render(<Header />);
    const phoneNumber = screen.getByRole('link', { name: /\+1-737-747-2233/i });
    expect(phoneNumber).toBeInTheDocument();
    expect(phoneNumber).toHaveAttribute('href', 'tel:+17377472233');
  });

  it('renders the email address as a link', () => {
    render(<Header />);
    const emailAddress = screen.getByRole('link', { name: /inquiries@guerrilla.sh/i });
    expect(emailAddress).toBeInTheDocument();
    expect(emailAddress).toHaveAttribute('href', 'mailto:inquiries@guerrilla.sh');
  });
});