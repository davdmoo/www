import CodeBlock from "@/app/ui/code_block.components"
import PageHeader from "@/app/ui/page_header.components"
import Link from "next/link"

export default function Projects() {
  const htmxCodeSnippet = `
<form hx-get="/dictionaries" hx-target="#response" hx-swap="innerHTML">
  <input type="text" name="word" id="word-input">
  <button type="submit">Search</button>
</form>
  `
  const hyperscriptCodeSnippet = `
<button _="on click hide #alert"> 
</button>
  `
  const powerShellCodeSnippet = `
Start-Process –FilePath "$filePath" –Verb Print
  `

  return (
    <div className="flex flex-col items-center">
      <PageHeader title="/projects" />

      <div className="flex flex-col items-start w-full text-justify">
        <h2>Invoice Management App</h2>
        <p>
          This was a Windows application I built using Flutter and Typescript. Features include authentication, sales
          and product shipments&apos; invoice generation, along with sales data, customer, product, and stock
          management, and automated monthly reports.
        </p>
        <p>
          The most challenging part of this one was that this was my first experience handling a freelance project. I
          had to consult directly with the client, mapping business into project requirements, managing project
          timelines, and programming the actual software.
        </p>
        <p>
          Fortunately, I have experience in managing and splitting tasks at work using GitHub Projects. This I did since
          I had found myself being constantly overwhelmed by unclear requirements and tasks.
        </p>
        <p>
          The second most challenging part was printing hard copied invoices using dot matrix printers - of which I had
          no experience doing. In the end, what I did was generating the invoice as HTML on the server, converting it
          into PDF, and then sending a PowerShell command to print using the default PDF reader.
        </p>
        <p>
          All in all, I learned a lot in managing project timelines, creating and managing database backups, re-learned
          database migrations, and, of course, time management, since I had to work on the project outside of working
          hours.
        </p>

        <CodeBlock codeSnippet={powerShellCodeSnippet} language="PowerShell" />

        <hr className="my-6 w-full" />

        <Link
          href="https://slinks.deno.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl lg:text-2xl md:text-2xl font-semibold"
        >
          Slinks
        </Link>
        <Link href="https://github.com/davdmoo/slinks" target="_blank" rel="noopener noreferrer" className="mb-2">
          <em>Code base</em>
        </Link>
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

        <hr className="my-6 w-full" />

        <Link
          href="https://dictionary-htmx.deno.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl lg:text-2xl md:text-2xl font-semibold"
        >
          Dictionary
        </Link>
        <Link href="https://github.com/davdmoo/dictionary" target="_blank" rel="noopener noreferrer" className="mb-2">
          <em>Code base</em>
        </Link>
        <p>
          I find myself in constant needs of finding word definitions and wanted a simple way to do so (can always
          Google but that&apos;s no fun, plus this was an excuse to explore HTMX again). Features include integration
          with third party{" "}
          <Link href="https://dictionaryapi.dev/" target="_blank" rel="noopener noreferrer" className="mb-4">
            API
          </Link>{" "}
          and managing audio playback using vanilla Javascript.
        </p>

        <CodeBlock codeSnippet={htmxCodeSnippet} language="htmx" />
      </div>
    </div>
  )
}
