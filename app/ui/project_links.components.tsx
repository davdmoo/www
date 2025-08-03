import Link from "next/link"
import ArrowUpRightIcon from "./icons/arrow_up_right.components"

export default function ProjectLinks({
  codeBaseHref,
  projectHref,
  projectTitle,
}: Readonly<{
  projectTitle: string
  codeBaseHref: string
  projectHref: string
}>) {
  return (
    <div className="flex flex-row justify-between items-center w-full mb-2">
      <Link
        href={codeBaseHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl lg:text-2xl md:text-2xl font-semibold"
        title="Open code base in new tab"
      >
        {projectTitle}
      </Link>
      <Link href={projectHref} target="_blank" rel="noopener noreferrer" title="Open project in new tab">
        <ArrowUpRightIcon />
      </Link>
    </div>
  )
}
