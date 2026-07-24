import { gerarResposta } from "../../services/ai.service";
import type { ModuloAtendimento } from "../core/module.types";


export const padrao: ModuloAtendimento = {


async executar(empresa,lead,mensagem){

return await gerarResposta(
mensagem
);


}


};