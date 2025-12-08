import { vi } from 'vitest'
import type { Session } from 'next-auth'

// Current mock session state - can be modified by tests
export let mockSession: Session | null = null

// Helper to set the mock session
export function setMockSession(session: Session | null) {
  mockSession = session
}

// Helper to create a user session
export function createUserSession(overrides: Partial<Session['user']> = {}): Session {
  return {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
      image: null,
      ...overrides,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
}

// Helper to create an admin session
export function createAdminSession(overrides: Partial<Session['user']> = {}): Session {
  return {
    user: {
      id: 'admin-user-id',
      email: 'admin@test.com',
      name: 'Admin User',
      role: 'ADMIN',
      image: null,
      ...overrides,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
}

// Helper to clear the session (simulate logged out)
export function clearMockSession() {
  mockSession = null
}

// Mock getServerSession
export const mockGetServerSession = vi.fn(async () => mockSession)

// Mock NextAuth handlers
export const mockNextAuth = vi.fn(() => ({
  handlers: {
    GET: vi.fn(),
    POST: vi.fn(),
  },
  auth: mockGetServerSession,
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

// Mock the next-auth module
vi.mock('next-auth', () => ({
  default: mockNextAuth,
  getServerSession: mockGetServerSession,
}))

// Mock next-auth/react for client components
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: mockSession,
    status: mockSession ? 'authenticated' : 'unauthenticated',
    update: vi.fn(),
  })),
  signIn: vi.fn(() => Promise.resolve({ ok: true, error: null })),
  signOut: vi.fn(() => Promise.resolve()),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  getSession: vi.fn(() => Promise.resolve(mockSession)),
}))

// Mock @/lib/auth
vi.mock('@/lib/auth', () => ({
  authOptions: {
    providers: [],
    callbacks: {},
    pages: {
      signIn: '/auth/login',
      error: '/auth/error',
    },
  },
}))
