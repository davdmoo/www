import Link from "next/link"

export default function SiteLinks() {
  return (
    <div className="flex justify-center py-4 px-2 space-x-6">
      <Link className="text-sm text-anchor-alt visited:text-anchor-visited-alt" href="/">
        [h] ome
      </Link>
      <Link className="text-sm text-anchor-alt visited:text-anchor-visited-alt" href="/experience">
        [e] xperience
      </Link>
      <Link className="text-sm text-anchor-alt visited:text-anchor-visited-alt" href="/projects">
        [p] rojects
      </Link>
    </div>
  )
}
