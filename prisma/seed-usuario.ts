import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";


const adapter = new PrismaPg({

    connectionString:
    process.env.DATABASE_URL!

});


const prisma = new PrismaClient({

    adapter

});




async function main(){



const empresa = await prisma.empresa.findFirst();



if(!empresa){


    console.log(
        "Nenhuma empresa encontrada"
    );


    return;


}




const senha = await bcrypt.hash(

    "123456",

    10

);






const usuario = await prisma.usuario.create({


    data:{


        nome:"Stênio",


        email:"admin@flowza.sbs",


        senha,


        empresaId:empresa.id


    }


});





console.log(
    "Usuário criado:",
    usuario.email
);



}




main()

.then(async()=>{


    await prisma.$disconnect();


})

.catch(async(e)=>{


    console.log(e);


    await prisma.$disconnect();


    process.exit(1);


});