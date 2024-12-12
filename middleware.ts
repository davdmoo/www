import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { NextRequest, NextResponse } from "next/server"

export const VISITOR_ID_COOKIE = "visitorId"
export const VISITOR_ID_HEADER = "x-visitor-id"

/**
 * this is a middleware to track a certain visitor by using cookie
 * the visitorId is then used to differentiate visitors in analytics, analytic sessions, and guest messages
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const existingVisitorIdCookie = request.cookies.get(VISITOR_ID_COOKIE)
  const visitorId = existingVisitorIdCookie?.value
  if (!visitorId) {
    const newVisitorId = crypto.randomUUID()
    const cookieOptions: Partial<ResponseCookie> = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 365 days
    }
    response.cookies.set(VISITOR_ID_COOKIE, newVisitorId, cookieOptions)
    response.headers.set(VISITOR_ID_HEADER, newVisitorId)
  }

  return response
}

export const config = {
  matcher: ["/api/:path*"],
}
