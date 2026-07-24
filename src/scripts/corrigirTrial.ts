import prisma from "../lib/prisma";


async function corrigir(){


const empresas = await prisma.empresa.findMany({

    where:{

        trial:true,

        trialExpiraEm:null

    }

});



for(const empresa of empresas){


const data = new Date();

data.setDate(
    data.getDate()+7
);



await prisma.empresa.update({

    where:{

        id:empresa.id

    },


    data:{


        trialExpiraEm:data


    }


});


console.log(
"Corrigida empresa:",
empresa.nome
);


}



}


corrigir();