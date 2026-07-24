import prisma from "../database";






export async function buscarDashboard(

    empresaId:number

){



    const empresa =

    await prisma.empresa.findUnique({

        where:{

            id:empresaId

        }

    });




    if(!empresa){

        return null;

    }





    const totalLeads =

    await prisma.lead.count({

        where:{

            empresaId

        }

    });







    const novos =

    await prisma.lead.count({

        where:{

            empresaId,

            status:"novo"

        }

    });







    const emAtendimento =

    await prisma.lead.count({

        where:{

            empresaId,

            status:"em_atendimento"

        }

    });







    const fechados =

    await prisma.lead.count({

        where:{

            empresaId,

            status:"fechado"

        }

    });







    const ultimasConversasBanco =

    await prisma.lead.findMany({


        where:{

            empresaId

        },


        orderBy:{

            data:"desc"

        },


        take:8,


        include:{


            mensagens:{


                orderBy:{


                    data:"desc"


                },


                take:1


            }


        }



    });







    const ultimasConversas =

    ultimasConversasBanco.map((lead)=>({


        id:lead.id,


        nome:lead.nome,


        telefone:lead.telefone,


        status:lead.status,


        data:

        lead.mensagens[0]?.data || lead.data,


        ultimaMensagem:

        lead.mensagens[0]?.texto || lead.mensagem,


        tipo:

        lead.mensagens[0]?.tipo || "cliente"



    }));








    return{


        empresa:empresa.nome,


        totalLeads,


        novos,


        emAtendimento,


        fechados,


        ultimasConversas


    };


}