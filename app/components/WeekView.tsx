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

  const [presences, persons] = await Promise.all([
    prisma.presence.findMany({ where: { date: { in: dates } } }),
    prisma.person.findMany(),
  ])

  const colorMap = Object.fromEntries(persons.map((p) => [p.name, p.color]))

  return (
    <div className="flex flex-col sm:flex-row gap-px bg-black dark:bg-white border border-black dark:border-white">
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
            colorMap={colorMap}
          />
        )
      })}
    </div>
  )
}
