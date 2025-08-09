/**
 * @file src/app/api/contact/route.test.ts
 * @purpose Unit tests for the contact form API route.
 * @version 1.0.0
 * @date 2025-07-13
 *
 * @description
 * This file contains unit tests for the /api/contact endpoint. It uses Jest
 * to mock the Nodemailer transport layer, allowing for testing of the API's
 * logic without sending actual emails. Tests cover successful submissions,
 * submissions with invalid data, and server-side errors.
 *
 * @dependencies
 * - jest: Test runner.
 * - @types/jest: TypeScript definitions for Jest.
 * - nodemailer: Mocked to test email sending logic.
 * - next/server: Used to construct request and response objects.
 */

import { POST } from './route';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';


// Mock the nodemailer module
jest.mock('nodemailer');

const mockedNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;

describe('/api/contact POST', () => {
  let sendMailMock: jest.Mock;

  beforeEach(() => {
    // Reset mocks before each test
    sendMailMock = jest.fn<() => Promise<{ messageId: string }>>();
    // The `createTransport` function itself needs to be a mock that returns
    // our desired transport object containing the mock `sendMail` function.
    mockedNodemailer.createTransport = jest.fn().mockReturnValue({
      sendMail: sendMailMock,
    });

    // Set up environment variables for the test
    process.env.GMAIL_USER = 'test@gmail.com';
    process.env.GMAIL_APP_PASSWORD = 'testpassword';
    process.env.DESTINATION_EMAIL = 'destination@example.com';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASSWORD;
    delete process.env.DESTINATION_EMAIL;
  });

  it('should send an email and return 200 on successful submission', async () => {
    const mockRequestData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      message: 'This is a test message.',
    };

    const request = {
      json: async () => mockRequestData,
    } as any;

    sendMailMock.mockResolvedValueOnce({ messageId: '123' });

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.message).toBe('Email sent successfully');
    expect(mockedNodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: 'test@gmail.com',
        pass: 'testpassword',
      },
    });
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(expect.objectContaining({
      to: 'destination@example.com',
      subject: 'New Contact Form Submission from John Doe',
    }));
  });

  it('should return 400 if required fields are missing', async () => {
    const mockRequestData = {
      name: 'John Doe',
      // email is missing
      message: 'This is a test message.',
    };

    const request = {
      json: async () => mockRequestData,
    } as any;

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(400);
    expect(responseBody.message).toBe('Missing required fields');
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('should return 500 if sending the email fails', async () => {
    const mockRequestData = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      message: 'This message will fail.',
    };

    const request = {
      json: async () => mockRequestData,
    } as any;

    const error = new Error('SMTP Error');
    sendMailMock.mockRejectedValueOnce(error);

    const response = await POST(request);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody.message).toBe('Failed to send email');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });
});