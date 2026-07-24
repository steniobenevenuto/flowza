import { Response } from "express";

import { AuthRequest } from "../middlewares/auth.middleware";

import { enviarMensagem } from "../services/envio.service";

export async function enviar(

    req:AuthRequest,

    res:Response

){

    const empresaId =
        req.usuario?.empresaId;

    if(!empresaId){

        return res.status(401).json({

            erro:"Empresa não encontrada"

        });

    }

    const leadId =
        Number(req.params.leadId);

    const {

        texto

    } = req.body;

    const resultado =
        await enviarMensagem(

            empresaId,

            leadId,

            texto

        );

    if(!resultado){

        return res.status(404).json({

            erro:"Lead não encontrado"

        });

    }

    res.json({

        sucesso:true

    });

}