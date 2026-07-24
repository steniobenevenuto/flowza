import {Response} from "express";

import {AuthRequest} from "../middlewares/auth.middleware";

import prisma from "../lib/prisma";




export async function minhaAssinatura(

req:AuthRequest,

res:Response

){


try{


const empresaId =
req.usuario?.empresaId;



const empresa =
await prisma.empresa.findUnique({

where:{
id:empresaId
},


select:{


nome:true,

plano:true,

ativo:true,

trial:true,

trialExpiraEm:true


}

});



res.json(empresa);



}catch(error){


res.status(500).json({

erro:"Erro ao buscar assinatura"

});


}


}