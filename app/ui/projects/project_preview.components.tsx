"use client"

import React from "react"
import EyeIcon from "../icons/eye_icon.components"

export default function ProjectPreview({ iframeSrc }: { iframeSrc: string }) {
  const [visible, setVisible] = React.useState(false)

  return (
    <div className="w-full h-80">
      {visible ? (
        <iframe src={iframeSrc} className="w-full h-full"></iframe>
      ) : (
        <div
          className="w-full h-full flex flex-col items-center justify-center bg-foreground hover:cursor-pointer"
          onClick={() => setVisible(true)}
        >
          <EyeIcon />
          <p className="text-background">Preview project</p>
        </div>
      )}
    </div>
  )
}
