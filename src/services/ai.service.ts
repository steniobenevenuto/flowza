export async function gerarResposta(mensagem: string) {

  const texto = mensagem.toLowerCase();

  if (texto.includes("oi") || texto.includes("olá")) {
    return "Olá! 👋 Seja bem-vindo. Como posso ajudar?";
  }

  if (texto.includes("preço")) {
    return "Me diga qual produto ou serviço você deseja saber o preço.";
  }

  if (texto.includes("imóvel") || texto.includes("casa")) {
    return "Ótimo! Posso te ajudar com informações sobre imóveis disponíveis.";
  }

  return "Entendi sua mensagem. Vou verificar isso para você. 😊";
}