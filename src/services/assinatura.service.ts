import prisma from "../lib/prisma";



export async function ativarPlano(

    pagamentoId:number

){


const pagamento = await prisma.pagamento.findUnique({

    where:{
        id:pagamentoId
    }

});



if(!pagamento){

    throw new Error(
        "Pagamento não encontrado"
    );

}





const empresa = await prisma.empresa.update({

    where:{
        id:pagamento.empresaId
    },


    data:{


        plano:
        pagamento.plano.toUpperCase(),


        ativo:true,


        trial:false


    }

});




await prisma.pagamento.update({

    where:{
        id:pagamentoId
    },


    data:{


        status:"PAGO"


    }


});





return empresa;



}