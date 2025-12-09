import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { sendAdminNewTicketEmail } from "@/lib/email"

// GET /api/tickets - List user's tickets
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: session.user.id },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
        files: {
          where: { fileType: "TUNED_FILE" },
        },
        payments: {
          where: { status: "COMPLETED" },
        },
      },
      orderBy: { updatedAt: "desc" },
    })

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error("Get tickets error:", error)
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}

// POST /api/tickets - Create new ticket (draft, needs payment)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const {
      vehicleMake,
      vehicleModel,
      vehicleYear,
      vehicleVin,
      ecuReadTool,
      ecuType,
      tuneType,
      notes,
    } = data

    // Validation
    if (!vehicleMake || !vehicleModel || !vehicleYear || !ecuReadTool) {
      return NextResponse.json(
        { error: "Vehicle make, model, year, and ECU read tool are required" },
        { status: 400 }
      )
    }

    const ticket = await prisma.ticket.create({
      data: {
        userId: session.user.id,
        vehicleMake,
        vehicleModel,
        vehicleYear: parseInt(vehicleYear),
        vehicleVin: vehicleVin || null,
        ecuReadTool,
        ecuType: ecuType || null,
        tuneType: tuneType || null,
        notes: notes || null,
        status: "PENDING_PAYMENT",
      },
    })

    // Send admin notification email (don't await to avoid blocking response)
    const vehicleInfo = `${vehicleYear} ${vehicleMake} ${vehicleModel}`
    sendAdminNewTicketEmail(
      ticket.id,
      session.user.email || "Unknown",
      vehicleInfo,
      ecuReadTool,
      tuneType,
      notes
    ).catch((err) => console.error("Failed to send admin new ticket email:", err))

    return NextResponse.json({ ticket }, { status: 201 })
  } catch (error) {
    console.error("Create ticket error:", error)
    return NextResponse.json({ error: "Failed to create ticket" }, { status: 500 })
  }
}
