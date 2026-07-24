import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();



async function main() {

  const novaSenha = "123456";


  const senhaHash = await bcrypt.hash(
    novaSenha,
    10
  );


  await prisma.usuario.update({

    where:{
      email:"teste@teste.com"
    },

    data:{
      senha:senhaHash
    }

  });


  console.log("Senha atualizada!");


}



main()
.then(async()=>{

  await prisma.$disconnect();

})
.catch(async(e)=>{

  console.log(e);

  await prisma.$disconnect();

});