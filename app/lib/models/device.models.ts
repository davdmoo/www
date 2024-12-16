import { Row } from "@libsql/client"

export default class Device {
  id
  type
  vendor
  model

  constructor(id?: number, type?: string, vendor?: string, model?: string) {
    this.id = id ?? 0
    this.type = type ?? ""
    this.vendor = vendor ?? ""
    this.model = model ?? ""
  }

  static fromJson(json: Record<string, unknown>) {
    const type = json["type"] as string | undefined
    const vendor = json["vendor"] as string | undefined
    const model = json["model"] as string | undefined

    return new Device(undefined, type, vendor, model)
  }

  static fromDb(row?: Row) {
    if (!row) return null

    const id = row["id"] as number
    const type = row["type"] as string
    const vendor = row["vendor"] as string
    const model = row["model"] as string

    return new Device(id, type, vendor, model)
  }
}
