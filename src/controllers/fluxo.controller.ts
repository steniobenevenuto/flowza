import { Response } from "express";

import {
    AuthRequest
} from "../middlewares/auth.middleware";


import {

    listarFluxoEmpresa,
    criarPerguntaFluxo,
    excluirPerguntaFluxo

} from "../services/fluxo.service";






export async function listarFluxo(

    req:AuthRequest,

    res:Response

){


    try{


        const empresaId = req.usuario?.empresaId;



        if(!empresaId){

            return res.status(401).json({

                erro:"Empresa não encontrada"

            });

        }



        const fluxos = await listarFluxoEmpresa(

            empresaId

        );



        res.json(fluxos);



    }catch(erro){


        console.log(erro);


        res.status(500).json({

            erro:"Erro ao buscar fluxos"

        });


    }


}









export async function criarFluxo(

    req:AuthRequest,

    res:Response

){


    try{


        const empresaId = req.usuario?.empresaId;



        if(!empresaId){

            return res.status(401).json({

                erro:"Empresa não encontrada"

            });

        }



        const {

            pergunta,

            etapa,

            campo

        } = req.body;





        const fluxo = await criarPerguntaFluxo(

            empresaId,

            pergunta,

            Number(etapa),

            campo

        );



        res.json(fluxo);



    }catch(erro){


        console.log(erro);


        res.status(500).json({

            erro:"Erro ao criar fluxo"

        });


    }


}









export async function excluirFluxo(

    req:AuthRequest,

    res:Response

){


    try{


        const id = Number(req.params.id);



        await excluirPerguntaFluxo(

            id

        );



        res.json({

            sucesso:true

        });



    }catch(erro){


        console.log(erro);


        res.status(500).json({

            erro:"Erro ao excluir"

        });


    }


}