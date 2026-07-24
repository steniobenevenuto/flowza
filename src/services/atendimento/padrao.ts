import { gerarResposta } from "../ai.service";

export async function atenderPadrao(
  mensagem: string
) {
  return await gerarResposta(mensagem);
}