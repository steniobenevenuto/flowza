import { Response } from "express";


import {

    listarConversas,

    buscarConversa

} from "../services/conversa.service";


import {

    AuthRequest

} from "../middlewares/auth.middleware";





export async function listaConversas(
    req:AuthRequest,
    res:Response
){

    console.log("ENTROU CONTROLLER CONVERSAS");
    console.log("USUARIO:", req.usuario);


    try{

  const empresaId =
    req.usuario?.empresaId;


        if(!empresaId){


            return res.status(401).json({

                erro:"Empresa não encontrada"

            });


        }




        const conversas =

            await listarConversas(

                empresaId

            );




        return res.json(

            conversas

        );




    }catch(error){


        console.log(error);


        return res.status(500).json({

            erro:"Erro ao buscar conversas"

        });


    }


}









export async function conversa(

    req:AuthRequest,

    res:Response

){


    try{


        const leadId =

            Number(req.params.leadId);



        const empresaId =
    req.usuario?.empresaId;




        if(!empresaId){


            return res.status(401).json({

                erro:"Empresa não encontrada"

            });


        }






        const resultado =

            await buscarConversa(

                leadId,

                empresaId

            );






        if(!resultado){


            return res.status(404).json({

                erro:"Conversa não encontrada"

            });


        }




        return res.json(

            resultado

        );





    }catch(error){


        console.log(error);



        return res.status(500).json({

            erro:"Erro ao buscar conversa"

        });


    }


}