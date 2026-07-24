import { procurarImoveis } from "../../services/atendimento.service";
import type { ModuloAtendimento } from "../core/module.types";


export const imobiliaria: ModuloAtendimento = {


async executar(empresa,lead,mensagem){

const resultado =
await procurarImoveis(
mensagem,
empresa.id
);


if(resultado){

return resultado;

}


return null;


}


};