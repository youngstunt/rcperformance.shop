import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GET, POST } from '@/app/api/tickets/route'
import { GET as getTicketById, PATCH as updateTicket } from '@/app/api/tickets/[id]/route'
import { mockPrisma, seedTestUser, seedAdminUser, seedTestTicket, mockDb } from '../mocks/prisma'
import { setMockSession, createUserSession, createAdminSession, clearMockSession, mockGetServerSession } from '../mocks/next-auth'
import { createMockRequest } from '../mocks/next'

describe('Tickets API', () => {
  describe('GET /api/tickets', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns empty array when user has no tickets', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.tickets).toEqual([])
    })

    it('returns user tickets with related data', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.tickets).toHaveLength(1)
      expect(data.tickets[0].id).toBe(ticket.id)
      expect(data.tickets[0].vehicleMake).toBe('Subaru')
    })

    it('only returns tickets belonging to the authenticated user', async () => {
      const user1 = seedTestUser({ id: 'user-1', email: 'user1@test.com' })
      const user2 = seedTestUser({ id: 'user-2', email: 'user2@test.com' })
      seedTestTicket(user1.id, { id: 'ticket-1' })
      seedTestTicket(user2.id, { id: 'ticket-2' })

      setMockSession(createUserSession({ id: user1.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user1.id }))

      // Mock findMany to filter by userId
      mockPrisma.ticket.findMany.mockResolvedValueOnce(
        Array.from(mockDb.tickets.values()).filter(t => t.userId === user1.id)
      )

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.tickets).toHaveLength(1)
      expect(data.tickets[0].id).toBe('ticket-1')
    })
  })

  describe('POST /api/tickets', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets', {
        method: 'POST',
        body: { vehicleMake: 'Subaru', vehicleModel: 'WRX', vehicleYear: 2020, ecuReadTool: 'Tactrix' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns 400 if required fields are missing', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const request = createMockRequest('http://localhost:3000/api/tickets', {
        method: 'POST',
        body: { vehicleMake: 'Subaru' }, // Missing required fields
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('required')
    })

    it('creates a ticket with PENDING_PAYMENT status', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const request = createMockRequest('http://localhost:3000/api/tickets', {
        method: 'POST',
        body: {
          vehicleMake: 'Subaru',
          vehicleModel: 'WRX',
          vehicleYear: '2020',
          ecuReadTool: 'Tactrix',
          notes: 'Stage 2 tune please',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.ticket).toBeDefined()
      expect(data.ticket.vehicleMake).toBe('Subaru')
      expect(data.ticket.vehicleModel).toBe('WRX')
      expect(data.ticket.vehicleYear).toBe(2020)
      expect(data.ticket.status).toBe('PENDING_PAYMENT')
      expect(data.ticket.userId).toBe(user.id)
    })

    it('handles optional fields correctly', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const request = createMockRequest('http://localhost:3000/api/tickets', {
        method: 'POST',
        body: {
          vehicleMake: 'Ford',
          vehicleModel: 'Mustang',
          vehicleYear: '2022',
          vehicleVin: 'ABC123',
          ecuReadTool: 'HP Tuners',
          ecuType: 'Ford PCM',
          tuneType: 'Stage 1',
          notes: 'Want more power',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.ticket.vehicleVin).toBe('ABC123')
      expect(data.ticket.ecuType).toBe('Ford PCM')
      expect(data.ticket.tuneType).toBe('Stage 1')
      expect(data.ticket.notes).toBe('Want more power')
    })
  })

  describe('GET /api/tickets/[id]', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets/test-id')
      const response = await getTicketById(request, { params: Promise.resolve({ id: 'test-id' }) })
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns 404 if ticket not found', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets/non-existent')
      const response = await getTicketById(request, { params: Promise.resolve({ id: 'non-existent' }) })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Ticket not found')
    })

    it('returns ticket with all related data for owner', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({
        ...ticket,
        user: { id: user.id, name: user.name, email: user.email },
        messages: [],
        files: [],
        payments: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`)
      const response = await getTicketById(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ticket.id).toBe(ticket.id)
      expect(data.ticket.vehicleMake).toBe('Subaru')
    })

    it('allows admin to view any ticket', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id)

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce({
        ...ticket,
        user: { id: user.id, name: user.name, email: user.email },
        messages: [],
        files: [],
        payments: [],
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`)
      const response = await getTicketById(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ticket.id).toBe(ticket.id)
    })

    it('prevents user from viewing another user ticket', async () => {
      const user1 = seedTestUser({ id: 'user-1', email: 'user1@test.com' })
      const user2 = seedTestUser({ id: 'user-2', email: 'user2@test.com' })
      const ticket = seedTestTicket(user1.id)

      setMockSession(createUserSession({ id: user2.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user2.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(null) // Simulates not finding ticket for this user

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`)
      const response = await getTicketById(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(404)
    })
  })

  describe('PATCH /api/tickets/[id]', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/tickets/test-id', {
        method: 'PATCH',
        body: { status: 'CLOSED' },
      })
      const response = await updateTicket(request, { params: Promise.resolve({ id: 'test-id' }) })
      const data = await response.json()

      expect(response.status).toBe(401)
    })

    it('returns 400 for invalid status', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id)
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        body: { status: 'INVALID_STATUS' },
      })
      const response = await updateTicket(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid status')
    })

    it('allows user to close their own ticket', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id, { status: 'OPEN' })
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticket.update.mockResolvedValueOnce({ ...ticket, status: 'CLOSED' })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        body: { status: 'CLOSED' },
      })
      const response = await updateTicket(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ticket.status).toBe('CLOSED')
    })

    it('prevents user from changing status to IN_PROGRESS', async () => {
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id, { status: 'OPEN' })
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        body: { status: 'IN_PROGRESS' },
      })
      const response = await updateTicket(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toContain('can only close or reopen')
    })

    it('allows admin to change status to any valid status', async () => {
      const user = seedTestUser()
      const admin = seedAdminUser()
      const ticket = seedTestTicket(user.id, { status: 'OPEN' })

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticket.update.mockResolvedValueOnce({ ...ticket, status: 'IN_PROGRESS' })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        body: { status: 'IN_PROGRESS' },
      })
      const response = await updateTicket(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ticket.status).toBe('IN_PROGRESS')
    })

    it('sets completedAt when status is COMPLETED', async () => {
      const admin = seedAdminUser()
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id, { status: 'IN_PROGRESS' })

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticket.update.mockResolvedValueOnce({
        ...ticket,
        status: 'COMPLETED',
        completedAt: new Date(),
      })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        body: { status: 'COMPLETED' },
      })
      const response = await updateTicket(request, { params: Promise.resolve({ id: ticket.id }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.ticket.status).toBe('COMPLETED')
      expect(data.ticket.completedAt).toBeDefined()
    })

    it('creates system message on status change', async () => {
      const admin = seedAdminUser()
      const user = seedTestUser()
      const ticket = seedTestTicket(user.id, { status: 'OPEN' })

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))
      mockPrisma.ticket.findFirst.mockResolvedValueOnce(ticket)
      mockPrisma.ticket.update.mockResolvedValueOnce({ ...ticket, status: 'IN_PROGRESS' })

      const request = createMockRequest(`http://localhost:3000/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        body: { status: 'IN_PROGRESS' },
      })
      await updateTicket(request, { params: Promise.resolve({ id: ticket.id }) })

      expect(mockPrisma.ticketMessage.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          ticketId: ticket.id,
          isSystem: true,
          content: expect.stringContaining('in progress'),
        }),
      })
    })
  })
})
