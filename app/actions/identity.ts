"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setIdentity(formData: FormData) {
  const person = formData.get("person") as string;
  if (!person?.trim()) return;

  const cookieStore = await cookies();
  cookieStore.set("officeZeitPerson", person.trim(), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  redirect("/");
}
