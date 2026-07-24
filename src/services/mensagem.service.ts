import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";


const adapter = new PrismaLibSql({

  url:"file:./prisma/bot.sqlite"

});


const prisma = new PrismaClient({

  adapter

});







export async function salvarMensagem(

  leadId:number,

  texto:string,

  tipo:string

){


  return await prisma.mensagem.create({

    data:{

      leadId,

      texto,

      tipo

    }

  });


}









export async function salvarMensagemCliente(

  leadId:number,

  texto:string

){


  return await salvarMensagem(

    leadId,

    texto,

    "cliente"

  );


}









export async function salvarMensagemBot(

  leadId:number,

  texto:string

){


  return await salvarMensagem(

    leadId,

    texto,

    "bot"

  );


}









export async function buscarMensagens(

  leadId:number

){


  return await prisma.mensagem.findMany({

    where:{

      leadId

    },


    orderBy:{

      data:"asc"

    }


  });


}

export async function buscarMensagensDaEmpresa(

  leadId:number,

  empresaId:number

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



return await prisma.mensagem.findMany({

where:{

leadId

},

orderBy:{

data:"asc"

}

});


}