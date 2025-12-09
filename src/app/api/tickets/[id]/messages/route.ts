import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendTicketUpdateEmail, sendAdminCustomerMessageEmail } from "@/lib/email"

// GET /api/tickets/[id]/messages - Get messages for a ticket
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const isAdmin = session.user.role === "ADMIN"

    // Verify access to ticket
    const ticket = await prisma.ticket.findFirst({
      where: {
        id,
        ...(isAdmin ? {} : { userId: session.user.id }),
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    const messages = await prisma.ticketMessage.findMany({
      where: { ticketId: id },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        files: true,
      },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// POST /api/tickets/[id]/messages - Add message to ticket
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { content, fileIds } = await request.json()
    const isAdmin = session.user.role === "ADMIN"

    if (!content?.trim()) {
      return NextResponse.json({ error: "Message content required" }, { status: 400 })
    }

    // Verify access to ticket
    const ticket = await prisma.ticket.findFirst({
      where: {
        id,
        ...(isAdmin ? {} : { userId: session.user.id }),
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Create message
    const message = await prisma.ticketMessage.create({
      data: {
        ticketId: id,
        senderId: session.user.id,
        content: content.trim(),
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        files: true,
      },
    })

    // Attach files to message if provided
    if (fileIds?.length > 0) {
      await prisma.ticketFile.updateMany({
        where: {
          id: { in: fileIds },
          ticketId: id,
        },
        data: {
          messageId: message.id,
        },
      })
    }

    // Update ticket status if admin responds
    if (isAdmin && ticket.status === "OPEN") {
      await prisma.ticket.update({
        where: { id },
        data: { status: "IN_PROGRESS" },
      })
    }

    // Send email notification to the other party
    const vehicleInfo = `${ticket.vehicleYear} ${ticket.vehicleMake} ${ticket.vehicleModel}`

    if (isAdmin && ticket.user.email) {
      // Admin sent message, notify customer
      sendTicketUpdateEmail(
        ticket.user.email,
        ticket.id,
        vehicleInfo,
        content.trim()
      ).catch((err) => console.error("Failed to send customer notification email:", err))
    } else if (!isAdmin) {
      // Customer sent message, notify admin
      sendAdminCustomerMessageEmail(
        ticket.id,
        session.user.email || "Unknown",
        vehicleInfo,
        content.trim()
      ).catch((err) => console.error("Failed to send admin notification email:", err))
    }

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    console.error("Create message error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
