import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});


const prisma = new PrismaClient({
  adapter,
});


async function main(){


const empresa = await prisma.empresa.findFirst();


if(!empresa){

 console.log("Nenhuma empresa encontrada");
 return;

}



const imovel = await prisma.imovel.create({

data:{

titulo:"Casa moderna com piscina",

tipo:"Casa",

finalidade:"Venda",

cidade:"Fortaleza",

bairro:"Eusébio",

preco:650000,

quartos:3,

banheiros:3,

vagas:2,

descricao:
"Casa ampla, piscina, área gourmet e garagem",

empresaId:empresa.id

}

});


console.log("Imóvel criado:", imovel.titulo);



}



main()
.then(()=>prisma.$disconnect())
.catch((e)=>{

console.log(e);

prisma.$disconnect();

});