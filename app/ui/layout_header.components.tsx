import ThemeSwitcher from "@/app/ui/theme_switcher.components"
import SiteLinks from "./site_links.components"

export default function LayoutHeader() {
  return (
    <header className="flex justify-center pt-4">
      <div className="lg:max-w-2xl md:max-w-2xl flex-1 flex flex-row justify-between">
        <SiteLinks />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
