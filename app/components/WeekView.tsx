import { getWeekDays } from "../../lib/dates"
import DayCard from "./DayCard"

type Props = {
  weekOffset: number
}

export default function WeekView({ weekOffset }: Props) {
  const days = getWeekDays(weekOffset)

  return (
    <div className="flex flex-col sm:flex-row gap-px bg-black border border-black">
      {days.map((day) => (
        <DayCard key={day.date} day={day} />
      ))}
    </div>
  )
}
