import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: "file:./prisma/bot.sqlite",
});

const prisma = new PrismaClient({
  adapter,
});

async function limpar() {
  await prisma.lead.deleteMany();
  console.log("✅ Todos os leads foram apagados!");
  await prisma.$disconnect();
}

limpar();