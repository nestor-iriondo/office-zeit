"use client";

import { setIdentity } from "../actions/identity";

export default function NamePicker() {
  return (
    <main>
      <h1>Wer bist du?</h1>
      <form action={setIdentity}>
        <input type="text" name="person" required placeholder="Dein Name" />
        <button type="submit">Weiter</button>
      </form>
    </main>
  );
}
