import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const SESSION_COOKIE = 'demaize_admin_session'

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token || !process.env.AUTH_SECRET) return false

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET))
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'

  if (!isAdminRoute) {
    return NextResponse.next()
  }

  const authenticated = await isAuthenticated(request)

  if (!authenticated && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (authenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
