// Chadson v69.0.0: Unit tests for the Contact component.
// Updated to reflect the refactoring with shadcn/ui components and a contact form.

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Diagnostic import
import Contact from '../Contact';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// Mock the global fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch as any;


describe('Contact Component', () => {
  describe('Initial Rendering', () => {
    beforeEach(() => {
      render(<Contact />);
    });

    it('renders the "Get in Touch" headline', () => {
    const headline = screen.getByRole('heading', { name: /Get in Touch/i, level: 3 });
    expect(headline).toBeInTheDocument();
  });

  it('renders the phone number as a link', () => {
    const phoneLink = screen.getByRole('link', { name: /\+1-737-747-2233/i });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:+17377472233');
  });

  it('renders the email address as a link', () => {
    const emailLink = screen.getByRole('link', { name: /inquiries@guerrilla.sh/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:inquiries@guerrilla.sh');
  });

  it('renders the contact form with all fields', () => {
    // Check for form labels and corresponding inputs
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Name/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your Email/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your message.../i)).toBeInTheDocument();

    // Check for the submit button
    const button = screen.getByRole('button', { name: /Send Message/i });
    expect(button).toBeInTheDocument();
  });
});

  describe('Form Submission', () => {
    beforeEach(() => {
      // Reset mocks before each test
      mockFetch.mockClear();
      render(<Contact />);
    });

    it('successfully submits the form and shows a success message', async () => {
      // Arrange: Mock a successful API response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Message sent successfully!' }),
      });

      // Act: Fill out and submit the form
      fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a test.' } });
      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Assert: Check for submitting state and then success state
      expect(screen.getByRole('button', { name: /Sending.../i })).toBeDisabled();

      await waitFor(() => {
        expect(screen.getByText('Message sent successfully! We will get back to you shortly.')).toBeInTheDocument();
      });

      // Assert that the form was reset
      expect(screen.getByLabelText(/Name/i)).toHaveValue('');
    });

    it('shows an error message if the submission fails', async () => {
      // Arrange: Mock a failed API response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Server error, please try again.' }),
      });

      // Act: Fill out and submit the form
      fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This will fail.' } });
      fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

      // Assert: Check for submitting state and then error state
      expect(screen.getByRole('button', { name: /Sending.../i })).toBeDisabled();

      await waitFor(() => {
        expect(screen.getByText('Server error, please try again.')).toBeInTheDocument();
      });

      // Assert that the button is re-enabled and form is not reset
      expect(screen.getByRole('button', { name: /Send Message/i })).not.toBeDisabled();
      expect(screen.getByLabelText(/Name/i)).toHaveValue('Test User');
    });
  });
});