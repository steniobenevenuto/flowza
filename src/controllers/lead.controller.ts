import { Response } from "express";

import {
    AuthRequest
} from "../middlewares/auth.middleware";

import {
    listarLeads
} from "../services/lead.service";



export async function listar(
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


    const leads =
        await listarLeads(
            empresaId
        );


    return res.json(leads);

}