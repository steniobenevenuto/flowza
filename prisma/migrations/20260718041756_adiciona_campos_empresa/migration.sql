/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Empresa` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "telefoneWhatsapp" TEXT NOT NULL,
    "plano" TEXT NOT NULL DEFAULT 'teste',
    "ativo" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Empresa" ("ativo", "id", "nome", "plano", "segmento", "telefoneWhatsapp") SELECT "ativo", "id", "nome", "plano", "segmento", "telefoneWhatsapp" FROM "Empresa";
DROP TABLE "Empresa";
ALTER TABLE "new_Empresa" RENAME TO "Empresa";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
