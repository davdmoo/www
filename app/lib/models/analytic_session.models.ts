import { Row } from "@libsql/client"

export default class AnalyticSession {
  id
  publicId
  visitorId
  sessionStart
  sessionEnd

  constructor(id: number, publicId: string, visitorId: string, sessionStart: string, sessionEnd: string) {
    this.id = id
    this.publicId = publicId
    this.visitorId = visitorId
    this.sessionStart = sessionStart
    this.sessionEnd = sessionEnd
  }

  static fromDb(row: Row) {
    const { id, publicId, visitorId, sessionStart, sessionEnd } = row
    return new AnalyticSession(
      id as number,
      publicId as string,
      visitorId as string,
      sessionStart as string,
      sessionEnd as string
    )
  }
}
