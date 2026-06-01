import type { WeekDay } from "../../lib/dates"

type Props = {
  day: WeekDay
}

export default function DayCard({ day }: Props) {
  return (
    <div className="border border-black flex-1 min-h-48 p-4 flex flex-col gap-2">
      <div className="font-mono font-bold text-lg">{day.label}</div>
      <div className="font-mono text-sm text-gray-500">{day.date}</div>
    </div>
  )
}
