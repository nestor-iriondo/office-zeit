@.claude/project.md
@.claude/clean-code.md
@.claude/nextjs.md

---

## Arbeitsweise

- Stück für Stück. Ein Konzept pro Session, ein Commit pro Schritt.
- Vor jedem neuen Konzept (Prisma, SQLite, Cookie, Docker): Konzept erklären, Alternativen kurz nennen, dann erst coden.
- Kein Code ohne Kontext — der Entwickler soll verstehen was und warum.
- Kein ungefragtes Refactoring, keine ungefragten Features.
- Nach jeder Änderung die den Scope, Stack oder das Design betrifft: `.claude/project.md` aktualisieren.
- Nach jedem abgeschlossenen Schritt: Commit ankündigen, Entwickler bestätigt.

---

## Terminal-Rechte

| Eigenständig erlaubt | Muss angekündigt werden |
|---|---|
| `ls`, `grep`, `find`, `cat` — Lesen | `npm`, `npx`, `git commit`, `git push` |
| Dateistruktur erkunden | Dateien erstellen oder verändern |

---

## Commits

Format: **Conventional Commits auf Englisch**

```
feat: add presence toggle for week view
fix: cookie not persisting after page reload
chore: install prisma and configure sqlite
```

---

## Was wir nicht tun

- Kein Testing — manuelles QA reicht
- Kein raw SQL — immer Prisma ORM
- Keine hardgecodeten Namen — immer aus `TEAM_MEMBERS` env
- Kein externes Auth-System, keine externe Datenbank
- Kein `rounded-*` in Tailwind, keine Pastellfarben
