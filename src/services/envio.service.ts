import prisma from "../database";


export async function enviarMensagem(

    empresaId:number,

    leadId:number,

    texto:string

){

    const lead =
        await prisma.lead.findFirst({

            where:{

                id:leadId,

                empresaId

            }

        });

    if(!lead){

        return null;

    }

    const client =
        getWhatsAppClient();

    await client.sendMessage(

        lead.telefone,

        texto

    );

    await salvarMensagemBot(

        lead.id,

        texto

    );

    return{

        sucesso:true

    };

}