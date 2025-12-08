import { vi } from 'vitest'

// Storage for sent emails (for assertions)
export const sentEmails: Array<{
  from: string
  to: string
  subject: string
  html: string
  sentAt: Date
}> = []

// Helper to reset sent emails
export function resetSentEmails() {
  sentEmails.length = 0
}

// Helper to get last sent email
export function getLastSentEmail() {
  return sentEmails[sentEmails.length - 1] || null
}

// Helper to find emails by recipient
export function findEmailsTo(email: string) {
  return sentEmails.filter((e) => e.to === email)
}

// Helper to find emails by subject
export function findEmailsBySubject(subject: string) {
  return sentEmails.filter((e) => e.subject.includes(subject))
}

// Mock sendMail function
export const mockSendMail = vi.fn(async (options: any) => {
  sentEmails.push({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    sentAt: new Date(),
  })
  return {
    messageId: 'test-message-id-' + Date.now(),
    accepted: [options.to],
    rejected: [],
  }
})

// Mock transporter
export const mockTransporter = {
  sendMail: mockSendMail,
  verify: vi.fn(() => Promise.resolve(true)),
}

// Mock createTransport
export const mockCreateTransport = vi.fn(() => mockTransporter)

// Mock nodemailer module
vi.mock('nodemailer', () => ({
  default: {
    createTransport: mockCreateTransport,
  },
  createTransport: mockCreateTransport,
}))

// Mock @/lib/email
vi.mock('@/lib/email', () => ({
  sendOTPEmail: vi.fn(async (email: string, otp: string) => {
    sentEmails.push({
      from: 'test@rcperformance.shop',
      to: email,
      subject: 'Your RC Performance Login Code',
      html: `Your OTP is: ${otp}`,
      sentAt: new Date(),
    })
    return { messageId: 'otp-' + Date.now() }
  }),
  sendTicketUpdateEmail: vi.fn(async (email: string, ticketId: string, message: string) => {
    sentEmails.push({
      from: 'test@rcperformance.shop',
      to: email,
      subject: 'Ticket Update',
      html: `Ticket ${ticketId}: ${message}`,
      sentAt: new Date(),
    })
    return { messageId: 'ticket-update-' + Date.now() }
  }),
  sendTuneCompleteEmail: vi.fn(async (email: string, ticketId: string, vehicleInfo: string) => {
    sentEmails.push({
      from: 'test@rcperformance.shop',
      to: email,
      subject: 'Your Tune is Ready!',
      html: `Your tune for ${vehicleInfo} (Ticket ${ticketId}) is ready for download.`,
      sentAt: new Date(),
    })
    return { messageId: 'tune-complete-' + Date.now() }
  }),
  sendPaymentConfirmationEmail: vi.fn(async (email: string, ticketId: string, amount: number) => {
    sentEmails.push({
      from: 'test@rcperformance.shop',
      to: email,
      subject: 'Payment Confirmation',
      html: `Payment of $${amount / 100} confirmed for ticket ${ticketId}.`,
      sentAt: new Date(),
    })
    return { messageId: 'payment-' + Date.now() }
  }),
}))
