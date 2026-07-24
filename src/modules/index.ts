import * as imobiliaria from "./imobiliaria";
import * as padrao from "./padrao";

const modulos:any={

    imobiliaria,

    padrao

};

export function obterModulo(
    segmento:string
){

    return (
        modulos[
            segmento.toLowerCase()
        ] || modulos.padrao
    );

}