import { Row } from "@libsql/client"

export default class Analytic {
  id
  visitorId
  pathId
  referrer
  timestamp

  constructor(id: number, visitorId: number, pathId: number, referrer: string, timestamp: string) {
    this.id = id
    this.visitorId = visitorId
    this.pathId = pathId
    this.referrer = referrer
    this.timestamp = timestamp
  }

  static fromDb(row: Row | null | undefined) {
    if (!row) return null

    const id = row["id"] as number
    const visitorId = row["visitor_id"] as number
    const pathId = row["path_id"] as number
    const referrer = row["referrer"] as string
    const timestamp = row["timestamp"] as string

    return new Analytic(id, visitorId, pathId, referrer, timestamp)
  }
}
