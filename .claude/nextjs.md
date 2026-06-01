# Next.js Konventionen — Office Zeit

Next.js 14+ mit App Router. Kein Pages Router.

---

## Server vs. Client Components

**Default: Server Component.** Erst zum Client wechseln wenn nötig.

| Server Component | Client Component (`"use client"`) |
|---|---|
| Daten lesen (Prisma) | onClick, onChange Handler |
| Kein interaktiver State | useState, useEffect |
| Kein Browser-API | Browser-APIs (Cookie lesen im Client) |

Faustregel: Wenn eine Komponente nur anzeigt → Server. Wenn sie reagiert → Client.

---

## Datenmutationen: Server Actions

Für Präsenz-Toggle (eintragen / entfernen) nutzen wir **Server Actions** — keine separaten API-Routes.

```ts
// app/actions/presence.ts
"use server"

export async function togglePresence(person: string, date: string) {
  // Prisma-Aufruf direkt hier
}
```

Warum Server Actions statt API Route: Weniger Boilerplate, typsicher von Ende zu Ende, kein `fetch()` im Client nötig.

---

## Dateistruktur

```
app/
  layout.tsx          — Root Layout, Fonts
  page.tsx            — Hauptseite (Wochenansicht)
  actions/
    presence.ts       — Server Actions für Präsenz
  components/
    WeekView.tsx      — Wochenübersicht
    DayCard.tsx       — Einzelne Tageskarte
    PersonChip.tsx    — Name-Chip mit Farbe
lib/
  prisma.ts           — Prisma Client Singleton
  dates.ts            — Hilfsfunktionen für Wochen-Berechnung
```

---

## Prisma Client — Singleton

Immer aus `lib/prisma.ts` importieren, nie direkt `new PrismaClient()` in Komponenten.

```ts
// lib/prisma.ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
```

Warum: Next.js startet den Dev-Server bei jedem Hot Reload neu — ohne Singleton entstehen hunderte DB-Connections.

---

## Environment Variables

```ts
// Teamliste aus env — nie hardcoden
const members = process.env.TEAM_MEMBERS?.split(",") ?? []
```

Server-only Variables (ohne `NEXT_PUBLIC_` Prefix) bleiben im Server — nie an den Client weitergeben.

---

## Kein Einsatz von

- `getServerSideProps` / `getStaticProps` — das ist Pages Router
- `useRouter` für Datenmutationen — dafür Server Actions
- API Routes (`app/api/`) — nur wenn Server Actions nicht ausreichen
