"use server"

import { MessageType } from "@/app/lib/enums/message_type.enums"
import EnvError from "@/app/lib/errors/env.errors"
import ValidationError from "@/app/lib/errors/validation.errors"
import GuestMessage from "@/app/lib/models/guest_message.models"
import database from "@/app/lib/utils/database"
import logError from "@/app/lib/utils/error_logger.utils"
import { revalidatePath } from "next/cache"

export default async function sendGuestMessage(formData: FormData) {
  try {
    const guestName = formData.get("name")
    const message = formData.get("message")
    const type = formData.get("type")

    if (!message || !guestName) throw new ValidationError("Invalid request body")

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
    }

    const db = database()
    const insertGuestMessageQuery = await db.execute({
      sql: `insert into guest_message(message, guest_name) values(?, ?) returning *`,
      args: [message.toString(), guestName.toString()],
    })
    const guestMessage = GuestMessage.fromDb(insertGuestMessageQuery.rows.at(0))
    if (guestMessage === null) throw new Error("Failed creating new message")

    return { success: true, message: "Message has been sent successfully!", error: undefined }
  } catch (err) {
    logError(err)
    return {
      success: false,
      message: "Error while trying to send a message.",
      error: err?.toString() || "Internal error occurred. Please try again later.",
    }
  } finally {
    revalidatePath("/guest-book")
  }
}
