import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    // Redirect to '/forms'
    return NextResponse.redirect(new URL('/forms', request.url))
  }

  // Continue with the request as normal
  return NextResponse.next()
}

export const config = {
  matcher: ['/'],
}
