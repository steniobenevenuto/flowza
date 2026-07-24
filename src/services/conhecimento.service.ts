import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: "file:./prisma/bot.sqlite",
});

const prisma = new PrismaClient({
  adapter,
});

export async function cadastrarConhecimento(
  empresaId: number,
  pergunta: string,
  resposta: string
) {
  return await prisma.conhecimento.create({
    data: {
      empresaId,
      pergunta,
      resposta,
    },
  });
}

export async function listarConhecimentos(
  empresaId: number
) {
  return await prisma.conhecimento.findMany({
    where: {
      empresaId,
    },
  });
}

export async function buscarConhecimento(
  empresaId: number,
  mensagem: string
) {
  const conhecimentos =
    await prisma.conhecimento.findMany({
      where: {
        empresaId,
      },
    });

  const texto = mensagem.toLowerCase();

  for (const item of conhecimentos) {
    if (
      texto.includes(
        item.pergunta.toLowerCase()
      )
    ) {
      return item.resposta;
    }
  }

  return null;
}

export async function removerConhecimento(
  id: number
) {
  return await prisma.conhecimento.delete({
    where: {
      id,
    },
  });
}