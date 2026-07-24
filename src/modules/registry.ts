import { imobiliaria } from "./imobiliaria";
import { padrao } from "./padrao";

import type { ModuloAtendimento } from "./core/module.types";


const modulos:
Record<string, ModuloAtendimento> = {


imobiliaria,


padrao


};


export function buscarModulo(
segmento:string
){

return (
modulos[
segmento.toLowerCase()
]

|| modulos.padrao

);

}