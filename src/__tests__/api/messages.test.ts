import { describe, it, expect, vi } from 'vitest'
import { GET, POST } from '@/app/api/tickets/[id]/messages/route'
import { mockPrisma, seedTestUser, seedAdminUser, seedTestTicket } from '../mocks/prisma'
import { setMockSession, createUserSession, createAdminSession, clearMockSession, mockGetServerSession } from '../mocks/next-auth'
import { createMockRequest } from '../mocks/next'
import { sentEmails } from '../mocks/nodemailer'

describe('Ticket Messages API', () => {
  describe('GET /api/tickets/[id]/messages', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets/test-id/messages')
      const response = await GET(request, { params: Promise.resolve({ id: 'test-id' }) })
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns 404 if ticket not found', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets/non-existent/messages')
      const response = await GET(request, { params: Promise.resolve({ id: 'non-existent' }) })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Ticket not found')
    })

    it('returns messages for ticket owner', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticketMessage.findMany.mockResolvedValueOnce([
        {
          id: 'msg-1',
          ticketId: ticket.id,
          senderId: user.id,
          content: 'Hello, I need help with my tune',
          isSystem: false,
          createdAt: new Date(),
          sender: { id: user.id, name: user.name, email: user.email, role: 'USER' },
          files: [],
        },
      ])

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`)
      const response = await GET(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.messages).toHaveLength(1)
      expect(data.messages[0].content).toBe('Hello, I need help with my tune')
    })

    it('returns messages for admin on any ticket', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticketMessage.findMany.mockResolvedValueOnce([])

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`)
      const response = await GET(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.messages).toBeDefined()
    })

    it('orders messages by createdAt ascending', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticketMessage.findMany.mockResolvedValueOnce([])

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`)
      await GET(request, { params: Promise.resolve({ id: ticket.id }) })

      expect(mockPrisma.ticketMessage.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { createdAt: 'asc' },
        })
      )
    })

    it('includes sender info with messages', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticketMessage.findMany.mockResolvedValueOnce([
        {
          id: 'msg-1',
          ticketId: ticket.id,
          senderId: user.id,
          content: 'Test message',
          isSystem: false,
          createdAt: new Date(),
          sender: { id: user.id, name: 'Test User', email: 'test@example.com', role: 'USER' },
          files: [],
        },
      ])

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`)
      const response = await GET(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(data.messages[0].sender).toBeDefined()
      expect(data.messages[0].sender.name).toBe('Test User')
    })
  })

  describe('POST /api/tickets/[id]/messages', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets/test-id/messages', {
        method: 'POST',
        body: { content: 'Test message' },
      })
      const response = await POST(request, { params: Promise.resolve({ id: 'test-id' }) })
      const data = await response.json()

      expect(response.status).toBe(401)
    })

    it('returns 400 if content is empty', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const request = createMockRequest('http://localhost:3000/api/tickets/test-id/messages', {
        method: 'POST',
        body: { content: '' },
      })
      const response = await POST(request, { params: Promise.resolve({ id: 'test-id' }) })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Message content required')
    })

    it('returns 400 if content is only whitespace', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const request = createMockRequest('http://localhost:3000/api/tickets/test-id/messages', {
        method: 'POST',
        body: { content: '   ' },
      })
      const response = await POST(request, { params: Promise.resolve({ id: 'test-id' }) })
      const data = await response.json()

      expect(response.status).toBe(400)
    })

    it('returns 404 if ticket not found', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets/non-existent/messages', {
        method: 'POST',
        body: { content: 'Test message' },
      })
      const response = await POST(request, { params: Promise.resolve({ id: 'non-existent' }) })
      const data = await response.json()

      expect(response.status).toBe(404)
    })

    it('creates message for ticket owner', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({ ...ticket, user: { email: user.email } })
      mockPrisma.ticketMessage.create.mockResolvedValueOnce({
        id: 'msg-new',
        ticketId: ticket.id,
        senderId: user.id,
        content: 'My new message',
        isSystem: false,
        createdAt: new Date(),
        sender: { id: user.id, name: user.name, email: user.email, role: 'USER' },
        files: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`, {
        method: 'POST',
        body: { content: 'My new message' },
      })
      const response = await POST(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.message.content).toBe('My new message')
    })

    it('trims message content', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({ ...ticket, user: { email: user.email } })
      mockPrisma.ticketMessage.create.mockResolvedValueOnce({
        id: 'msg-new',
        ticketId: ticket.id,
        senderId: user.id,
        content: 'Trimmed content',
        isSystem: false,
        createdAt: new Date(),
        sender: { id: user.id, name: user.name, email: user.email, role: 'USER' },
        files: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`, {
        method: 'POST',
        body: { content: '  Trimmed content  ' },
      })
      await POST(request, { params: Promise.resolve({ id: ticket.id }) })

      expect(mockPrisma.ticketMessage.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            content: 'Trimmed content',
          }),
        })
      )
    })

    it('updates ticket status to IN_PROGRESS when admin responds to OPEN ticket', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id, { status: 'OPEN' })

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({ ...ticket, user: { email: user.email } })
      mockPrisma.ticketMessage.create.mockResolvedValueOnce({
        id: 'msg-new',
        ticketId: ticket.id,
        senderId: admin.id,
        content: 'Working on your tune',
        isSystem: false,
        createdAt: new Date(),
        sender: { id: admin.id, name: admin.name, email: admin.email, role: 'ADMIN' },
        files: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`, {
        method: 'POST',
        body: { content: 'Working on your tune' },
      })
      await POST(request, { params: Promise.resolve({ id: ticket.id }) })

      expect(mockPrisma.ticket.update).toHaveBeenCalledWith({
        where: { id: ticket.id },
        data: { status: 'IN_PROGRESS' },
      })
    })

    it('does not update status if admin responds to non-OPEN ticket', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id, { status: 'IN_PROGRESS' })

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({ ...ticket, user: { email: user.email } })
      mockPrisma.ticketMessage.create.mockResolvedValueOnce({
        id: 'msg-new',
        ticketId: ticket.id,
        senderId: admin.id,
        content: 'Update on your tune',
        isSystem: false,
        createdAt: new Date(),
        sender: { id: admin.id, name: admin.name, email: admin.email, role: 'ADMIN' },
        files: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`, {
        method: 'POST',
        body: { content: 'Update on your tune' },
      })
      await POST(request, { params: Promise.resolve({ id: ticket.id }) })

      expect(mockPrisma.ticket.update).not.toHaveBeenCalled()
    })

    it('sends email notification when admin sends message', async () => {
      const user = seedTestUser({ email: 'customer@test.com' })
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id, { status: 'IN_PROGRESS' })

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({ ...ticket, user: { email: 'customer@test.com' } })
      mockPrisma.ticketMessage.create.mockResolvedValueOnce({
        id: 'msg-new',
        ticketId: ticket.id,
        senderId: admin.id,
        content: 'Your tune is ready!',
        isSystem: false,
        createdAt: new Date(),
        sender: { id: admin.id, name: admin.name, email: admin.email, role: 'ADMIN' },
        files: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`, {
        method: 'POST',
        body: { content: 'Your tune is ready!' },
      })
      await POST(request, { params: Promise.resolve({ id: ticket.id }) })

      const updateEmail = sentEmails.find(e => e.to === 'customer@test.com')
      expect(updateEmail).toBeDefined()
      expect(updateEmail?.subject).toContain('Ticket Update')
    })

    it('attaches files to message when fileIds provided', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({ ...ticket, user: { email: user.email } })
      mockPrisma.ticketMessage.create.mockResolvedValueOnce({
        id: 'msg-new',
        ticketId: ticket.id,
        senderId: user.id,
        content: 'Here are my files',
        isSystem: false,
        createdAt: new Date(),
        sender: { id: user.id, name: user.name, email: user.email, role: 'USER' },
        files: [],
      })
      mockPrisma.ticketFile.updateMany = vi.fn().mockResolvedValue({ count: 2 })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`, {
        method: 'POST',
        body: { content: 'Here are my files', fileIds: ['file-1', 'file-2'] },
      })
      await POST(request, { params: Promise.resolve({ id: ticket.id }) })

      expect(mockPrisma.ticketFile.updateMany).toHaveBeenCalledWith({
        where: {
          id: { in: ['file-1', 'file-2'] },
          ticketId: ticket.id,
        },
        data: {
          messageId: 'msg-new',
        },
      })
    })

    it('allows admin to message any ticket', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({ ...ticket, user: { email: user.email } })
      mockPrisma.ticketMessage.create.mockResolvedValueOnce({
        id: 'msg-new',
        ticketId: ticket.id,
        senderId: admin.id,
        content: 'Admin response',
        isSystem: false,
        createdAt: new Date(),
        sender: { id: admin.id, name: admin.name, email: admin.email, role: 'ADMIN' },
        files: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}/messages`, {
        method: 'POST',
        body: { content: 'Admin response' },
      })
      const response = await POST(request, { params: Promise.resolve({ id: ticket.id }) })

      expect(response.status).toBe(201)
    })
  })
})
