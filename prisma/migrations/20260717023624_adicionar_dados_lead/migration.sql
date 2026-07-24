/*
  Warnings:

  - You are about to drop the column `ativo` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `ordem` on the `FluxoPergunta` table. All the data in the column will be lost.
  - Made the column `telefoneWhatsapp` on table `Empresa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "segmento" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "telefoneWhatsapp" TEXT NOT NULL
);
INSERT INTO "new_Empresa" ("id", "nome", "segmento", "telefoneWhatsapp") SELECT "id", "nome", "segmento", "telefoneWhatsapp" FROM "Empresa";
DROP TABLE "Empresa";
ALTER TABLE "new_Empresa" RENAME TO "Empresa";
CREATE TABLE "new_FluxoPergunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pergunta" TEXT NOT NULL,
    "etapa" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "FluxoPergunta_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FluxoPergunta" ("empresaId", "etapa", "id", "pergunta") SELECT "empresaId", "etapa", "id", "pergunta" FROM "FluxoPergunta";
DROP TABLE "FluxoPergunta";
ALTER TABLE "new_FluxoPergunta" RENAME TO "FluxoPergunta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
