import Link from "next/link"
import ArrowUpRightIcon from "./icons/arrow_up_right.components"

export default function ProjectLinks({
  projectSlugHref,
  projectHref,
  projectTitle,
}: Readonly<{
  projectTitle: string
  projectSlugHref: string
  projectHref: string
}>) {
  return (
    <div className="flex flex-row justify-between items-center w-full mb-2">
      <Link href={projectSlugHref} rel="noopener noreferrer" className="text-xl lg:text-2xl md:text-2xl font-semibold">
        {projectTitle}
      </Link>
      <Link href={projectHref} target="_blank" rel="noopener noreferrer" title="Open project in new tab">
        <ArrowUpRightIcon />
      </Link>
    </div>
  )
}
