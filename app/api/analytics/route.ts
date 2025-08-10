import ValidationError from "@/app/lib/errors/validation.errors"
import Browser from "@/app/lib/models/browser.models"
import Device from "@/app/lib/models/device.models"
import OperatingSystem from "@/app/lib/models/operating_system.models"
import Path from "@/app/lib/models/path.models"
import Visitor from "@/app/lib/models/visitor.models"
import database from "@/app/lib/utils/database"
import { VISITOR_ID_COOKIE, VISITOR_ID_HEADER } from "@/middleware"
import { Transaction } from "@libsql/client"
import * as Sentry from "@sentry/nextjs"
import { NextRequest } from "next/server"
import { UAParser } from "ua-parser-js"

/**
 * Flow
 * 1. get visitorId from cookie
 * 2. get pathname, referrer, userAgent, and sessionId from request body
 * 3. get visitor by visitorId
 * 4. if not exists then insert or ignore browser, OS, and device that was parsed from userAgent then create visitor
 * 5. check if current visitor is unique by querying analytic where visitor_id and path_id is the same as current one
 * 6. update path's visit count and unique visit count (if unique)
 * 7. insert or ignore session by session's public_id
 * 8. insert analytic data
 */
export async function POST(request: NextRequest) {
  let transaction: Transaction | undefined

  try {
    let visitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value
    if (visitorId === undefined) {
      /**
       * on first visit the cookie won't be set from client-side, so we need to check the custom header
       * that was set on middleware
       * we get the custom header from the request object since the middleware's response becomes the request
       * in the server-side code
       */
      visitorId = request.headers.get(VISITOR_ID_HEADER)!
    }

    const json = await request.json()
    const { pathname, referrer, userAgent, sessionId } = json
    if (!pathname || referrer === undefined || !userAgent || !sessionId) {
      throw new ValidationError("Invalid request body")
    }

    const db = database()
    transaction = await db.transaction("write")

    const existingVisitor = await transaction.execute({
      sql: "select * from visitor where public_id = ?",
      args: [visitorId],
    })

    let visitor = Visitor.fromDb(existingVisitor.rows.at(0))
    if (visitor === null) {
      const parsedUserAgent = UAParser(userAgent)
      const browser = Browser.fromJson(parsedUserAgent.browser as unknown as Record<string, unknown>)
      const operatingSystem = OperatingSystem.fromJson(parsedUserAgent.os as unknown as Record<string, unknown>)
      const device = Device.fromJson(parsedUserAgent.device as unknown as Record<string, unknown>)

      // insert new browser, OS, and device if they don't exist yet
      await transaction.batch([
        `insert or ignore into browser (name, version) values ('${browser.name}', '${browser.version}');`,
        `insert or ignore into operating_system (name, version) values ('${operatingSystem.name}', '${operatingSystem.version}');`,
        `insert or ignore into device (type, vendor, model) values ('${device.type}', '${device.vendor}', '${device.model}');`,
      ])

      // query existing/newly added browser, OS, and device to be added into analytic item
      const browserQuery = await transaction.execute(
        `select * from browser where name = '${browser.name}' and version = '${browser.version}' limit 1;`
      )
      const newBrowser = Browser.fromDb(browserQuery.rows.at(0))

      const osQuery = await transaction.execute(
        `select * from operating_system where name = '${operatingSystem.name}' and version = '${operatingSystem.version}' limit 1;`
      )
      const newOs = OperatingSystem.fromDb(osQuery.rows.at(0))

      const deviceQuery = await transaction.execute(
        `select * from device where type = '${device.type}' and vendor = '${device.vendor}' and model = '${device.model}' limit 1;`
      )
      const newDevice = OperatingSystem.fromDb(deviceQuery.rows.at(0))

      const createVisitorQuery = await transaction.execute({
        sql: "insert into visitor (public_id, browser_id, os_id, device_id, user_agent) values (?, ?, ?, ?, ?) returning *;",
        args: [visitorId, newBrowser!.id, newOs!.id, newDevice!.id, userAgent],
      })
      const newVisitor = Visitor.fromDb(createVisitorQuery.rows.at(0))
      if (newVisitor === null) throw new Error("Failed creating new visitor")

      // re-assign visitor to be used in analytic data
      visitor = newVisitor
    }

    const pathQuery = await transaction.execute({
      sql: `select * from path where name = ? limit 1`,
      args: [pathname],
    })
    const path = Path.fromDb(pathQuery.rows.at(0))
    if (path === null) {
      return new Response(null, { status: 204, statusText: "Path not found" })
    }

    // check if current visitor is unique
    const uniqueAnalyticQuery = await transaction.execute({
      sql: `select * from analytic where visitor_id = ? and path_id = ? limit 1`,
      args: [visitor.id, path.id],
    })
    const uniqueAnalyticRow = uniqueAnalyticQuery.rows.at(0)

    let uniqueVisitCount = path.uniqueVisitCount
    if (!uniqueAnalyticRow) {
      uniqueVisitCount = path.uniqueVisitCount + 1
    }

    // update path's visit count and create new analytic data
    await transaction.batch([
      {
        sql: `insert into analytic(visitor_id, path_id, referrer) values(?, ?, ?)`,
        args: [visitor.id, path.id, referrer],
      },
      {
        sql: `update path set visit_count = ?, unique_visit_count = ?, updated_at = datetime('now') where id = ?`,
        args: [path.visitCount + 1, uniqueVisitCount, path.id],
      },
      {
        sql: `insert or ignore into session(public_id, visitor_id) values (?, ?)`,
        args: [sessionId, visitor.id],
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
