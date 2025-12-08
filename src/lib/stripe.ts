import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ""

// Initialize Stripe client (allows build without keys)
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-11-17.clover",
      typescript: true,
    })
  : (null as unknown as Stripe)

// Ticket price in cents ($200.00)
export const TICKET_PRICE_CENTS = 20000

// Check if Stripe is configured
export function isStripeConfigured(): boolean {
  return Boolean(stripeSecretKey)
}
