import { Response } from "express";

import {
  AuthRequest
} from "../middlewares/auth.middleware";

import {
  buscarDashboard
} from "../services/dashboard.service";



export async function dashboard(

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



  const dados =
    await buscarDashboard(
      empresaId
    );



  if(!dados){

    return res.status(404).json({

      erro:"Dashboard não encontrado"

    });

  }



  return res.json(dados);


}