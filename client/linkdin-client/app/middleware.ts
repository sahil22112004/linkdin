
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const authPages = ['/login', '/signup']
  const protectedPages = ['/dashboard']

  if (!token) {
    if (protectedPages.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  if (token) {
    if (authPages.includes(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard/:path*'
  ]
}

