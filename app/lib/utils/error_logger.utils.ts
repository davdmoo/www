import * as Sentry from "@sentry/nextjs"

export default function logError(error: unknown) {
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(error)
  } else {
    console.error(error)
    if (error instanceof Error) {
      console.error(error.stack)
    }
  }
}
