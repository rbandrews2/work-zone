import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/app/:path*', '/dashboard/:path*', '/training/:path*']
}

export function middleware(req: NextRequest) {
  // Auth enforcement can be added later with a supported Supabase pattern.
  return NextResponse.next()
}
