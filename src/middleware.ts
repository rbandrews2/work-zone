import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServer } from '@/lib/supabase/server'

export const config = {
  matcher: ['/app/:path*']
}
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServer()

  const { data: { user } } = await supabase.auth.getUser()

  const protectedRoutes = ['/app']

  if (
    protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path)) &&
    !user
  ) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
