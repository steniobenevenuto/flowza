import {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

import {
    JWT_SECRET
} from "../config/jwt";


export interface AuthRequest extends Request {

    usuario?: {

        id:number;

        empresaId:number;

    };

}



export function authMiddleware(
    req:AuthRequest,
    res:Response,
    next:NextFunction
){


    if(req.method === "OPTIONS"){

        return next();

    }



    const token =
        req.headers.authorization
        ?.replace(
            "Bearer ",
            ""
        );



    console.log(
        "AUTH HEADER:",
        req.headers.authorization
    );


    console.log(
        "TOKEN:",
        token
    );




    if(!token){

        return res.status(401).json({

            erro:"Token não enviado"

        });

    }




    try{


        const decoded:any = jwt.verify(

            token,

            JWT_SECRET

        );



        console.log(
            "TOKEN DECODIFICADO:",
            decoded
        );



        req.usuario = {

            id: decoded.id,

            empresaId: decoded.empresaId

        };



        console.log(
            "USUARIO AUTENTICADO:",
            req.usuario
        );



        next();



    }catch(error){


        console.log(
            "ERRO JWT:",
            error
        );


        return res.status(401).json({

            erro:"Token inválido"

        });


    }


}