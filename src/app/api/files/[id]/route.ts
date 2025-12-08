import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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

    // Get file with ticket to verify access
    const file = await prisma.ticketFile.findUnique({
      where: { id },
      include: {
        ticket: {
          select: {
            userId: true,
          },
        },
      },
    })

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Verify access
    if (!isAdmin && file.ticket.userId !== session.user.id) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Return file data from database with appropriate headers
    return new NextResponse(new Uint8Array(file.data), {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `attachment; filename="${file.originalName}"`,
        "Content-Length": file.fileSize.toString(),
      },
    })
  } catch (error) {
    console.error("File download error:", error)
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 })
  }
}
