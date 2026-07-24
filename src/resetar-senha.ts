import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcrypt";


const adapter = new PrismaLibSql({
  url:"file:./prisma/bot.sqlite"
});


const prisma = new PrismaClient({
  adapter
});


async function main(){


const novaSenha = "123456";


const senhaHash =
await bcrypt.hash(
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


}


main();