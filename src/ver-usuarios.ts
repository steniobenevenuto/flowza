import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";


const adapter = new PrismaLibSql({
  url:"file:./prisma/bot.sqlite"
});


const prisma = new PrismaClient({
  adapter
});


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


}


main();