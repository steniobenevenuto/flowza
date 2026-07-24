import prisma from "../src/lib/prisma";


async function limpar(){

    console.log("Limpando banco...");


    await prisma.mensagem.deleteMany();

    await prisma.resposta.deleteMany();

    await prisma.leadCampo.deleteMany();

    await prisma.fluxoPergunta.deleteMany();

    await prisma.pagamento.deleteMany();

    await prisma.imovel.deleteMany();

    await prisma.lead.deleteMany();

    await prisma.usuario.deleteMany();

    await prisma.empresa.deleteMany();



    console.log("Banco limpo 🚀");

}


limpar()
.catch(console.error)
.finally(()=>process.exit());