import type { WeekDay } from "../../lib/dates"
import { togglePresence } from "../actions/presence"
import PersonChip from "./PersonChip"

type Props = {
  day: WeekDay
  presentPersons: string[]
  currentPerson: string
}

export default function DayCard({ day, presentPersons, currentPerson }: Props) {
  const isPresent = presentPersons.includes(currentPerson)

  return (
    <form
      action={togglePresence.bind(null, currentPerson, day.date)}
      className="border border-black flex-1 min-h-48 p-4 flex flex-col gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="font-mono font-bold text-lg">{day.label}</div>
      <div className="font-mono text-sm text-gray-500">{day.date}</div>

      <div className="flex flex-wrap gap-1 mt-2 flex-1">
        {presentPersons.map((person) => (
          <PersonChip
            key={person}
            person={person}
            dimmed={person !== currentPerson}
          />
        ))}
      </div>

      <button
        type="submit"
        className={`font-mono text-xs mt-auto border border-black px-2 py-1 hover:bg-black hover:text-white transition-colors ${isPresent ? "bg-black text-white" : ""}`}
      >
        {isPresent ? "− raus" : "+ rein"}
      </button>
    </form>
  )
}
