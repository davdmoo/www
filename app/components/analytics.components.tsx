"use client"

import logPageVisit from "@/app/lib/logics/client/log_page_visit.logics"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    logPageVisit(pathname)
  }, [pathname])

  // only run on first render
  useEffect(() => {
    // signalling the end of the browser tab session
    window?.addEventListener("beforeunload", () => {
      const sessionId = window.sessionStorage.getItem("session_id")
      if (sessionId === null) return

      // use fetch with keepalive set to true since navigator.sendBeacon only allows 'POST' method
      fetch(`/api/analytics/sessions/${sessionId}`, { method: "PUT", keepalive: true })
    })
  }, [])

  return null
}
