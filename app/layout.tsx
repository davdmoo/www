import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"

import Analytics from "@/app/ui/analytics.components"
import Link from "next/link"
import "./globals.css"
import KeyboardEventListenerProvider from "./ui/client/keyboard_event_listener.components"
import LayoutHeader from "./ui/layout_header.components"

const fontFamily = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal"],
  fallback: ["Arial", "sans-serif"],
})

export const metadata: Metadata = {
  title: {
    template: "%s | David Mulyawan",
    default: "David Mulyawan",
  },
  description:
    "Personal site of David Mulyawan Oktavianus, a software engineer specialized in Flutter, React, and Typescript",
  authors: [{ name: "David Mulyawan Oktavianus", url: "https://davdmoo.dev" }],
  creator: "David Mulyawan Oktavianus",
  keywords: [
    "software",
    "software engineer",
    "David Mulyawan",
    "David Mulyawan Oktavianus",
    "Flutter",
    "React",
    "Typescript",
    "Express",
    "Node.js",
    "Next.js",
    "Tailwind CSS",
    "JavaScript",
    "Web Development",
    "Mobile Development",
    "Full Stack Engineer",
  ],
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

      <body className={`${fontFamily.className} antialiased h-screen flex flex-col justify-between px-4`}>
        <Analytics />
        <LayoutHeader />

        <KeyboardEventListenerProvider>
          <main className="flex-grow flex flex-col items-center my-8">
            <div className="lg:max-w-2xl md:max-w-2xl w-full mb-4">{children}</div>
          </main>
        </KeyboardEventListenerProvider>

        <footer className="flex justify-center py-4 px-2 space-x-6">
          <Link className="text-sm text-anchor-alt visited:text-anchor-visited-alt" href="mailto:dm@davdmoo.dev">
            email
          </Link>
          <Link className="text-sm text-anchor-alt visited:text-anchor-visited-alt" href="https://github.com/davdmoo">
            github
          </Link>
          <Link
            className="text-sm text-anchor-alt visited:text-anchor-visited-alt"
            href="https://linkedin.com/in/david-mulyawan"
          >
            linkedin
          </Link>
        </footer>
      </body>
    </html>
  )
}
