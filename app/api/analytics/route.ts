import Browser from "@/app/models/browser.models"
import Device from "@/app/models/device.models"
import OperatingSystem from "@/app/models/operating_system.models"
import Path from "@/app/models/path.models"
import NotFoundError from "@/errors/not_found.errors"
import ValidationError from "@/errors/validation.errors"
import database from "@/utils/database"
import { Transaction } from "@libsql/client"
import * as Sentry from "@sentry/nextjs"
import { UAParser } from "ua-parser-js"

export async function POST(request: Request) {
  let transaction: Transaction | undefined

  try {
    const json = await request.json()
    const { pathname, referrer, userAgent, sessionId } = json
    if (!pathname || referrer === undefined || !userAgent || !sessionId) {
      throw new ValidationError("Invalid request body")
    }

    const parsedUserAgent = UAParser(userAgent)
    const browser = Browser.fromJson(parsedUserAgent.browser as unknown as Record<string, unknown>)
    const operatingSystem = OperatingSystem.fromJson(parsedUserAgent.os as unknown as Record<string, unknown>)
    const device = Device.fromJson(parsedUserAgent.device as unknown as Record<string, unknown>)

    const db = database()
    transaction = await db.transaction("write")

    // insert new browser, OS, and device if they don't exist yet
    await transaction.batch([
      `insert or ignore into browser (name, version) values ('${browser.name}', '${browser.version}');`,
      `insert or ignore into operating_system (name, version) values ('${operatingSystem.name}', '${operatingSystem.version}');`,
      `insert or ignore into device (type, vendor, model) values ('${device.type}', '${device.vendor}', '${device.model}');`,
      `insert or ignore into session (id) values ('${sessionId}')`,
    ])

    // query existing/newly added browser, OS, and device to be added into analytic item
    const existingBrowserQuery = await transaction.execute(
      `select * from browser where name = '${browser.name}' and version = '${browser.version}' limit 1;`
    )
    const existingBrowser = Browser.fromDb(existingBrowserQuery.rows.at(0))

    const existingOsQuery = await transaction.execute(
      `select * from operating_system where name = '${operatingSystem.name}' and version = '${operatingSystem.version}' limit 1;`
    )
    const existingOs = OperatingSystem.fromDb(existingOsQuery.rows.at(0))

    const existingDeviceQuery = await transaction.execute(
      `select * from device where type = '${device.type}' and vendor = '${device.vendor}' and model = '${device.model}' limit 1;`
    )
    const existingDevice = OperatingSystem.fromDb(existingDeviceQuery.rows.at(0))

    const pathQuery = await transaction.execute({
      sql: `select * from path where name = ? limit 1`,
      args: [pathname],
    })
    const path = Path.fromDb(pathQuery.rows.at(0))
    if (!path) throw new NotFoundError("Path not found")

    // check if current visitor is unique
    const uniqueAnalyticQuery = await transaction.execute({
      sql: `select * from analytic where path_id = ? limit 1`,
      args: [path.id],
    })
    const uniqueAnalyticRow = uniqueAnalyticQuery.rows.at(0)

    let uniqueVisitCount = path.uniqueVisitCount
    if (!uniqueAnalyticRow) {
      uniqueVisitCount = path.uniqueVisitCount + 1
    }

    // update path's visit count and create new analytic data
    await transaction.batch([
      {
        sql: `insert into analytic(path_id, browser_id, os_id, device_id, referrer, user_agent) values(?, ?, ?, ?, ?, ?)`,
        args: [path.id, existingBrowser!.id, existingOs!.id, existingDevice!.id, referrer, userAgent],
      },
      {
        sql: `update path set visit_count = ?, unique_visit_count = ? where id = ?`,
        args: [path.visitCount + 1, uniqueVisitCount, path.id],
      },
    ])

    await transaction.commit()
    return new Response(null, { status: 204 })
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(err)
    }
    await transaction?.rollback()

    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      console.error(err.stack)
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}

// export async function GET() {
//   try {
//     const db = database()
//     const queryResult = await db.execute({
//       sql: `select * from analytic`,
//       args: [],
//     })

//     return Response.json({ message: "Success", data: queryResult.rows.map((row) => Analytic.fromDb(row)) })
//   } catch (err) {
//     let errorMessage = "Internal error occurred. Please try again later."
//     if (err instanceof Error) {
//       errorMessage = err.message
//     }

//     return Response.json({ message: errorMessage, data: null }, { status: 500 })
//   }
// }
