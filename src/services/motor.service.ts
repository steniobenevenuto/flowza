import { buscarLead } from "./lead.service";
import { buscarEmpresaPorWhatsapp } from "./empresa.service";
import { buscarConhecimento } from "./conhecimento.service";

import { buscarModulo } from "../modules/registry";


export async function processarMensagem(

    numeroWhatsapp: string,

    telefoneCliente: string,

    mensagem: string

) {


    // Procura a empresa dona daquele WhatsApp

    const empresa =
        await buscarEmpresaPorWhatsapp(
            numeroWhatsapp
        );



    // Caso não encontre empresa,
    // usa atendimento padrão

    if (!empresa) {


        const modulo =
            buscarModulo(
                "padrao"
            );


        return await modulo.executar(

            null,

            null,

            mensagem

        );


    }





    // Busca o cliente no CRM

    const lead =
        await buscarLead(
            telefoneCliente
        );





    // Primeiro verifica conhecimento da empresa

    const conhecimento =
        await buscarConhecimento(

            empresa.id,

            mensagem

        );



    if (conhecimento) {


        console.log(
            "Resposta encontrada no conhecimento da empresa ✅"
        );


        return conhecimento;


    }





    // Busca módulo pelo segmento

    const modulo =
        buscarModulo(

            empresa.segmento

        );





    const resposta =
        await modulo.executar(

            empresa,

            lead,

            mensagem

        );





    // Se o módulo respondeu, retorna

    if (resposta) {


        return resposta;


    }





    // Caso não tenha resposta,
    // cai no módulo padrão


    const padrao =
        buscarModulo(
            "padrao"
        );



    return await padrao.executar(

        empresa,

        lead,

        mensagem

    );


}