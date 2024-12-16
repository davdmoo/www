import EnvError from "@/app/lib/errors/env.errors"
import { Client, createClient } from "@libsql/client"

export default function database(): Client {
  const isProd = process.env.NODE_ENV === "production"

  const url = isProd ? process.env.TURSO_DATABASE_URL : "file:local.db"
  if (!url) throw new EnvError(isProd ? "TURSO_DATABASE_URL is not defined" : "To silence TS linter")

  return createClient({
    url: url,
    authToken: isProd ? process.env.TURSO_AUTH_TOKEN : undefined,
  })
}
