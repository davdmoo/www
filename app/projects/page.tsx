/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next"
import Link from "next/link"
import ProjectLinks from "../ui/project_links.components"
import ProjectsLayout from "../ui/projects/project_layout.components"
import ProjectPreview from "../ui/projects/project_preview.components"

export const metadata: Metadata = {
  title: "Projects",
}

export default function Projects() {
  return (
    <ProjectsLayout>
      <div className="flex flex-col mb-6 w-full">
        <Link href="/projects/invoice-management" className="flex flex-col">
          <h2>Invoice Management App</h2>
        </Link>
        <p>
          My first freelance project - a Windows application built using Flutter, Typescript, Cloud Functions, and
          MongoDB.
        </p>
      </div>

      <div className="flex flex-col mb-6 w-full">
        <Link href="/projects/finance-tracker" className="flex flex-col">
          <h2>Finance Tracker App</h2>
        </Link>
        <p>A Flutter app for tracking finances which works offline.</p>
      </div>

      <div className="flex flex-col mb-6 w-full">
        <ProjectLinks projectTitle="Slinks" projectSlugHref="/projects/slinks" projectHref="https://slinks.deno.dev" />
        <p>A simple link shortener built using Deno, HTMX, and SQLite.</p>
        <ProjectPreview iframeSrc="https://slinks.deno.dev" />
      </div>

      <div className="flex flex-col mb-6 w-full">
        <ProjectLinks
          projectTitle="Dictionary"
          projectSlugHref="/projects/dictionary"
          projectHref="https://dictionary-htmx.deno.dev"
        />
        <p>A simple dictionary built using vanilla Javascript and HTMX.</p>
        <ProjectPreview iframeSrc="https://dictionary-htmx.deno.dev" />
      </div>
    </ProjectsLayout>
  )
}
