import {Request,Response} from "express";

import {
 criarCheckout
} from "../services/mercadopago.service";

import {
 buscarPlano
} from "../services/plano.service";




export async function checkout(

req:Request,

res:Response

){


try{


const {

plano

}=req.body;




const dados =
buscarPlano(plano);



if(!dados){

return res.status(400).json({

erro:"Plano inválido"

});

}




const empresaId = 1; // depois vem do JWT




const pagamento =

await criarCheckout(

dados.nome,

dados.preco,

empresaId

);




res.json({

url:
pagamento.init_point

});




}catch(error){


console.log(error);


res.status(500).json({

erro:"Erro checkout"

});


}


}