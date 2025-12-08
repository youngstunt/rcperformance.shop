import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"

// Max file size: 50MB
const MAX_FILE_SIZE = 50 * 1024 * 1024

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const ticketId = formData.get("ticketId") as string
    const fileType = (formData.get("fileType") as string) || "OTHER"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!ticketId) {
      return NextResponse.json({ error: "Ticket ID required" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large (max 50MB)" }, { status: 400 })
    }

    const isAdmin = session.user.role === "ADMIN"

    // Verify access to ticket
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: ticketId,
        ...(isAdmin ? {} : { userId: session.user.id }),
      },
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    // Read file data
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const fileExtension = file.name.split(".").pop() || "bin"
    const uniqueFilename = `${randomUUID()}.${fileExtension}`

    // Determine file type
    let detectedFileType = fileType
    if (isAdmin && fileType === "OTHER") {
      detectedFileType = "TUNED_FILE"
    } else if (!isAdmin && fileType === "OTHER") {
      detectedFileType = "ECU_DUMP"
    }

    // Create database record with file data
    const ticketFile = await prisma.ticketFile.create({
      data: {
        ticketId,
        uploaderId: session.user.id,
        filename: uniqueFilename,
        originalName: file.name,
        fileSize: file.size,
        mimeType: file.type || "application/octet-stream",
        fileType: detectedFileType as any,
        data: buffer,
      },
      select: {
        id: true,
        ticketId: true,
        filename: true,
        originalName: true,
        fileSize: true,
        mimeType: true,
        fileType: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ file: ticketFile }, { status: 201 })
  } catch (error) {
    console.error("File upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
