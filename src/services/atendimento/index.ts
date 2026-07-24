import { atenderImobiliaria } from "./imobiliaria";
import { atenderPadrao } from "./padrao";

export async function atenderMensagem(
  empresa: any,
  lead: any,
  mensagem: string
) {
  if (!empresa) {
    return atenderPadrao(mensagem);
  }

  switch (empresa.segmento.toLowerCase()) {
    case "imobiliaria":
      return atenderImobiliaria(
        empresa,
        lead,
        mensagem
      );

    default:
      return atenderPadrao(mensagem);
  }
}