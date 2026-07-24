import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import {

    buscarConfiguracao,

    atualizarConfiguracao

} from "../services/configuracao.service";



export async function configuracao(

    req:AuthRequest,

    res:Response

){


    const empresaId = req.usuario?.empresaId;



    if(!empresaId){

        return res.status(401).json({

            erro:"Empresa não encontrada"

        });

    }



    try{


        const empresa = await buscarConfiguracao(

            empresaId

        );


        return res.json(empresa);



    }catch(error){


        console.log(error);


        return res.status(500).json({

            erro:"Erro ao buscar configuração"

        });


    }


}





export async function salvarConfiguracao(

    req:AuthRequest,

    res:Response

){


    const empresaId = req.usuario?.empresaId;



    if(!empresaId){

        return res.status(401).json({

            erro:"Empresa não encontrada"

        });

    }



    try{


        const empresa = await atualizarConfiguracao(

            empresaId,

            req.body

        );


        return res.json(empresa);



    }catch(error){


        console.log(error);


        return res.status(500).json({

            erro:"Erro ao salvar configuração"

        });


    }


}