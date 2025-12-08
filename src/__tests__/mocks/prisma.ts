import { vi } from 'vitest'
import type { User, Ticket, TicketMessage, TicketFile, Payment } from '@prisma/client'

// In-memory database storage
export const mockDb = {
  users: new Map<string, User>(),
  tickets: new Map<string, Ticket>(),
  ticketMessages: new Map<string, TicketMessage>(),
  ticketFiles: new Map<string, TicketFile>(),
  payments: new Map<string, Payment>(),
  verificationTokens: new Map<string, { identifier: string; token: string; expires: Date }>(),
  accounts: new Map<string, any>(),
  sessions: new Map<string, any>(),
}

// Helper to reset the mock database
export function resetMockDb() {
  mockDb.users.clear()
  mockDb.tickets.clear()
  mockDb.ticketMessages.clear()
  mockDb.ticketFiles.clear()
  mockDb.payments.clear()
  mockDb.verificationTokens.clear()
  mockDb.accounts.clear()
  mockDb.sessions.clear()
}

// Helper to seed test data
export function seedTestUser(overrides: Partial<User> = {}): User {
  const user: User = {
    id: 'test-user-id',
    email: 'test@example.com',
    name: 'Test User',
    emailVerified: new Date(),
    image: null,
    role: 'USER',
    stripeCustomerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
  mockDb.users.set(user.id, user)
  return user
}

export function seedAdminUser(overrides: Partial<User> = {}): User {
  const admin: User = {
    id: 'admin-user-id',
    email: 'admin@test.com',
    name: 'Admin User',
    emailVerified: new Date(),
    image: null,
    role: 'ADMIN',
    stripeCustomerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
  mockDb.users.set(admin.id, admin)
  return admin
}

export function seedTestTicket(userId: string, overrides: Partial<Ticket> = {}): Ticket {
  const ticket: Ticket = {
    id: 'test-ticket-id',
    userId,
    vehicleMake: 'Subaru',
    vehicleModel: 'WRX',
    vehicleYear: 2020,
    vehicleVin: null,
    ecuReadTool: 'Tactrix',
    ecuType: null,
    tuneType: null,
    notes: null,
    status: 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
    completedAt: null,
    ...overrides,
  }
  mockDb.tickets.set(ticket.id, ticket)
  return ticket
}

export function seedTestPayment(ticketId: string, userId: string, overrides: Partial<Payment> = {}): Payment {
  const payment: Payment = {
    id: 'test-payment-id',
    ticketId,
    userId,
    stripePaymentId: 'pi_test_123',
    stripeSessionId: 'cs_test_123',
    amount: 20000,
    currency: 'usd',
    status: 'COMPLETED',
    paymentType: 'NEW_TICKET',
    createdAt: new Date(),
    updatedAt: new Date(),
    paidAt: new Date(),
    ...overrides,
  }
  mockDb.payments.set(payment.id, payment)
  return payment
}

// Create mock Prisma client with proper method implementations
function createMockModel<T extends { id: string }>(store: Map<string, T>) {
  return {
    findUnique: vi.fn(({ where }: { where: { id?: string; email?: string } }) => {
      if (where.id) return Promise.resolve(store.get(where.id) || null)
      if (where.email) {
        for (const item of store.values()) {
          if ((item as any).email === where.email) return Promise.resolve(item)
        }
      }
      return Promise.resolve(null)
    }),
    findFirst: vi.fn(({ where }: { where: any }) => {
      for (const item of store.values()) {
        let match = true
        for (const [key, value] of Object.entries(where)) {
          if ((item as any)[key] !== value) match = false
        }
        if (match) return Promise.resolve(item)
      }
      return Promise.resolve(null)
    }),
    findMany: vi.fn(({ where, orderBy, include }: { where?: any; orderBy?: any; include?: any } = {}) => {
      let results = Array.from(store.values())
      if (where) {
        results = results.filter((item) => {
          for (const [key, value] of Object.entries(where)) {
            if ((item as any)[key] !== value) return false
          }
          return true
        })
      }
      return Promise.resolve(results)
    }),
    create: vi.fn(({ data, select }: { data: any; select?: any }) => {
      const id = data.id || `generated-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const item = { ...data, id, createdAt: new Date(), updatedAt: new Date() } as T
      store.set(id, item)
      if (select) {
        const result: any = {}
        for (const key of Object.keys(select)) {
          result[key] = (item as any)[key]
        }
        return Promise.resolve(result)
      }
      return Promise.resolve(item)
    }),
    update: vi.fn(({ where, data }: { where: { id: string }; data: any }) => {
      const existing = store.get(where.id)
      if (!existing) return Promise.resolve(null)
      const updated = { ...existing, ...data, updatedAt: new Date() } as T
      store.set(where.id, updated)
      return Promise.resolve(updated)
    }),
    delete: vi.fn(({ where }: { where: { id: string } }) => {
      const item = store.get(where.id)
      store.delete(where.id)
      return Promise.resolve(item)
    }),
    count: vi.fn(({ where }: { where?: any } = {}) => {
      if (!where) return Promise.resolve(store.size)
      let count = 0
      for (const item of store.values()) {
        let match = true
        for (const [key, value] of Object.entries(where)) {
          if ((item as any)[key] !== value) match = false
        }
        if (match) count++
      }
      return Promise.resolve(count)
    }),
    groupBy: vi.fn(({ by }: { by: string[] }) => {
      const groups: Record<string, number> = {}
      for (const item of store.values()) {
        const key = by.map((b) => (item as any)[b]).join('-')
        groups[key] = (groups[key] || 0) + 1
      }
      return Promise.resolve(
        Object.entries(groups).map(([key, count]) => ({
          [by[0]]: key,
          _count: count,
        }))
      )
    }),
  }
}

export const mockPrisma = {
  user: createMockModel(mockDb.users as Map<string, User>),
  ticket: createMockModel(mockDb.tickets as Map<string, Ticket>),
  ticketMessage: createMockModel(mockDb.ticketMessages as Map<string, TicketMessage>),
  ticketFile: createMockModel(mockDb.ticketFiles as Map<string, TicketFile>),
  payment: createMockModel(mockDb.payments as Map<string, Payment>),
  verificationToken: {
    findUnique: vi.fn(({ where }: { where: { identifier_token?: { identifier: string; token: string }; token?: string } }) => {
      if (where.token) {
        for (const token of mockDb.verificationTokens.values()) {
          if (token.token === where.token) return Promise.resolve(token)
        }
      }
      if (where.identifier_token) {
        const key = `${where.identifier_token.identifier}-${where.identifier_token.token}`
        return Promise.resolve(mockDb.verificationTokens.get(key) || null)
      }
      return Promise.resolve(null)
    }),
    create: vi.fn(({ data }: { data: any }) => {
      const key = `${data.identifier}-${data.token}`
      mockDb.verificationTokens.set(key, data)
      return Promise.resolve(data)
    }),
    delete: vi.fn(({ where }: { where: { identifier_token: { identifier: string; token: string } } }) => {
      const key = `${where.identifier_token.identifier}-${where.identifier_token.token}`
      const token = mockDb.verificationTokens.get(key)
      mockDb.verificationTokens.delete(key)
      return Promise.resolve(token)
    }),
  },
  account: createMockModel(mockDb.accounts),
  session: createMockModel(mockDb.sessions),
  $connect: vi.fn(() => Promise.resolve()),
  $disconnect: vi.fn(() => Promise.resolve()),
  $transaction: vi.fn((fn: any) => fn(mockPrisma)),
}

// Export the mock for use in tests
vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}))
