/*
  Warnings:

  - You are about to drop the column `ativo` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `horarioFim` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `horarioInicio` on the `Empresa` table. All the data in the column will be lost.
  - You are about to drop the column `mensagemInicial` on the `Empresa` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "Usuario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
