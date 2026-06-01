# Office Zeit

Kleines internes Tool für ein 5-Personen-Team. Jede Woche können Teammitglieder eintragen an welchen Tagen sie im Büro sind. Alle sehen die Übersicht in Echtzeit.

---

## Team

5 Personen mit Platzhalter-Namen bis zur echten Konfiguration:

- Person1
- Person2
- Person3
- Person4
- Person5

Namen werden später in einer Config-Datei oder `.env` gepflegt — kein Hardcoding im Code.

---

## Tech Stack

| Teil        | Entscheidung         | Notiz                                  |
|-------------|----------------------|----------------------------------------|
| Framework   | Next.js (App Router) | Bekannt beim Entwickler                |
| Styling     | Tailwind CSS         | Schnell, gut mit Next.js               |
| Datenbank   | SQLite + Prisma      | Kein externer Service, läuft on-server |
| Auth        | Name-Picker + Cookie | Intern, 5 Leute, kein Login nötig      |
| Hosting     | Hetzner (eigener)    | Docker oder PM2                        |
| Deploy      | Docker Compose       | Einfach, reproduzierbar                |

---

## Design-Philosophie

**Brutalist — Schwarz/Weiß als Basis.**

- Schwarz, Weiß, harte Kanten, klare Typografie
- Kein Rounded-Corners-Brei, kein Pastellfarben
- Experimente mit Farbe sind erlaubt — aber als Akzent, nicht als Basis
- Jede Person bekommt eine Farbe für ihren Name-Chip (einzige Ausnahme vom SW-Prinzip)
- Typografie: Monospace oder grotesque, kein serif

---

## UI / Verhalten

### Wochenansicht

- 5 Karten nebeneinander (Mo–Fr), auf Mobil gestapelt
- Jede Karte zeigt den Wochentag + Datum
- Eingetragene Namen erscheinen als farbige Chips auf der Karte
- Eigener Name-Chip ist hervorgehoben (andere leicht gedimmt)
- Klick auf Karte = eigenen Namen toggeln (erscheinen / verschwinden)
- Dezente Animation beim Erscheinen/Verschwinden

### Wochenwechsel

- **Automatisch:** Ab Sonntag zeigt die App standardmäßig die **nächste Woche**
- Tab-Navigation: „Diese Woche" / „Nächste Woche" immer sichtbar
- Keine Vergangenheits-Navigation nötig (read-only wäre ok, aber kein Fokus)

### Onboarding (einmalig)

- Beim ersten Besuch: „Wer bist du?" — Name aus Liste wählen
- Name wird in Cookie gespeichert (kein Login, kein Passwort)
- Kein Account-System

---

## Datenmodell

```prisma
model Presence {
  id        Int      @id @default(autoincrement())
  person    String   // z.B. "person1"
  date      String   // ISO: "2026-06-10"
  createdAt DateTime @default(now())

  @@unique([person, date])
}
```

Ein Eintrag = eine Person ist an diesem Tag im Büro.
Klick zum Eintragen → Klick zum Entfernen (`upsert` / `delete`).

---

## Arbeitsweise

- **Stück für Stück.** Kein großer Dump, sondern kleine überschaubare Schritte.
- **Vor jedem nächsten Schritt:** Entwickler reviewed und gibt grünes Licht.
- **Jeder Schritt endet mit einem Commit.** Commit-Message beschreibt was und warum.
- **Claude schlägt vor, Entwickler entscheidet.**
- Keine Features die nicht besprochen wurden.
- Keine Refactors nebenbei — nur was explizit angefragt ist.

## Pädagogischer Ansatz

Der Entwickler kennt Next.js gut, hat aber **keine Erfahrung mit SQLite oder Cookie-Auth**.

- Vor jedem neuen Konzept (DB, Cookie, Prisma, Docker): kurze Erklärung **warum** wir es so machen, nicht nur **was**
- Kein Magic-Code der einfach funktioniert — lieber erklären was eine Zeile tut
- Wenn es mehrere Wege gibt: kurz nennen warum wir diesen gewählt haben
- Fragen sind willkommen und sollen ausführlich beantwortet werden
- Tempo: lieber langsam mit Verständnis als schnell mit Copy-Paste

---

## Echtzeit

Kein WebSocket. Einfaches **Polling alle 30 Sekunden** im Client — reicht für 5 Leute.
Alternativ: manueller Refresh-Button. Entscheidung offen.

## Environment Variables

```
DATABASE_URL="file:./dev.db"
TEAM_MEMBERS="Person1,Person2,Person3,Person4,Person5"
```

`.env` nie in git. `.env.example` mit leeren Werten als Vorlage.

## Testing

Bewusst kein Testing für dieses interne Tool — zu klein, zu wenig Komplexität.
Manuelle QA reicht.

## Offene Punkte

- [ ] Echte Namen konfigurieren
- [ ] Farben pro Person festlegen (aktuell: experimentell)
- [ ] Domain / Subdomain auf Hetzner
- [ ] Basic Auth via nginx vor der App? (da öffentlich erreichbar)
- [ ] Polling (30s automatisch) oder manueller Refresh-Button?
