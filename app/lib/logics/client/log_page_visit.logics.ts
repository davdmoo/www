/**
 * 1. attempts to set session_id to sessionStorage if not already exists
 * 2. sends beacon to /api/analytics to log page visit and log session
 */
export default async function logPageVisit(pathname: string) {
  let sessionId = window.sessionStorage.getItem("session_id")
  if (sessionId === null) {
    sessionId = crypto.randomUUID()
    window.sessionStorage.setItem("session_id", sessionId)
  }

  const body = {
    pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    sessionId,
  }

  // send analytics using beacon since we don't need to listen to the results
  navigator.sendBeacon("/api/analytics", JSON.stringify(body))
}
