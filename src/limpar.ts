import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function limpar() {

  await prisma.lead.deleteMany();

  console.log("✅ Todos os leads foram apagados!");

  await prisma.$disconnect();

}


limpar();