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

        empresaId:number | null;

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





    const authHeader =
        req.headers.authorization;





    console.log(
        "================ AUTH ================"
    );


    console.log(
        "AUTH HEADER:",
        authHeader
    );



    console.log(
        "JWT SECRET USADO:",
        JWT_SECRET
    );





    const token =
        authHeader?.replace(
            "Bearer ",
            ""
        );





    console.log(
        "TOKEN RECEBIDO:",
        token
    );






    if(!token){


        console.log(
            "SEM TOKEN"
        );


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


            empresaId:
            decoded.empresaId ?? null


        };






        console.log(

            "USUARIO AUTENTICADO:",

            req.usuario

        );






        console.log(
            "======================================"
        );





        next();





    }catch(error:any){



        console.log(

            "ERRO JWT:",

            error.message

        );



        console.log(
            "TOKEN USADO NO VERIFY:",
            token
        );



        console.log(
            "SECRET NO VERIFY:",
            JWT_SECRET
        );



        return res.status(401).json({

            erro:"Token inválido"

        });



    }



}