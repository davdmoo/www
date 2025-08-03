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
        <Link href="/experience">experience</Link>. I specialize in building softwares using Flutter, React, and
        Typescript.
      </p>
      <p>
        I have always had curiosity toward all things computer related. I used to tinker with my PC; breaking them apart
        and putting them back together, messing around with Windows installations, and even used Linux at some point
        before I knew anything about it.
      </p>

      <hr className="my-6 w-full" />

      <h2>Career Journey</h2>
      <p>
        My professional experience started at{" "}
        <Link href="https://qios-id.com" target="_blank" rel="noopener noreferrer">
          Qios
        </Link>
        , a company focused in providing self-service systems to FnB, transportation, and service industries. I became
        one of the first two programmers here, which was quite the challenge, but I believe it gave me the opportunity
        to develop unique set of skills and taking full ownership of several impactful projects.
      </p>
      <p>
        One of my proudest achievements was developing a self-service bus ticketing platform that processes tens of
        thousands of transactions per month. This was my first professional project and also the first one using
        Flutter; a tool I had to learn during my first month here.
      </p>
      <p>
        Right now I&apos;m working at <Link href="https://liven.love">Liven</Link>&apos;s Indonesia team as a Full Stack
        Engineer.
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
