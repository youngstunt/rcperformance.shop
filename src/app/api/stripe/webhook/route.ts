import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe, isStripeConfigured } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { sendPaymentConfirmationEmail, sendAdminPaymentReceivedEmail } from "@/lib/email"
import Stripe from "stripe"

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return new NextResponse("Webhook not configured", { status: 503 })
  }

  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    return new NextResponse("No signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session

        const ticketId = session.metadata?.ticketId
        const userId = session.metadata?.userId
        const paymentType = session.metadata?.paymentType || "NEW_TICKET"

        if (!ticketId || !userId) {
          console.error("Missing metadata in checkout session")
          break
        }

        // Create payment record
        await prisma.payment.create({
          data: {
            ticketId,
            userId,
            stripePaymentId: session.payment_intent as string,
            stripeSessionId: session.id,
            amount: session.amount_total || 20000,
            currency: session.currency || "usd",
            status: "COMPLETED",
            paymentType: paymentType as "NEW_TICKET" | "REOPEN",
            paidAt: new Date(),
          },
        })

        // Update ticket status
        const newStatus = paymentType === "REOPEN" ? "REOPENED" : "OPEN"
        const ticket = await prisma.ticket.update({
          where: { id: ticketId },
          data: { status: newStatus },
          include: {
            user: {
              select: { email: true },
            },
          },
        })

        // Create system message
        await prisma.ticketMessage.create({
          data: {
            ticketId,
            senderId: userId,
            content:
              paymentType === "REOPEN"
                ? "Ticket reopened - payment received"
                : "Payment received - your ticket is now open",
            isSystem: true,
          },
        })

        // Send confirmation email to customer
        const vehicleInfo = `${ticket.vehicleYear} ${ticket.vehicleMake} ${ticket.vehicleModel}`
        if (ticket.user.email) {
          await sendPaymentConfirmationEmail(
            ticket.user.email,
            ticketId,
            vehicleInfo,
            session.amount_total || 20000
          )
        }

        // Send notification email to admin
        sendAdminPaymentReceivedEmail(
          ticketId,
          ticket.user.email || "Unknown",
          vehicleInfo,
          session.amount_total || 20000,
          paymentType
        ).catch((err) => console.error("Failed to send admin payment email:", err))

        console.log(`Payment completed for ticket ${ticketId}`)
        break
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error("Payment failed:", paymentIntent.id)
        // Could update payment record status to FAILED if we created one earlier
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return new NextResponse("Webhook processing failed", { status: 500 })
  }
}
