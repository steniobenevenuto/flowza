import prisma from "../database";
import type { Lead } from "../types/lead";







export async function salvarLead(

    lead: Lead,

    empresaId?: number

){


    if(
        !lead.telefone ||
        lead.telefone.trim()===""
    ){

        console.log(
            "Lead ignorado: telefone vazio"
        );

        return;

    }




    const existente =

    await prisma.lead.findFirst({

        where:{

            telefone:lead.telefone,

            empresaId:empresaId

        }

    });







    if(existente){



        await prisma.lead.update({

            where:{

                id:existente.id

            },

            data:{


                nome:
                lead.nome,


                mensagem:
                lead.ultimaMensagem,


                data:
                lead.data



            }


        });



        console.log(
            "Lead atualizado ✅"
        );


        return;

    }







    await prisma.lead.create({

        data:{


            nome:
            lead.nome,


            telefone:
            lead.telefone,


            mensagem:
            lead.ultimaMensagem,


            data:
            lead.data,


            etapa:1,


            empresaId:
            empresaId



        }


    });





    console.log(
        "Novo lead salvo ✅"
    );


}









export async function buscarLead(

    telefone:string,

    empresaId?:number

){


    return await prisma.lead.findFirst({

        where:{


            telefone,


            empresaId



        }

    });


}









export async function listarLeads(

    empresaId:number

){


    return await prisma.lead.findMany({

        where:{


            empresaId


        },


        orderBy:{


            data:"desc"


        }


    });


}









export async function atualizarEtapa(

    telefone:string,

    etapa:number,

    empresaId?:number

){


    return await prisma.lead.updateMany({

        where:{


            telefone,


            empresaId


        },


        data:{


            etapa:

            etapa > 100 ? 100 : etapa


        }


    });


}









export async function atualizarDadosLead(

    telefone:string,

    dados:{

        nome?:string;

        segmento?:string;

        cidade?:string;

        bairro?:string;


    },

    empresaId?:number


){



    return await prisma.lead.updateMany({

        where:{


            telefone,


            empresaId


        },


        data:{


            ...dados


        }


    });


}









export async function registrarResposta(

    telefone:string,

    respostaCliente:string,

    empresaId?:number

){



    const lead =

    await prisma.lead.findFirst({

        where:{


            telefone,


            empresaId


        }

    });




    if(!lead){

        console.log(
            "Lead não encontrado"
        );

        return;

    }






    await prisma.resposta.create({

        data:{


            pergunta:

            `Etapa ${lead.etapa}`,


            resposta:

            respostaCliente,


            leadId:

            lead.id



        }


    });



    console.log(
        "Resposta salva ✅"
    );


}









export async function salvarCampoLead(

    telefone:string,

    campo:string,

    valor:string,

    empresaId?:number

){



    const lead =

    await prisma.lead.findFirst({

        where:{


            telefone,


            empresaId


        }

    });





    if(!lead){


        console.log(
            "Lead não encontrado para salvar campo"
        );


        return;


    }








    const existente =

    await prisma.leadCampo.findFirst({

        where:{


            leadId:lead.id,


            campo



        }


    });






    if(existente){


        return await prisma.leadCampo.update({

            where:{


                id:existente.id


            },


            data:{


                valor


            }


        });


    }







    return await prisma.leadCampo.create({

        data:{


            leadId:lead.id,


            campo,


            valor


        }

    });


}

export async function reiniciarFluxoLead(

    telefone:string,

    empresaId?:number

){

    return await prisma.lead.updateMany({

        where:{

            telefone,

            empresaId

        },

        data:{

            etapa:1

        }

    });

}