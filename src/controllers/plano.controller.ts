import { Request, Response } from "express";

import {
    listarPlanos
} from "../services/plano.service";



export function planos(

    req:Request,

    res:Response

){


    res.json(

        listarPlanos()

    );


}