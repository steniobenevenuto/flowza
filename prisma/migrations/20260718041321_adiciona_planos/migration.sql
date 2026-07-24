-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "telefoneWhatsapp" TEXT NOT NULL,
    "plano" TEXT NOT NULL DEFAULT 'teste',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Empresa" ("id", "nome", "segmento", "telefoneWhatsapp") SELECT "id", "nome", "segmento", "telefoneWhatsapp" FROM "Empresa";
DROP TABLE "Empresa";
ALTER TABLE "new_Empresa" RENAME TO "Empresa";
CREATE UNIQUE INDEX "Empresa_telefoneWhatsapp_key" ON "Empresa"("telefoneWhatsapp");
CREATE TABLE "new_Imovel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "finalidade" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "quartos" INTEGER,
    "banheiros" INTEGER,
    "vagas" INTEGER,
    "descricao" TEXT,
    "fotos" TEXT,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "Imovel_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Imovel" ("bairro", "banheiros", "cidade", "descricao", "empresaId", "finalidade", "fotos", "id", "preco", "quartos", "tipo", "titulo", "vagas") SELECT "bairro", "banheiros", "cidade", "descricao", "empresaId", "finalidade", "fotos", "id", "preco", "quartos", "tipo", "titulo", "vagas" FROM "Imovel";
DROP TABLE "Imovel";
ALTER TABLE "new_Imovel" RENAME TO "Imovel";
CREATE TABLE "new_Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "telefone" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "etapa" INTEGER NOT NULL DEFAULT 1,
    "status" TEXT NOT NULL DEFAULT 'novo',
    "segmento" TEXT,
    "cidade" TEXT,
    "bairro" TEXT,
    "empresaId" INTEGER,
    CONSTRAINT "Lead_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("bairro", "cidade", "data", "empresaId", "etapa", "id", "mensagem", "nome", "segmento", "status", "telefone") SELECT "bairro", "cidade", "data", "empresaId", "etapa", "id", "mensagem", "nome", "segmento", "status", "telefone" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE UNIQUE INDEX "Lead_telefone_key" ON "Lead"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
