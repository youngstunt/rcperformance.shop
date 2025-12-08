import { vi } from 'vitest'

// Mock NextResponse
export class MockNextResponse {
  private body: any
  private init: ResponseInit

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    this.body = body
    this.init = init || {}
  }

  static json(data: any, init?: ResponseInit) {
    const response = new MockNextResponse(JSON.stringify(data), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    })
    ;(response as any)._jsonData = data
    return response
  }

  static redirect(url: string | URL, status?: number) {
    return new MockNextResponse(null, {
      status: status || 307,
      headers: { Location: url.toString() },
    })
  }

  get status() {
    return this.init.status || 200
  }

  get headers() {
    return new Headers(this.init.headers)
  }

  async json() {
    if ((this as any)._jsonData) return (this as any)._jsonData
    return JSON.parse(this.body)
  }

  async text() {
    return this.body?.toString() || ''
  }

  async arrayBuffer() {
    if (this.body instanceof Uint8Array) {
      return this.body.buffer
    }
    return new TextEncoder().encode(this.body?.toString() || '').buffer
  }
}

// Helper to create a mock Request
export function createMockRequest(
  url: string,
  options: {
    method?: string
    body?: any
    headers?: Record<string, string>
  } = {}
): Request {
  const { method = 'GET', body, headers = {} } = options

  const requestInit: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body && method !== 'GET') {
    requestInit.body = typeof body === 'string' ? body : JSON.stringify(body)
  }

  return new Request(url, requestInit)
}

// Helper to create a mock FormData request
export function createMockFormDataRequest(
  url: string,
  formData: FormData,
  options: { method?: string; headers?: Record<string, string> } = {}
): Request {
  return new Request(url, {
    method: options.method || 'POST',
    body: formData,
    headers: options.headers,
  })
}

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
  useParams: vi.fn(() => ({})),
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`)
  }),
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
}))

// Mock next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => new Headers()),
  cookies: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    getAll: vi.fn(() => []),
  })),
}))

// Mock next/server
vi.mock('next/server', () => ({
  NextResponse: MockNextResponse,
  NextRequest: Request,
}))
