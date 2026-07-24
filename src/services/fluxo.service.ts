import prisma from "../database";








// Busca a próxima pergunta do fluxo da empresa

export async function buscarProximaPergunta(

    empresaId:number,

    etapa:number

){


    return await prisma.fluxoPergunta.findFirst({


        where:{


            empresaId,


            etapa


        },


        orderBy:{


            id:"asc"


        }


    });


}









// Busca a pergunta atual pelo número da etapa

export async function buscarPerguntaAtual(

    empresaId:number,

    etapa:number

){


    return await prisma.fluxoPergunta.findFirst({


        where:{


            empresaId,


            etapa


        }


    });


}









// Lista todas perguntas da empresa

export async function listarFluxoEmpresa(

    empresaId:number

){


    return await prisma.fluxoPergunta.findMany({


        where:{


            empresaId


        },


        orderBy:{


            etapa:"asc"


        }


    });


}









// Criar nova pergunta

export async function criarPerguntaFluxo(

    empresaId:number,

    pergunta:string,

    etapa:number,

    campo:string

){


    return await prisma.fluxoPergunta.create({


        data:{


            empresaId,


            pergunta,


            etapa,


            campo


        }


    });


}









// Excluir pergunta

export async function excluirPerguntaFluxo(

    id:number

){


    return await prisma.fluxoPergunta.delete({


        where:{


            id


        }


    });


}