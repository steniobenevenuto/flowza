import prisma from "../database";


export async function listarConversas(

    empresaId:number

){

    console.log(
        "BUSCANDO CONVERSAS EMPRESA:",
        empresaId
    );


const leads =
    await prisma.lead.findMany({

        where:{
            empresaId
        },

        include:{
            mensagens:{
                orderBy:{
                    data:"desc"
                },
                take:1
            }
        },

        orderBy:{
            data:"desc"
        }

    });


console.log(
    "LEADS ENCONTRADOS:",
    leads.length
);

    return leads.map((lead)=>({

        id:lead.id,

        nome:lead.nome,

        telefone:lead.telefone,

        status:lead.status,

        cidade:lead.cidade,

        bairro:lead.bairro,

        etapa:lead.etapa,

        ultimaMensagem:
            lead.mensagens[0]?.texto || lead.mensagem,

        tipo:
            lead.mensagens[0]?.tipo || "cliente",

        data:
            lead.mensagens[0]?.data || lead.data

    }));

}

export async function buscarConversa(

    leadId:number,
    empresaId:number

){

    const lead =
        await prisma.lead.findFirst({

            where:{

                id:leadId,

                empresaId

            },

            include:{

                mensagens:{

                    orderBy:{

                        data:"asc"

                    }

                }

            }

        });

    if(!lead){

        return null;

    }

    return{

        lead:{

            id:lead.id,

            nome:lead.nome,

            telefone:lead.telefone,

            cidade:lead.cidade,

            bairro:lead.bairro,

            status:lead.status,

            etapa:lead.etapa

        },

        mensagens:lead.mensagens

    };

}