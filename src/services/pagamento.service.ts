import prisma from "../lib/prisma";

import {
    ativarPlanoEmpresa
} from "./empresa.service";





const valores:any = {


    starter:49,

    pro:99,

    enterprise:199


};







export async function criarCheckout(


    empresaId:number,


    plano:string


){



    const valor = valores[plano];



    if(!valor){


        throw new Error(

            "Plano inválido"

        );


    }






    /*
    
    FUTURAMENTE AQUI ENTRA:

    Kiwify
    Cakto
    Kirvano
    Mercado Pago
    Stripe


    Eles vão retornar uma URL real.

    */


    const checkoutUrl =

    `https://checkout.flowza.com/${plano}`;








    const pagamento = await prisma.pagamento.create({


        data:{


            empresaId,


            gateway:"flowza",


            plano,


            valor,


            status:"PENDENTE",


            checkoutUrl


        }


    });








    return {


        pagamentoId:

        pagamento.id,


        checkoutUrl,


        plano,


        valor,


        status:

        pagamento.status


    };

}













export async function confirmarPagamento(


    pagamentoId:number


){



    const pagamentoExistente =

    await prisma.pagamento.findUnique({


        where:{


            id:pagamentoId


        }


    });





    if(!pagamentoExistente){


        throw new Error(

            "Pagamento não encontrado"

        );


    }








    const pagamento =

    await prisma.pagamento.update({



        where:{


            id:pagamentoId


        },



        data:{


            status:"PAGO"


        }


    });










    await ativarPlanoEmpresa(


        pagamento.empresaId,


        pagamento.plano


    );









    return {



        mensagem:


        "Pagamento confirmado 🚀",



        pagamento



    };



}

export async function buscarMeuPlano(

    empresaId:number

){


    const empresa = await prisma.empresa.findUnique({

        where:{

            id:empresaId

        },

        select:{

            nome:true,

            plano:true,

            trial:true,

            ativo:true

        }

    });



    return empresa;


}