import PageHeader from "@/app/ui/page_header.components"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <PageHeader title="/projects" />
      <div className="flex flex-col items-start w-full text-justify">{children}</div>
    </div>
  )
}
