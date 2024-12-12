import { Row } from "@libsql/client"

export default class VisitorDetail {
  publicId
  name
  userAgent
  browserName
  browserVersion
  deviceType
  deviceVendor
  deviceModel
  osName
  osVersion

  constructor(
    publicId: string,
    name: string,
    userAgent: string,
    browserName: string,
    browserVersion: string,
    deviceType: string,
    deviceVendor: string,
    deviceModel: string,
    osName: string,
    osVersion: string
  ) {
    this.publicId = publicId
    this.name = name
    this.userAgent = userAgent
    this.browserName = browserName
    this.browserVersion = browserVersion
    this.deviceType = deviceType
    this.deviceVendor = deviceVendor
    this.deviceModel = deviceModel
    this.osName = osName
    this.osVersion = osVersion
  }

  static fromDb(row: Row | null | undefined) {
    if (!row) return null
    const {
      public_id,
      name,
      user_agent,
      browser_name,
      browser_version,
      device_type,
      device_vendor,
      device_model,
      os_name,
      os_version,
    } = row
    return new VisitorDetail(
      public_id as string,
      name as string,
      user_agent as string,
      browser_name as string,
      browser_version as string,
      device_type as string,
      device_vendor as string,
      device_model as string,
      os_name as string,
      os_version as string
    )
  }
}
