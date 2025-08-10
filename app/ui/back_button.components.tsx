"use client"

export default function BackButton({ children }: { children: React.ReactNode }) {
  return (
    <div onClick={() => window.history.back()} className="cursor-pointer">
      {children}
    </div>
  )
}
