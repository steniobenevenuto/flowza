import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();



async function main(){


const usuarios = await prisma.usuario.findMany({

select:{
  id:true,
  nome:true,
  email:true,
  empresaId:true
}

});


console.log(usuarios);


await prisma.$disconnect();


}


main();