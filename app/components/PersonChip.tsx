type Props = {
  person: string
  color: string
  dimmed?: boolean
}

export default function PersonChip({ person, color, dimmed }: Props) {
  return (
    <span
      style={{ backgroundColor: color, color: "#000" }}
      className={`font-mono text-xs px-2 py-1 font-bold transition-opacity ${dimmed ? "opacity-40" : "opacity-100"}`}
    >
      {person}
    </span>
  )
}
