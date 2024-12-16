import ValidationError from "@/app/lib/errors/validation.errors"
import Path from "@/app/lib/models/path.models"
import database from "@/app/lib/utils/database"

export async function GET() {
  try {
    const db = database()
    const queryResult = await db.execute({
      sql: `select * from path`,
      args: [],
    })

    return Response.json({ message: "Success", data: queryResult.rows.map((row) => Path.fromDb(row)) })
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { name } = json
    if (!name) {
      throw new ValidationError("Invalid request body")
    }

    const db = database()
    const queryResult = await db.execute({
      sql: `insert into path(name) values(?) returning *`,
      args: [name],
    })
    const row = queryResult.rows.at(0)
    if (row === undefined) {
      throw new Error("Failed creating new path")
    }

    return Response.json({ message: "Success", data: Path.fromDb(row) }, { status: 201 })
  } catch (err) {
    let errorMessage = "Internal error occurred. Please try again later."
    if (err instanceof Error) {
      errorMessage = err.message
    }

    return Response.json({ message: errorMessage, data: null }, { status: 500 })
  }
}
