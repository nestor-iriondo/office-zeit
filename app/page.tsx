import { cookies } from "next/headers"
import NamePicker from "./components/NamePicker"
import WeekView from "./components/WeekView"
import { getDefaultWeekOffset } from "../lib/dates"

export default async function Home() {
  const cookieStore = await cookies()
  const person = cookieStore.get("officeZeitPerson")?.value

  if (!person) {
    return <NamePicker />
  }

  const weekOffset = getDefaultWeekOffset()

  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-mono font-bold text-2xl">Office Zeit</h1>
        <span className="font-mono text-sm text-gray-500">{person}</span>
      </div>
      <WeekView weekOffset={weekOffset} />
    </main>
  )
}
