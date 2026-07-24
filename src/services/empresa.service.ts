import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";


const adapter = new PrismaLibSql({

    url:"file:./prisma/bot.sqlite"

});


const prisma = new PrismaClient({

    adapter

});





export async function buscarEmpresaPorWhatsapp(
    telefoneWhatsapp:string
){

    return await prisma.empresa.findFirst({

        where:{

            telefoneWhatsapp

        }

    });

}







export async function criarEmpresa(

    dados:any,

    usuarioId:number

){


const expira = new Date();

expira.setDate(
    expira.getDate() + 7
);



const empresa = await prisma.empresa.create({


    data:{


        nome:dados.nomeEmpresa,


        segmento:dados.segmento,


        telefoneWhatsapp:dados.telefoneWhatsapp,



        plano:"TRIAL",


        trial:true,


        trialExpiraEm:expira,


        ativo:true,



        fluxos:{


            create:[


                {
                    pergunta:"Olá 👋 Qual seu nome?",
                    etapa:1,
                    campo:"nome"
                },


                {
                    pergunta:"Qual seu interesse?",
                    etapa:2,
                    campo:"interesse"
                },


                {
                    pergunta:"Qual cidade você procura?",
                    etapa:3,
                    campo:"cidade"
                },


                {
                    pergunta:"Qual faixa de valor?",
                    etapa:4,
                    campo:"orcamento"
                }


            ]

        }


    },


    include:{


        fluxos:true


    }


});





await prisma.usuario.update({


    where:{


        id:usuarioId

    },


    data:{


        empresaId:empresa.id

    }


});



return empresa;


}








export async function listarEmpresas(){


return await prisma.empresa.findMany({

    include:{

        leads:true,

        usuarios:true,

        fluxos:true

    }

});


}








export async function atualizarEmpresa(

    id:number,

    dados:any

){


return await prisma.empresa.update({

    where:{

        id

    },


    data:{


        mensagemInicial:dados.mensagemInicial,

        horarioFuncionamento:dados.horarioFuncionamento,

        endereco:dados.endereco,

        instagram:dados.instagram,

        site:dados.site,

        promptIA:dados.promptIA


    }


});


}








export async function ativarPlanoEmpresa(

    empresaId:number,

    plano:string

){


return await prisma.empresa.update({


    where:{

        id:empresaId

    },


    data:{


        plano:plano.toUpperCase(),


        trial:false,


        trialExpiraEm:null,


        ativo:true


    }


});


}