import { NextResponse as ServiceGuardNextResponse, type NextRequest as ServiceGuardRequest } from 'next/server'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from './lib/service-status'
import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { protectPreviewResponse } from './lib/site-content/preview-protection'

function existingServiceExpiryIntegration(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublicAdminPath =
    pathname.startsWith('/admin/login') || pathname.startsWith('/admin/logout')

  if (!isPublicAdminPath && pathname.startsWith('/admin')) {
    if (!request.cookies.get(SESSION_COOKIE)?.value) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('reason', 'unauthorized')
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] }

export async function middleware(request: ServiceGuardRequest) {
  const response = !isServiceGuardExcludedPath(request.nextUrl.pathname) && !await isWebsiteServiceAvailable()
    ? ServiceGuardNextResponse.rewrite(new URL('/service-expired', request.url))
    : existingServiceExpiryIntegration(request)
  protectPreviewResponse(response.headers, request.cookies.has('__Host-hq-site-preview'))
  return response
}
