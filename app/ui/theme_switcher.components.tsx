"use client"

import ThemeLogic, { ThemeValue } from "@/app/lib/logics/client/theme.logics"
import MoonIcon from "@/app/ui/moon_icon.components"
import SunlightIcon from "@/app/ui/sunlight_icon.components"
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeValue>(ThemeValue.dark)

  useEffect(() => {
    const currentTheme = ThemeLogic.getCurrentTheme()
    setTheme(currentTheme)
  }, [])

  return (
    <button
      onClick={() => {
        const currentTheme = ThemeLogic.getCurrentTheme()
        const newTheme = currentTheme === ThemeValue.light ? ThemeValue.dark : ThemeValue.light

        ThemeLogic.setCurrentTheme(newTheme)
        setTheme(newTheme)
      }}
      className="bg-transparent border-0 rounded-full p-2"
    >
      {theme === ThemeValue.dark ? <SunlightIcon /> : <MoonIcon />}
    </button>
  )
}
