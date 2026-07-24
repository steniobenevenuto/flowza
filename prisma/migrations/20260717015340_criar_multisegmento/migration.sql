/*
  Warnings:

  - You are about to drop the column `cidade` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `interesse` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `orcamento` on the `Lead` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "segmento" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "leadId" INTEGER NOT NULL,
    CONSTRAINT "Resposta_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "telefone" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "etapa" INTEGER NOT NULL DEFAULT 1,
    "empresaId" INTEGER,
    CONSTRAINT "Lead_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("data", "etapa", "id", "mensagem", "nome", "telefone") SELECT "data", "etapa", "id", "mensagem", "nome", "telefone" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE UNIQUE INDEX "Lead_telefone_key" ON "Lead"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
