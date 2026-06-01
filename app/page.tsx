import { cookies } from "next/headers"
import NamePicker from "./components/NamePicker"
import WeekView from "./components/WeekView"
import WeekTabs from "./components/WeekTabs"
import { getDefaultWeekOffset } from "../lib/dates"

type Props = {
  searchParams: Promise<{ week?: string }>
}

export default async function Home({ searchParams }: Props) {
  const cookieStore = await cookies()
  const person = cookieStore.get("officeZeitPerson")?.value

  if (!person) {
    return <NamePicker />
  }

  const params = await searchParams
  const weekOffset = params.week !== undefined
    ? parseInt(params.week)
    : getDefaultWeekOffset()

  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-mono font-bold text-2xl">Office Zeit</h1>
        <span className="font-mono text-sm text-gray-500">{person}</span>
      </div>
      <WeekTabs activeOffset={weekOffset} />
      <WeekView weekOffset={weekOffset} currentPerson={person} />
    </main>
  )
}
