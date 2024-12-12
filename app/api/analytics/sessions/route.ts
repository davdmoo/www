import ValidationError from "@/errors/validation.errors"
import { VISITOR_ID_COOKIE } from "@/middleware"
import database from "@/utils/database"
import * as Sentry from "@sentry/nextjs"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const visitorId = request.cookies.get(VISITOR_ID_COOKIE)
    if (!visitorId) throw new ValidationError("Cookie is missing")

    const { sessionId } = await request.json()
    if (!sessionId) throw new ValidationError("Invalid request body")

    const db = database()
    await db.execute({
      sql: "insert or replace into session (id, visitor_id) values (?, ?)",
      args: [sessionId, visitorId.value],
    })

    return new Response(null, { status: 204 })
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(err)
    }

    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      console.error(err.stack)
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}
