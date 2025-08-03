"use client"

import { useRouter } from "next/navigation"
import { createContext, useEffect, useState } from "react"

export const KeyboardEventListenerContext = createContext<{
  isInputFocused: boolean
  changeInputFocus: (value: boolean) => void
}>({
  isInputFocused: false,
  changeInputFocus: () => {},
})

export default function KeyboardEventListenerProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [isInputFocused, setIsInputFocused] = useState(false)

  const changeInputFocus = (value: boolean) => setIsInputFocused(value)

  useEffect(() => {
    // const onRouteChangeComplete = () => changeInputFocus(false)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isInputFocused) return

      switch (event.key) {
        case "h":
          router.push("/")
          break

        case "e":
          router.push("/experience")
          break

        case "p":
          router.push("/projects")
          break

        case "g":
          router.push("/guest-book")
          break

        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    // component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isInputFocused, router])

  return (
    <KeyboardEventListenerContext.Provider value={{ isInputFocused, changeInputFocus }}>
      {children}
    </KeyboardEventListenerContext.Provider>
  )
}
