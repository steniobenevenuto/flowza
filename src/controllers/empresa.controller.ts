import {
    Request,
    Response
} from "express";


import {
    criarEmpresa,
    listarEmpresas,
    atualizarEmpresa
} from "../services/empresa.service";






export async function cadastrarEmpresa(

    req:Request,

    res:Response

){


    try{


        const usuarioId =

        (req as any).usuario?.id;



        if(!usuarioId){


            return res.status(401).json({

                erro:"Usuário não autenticado"

            });


        }





        const empresa =

        await criarEmpresa(

            req.body,

            usuarioId

        );





        return res.json(empresa);



    }

    catch(error){


        console.log(error);



        return res.status(500).json({

            erro:"Erro ao cadastrar empresa"

        });


    }


}









export async function empresas(

    req:Request,

    res:Response

){


    try{


        const lista =

        await listarEmpresas();



        return res.json(lista);



    }

    catch(error){


        console.log(error);



        return res.status(500).json({

            erro:"Erro ao listar empresas"

        });


    }


}









export async function atualizarEmpresaController(

    req:Request,

    res:Response

){


    try{


        const id = Number(req.params.id);





        const empresa =

        await atualizarEmpresa(

            id,

            req.body

        );





        return res.json({

            mensagem:"Empresa atualizada",

            empresa

        });



    }

    catch(error){


        console.log(error);



        return res.status(500).json({

            erro:"Erro ao atualizar empresa"

        });


    }


}