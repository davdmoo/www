import PageHeader from "@/app/ui/page_header.components"
import Link from "next/link"

export default function Home() {
  const firstProExp = new Date("2022-02-14")

  function getExp(start: Date) {
    const diff = new Date().getTime() - start.getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const oneMonth = oneDay * 30
    const oneYear = oneMonth * 12

    const yoe = Math.floor(diff / oneYear)
    const moe = Math.floor(diff / oneMonth) - yoe * 12

    let result = `${yoe} years and ${moe} month`
    if (moe > 1) result += "s"

    return result
  }

  return (
    <div className="text-justify">
      <PageHeader title="/" />

      <h2>About</h2>
      <p>
        Hello. My name is David, a software engineer with {`${getExp(firstProExp)}`} of professional{" "}
        <Link href="/experience">experience</Link>. I&apos;d like to think of myself as a generalist - someone who
        enjoys working across the stacks. Other things I enjoy about software engineering are architecture and database
        design.
      </p>

      <hr className="my-6 w-full" />

      <h2>Career Journey</h2>
      <p>
        My professional experience started at{" "}
        <Link href="https://slinks.deno.dev/uOuVFI" target="_blank" rel="noopener noreferrer">
          Qios
        </Link>
        , a company focused in providing self-service systems to FnB, transportation, and service industries. I became
        one of the first two programmers here, which gave me the opportunity to develop a unique set of skills and
        taking full ownership on several impactful projects.
      </p>
      <p>
        Right now I&apos;m working at <Link href="https://slinks.deno.dev/bItewC">Liven</Link>&apos;s Indonesia team as
        a Full Stack Engineer.
      </p>

      <hr className="my-6 w-full" />

      <h2>Outside of Work</h2>
      <p>
        I enjoy building things for <Link href="/projects">fun</Link>, playing Dota 2, reading and listening to{" "}
        <Link target="_blank" href="https://slinks.deno.dev/hczL0w">
          music
        </Link>
        .
      </p>
    </div>
  )
}
