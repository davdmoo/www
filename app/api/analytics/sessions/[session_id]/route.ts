import database from "@/app/lib/utils/database"
import * as Sentry from "@sentry/nextjs"

// ends the session by updating session_end field
export async function PUT(request: Request, { params }: { params: Promise<{ session_id: string }> }) {
  try {
    const { session_id } = await params

    const db = database()
    await db.execute({
      sql: "update session set session_end = datetime('now') where public_id = ?",
      args: [session_id],
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
