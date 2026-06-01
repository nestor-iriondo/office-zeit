-- CreateTable
CREATE TABLE "Presence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "person" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Presence_person_date_key" ON "Presence"("person", "date");
