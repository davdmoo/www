import GuestMessage from "@/app/lib/models/guest_message.models"
import database from "@/app/lib/utils/database"
import logError from "@/app/lib/utils/error_logger.utils"

async function getMessages() {
  try {
    const db = database()
    const queryResult = await db.execute(`select * from guest_message order by created_at desc limit 10`)

    const guestMessages: GuestMessage[] = []
    queryResult.rows.forEach((row) => {
      const message = GuestMessage.fromDb(row)
      if (message != null) {
        guestMessages.push(message)
      }
    })
    return guestMessages
  } catch (err) {
    logError(err)
  }
}

export default async function GuestMessageList() {
  const messages = await getMessages()

  return (
    <>
      <h2 className="mb-3">Messages</h2>
      {messages ? (
        messages.map((msg) => (
          <div key={msg.id} className="flex flex-row space-x-2">
            <p className="font-semibold text-sm">{msg.guestName}:</p>
            <p className="text-sm break-words overflow-hidden"> {msg.message}</p>
          </div>
        ))
      ) : (
        <p>Error while fetching the latest messages.</p>
      )}
    </>
  )
}
