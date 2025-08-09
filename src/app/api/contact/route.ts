/**
 * @file src/app/api/contact/route.ts
 * @purpose API route for handling contact form submissions.
 * @version 1.0.0
 * @date 2025-07-13
 *
 * @description
 * This file defines the API endpoint for the contact form. It receives a POST
 * request containing the user's name, email, and message. It then validates
 * the data and uses Nodemailer to send an email to the destination address
 * specified in the environment variables.
 *
 * @dependencies
 * - nodemailer: For sending emails via an SMTP server.
 * - next/server: For handling API requests and responses in Next.js.
 *
 * @environment_variables
 * - GMAIL_USER: The Gmail account used to send the email.
 * - GMAIL_APP_PASSWORD: The 16-character Google App Password for the sender account.
 * - DESTINATION_EMAIL: The email address to which the contact form submissions will be sent.
 */

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // --- Basic Input Validation ---
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // --- Nodemailer Transport Configuration ---
    // The transporter is configured to use Gmail's SMTP server.
    // Authentication is done using the credentials stored in environment variables.
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // --- Email Content ---
    // The email is constructed with both plain text and HTML content for
    // compatibility with various email clients.
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`, // Sender address
      to: process.env.DESTINATION_EMAIL, // List of receivers
      subject: `New Contact Form Submission from ${name}`, // Subject line
      text: `You have a new submission from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // Plain text body
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `, // HTML body
    };

    // --- Send Email ---
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    // Return a generic error message to the client for security.
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}