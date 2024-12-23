"use client"

import DownloadIcon from "@/app/ui/download_icon.components"
import TextButton from "@/app/ui/text_button.components"

export default function DownloadCvButton() {
  return (
    <TextButton
      onClick={() => {
        window.open("/resume.pdf", "_blank")?.focus()
      }}
    >
      <DownloadIcon />
      <p className="mb-0">Resume</p>
    </TextButton>
  )
}
