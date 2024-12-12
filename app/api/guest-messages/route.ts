import GuestMessage from "@/app/models/guest_message.models"
import { MessageType } from "@/enums/message_type.enums"
import EnvError from "@/errors/env.errors"
import ValidationError from "@/errors/validation.errors"
import database from "@/utils/database"
import * as Sentry from "@sentry/nextjs"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const { message, guestName, type } = Object.fromEntries(formData)
    if (!message || !guestName || !type) throw new ValidationError("Invalid request body")

    // only send an email if type is private; no need to insert to DB
    if (type === MessageType.private) {
      const brevoApiKey = process.env.BREVO_API_KEY
      if (!brevoApiKey) throw new EnvError("BREVO_API_KEY is not defined")

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        body: JSON.stringify({
          htmlContent: `<html><head></head><body><p>${message}</p></body></html>`,
          subject: "Personal Site",
          sender: {
            name: guestName,
            email: "david.mulyawan97@gmail.com",
          },
          to: [
            {
              email: "david.mulyawan97@gmail.com",
              name: "David",
            },
          ],
        }),
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          "api-key": brevoApiKey,
        },
      })

      return Response.json({ message: "Success", data: null }, { status: 201 })
    }

    const db = database()
    const insertGuestMessageQuery = await db.execute({
      sql: `insert into guest_message(message, guest_name) values(?, ?) returning *`,
      args: [message.toString(), guestName.toString()],
    })
    const guestMessage = GuestMessage.fromDb(insertGuestMessageQuery.rows.at(0))
    if (guestMessage === null) throw new Error("Failed creating new message")

    return Response.json({ message: "Success", data: guestMessage }, { status: 201 })
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(err)
    }

    let errorMessage = "Internal error occurred. Please try again later."
    let status = 500
    if (err instanceof Error) {
      errorMessage = err.message
    }

    if (err instanceof ValidationError) {
      status = 400
    }

    return Response.json({ message: errorMessage, data: null }, { status: status })
  }
}

export async function GET() {
  try {
    const db = database()
    const queryResult = await db.execute(`select * from guest_message order by created_at desc`)

    const guestMessages = queryResult.rows.map((row) => GuestMessage.fromDb(row))
    return Response.json({ message: "Success", data: guestMessages })
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(err)
    }

    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}
