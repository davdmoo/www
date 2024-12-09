import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const existingSessionIdCookie = request.cookies.get("sessionId")
  const sessionId = existingSessionIdCookie?.value

  const response = NextResponse.next()
  if (!sessionId) {
    const newSessionId = crypto.randomUUID()
    const cookieOptions: Partial<ResponseCookie> = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    }
    response.cookies.set("sessionId", newSessionId, cookieOptions)
    response.cookies.set("visitorId", crypto.randomUUID(), cookieOptions)
  }

  const existingVisitorIdCookie = request.cookies.get("visitorId")
  const visitorId = existingVisitorIdCookie?.value
  if (!visitorId) {
    const newVisitorId = crypto.randomUUID()
    const cookieOptions: Partial<ResponseCookie> = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    }
    response.cookies.set("visitorId", newVisitorId, cookieOptions)
  }

  return response
}

export const config = {
  matcher: ["/api/:path*"],
}
