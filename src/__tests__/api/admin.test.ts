import { describe, it, expect } from 'vitest'
import { GET } from '@/app/api/admin/tickets/route'
import { mockPrisma, seedTestUser, seedAdminUser, seedTestTicket, mockDb } from '../mocks/prisma'
import { setMockSession, createUserSession, createAdminSession, clearMockSession, mockGetServerSession } from '../mocks/next-auth'
import { createMockRequest } from '../mocks/next'

describe('Admin Tickets API', () => {
  describe('GET /api/admin/tickets', () => {
    it('returns 401 if not authenticated', async () => {
      clearMockSession()
      mockGetServerSession.mockResolvedValueOnce(null)

      const request = createMockRequest('http://localhost:3000/api/admin/tickets')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns 401 if user is not admin', async () => {
      const user = seedTestUser()
      setMockSession(createUserSession({ id: user.id }))
      mockGetServerSession.mockResolvedValueOnce(createUserSession({ id: user.id }))

      const request = createMockRequest('http://localhost:3000/api/admin/tickets')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
    })

    it('returns all tickets for admin', async () => {
      const admin = seedAdminUser()
      const user1 = seedTestUser({ id: 'user-1', email: 'user1@test.com' })
      const user2 = seedTestUser({ id: 'user-2', email: 'user2@test.com' })

      seedTestTicket(user1.id, { id: 'ticket-1' })
      seedTestTicket(user2.id, { id: 'ticket-2' })

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))

      mockPrisma.ticket.findMany.mockResolvedValueOnce([
        {
          id: 'ticket-1',
          userId: user1.id,
          vehicleMake: 'Subaru',
          vehicleModel: 'WRX',
          vehicleYear: 2020,
          status: 'OPEN',
          user: { id: user1.id, name: 'User 1', email: 'user1@test.com' },
          messages: [],
          files: [],
          payments: [],
        },
        {
          id: 'ticket-2',
          userId: user2.id,
          vehicleMake: 'Ford',
          vehicleModel: 'Mustang',
          vehicleYear: 2022,
          status: 'IN_PROGRESS',
          user: { id: user2.id, name: 'User 2', email: 'user2@test.com' },
          messages: [],
          files: [],
          payments: [],
        },
      ])

      mockPrisma.ticket.groupBy.mockResolvedValueOnce([
        { status: 'OPEN', _count: 1 },
        { status: 'IN_PROGRESS', _count: 1 },
      ])

      const request = createMockRequest('http://localhost:3000/api/admin/tickets')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.tickets).toHaveLength(2)
      expect(data.statusCounts).toBeDefined()
    })

    it('filters tickets by status', async () => {
      const admin = seedAdminUser()
      const user = seedTestUser()

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))

      mockPrisma.ticket.findMany.mockResolvedValueOnce([
        {
          id: 'ticket-1',
          userId: user.id,
          vehicleMake: 'Subaru',
          vehicleModel: 'WRX',
          vehicleYear: 2020,
          status: 'OPEN',
          user: { id: user.id, name: user.name, email: user.email },
          messages: [],
          files: [],
          payments: [],
        },
      ])

      mockPrisma.ticket.groupBy.mockResolvedValueOnce([
        { status: 'OPEN', _count: 1 },
      ])

      const request = createMockRequest('http://localhost:3000/api/admin/tickets?status=OPEN')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(mockPrisma.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { status: 'OPEN' },
        })
      )
    })

    it('includes user info with tickets', async () => {
      const admin = seedAdminUser()
      const user = seedTestUser()
      seedTestTicket(user.id)

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))

      mockPrisma.ticket.findMany.mockResolvedValueOnce([
        {
          id: 'test-ticket-id',
          userId: user.id,
          vehicleMake: 'Subaru',
          vehicleModel: 'WRX',
          vehicleYear: 2020,
          status: 'OPEN',
          user: { id: user.id, name: 'Test User', email: 'test@example.com' },
          messages: [],
          files: [],
          payments: [],
        },
      ])

      mockPrisma.ticket.groupBy.mockResolvedValueOnce([])

      const request = createMockRequest('http://localhost:3000/api/admin/tickets')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.tickets[0].user).toBeDefined()
      expect(data.tickets[0].user.email).toBe('test@example.com')
    })

    it('returns status counts', async () => {
      const admin = seedAdminUser()

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))

      mockPrisma.ticket.findMany.mockResolvedValueOnce([])
      mockPrisma.ticket.groupBy.mockResolvedValueOnce([
        { status: 'PENDING_PAYMENT', _count: 5 },
        { status: 'OPEN', _count: 3 },
        { status: 'IN_PROGRESS', _count: 2 },
        { status: 'COMPLETED', _count: 10 },
      ])

      const request = createMockRequest('http://localhost:3000/api/admin/tickets')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.statusCounts).toEqual({
        PENDING_PAYMENT: 5,
        OPEN: 3,
        IN_PROGRESS: 2,
        COMPLETED: 10,
      })
    })

    it('orders tickets by updatedAt descending', async () => {
      const admin = seedAdminUser()

      setMockSession(createAdminSession({ id: admin.id }))
      mockGetServerSession.mockResolvedValueOnce(createAdminSession({ id: admin.id }))

      mockPrisma.ticket.findMany.mockResolvedValueOnce([])
      mockPrisma.ticket.groupBy.mockResolvedValueOnce([])

      const request = createMockRequest('http://localhost:3000/api/admin/tickets')
      await GET(request)

      expect(mockPrisma.ticket.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { updatedAt: 'desc' },
        })
      )
    })
  })
})
