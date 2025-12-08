import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/admin/tickets - List all tickets (admin only)
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const tickets = await prisma.ticket.findMany({
      where: status ? { status: status as any } : {},
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
        files: true,
        payments: {
          where: { status: "COMPLETED" },
        },
      },
      orderBy: { updatedAt: "desc" },
    })

    // Count by status
    const counts = await prisma.ticket.groupBy({
      by: ["status"],
      _count: true,
    })

    const statusCounts: Record<string, number> = {}
    for (const item of counts) {
      statusCounts[item.status] = item._count
    }

    return NextResponse.json({ tickets, statusCounts })
  } catch (error) {
    console.error("Get admin tickets error:", error)
    return NextResponse.json({ error: "Failed to fetch tickets" }, { status: 500 })
  }
}
