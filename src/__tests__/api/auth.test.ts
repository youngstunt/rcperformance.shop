import { describe, it, expect, vi } from 'vitest'
import { POST as sendOtp } from '@/app/api/auth/send-otp/route'
import { mockPrisma } from '../mocks/prisma'
import { sentEmails } from '../mocks/nodemailer'
import { createMockRequest } from '../mocks/next'

describe('Auth API', () => {
  describe('POST /api/auth/send-otp', () => {
    it('returns 400 if email is missing', async () => {
      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: {},
      })

      const response = await sendOtp(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Valid email')
    })

    it('returns 400 if email is invalid', async () => {
      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'not-an-email' },
      })

      const response = await sendOtp(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Valid email')
    })

    it('sends OTP email for valid email', async () => {
      // Mock the deleteMany operation
      mockPrisma.verificationToken.deleteMany = vi.fn().mockResolvedValue({ count: 0 })

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'user@example.com' },
      })

      const response = await sendOtp(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('OTP sent successfully')
      expect(data.email).toBe('user@example.com')
    })

    it('normalizes email to lowercase', async () => {
      mockPrisma.verificationToken.deleteMany = vi.fn().mockResolvedValue({ count: 0 })

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'USER@EXAMPLE.COM' },
      })

      const response = await sendOtp(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.email).toBe('user@example.com')
    })

    it('creates verification token in database', async () => {
      mockPrisma.verificationToken.deleteMany = vi.fn().mockResolvedValue({ count: 0 })

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'test@example.com' },
      })

      await sendOtp(request)

      expect(mockPrisma.verificationToken.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          identifier: 'test@example.com',
          token: expect.any(String), // hashed OTP
          expires: expect.any(Date),
        }),
      })
    })

    it('deletes existing tokens before creating new one', async () => {
      mockPrisma.verificationToken.deleteMany = vi.fn().mockResolvedValue({ count: 1 })

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'existing@example.com' },
      })

      await sendOtp(request)

      expect(mockPrisma.verificationToken.deleteMany).toHaveBeenCalledWith({
        where: { identifier: 'existing@example.com' },
      })
    })

    it('sends email with OTP', async () => {
      mockPrisma.verificationToken.deleteMany = vi.fn().mockResolvedValue({ count: 0 })

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'emailtest@example.com' },
      })

      await sendOtp(request)

      const otpEmail = sentEmails.find(e => e.to === 'emailtest@example.com')
      expect(otpEmail).toBeDefined()
      expect(otpEmail?.subject).toContain('Login Code')
    })

    it('sets expiration to 10 minutes in future', async () => {
      mockPrisma.verificationToken.deleteMany = vi.fn().mockResolvedValue({ count: 0 })

      const before = Date.now()

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'expiry@example.com' },
      })

      await sendOtp(request)

      const after = Date.now()

      expect(mockPrisma.verificationToken.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          expires: expect.any(Date),
        }),
      })

      // Get the call arguments
      const call = (mockPrisma.verificationToken.create as any).mock.calls[0][0]
      const expiresAt = call.data.expires.getTime()

      // Should be approximately 10 minutes (600000ms) in the future
      const tenMinutes = 10 * 60 * 1000
      expect(expiresAt).toBeGreaterThanOrEqual(before + tenMinutes - 1000)
      expect(expiresAt).toBeLessThanOrEqual(after + tenMinutes + 1000)
    })

    it('trims whitespace from email', async () => {
      mockPrisma.verificationToken.deleteMany = vi.fn().mockResolvedValue({ count: 0 })

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: '  whitespace@example.com  ' },
      })

      const response = await sendOtp(request)
      const data = await response.json()

      expect(data.email).toBe('whitespace@example.com')
    })

    it('handles database errors gracefully', async () => {
      mockPrisma.verificationToken.deleteMany = vi.fn().mockRejectedValue(new Error('Database error'))

      const request = createMockRequest('http://localhost:3000/api/auth/send-otp', {
        method: 'POST',
        body: { email: 'error@example.com' },
      })

      const response = await sendOtp(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toContain('Failed to send OTP')
    })
  })
})
