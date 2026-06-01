"use client"

import Link from "next/link"

type Props = {
  activeOffset: number
}

export default function WeekTabs({ activeOffset }: Props) {
  return (
    <div className="flex gap-px border border-black">
      <Link
        href="/?week=0"
        className={`font-mono text-sm px-4 py-2 ${activeOffset === 0 ? "bg-black text-white" : "hover:bg-gray-100"}`}
      >
        Diese Woche
      </Link>
      <Link
        href="/?week=1"
        className={`font-mono text-sm px-4 py-2 ${activeOffset === 1 ? "bg-black text-white" : "hover:bg-gray-100"}`}
      >
        Nächste Woche
      </Link>
    </div>
  )
}
