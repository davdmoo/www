import { Row } from "@libsql/client"

export default class OperatingSystem {
  id
  name
  version

  constructor(id?: number, name?: string, version?: string) {
    this.id = id ?? 0
    this.name = name ?? ""
    this.version = version ?? ""
  }

  static fromJson(json: Record<string, unknown>) {
    const name = json["name"] as string | undefined
    const version = json["version"] as string | undefined

    return new OperatingSystem(undefined, name, version)
  }

  static fromDb(row?: Row) {
    if (!row) return null

    const id = row["id"] as number
    const name = row["name"] as string
    const version = row["version"] as string

    return new OperatingSystem(id, name, version)
  }
}
