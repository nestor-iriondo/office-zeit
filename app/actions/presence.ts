"use server"

import { prisma } from "../../lib/prisma"
import { revalidatePath } from "next/cache"

export async function togglePresence(person: string, date: string) {
  const existing = await prisma.presence.findUnique({
    where: { person_date: { person, date } },
  })

  if (existing) {
    await prisma.presence.delete({ where: { id: existing.id } })
  } else {
    await prisma.presence.create({ data: { person, date } })
  }

  revalidatePath("/")
}
