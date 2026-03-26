import { NextRequest, NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'

async function getExpectedToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? 'admin'
  const secret = process.env.ADMIN_SECRET ?? 'velvet-bridal'
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(password))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminPage =
    pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')

  const isProtectedApi =
    (pathname === '/api/bookings' && req.method === 'GET') ||
    (pathname.startsWith('/api/bookings/') && req.method === 'PATCH')

  if (isAdminPage || isProtectedApi) {
    const token = req.cookies.get(COOKIE_NAME)?.value
    const expected = await getExpectedToken()

    if (token !== expected) {
      if (isAdminPage) {
        const loginUrl = new URL('/admin/login', req.url)
        loginUrl.searchParams.set('from', pathname)
        return NextResponse.redirect(loginUrl)
      }
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/bookings', '/api/bookings/:path*'],
}
