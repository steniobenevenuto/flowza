import { PrismaClient } from "./src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  adapter: new PrismaLibSql({
    url: "file:./prisma/bot.sqlite"
  })
});

async function main() {
  const hash = await bcrypt.hash("123456", 10);

  await prisma.usuario.update({
    where: {
      email: "teste@teste.com"
    },
    data: {
      senha: hash
    }
  });

  console.log("Senha atualizada!");
}

main().finally(async () => {
  await prisma.$disconnect();
});