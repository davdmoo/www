import type { Metadata } from "next"
import { Ubuntu } from "next/font/google"

import Analytics from "@/app/ui/analytics.components"
import LayoutHeader from "@/app/ui/layout_header.components"
import Link from "next/link"
import "./globals.css"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  fallback: ["Arial", "sans-serif"],
})

export const metadata: Metadata = {
  title: {
    template: "David Mulyawan",
    default: "David Mulyawan",
  },
  description:
    "Personal site of David Mulyawan Oktavianus, a software developer specialized in Flutter, React, and Typescript",
  authors: [{ name: "David Mulyawan Oktavianus", url: "https://davdmoo.vercel.app" }],
  creator: "David Mulyawan Oktavianus",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {process.env.NODE_ENV === "production" ? (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="26b22b57-79e1-4b46-8e27-041da60705f9"
          ></script>
        ) : null}
      </head>

      <body className={`${ubuntu.className} antialiased h-screen flex flex-col justify-between px-4`}>
        <Analytics />
        <LayoutHeader />

        <main className="flex-grow flex flex-col items-center my-4">
          <div className="lg:max-w-2xl md:max-w-2xl w-full mb-4">{children}</div>
        </main>

        <footer className="flex justify-center py-4 px-2 space-x-6">
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/">
            /
          </Link>
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/experience">
            /experience
          </Link>
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/projects">
            /projects
          </Link>
          <Link className="text-anchor-alt visited:text-anchor-visited-alt" href="/guest-book">
            /guests
          </Link>
        </footer>
      </body>
    </html>
  )
}
