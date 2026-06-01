const CHIP_COLORS: Record<number, string> = {
  0: "bg-yellow-300 text-black",
  1: "bg-blue-400 text-white",
  2: "bg-red-400 text-white",
  3: "bg-green-400 text-black",
  4: "bg-purple-400 text-white",
}

const members = (process.env.TEAM_MEMBERS ?? "").split(",").map((m) => m.trim())

function colorForPerson(person: string): string {
  const index = members.indexOf(person)
  return CHIP_COLORS[index] ?? "bg-gray-300 text-black"
}

type Props = {
  person: string
  dimmed?: boolean
}

export default function PersonChip({ person, dimmed }: Props) {
  return (
    <span
      className={`font-mono text-xs px-2 py-1 font-bold ${colorForPerson(person)} ${dimmed ? "opacity-40" : ""}`}
    >
      {person}
    </span>
  )
}
