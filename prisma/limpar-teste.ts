import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";


const adapter = new PrismaLibSql({
  url: "file:./prisma/bot.sqlite",
});


const prisma = new PrismaClient({
  adapter,
});


async function main() {


  const telefone = "154099349729380@lid";


  const lead = await prisma.lead.findUnique({
    where:{
      telefone
    }
  });


  if(!lead){
    console.log("Lead não encontrado");
    return;
  }



  await prisma.resposta.deleteMany({
    where:{
      leadId: lead.id
    }
  });



  await prisma.lead.delete({
    where:{
      telefone
    }
  });



  console.log("Lead limpo com sucesso ✅");

}



main()
.then(()=>prisma.$disconnect())
.catch(async(e)=>{
 console.log(e);
 await prisma.$disconnect();
});