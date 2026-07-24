-- CreateTable
CREATE TABLE "Imovel" (
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
    CONSTRAINT "Imovel_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
