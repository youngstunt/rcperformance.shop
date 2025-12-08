import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { stripe, TICKET_PRICE_CENTS, isStripeConfigured } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    if (!isStripeConfigured()) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { ticketId, paymentType = "NEW_TICKET" } = await request.json()

    if (!ticketId) {
      return NextResponse.json({ error: "Ticket ID required" }, { status: 400 })
    }

    // Verify ticket belongs to user
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        userId: session.user.id,
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Check if ticket already paid (for NEW_TICKET type)
    if (paymentType === "NEW_TICKET" && ticket.status !== "PENDING_PAYMENT") {
      return NextResponse.json(
        { error: "This ticket has already been paid for" },
        { status: 400 }
      )
    }

    // Check if reopen is valid
    if (paymentType === "REOPEN" && ticket.status !== "COMPLETED") {
      return NextResponse.json(
        { error: "Only completed tickets can be reopened" },
        { status: 400 }
      )
    }

    // Get or create Stripe customer
    let user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    let stripeCustomerId = user?.stripeCustomerId

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        metadata: { userId: session.user.id },
      })
      stripeCustomerId = customer.id
      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId },
      })
    }

    const vehicleInfo = `${ticket.vehicleYear} ${ticket.vehicleMake} ${ticket.vehicleModel}`

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name:
                paymentType === "REOPEN"
                  ? "Ticket Reopen - ECU Tuning Service"
                  : "ECU Tuning Service",
              description: vehicleInfo,
            },
            unit_amount: TICKET_PRICE_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard/tickets/${ticketId}?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/tickets/${ticketId}?payment=cancelled`,
      metadata: {
        ticketId,
        userId: session.user.id,
        paymentType,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Create checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
