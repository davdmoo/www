import CodeBlock from "@/app/ui/code_block.components"
import Link from "next/link"
import BackButton from "../back_button.components"
import ArrowLeftIcon from "../icons/arrow_left.components"
import ArrowUpRightIcon from "../icons/arrow_up_right.components"
import ProjectsLayout from "./project_layout.components"

export default function SlinksProject() {
  const hyperscriptCodeSnippet = `
<button _="on click hide #alert"> 
</button>
  `

  return (
    <ProjectsLayout>
      <div className="w-full flex flex-row items-center justify-between mb-4">
        <div className="w-full flex flex-row items-center gap-4">
          <BackButton>
            <ArrowLeftIcon />
          </BackButton>
          <h2 className="mb-0">Slinks</h2>
        </div>
        <Link href="https://slinks.deno.dev" target="_blank" rel="noopener noreferrer" title="Open project in new tab">
          <ArrowUpRightIcon />
        </Link>
      </div>
      <p>
        A fun and simple way for me to explore the{" "}
        <Link href="https://deno.com" target="_blank" rel="noopener noreferrer">
          Deno
        </Link>{" "}
        runtime,{" "}
        <Link href="https://htmx.org" target="_blank" rel="noopener noreferrer">
          HTMX
        </Link>
        , and{" "}
        <Link href="https://hyperscript.org" target="_blank" rel="noopener noreferrer">
          Hyperscript
        </Link>
        . Features include creating short links, downloading URL as QR code, and light/dark modes.
      </p>
      <p>
        Deno is a JS runtime which has the tagline &quot;Uncomplicate JavaScript&quot;. And I think it did just that -
        at least in my simple project. Not having to deal with configuring code formatters, linters, and having a
        relatively concise code base was very nice!
      </p>
      <p>
        HTMX is a different take on what I am used to seeing/building in terms of clients and servers&apos;
        interactions. I learned about how REST was originally designed to{" "}
        <Link
          href="https://htmx.org/essays/how-did-rest-come-to-mean-the-opposite-of-rest/"
          target="_blank"
          rel="noopener noreferrer"
        >
          work
        </Link>
        , re-learned HTML forms, and how HTML responses are actually{" "}
        <Link href="https://htmx.org/essays/hypermedia-apis-vs-data-apis/" target="_blank" rel="noopener noreferrer">
          self-documenting
        </Link>{" "}
        codes.
      </p>
      <p>
        HTMX creator&apos;s{" "}
        <Link href="https://htmx.org/essays" target="_blank" rel="noopener noreferrer">
          essays
        </Link>{" "}
        is a great source of tech reads. Especially his essay on{" "}
        <Link href="https://grugbrain.dev/" target="_blank" rel="noopener noreferrer">
          simplicity
        </Link>
        .
      </p>

      <CodeBlock codeSnippet={hyperscriptCodeSnippet} language="//hyperscript" />
    </ProjectsLayout>
  )
}
