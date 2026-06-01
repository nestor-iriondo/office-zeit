import { cookies } from "next/headers";
import NamePicker from "./components/NamePicker";

export default async function Home() {
  const cookieStore = await cookies();
  const person = cookieStore.get("officeZeitPerson")?.value;

  if (!person) {
    return <NamePicker />;
  }

  return (
    <main>
      <p>Hallo, {person}</p>
    </main>
  );
}
