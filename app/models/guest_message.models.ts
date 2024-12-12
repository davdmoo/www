import { Row } from "@libsql/client"

export default class GuestMessage {
  id
  message
  guestName
  createdAt
  updatedAt

  constructor(id: number, message: string, guestName: string, createdAt: string, updatedAt: string) {
    this.id = id
    this.message = message
    this.guestName = guestName
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static fromDb(row: Row | null | undefined): GuestMessage | null {
    if (!row) return null

    const id = row["id"] as number
    const message = row["message"] as string
    const guestName = row["guest_name"] as string
    const createdAt = row["created_at"] as string
    const updatedAt = row["updated_at"] as string

    return new GuestMessage(id, message, guestName, createdAt, updatedAt)
  }
}
