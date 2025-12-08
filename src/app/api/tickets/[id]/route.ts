import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/tickets/[id] - Get single ticket with messages and files
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

    const ticket = await prisma.ticket.findFirst({
      where: {
        id,
        ...(isAdmin ? {} : { userId: session.user.id }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        messages: {
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
        },
        files: {
          include: {
            uploader: {
              select: {
                id: true,
                name: true,
                role: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json({ ticket })
  } catch (error) {
    console.error("Get ticket error:", error)
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 })
  }
}

// PATCH /api/tickets/[id] - Update ticket status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const { status } = await request.json()
    const isAdmin = session.user.role === "ADMIN"

    // Find ticket
    const ticket = await prisma.ticket.findFirst({
      where: {
        id,
        ...(isAdmin ? {} : { userId: session.user.id }),
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Validate status changes
    const validStatuses = [
      "OPEN",
      "IN_PROGRESS",
      "AWAITING_CUSTOMER",
      "COMPLETED",
      "CLOSED",
      "REOPENED",
    ]

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Non-admins can only close or reopen their tickets
    if (!isAdmin && status) {
      if (!["CLOSED", "REOPENED"].includes(status)) {
        return NextResponse.json(
          { error: "You can only close or reopen your tickets" },
          { status: 403 }
        )
      }
    }

    const updateData: any = {}
    if (status) {
      updateData.status = status
      if (status === "COMPLETED") {
        updateData.completedAt = new Date()
      }
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: updateData,
    })

    // Create system message for status change
    if (status) {
      await prisma.ticketMessage.create({
        data: {
          ticketId: id,
          senderId: session.user.id,
          content: `Status changed to ${status.replace("_", " ").toLowerCase()}`,
          isSystem: true,
        },
      })
    }

    return NextResponse.json({ ticket: updatedTicket })
  } catch (error) {
    console.error("Update ticket error:", error)
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}
