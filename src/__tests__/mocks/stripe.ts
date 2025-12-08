import { vi } from 'vitest'

// In-memory storage for Stripe mock data
export const mockStripeData = {
  customers: new Map<string, any>(),
  checkoutSessions: new Map<string, any>(),
  paymentIntents: new Map<string, any>(),
}

export function resetMockStripeData() {
  mockStripeData.customers.clear()
  mockStripeData.checkoutSessions.clear()
  mockStripeData.paymentIntents.clear()
}

// Create a mock checkout session
export function createMockCheckoutSession(overrides: any = {}) {
  const session = {
    id: 'cs_test_' + Math.random().toString(36).slice(2),
    object: 'checkout.session',
    amount_total: 20000,
    currency: 'usd',
    customer: 'cus_test_123',
    payment_intent: 'pi_test_' + Math.random().toString(36).slice(2),
    payment_status: 'paid',
    status: 'complete',
    url: 'https://checkout.stripe.com/test',
    metadata: {},
    ...overrides,
  }
  mockStripeData.checkoutSessions.set(session.id, session)
  return session
}

// Create a mock payment intent
export function createMockPaymentIntent(overrides: any = {}) {
  const paymentIntent = {
    id: 'pi_test_' + Math.random().toString(36).slice(2),
    object: 'payment_intent',
    amount: 20000,
    currency: 'usd',
    status: 'succeeded',
    customer: 'cus_test_123',
    metadata: {},
    ...overrides,
  }
  mockStripeData.paymentIntents.set(paymentIntent.id, paymentIntent)
  return paymentIntent
}

// Mock Stripe client
export const mockStripe = {
  customers: {
    create: vi.fn(async (params: any) => {
      const customer = {
        id: 'cus_test_' + Math.random().toString(36).slice(2),
        object: 'customer',
        email: params.email,
        metadata: params.metadata || {},
      }
      mockStripeData.customers.set(customer.id, customer)
      return customer
    }),
    retrieve: vi.fn(async (id: string) => {
      return mockStripeData.customers.get(id) || null
    }),
  },
  checkout: {
    sessions: {
      create: vi.fn(async (params: any) => {
        const session = createMockCheckoutSession({
          metadata: params.metadata,
          customer: params.customer,
          line_items: params.line_items,
          success_url: params.success_url,
          cancel_url: params.cancel_url,
        })
        return session
      }),
      retrieve: vi.fn(async (id: string) => {
        return mockStripeData.checkoutSessions.get(id) || null
      }),
    },
  },
  paymentIntents: {
    retrieve: vi.fn(async (id: string) => {
      return mockStripeData.paymentIntents.get(id) || null
    }),
  },
  webhooks: {
    constructEvent: vi.fn((payload: string, signature: string, secret: string) => {
      // Parse the payload as the event
      const event = JSON.parse(payload)
      return event
    }),
  },
  billingPortal: {
    sessions: {
      create: vi.fn(async (params: any) => ({
        id: 'bps_test_123',
        url: 'https://billing.stripe.com/test',
        customer: params.customer,
      })),
    },
  },
}

// Mock for @/lib/stripe module
vi.mock('@/lib/stripe', () => ({
  stripe: mockStripe,
  TICKET_PRICE_CENTS: 20000,
  isStripeConfigured: vi.fn(() => true),
}))

// Mock for 'stripe' package constructor
vi.mock('stripe', () => {
  return {
    default: vi.fn(() => mockStripe),
  }
})
