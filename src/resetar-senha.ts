import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();


async function main(){


const novaSenha = "123456";


const senhaHash = await bcrypt.hash(
  novaSenha,
  10
);



await prisma.usuario.update({

  where:{
    id:1
  },


  data:{
    senha:senhaHash
  }

});


console.log(
  "Senha alterada para 123456"
);


await prisma.$disconnect();

}


main();