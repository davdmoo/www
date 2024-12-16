import { Row } from "@libsql/client"

export default class Visitor {
  id
  publicId
  name
  browserId
  osId
  deviceId
  userAgent

  constructor(
    id: number,
    publicId: string,
    name: string,
    browserId: number,
    osId: number,
    deviceId: number,
    userAgent: string
  ) {
    this.id = id
    this.publicId = publicId
    this.name = name
    this.browserId = browserId
    this.osId = osId
    this.deviceId = deviceId
    this.userAgent = userAgent
  }

  static fromDb(row: Row | null | undefined) {
    if (!row) return null
    const { id, public_id, name, browser_id, os_id, device_id, user_agent } = row

    return new Visitor(
      id as number,
      public_id as string,
      name as string,
      browser_id as number,
      os_id as number,
      device_id as number,
      user_agent as string
    )
  }
}
