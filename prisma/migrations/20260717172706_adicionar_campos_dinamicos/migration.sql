/*
  Warnings:

  - You are about to drop the column `quartos` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `tipoImovel` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `urgencia` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `valorPretendido` on the `Lead` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "LeadCampo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "leadId" INTEGER NOT NULL,
    "campo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    CONSTRAINT "LeadCampo_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "segmento" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "empresaId" INTEGER,
    CONSTRAINT "Lead_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("bairro", "cidade", "data", "empresaId", "etapa", "id", "mensagem", "nome", "segmento", "telefone") SELECT "bairro", "cidade", "data", "empresaId", "etapa", "id", "mensagem", "nome", "segmento", "telefone" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE UNIQUE INDEX "Lead_telefone_key" ON "Lead"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
