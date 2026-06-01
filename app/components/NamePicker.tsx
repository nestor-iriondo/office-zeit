"use client"

import { useState } from "react"
import { setIdentity } from "../actions/identity"

const COLORS = [
  "#FFB3BA",
  "#FFDAC1",
  "#FDFD96",
  "#B5EAD7",
  "#C7CEEA",
  "#E2C4F0",
  "#FF9AA2",
  "#F2D7EE",
]

export default function NamePicker() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [name, setName] = useState("")

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
      <div className="border-2 border-black dark:border-white p-8 w-full max-w-sm flex flex-col gap-6">
        <h1 className="font-mono font-bold text-2xl">Wer bist du?</h1>

        <form action={setIdentity} className="flex flex-col gap-5">
          <input
            type="text"
            name="person"
            required
            placeholder="Dein Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white font-mono px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white placeholder:text-gray-400"
          />

          <div className="flex flex-col gap-2">
            <span className="font-mono text-sm">Deine Farbe</span>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 border-2 transition-transform ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          <div
            className="font-mono text-xs px-3 py-1 self-start font-bold text-black"
            style={{ backgroundColor: selectedColor }}
          >
            {name || "Vorschau"}
          </div>

          <input type="hidden" name="color" value={selectedColor} />

          <button
            type="submit"
            className="border border-black dark:border-white font-mono px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Weiter →
          </button>
        </form>
      </div>
    </div>
  )
}
