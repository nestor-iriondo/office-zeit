"use server"

import { prisma } from "../../lib/prisma"
import { revalidatePath } from "next/cache"

export async function togglePresence(person: string, date: string) {
  const existing = await prisma.presence.findUnique({
    where: { person_date: { person, date } },
  })

  if (!existing) {
    await prisma.presence.create({ data: { person, date, withDog: false } })
  } else if (!existing.withDog) {
    await prisma.presence.update({
      where: { id: existing.id },
      data: { withDog: true },
    })
  } else {
    await prisma.presence.delete({ where: { id: existing.id } })
  }

  revalidatePath("/")
}
