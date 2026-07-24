import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

import { getWhatsAppClient } from "./whatsapp.service";
import { salvarMensagemBot } from "./mensagem.service";

const adapter = new PrismaLibSql({

    url:"file:./prisma/bot.sqlite"

});

const prisma = new PrismaClient({

    adapter

});

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