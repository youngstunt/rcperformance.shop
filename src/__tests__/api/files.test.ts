import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '@/app/api/files/upload/route'
import { GET } from '@/app/api/files/[id]/route'
import { mockPrisma, seedTestUser, seedAdminUser, seedTestTicket, mockDb } from '../mocks/prisma'
import { setMockSession, createUserSession, createAdminSession, clearMockSession, mockGetServerSession } from '../mocks/next-auth'

// Helper to create a mock File
function createMockFile(name: string, content: string, type: string = 'application/octet-stream'): File {
  const blob = new Blob([content], { type })
  return new File([blob], name, { type })
}

// Helper to create FormData request
function createFormDataRequest(url: string, formData: FormData): Request {
  return new Request(url, {
    method: 'POST',
    body: formData,
  })
}

describe('Files API', () => {
  describe('POST /api/files/upload', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const formData = new FormData()
      formData.append('file', createMockFile('test.bin', 'file content'))
      formData.append('ticketId', 'test-ticket-id')

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns 400 if no file provided', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const formData = new FormData()
      formData.append('ticketId', 'test-ticket-id')

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('No file provided')
    })

    it('returns 400 if ticket ID not provided', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const formData = new FormData()
      formData.append('file', createMockFile('test.bin', 'file content'))

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Ticket ID required')
    })

    it('returns 404 if ticket not found', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(null)

      const formData = new FormData()
      formData.append('file', createMockFile('test.bin', 'file content'))
      formData.append('ticketId', 'non-existent-ticket')

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Ticket not found')
    })

    it('uploads file for user own ticket', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const formData = new FormData()
      formData.append('file', createMockFile('ecu_dump.bin', 'binary content'))
      formData.append('ticketId', ticket.id)

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.file).toBeDefined()
      expect(data.file.originalName).toBe('ecu_dump.bin')
      expect(data.file.ticketId).toBe(ticket.id)
    })

    it('sets fileType to ECU_DUMP for regular user uploads', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const formData = new FormData()
      formData.append('file', createMockFile('dump.bin', 'content'))
      formData.append('ticketId', ticket.id)

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.file.fileType).toBe('ECU_DUMP')
    })

    it('sets fileType to TUNED_FILE for admin uploads', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const formData = new FormData()
      formData.append('file', createMockFile('tuned.bin', 'tuned content'))
      formData.append('ticketId', ticket.id)

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.file.fileType).toBe('TUNED_FILE')
    })

    it('respects explicit fileType when provided', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const formData = new FormData()
      formData.append('file', createMockFile('datalog.csv', 'log data'))
      formData.append('ticketId', ticket.id)
      formData.append('fileType', 'DATALOG')

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.file.fileType).toBe('DATALOG')
    })

    it('allows admin to upload to any ticket', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const formData = new FormData()
      formData.append('file', createMockFile('tuned_file.bin', 'tuned'))
      formData.append('ticketId', ticket.id)

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      const response = await POST(request)

      expect(response.status).toBe(201)
    })

    it('stores file data in database', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const fileContent = 'binary file content here'
      const formData = new FormData()
      formData.append('file', createMockFile('test.bin', fileContent))
      formData.append('ticketId', ticket.id)

      const request = createFormDataRequest('http://localhost:3000/api/files/upload', formData)
      await POST(request)

      expect(mockPrisma.ticketFile.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            ticketId: ticket.id,
            uploaderId: user.id,
            data: expect.any(Buffer),
          }),
        })
      )
    })
  })

  describe('GET /api/files/[id]', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const request = new Request('http://localhost:3000/api/files/test-file-id')
      const response = await GET(request, { params: Promise.resolve({ id: 'test-file-id' }) })
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns 404 if file not found', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticketFile.findUnique.mockResolvedValueOnce(null)

      const request = new Request('http://localhost:3000/api/files/non-existent')
      const response = await GET(request, { params: Promise.resolve({ id: 'non-existent' }) })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('File not found')
    })

    it('returns 403 if user does not own the ticket', async () => {
      const user1 = seedTestUser({ id: 'user-1', email: 'user1@test.com' })
      const user2 = seedTestUser({ id: 'user-2', email: 'user2@test.com' })
      const ticket = seedTestTicket(user1.id)

      setMockSession(createUserSession({ id: user2.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user2.id }))
      mockPrisma.ticketFile.findUnique.mockResolvedValueOnce({
        id: 'file-1',
        ticketId: ticket.id,
        uploaderId: user1.id,
        filename: 'test.bin',
        originalName: 'test.bin',
        fileSize: 100,
        mimeType: 'application/octet-stream',
        fileType: 'ECU_DUMP',
        data: Buffer.from('content'),
        createdAt: new Date(),
        messageId: null,
        ticket: { userId: user1.id },
      })

      const request = new Request('http://localhost:3000/api/files/file-1')
      const response = await GET(request, { params: Promise.resolve({ id: 'file-1' }) })
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('Access denied')
    })

    it('returns file data with correct headers for owner', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      const fileData = Buffer.from('binary file content')

      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticketFile.findUnique.mockResolvedValueOnce({
        id: 'file-1',
        ticketId: ticket.id,
        uploaderId: user.id,
        filename: 'uuid.bin',
        originalName: 'my_ecu_dump.bin',
        fileSize: fileData.length,
        mimeType: 'application/octet-stream',
        fileType: 'ECU_DUMP',
        data: fileData,
        createdAt: new Date(),
        messageId: null,
        ticket: { userId: user.id },
      })

      const request = new Request('http://localhost:3000/api/files/file-1')
      const response = await GET(request, { params: Promise.resolve({ id: 'file-1' }) })

      expect(response.status).toBe(200)
      expect(response.headers.get('Content-Type')).toBe('application/octet-stream')
      expect(response.headers.get('Content-Disposition')).toBe('attachment; filename="my_ecu_dump.bin"')
      expect(response.headers.get('Content-Length')).toBe(String(fileData.length))
    })

    it('allows admin to download any file', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id)
      const fileData = Buffer.from('content')

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticketFile.findUnique.mockResolvedValueOnce({
        id: 'file-1',
        ticketId: ticket.id,
        uploaderId: user.id,
        filename: 'test.bin',
        originalName: 'test.bin',
        fileSize: fileData.length,
        mimeType: 'application/octet-stream',
        fileType: 'ECU_DUMP',
        data: fileData,
        createdAt: new Date(),
        messageId: null,
        ticket: { userId: user.id },
      })

      const request = new Request('http://localhost:3000/api/files/file-1')
      const response = await GET(request, { params: Promise.resolve({ id: 'file-1' }) })

      expect(response.status).toBe(200)
    })
  })
})
