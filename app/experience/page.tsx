import PageHeader from "@/app/ui/page_header.components"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Experiences",
}

export default function WorkSummary() {
  return (
    <div className="flex flex-col items-center text-justify justify-center">
      <PageHeader title="/experience" />
      <div className="flex flex-col items-start w-full">
        <h2>
          Junior Full Stack Engineer at{" "}
          <Link
            href="https://liven.love"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl md:text-2xl lg:text-2xl"
          >
            Liven
          </Link>
        </h2>
        <p className="mb-4">
          <em>(April 2025 - present)</em>
        </p>

        <ul className="list-disc pl-3">
          <li>Currently working on a mall loyalty program at Liven&lsquo;s newly built tech hub in Indonesia</li>
        </ul>

        <p className="mt-3 text-sm">
          <strong>Tech stacks</strong>: Typescript, Next.js, Express, Nest.js, PostgreSQL
        </p>

        <hr className="my-6 w-full" />

        <h2>
          Staff Programmer at{" "}
          <Link
            href="https://qios-id.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl md:text-2xl lg:text-2xl"
          >
            Qios
          </Link>
        </h2>
        <p className="mb-4">
          <em>(February 2022 - April 2025)</em>
        </p>

        <ul className="list-disc pl-3">
          <li>
            Led the development of a self service bus ticketing application in Soekarno-Hatta international airport
          </li>
          <li>Led the development of a self service gym membership application for FTL gym</li>
          <li>
            Became a core contributor in various Android, web, and backend applications using Flutter, Typescript, and
            Firebase
          </li>
          <li>Helped streamlining the self service system by integrating payment with QRIS and EDC</li>
          <li>Spearheaded error tracking system for existing applications</li>
          <li>Implemented native Java code for hardware-related use cases using Flutter&rsquo;s platform channel</li>
          <li>Implemented backend unit tests using Jest</li>
        </ul>

        <p className="mt-3 text-sm">
          <strong>Tech stacks</strong>: Flutter, Typescript, Javascript, Firestore NoSQL, MongoDB, CI/CD with GitHub
          Actions, Firebase Cloud Messaging, Google Cloud Functions, Google Cloud Platform (GCP)
        </p>

        <hr className="my-6 w-full" />

        <h2 className="">Freelance Software Engineer </h2>
        <ul className="list-disc pl-3">
          <li>Successfully developed 1 project for a client in the retail industry</li>
          <li>Developed a Windows-based invoice and stock management app using Flutter, Typescript, and MongoDB</li>
          <li>
            Implemented features such as authentication, sales data management, automated hard and soft copy invoice
            generation, stock tracking, customer management, and monthly reporting
          </li>
          <li>Managed project timeline and feature implementations using GitHub Projects</li>
          <li>Create and manage monthly database backups</li>
          <li>Integrated Sentry for application error tracking</li>
        </ul>

        <p className="mt-3 text-sm">
          <strong>Tech stacks</strong>: Flutter, Typescript, MongoDB, GitHub Projects, Google Cloud Functions, Google
          Cloud Tasks
        </p>
      </div>
    </div>
  )
}
