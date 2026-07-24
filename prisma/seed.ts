import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
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

            etapa: 1,

            campo: "finalidade"
          },


          {
            pergunta:
            "Perfeito! Em qual cidade você procura o imóvel?",

            etapa: 2,

            campo: "cidade"
          },


          {
            pergunta:
            "Ótimo! Qual bairro ou região você tem preferência?",

            etapa: 3,

            campo: "bairro"
          },


          {
            pergunta:
            "Legal! Você procura casa, apartamento ou terreno?",

            etapa: 4,

            campo: "tipo"
          },


          {
            pergunta:
            "Qual valor você pretende investir ou qual faixa de aluguel procura?",

            etapa: 5,

            campo: "valor"
          },


          {
            pergunta:
            "Quantos quartos você procura?",

            etapa: 6,

            campo: "quartos"
          },


          {
            pergunta:
            "Para quando pretende fechar negócio?",

            etapa: 7,

            campo: "prazo"
          }

        ]

      }

    }

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