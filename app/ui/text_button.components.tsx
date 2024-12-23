import { MouseEventHandler } from "react"

export default function TextButton({
  children,
  onClick,
}: Readonly<{
  children: React.ReactNode
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}>) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center space-x-1 font-semibold text-sm text-foreground bg-transparent border-0 rounded-md hover:rounded-md px-2"
    >
      {children}
    </button>
  )
}
