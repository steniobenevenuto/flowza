import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import {

    criarCheckout,

    confirmarPagamento,

    buscarMeuPlano

} from "../services/pagamento.service";







export async function checkout(

    req:AuthRequest,

    res:Response

){


    try{


        const empresaId = req.usuario?.empresaId;


        const {

            plano

        } = req.body;





        if(!empresaId){


            return res.status(401).json({

                erro:"Empresa não encontrada"

            });


        }







        if(!plano){


            return res.status(400).json({

                erro:"Plano não informado"

            });


        }







        const resultado = await criarCheckout(

            empresaId,

            plano

        );





        return res.json(resultado);





    }catch(error:any){


        console.log(

            "ERRO CHECKOUT:",

            error

        );



        return res.status(500).json({

            erro:error.message || "Erro ao criar checkout"

        });


    }



}
















export async function aprovarPagamento(

    req:AuthRequest,

    res:Response

){



    try{



        const pagamentoId = Number(

            req.params.id

        );



        console.log(

            "APROVANDO PAGAMENTO ID:",

            pagamentoId

        );







        if(!pagamentoId){


            return res.status(400).json({

                erro:"Pagamento inválido"

            });


        }









        const resultado = await confirmarPagamento(

            pagamentoId

        );







        console.log(

            "PAGAMENTO APROVADO:",

            resultado

        );






        return res.json(resultado);






    }catch(error:any){



        console.log(

            "ERRO APROVAR PAGAMENTO:",

            error

        );



        return res.status(500).json({

            erro:error.message || "Erro ao aprovar pagamento"

        });



    }



}
















export async function meuPlano(

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





        const plano = await buscarMeuPlano(

            empresaId

        );





        return res.json(plano);





    }catch(error:any){



        console.log(

            "ERRO MEU PLANO:",

            error

        );



        return res.status(500).json({

            erro:error.message || "Erro ao buscar plano"

        });



    }


}

