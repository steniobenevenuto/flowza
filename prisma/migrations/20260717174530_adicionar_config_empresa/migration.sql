-- CreateTable
CREATE TABLE "CampoFormulario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "CampoFormulario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Conhecimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "Conhecimento_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "telefoneWhatsapp" TEXT NOT NULL,
    "mensagemInicial" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "horarioInicio" TEXT,
    "horarioFim" TEXT
);
INSERT INTO "new_Empresa" ("id", "nome", "segmento", "telefoneWhatsapp") SELECT "id", "nome", "segmento", "telefoneWhatsapp" FROM "Empresa";
DROP TABLE "Empresa";
ALTER TABLE "new_Empresa" RENAME TO "Empresa";
CREATE UNIQUE INDEX "Empresa_telefoneWhatsapp_key" ON "Empresa"("telefoneWhatsapp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
