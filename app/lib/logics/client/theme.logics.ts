export enum ThemeValue {
  light = "light",
  dark = "dark",
}

export default class ThemeLogic {
  static getCurrentTheme(): ThemeValue {
    const theme = localStorage.getItem("theme")
    if (theme === null) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const preferredTheme = prefersDark ? ThemeValue.dark : ThemeValue.light

      this.setCurrentTheme(preferredTheme)
      return preferredTheme
    }

    return theme as ThemeValue
  }

  static setCurrentTheme(value: ThemeValue) {
    localStorage.setItem("theme", value)

    if (value === ThemeValue.light) {
      document.documentElement.classList.remove(ThemeValue.dark)
      document.documentElement.classList.add(ThemeValue.light)
    } else {
      document.documentElement.classList.remove(ThemeValue.light)
      document.documentElement.classList.add(ThemeValue.dark)
    }
  }
}
