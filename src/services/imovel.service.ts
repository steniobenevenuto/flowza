import prisma from "../database";





// Cadastrar imóvel

export async function cadastrarImovel(
  dados:any
){

  return await prisma.imovel.create({

    data:dados

  });

}






// Buscar imóveis por cidade

export async function buscarImoveisPorCidade(

  cidade:string,

  empresaId:number

){


  return await prisma.imovel.findMany({

    where:{


      cidade:{
        contains:cidade
      },


      empresaId


    }


  });


}






// Buscar imóveis por bairro

export async function buscarImoveisPorBairro(

  bairro:string,

  empresaId:number

){


  return await prisma.imovel.findMany({

    where:{


      bairro:{
        contains:bairro
      },


      empresaId


    }


  });


}






// Buscar imóveis disponíveis da empresa

export async function listarImoveis(

  empresaId:number

){


  return await prisma.imovel.findMany({

    where:{
      empresaId
    },


    orderBy:{
      id:"desc"
    }


  });


}






// Buscar imóvel específico

export async function buscarImovelPorId(

  id:number

){


  return await prisma.imovel.findUnique({

    where:{
      id
    }

  });


}