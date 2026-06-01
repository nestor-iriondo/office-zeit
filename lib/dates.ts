const DAY_LABELS = ["Mo", "Di", "Mi", "Do", "Fr"]

export type WeekDay = {
  label: string
  date: string
}

function getMondayOf(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function toISODate(date: Date): string {
  return date.toISOString().split("T")[0]
}

export function getWeekDays(offsetWeeks: number = 0): WeekDay[] {
  const today = new Date()
  const monday = getMondayOf(today)
  monday.setDate(monday.getDate() + offsetWeeks * 7)

  return DAY_LABELS.map((label, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return { label, date: toISODate(d) }
  })
}

export function getDefaultWeekOffset(): number {
  return new Date().getDay() === 0 ? 1 : 0
}
