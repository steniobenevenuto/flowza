/*
  Warnings:

  - You are about to drop the column `segmento` on the `FluxoPergunta` table. All the data in the column will be lost.
  - Added the required column `empresaId` to the `FluxoPergunta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `etapa` to the `FluxoPergunta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "bairro" TEXT;
ALTER TABLE "Lead" ADD COLUMN "cidade" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "telefoneWhatsapp" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Empresa" ("id", "nome", "segmento") SELECT "id", "nome", "segmento" FROM "Empresa";
DROP TABLE "Empresa";
ALTER TABLE "new_Empresa" RENAME TO "Empresa";
CREATE TABLE "new_FluxoPergunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pergunta" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "etapa" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "FluxoPergunta_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FluxoPergunta" ("id", "ordem", "pergunta") SELECT "id", "ordem", "pergunta" FROM "FluxoPergunta";
DROP TABLE "FluxoPergunta";
ALTER TABLE "new_FluxoPergunta" RENAME TO "FluxoPergunta";
CREATE TABLE "new_Resposta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leadId" INTEGER NOT NULL,
    CONSTRAINT "Resposta_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resposta" ("id", "leadId", "pergunta", "resposta") SELECT "id", "leadId", "pergunta", "resposta" FROM "Resposta";
DROP TABLE "Resposta";
ALTER TABLE "new_Resposta" RENAME TO "Resposta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
