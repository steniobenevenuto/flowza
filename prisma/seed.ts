import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";


const adapter = new PrismaLibSql({
  url: "file:./prisma/bot.sqlite",
});


const prisma = new PrismaClient({
  adapter,
});


async function main() {


  const empresa = await prisma.empresa.create({

    data: {

      nome: "Imobiliária Teste",

      segmento: "imobiliaria",

      telefoneWhatsapp: "558586828908",


      fluxos: {

  create: [

    {
      pergunta:
      "Olá! 😊 Seja bem-vindo(a)! Você deseja comprar, vender ou alugar um imóvel?",

      etapa:1
    },


    {
      pergunta:
      "Perfeito! Em qual cidade você procura o imóvel?",

      etapa:2
    },


    {
      pergunta:
      "Ótimo! Qual bairro ou região você tem preferência?",

      etapa:3
    },


    {
      pergunta:
      "Legal! Você procura casa, apartamento ou terreno?",

      etapa:4
    },


    {
      pergunta:
      "Qual valor você pretende investir ou qual faixa de aluguel procura?",

      etapa:5
    },


    {
      pergunta:
      "Quantos quartos você procura?",

      etapa:6
    },


    {
      pergunta:
      "Para quando pretende fechar negócio?",

      etapa:7
    },


  ]

}

    },

  });


  console.log("Empresa criada:", empresa.nome);

}



main()

.then(async () => {

  await prisma.$disconnect();

})

.catch(async (e) => {

  console.error(e);

  await prisma.$disconnect();

  process.exit(1);

});