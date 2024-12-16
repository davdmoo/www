import NotFoundError from "@/app/lib/errors/not_found.errors"
import VisitorDetail from "@/app/lib/models/visitor_detail.models"
import database from "@/app/lib/utils/database"

export async function GET(request: Request, { params }: { params: Promise<{ visitor_id: string }> }) {
  try {
    const { visitor_id } = await params

    const db = database()
    const visitorQuery = await db.execute({
      sql: `
        select
          v.public_id,
          v.name,
          v.user_agent,
          b.name as browser_name,
          b.version as browser_version,
          d.type as device_type,
          d.vendor as device_vendor,
          d.model as device_model,
          os.name as os_name,
          os.version as os_version,
          v.created_at,
          v.updated_at
        from visitor v
          left join browser b on v.browser_id = b.id
          left join device d on v.device_id = d.id
          left join operating_system os on v.os_id = os.id
        where public_id = ? limit 1
      `,
      args: [visitor_id],
    })
    const visitor = VisitorDetail.fromDb(visitorQuery.rows.at(0))
    if (visitor === null) throw new NotFoundError("Visitor not found")

    return Response.json({ message: "Success", data: visitor })
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later."
    let statusCode = 500
    if (err instanceof Error) {
      errorMessage = err.message
    }
    if (err instanceof NotFoundError) {
      statusCode = 404
    }

    return Response.json({ message: errorMessage, data: null }, { status: statusCode })
  }
}
