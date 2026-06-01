"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"

export async function setIdentity(formData: FormData) {
  const person = (formData.get("person") as string)?.trim()
  const color = formData.get("color") as string
  if (!person || !color) return

  await prisma.person.upsert({
    where: { name: person },
    update: { color },
    create: { name: person, color },
  })

  const cookieStore = await cookies()
  cookieStore.set("officeZeitPerson", person, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  })

  redirect("/")
}
