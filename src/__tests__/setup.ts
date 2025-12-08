import { vi, beforeAll, afterAll, afterEach, beforeEach } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Set environment variables before any imports
process.env.NEXTAUTH_SECRET = 'test-secret-key-for-testing'
process.env.NEXTAUTH_URL = 'http://localhost:3000'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test'
process.env.STRIPE_SECRET_KEY = 'sk_test_fake_key'
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_fake_secret'
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id'
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret'
process.env.ADMIN_EMAIL = 'admin@test.com'
process.env.ADMIN_PASSWORD = 'test-admin-password'
process.env.GMAIL_USER = 'test@gmail.com'
process.env.GMAIL_APP_PASSWORD = 'test-app-password'

// Import all mocks - these set up vi.mock calls
import './mocks/prisma'
import './mocks/stripe'
import './mocks/next-auth'
import './mocks/nodemailer'
import './mocks/next'

// Import reset functions
import { resetMockDb } from './mocks/prisma'
import { resetMockStripeData } from './mocks/stripe'
import { clearMockSession } from './mocks/next-auth'
import { resetSentEmails } from './mocks/nodemailer'

// Mock bcryptjs
vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn((password: string) => Promise.resolve(`hashed_${password}`)),
    compare: vi.fn((password: string, hash: string) => Promise.resolve(hash === `hashed_${password}`)),
    hashSync: vi.fn((password: string) => `hashed_${password}`),
    compareSync: vi.fn((password: string, hash: string) => hash === `hashed_${password}`),
  },
  hash: vi.fn((password: string) => Promise.resolve(`hashed_${password}`)),
  compare: vi.fn((password: string, hash: string) => Promise.resolve(hash === `hashed_${password}`)),
  hashSync: vi.fn((password: string) => `hashed_${password}`),
  compareSync: vi.fn((password: string, hash: string) => hash === `hashed_${password}`),
}))

// Global fetch mock to prevent network calls
const originalFetch = global.fetch
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
      status: 200,
      headers: new Headers(),
    } as Response)
  )
})

afterAll(() => {
  global.fetch = originalFetch
})

// Reset all mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
})

afterEach(() => {
  // Reset all mock data stores
  resetMockDb()
  resetMockStripeData()
  clearMockSession()
  resetSentEmails()
})
