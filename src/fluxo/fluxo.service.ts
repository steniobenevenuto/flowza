import { buscarLead, atualizarEtapa } from "../services/lead.service";

export async function processarFluxo(
  telefone: string,
  mensagem: string
): Promise<string | null> {

  const lead = await buscarLead(telefone);

  if (!lead) {
    return null;
  }


  switch (lead.etapa) {


    case 0:

      await atualizarEtapa(telefone, 1);

      return `Olá ${lead.nome !== "Sem nome" ? lead.nome : ""}! 😊

Que bom falar com você!

Eu vou te ajudar a encontrar o imóvel ideal. 🏡

Para eu conseguir te indicar as melhores opções, me conta:

Você está procurando um imóvel para:

🏠 Comprar
🔑 Alugar

Me diga qual dessas opções combina mais com você.`;


    case 1:

      await atualizarEtapa(telefone, 2);

      return `Perfeito! 😃

Agora me conta uma coisa:

Em qual cidade ou bairro você gostaria de encontrar seu imóvel?

Assim consigo buscar opções mais próximas do que você procura. 📍`;


    case 2:

      await atualizarEtapa(telefone, 3);

      return `Ótimo! Já estou entendendo melhor o que você procura. 😊

Agora me fala:

Qual faixa de valor você pretende investir no imóvel?

Pode ser uma média mesmo, só para eu conseguir filtrar as melhores opções para você. 💰`;


    case 3:

      await atualizarEtapa(telefone, 4);

      return `Perfeito! Muito obrigado pelas informações. 🙌

Já consegui entender melhor seu objetivo.

Vou organizar essas informações para encontrar opções que façam sentido para você. 🏡

Em breve alguém da nossa equipe continuará o atendimento. 😊`;


    default:

      return null;

  }

}