import Link from "next/link"
import BackButton from "../back_button.components"
import CodeBlock from "../code_block.components"
import ArrowLeftIcon from "../icons/arrow_left.components"
import ArrowUpRightIcon from "../icons/arrow_up_right.components"
import ProjectsLayout from "./project_layout.components"

export default function DictionaryProject() {
  const htmxCodeSnippet = `
<form hx-get="/dictionaries" hx-target="#response" hx-swap="innerHTML">
  <input type="text" name="word" id="word-input">
  <button type="submit">Search</button>
</form>
  `

  return (
    <ProjectsLayout>
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <div className="w-full flex flex-row items-center gap-4">
          <BackButton>
            <ArrowLeftIcon />
          </BackButton>
          <h2 className="mb-0">Dictionary</h2>
        </div>
        <Link
          href="https://dictionary-htmx.deno.dev"
          target="_blank"
          rel="noopener noreferrer"
          title="Open project in new tab"
        >
          <ArrowUpRightIcon />
        </Link>
      </div>
      <p>
        I find myself in constant needs of finding word definitions and wanted a simple way to do so (can always Google
        but that&apos;s no fun, plus this was an excuse to explore HTMX again). Features include integration with third
        party{" "}
        <Link href="https://dictionaryapi.dev/" target="_blank" rel="noopener noreferrer" className="mb-4">
          API
        </Link>{" "}
        and managing audio playback using vanilla Javascript.
      </p>

      <CodeBlock codeSnippet={htmxCodeSnippet} language="htmx" />
    </ProjectsLayout>
  )
}
