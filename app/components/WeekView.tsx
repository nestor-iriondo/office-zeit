import { getWeekDays } from "../../lib/dates"
import { prisma } from "../../lib/prisma"
import DayCard from "./DayCard"

type Props = {
  weekOffset: number
  currentPerson: string
}

export default async function WeekView({ weekOffset, currentPerson }: Props) {
  const days = getWeekDays(weekOffset)
  const dates = days.map((d) => d.date)

  const presences = await prisma.presence.findMany({
    where: { date: { in: dates } },
  })

  return (
    <div className="flex flex-col sm:flex-row gap-px bg-black border border-black">
      {days.map((day) => {
        const presentPersons = presences
          .filter((p) => p.date === day.date)
          .map((p) => p.person)

        return (
          <DayCard
            key={day.date}
            day={day}
            presentPersons={presentPersons}
            currentPerson={currentPerson}
          />
        )
      })}
    </div>
  )
}
