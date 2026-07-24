import { Request, Response } from "express";

import {
    login as fazerLogin,
    criarUsuario
} from "../services/auth.service";

export async function register(

    req: Request,

    res: Response

){

    try{

        const{

            nome,

            email,

            senha

        } = req.body;

        const usuario = await criarUsuario(

            nome,

            email,

            senha

        );

        return res.status(201).json(usuario);

    }

    catch(erro:any){

        console.log(erro);

        if(erro.message === "EMAIL_EXISTE"){

            return res.status(400).json({

                erro:"Este e-mail já está cadastrado."

            });

        }

        return res.status(500).json({

            erro:"Erro ao criar usuário"

        });

    }

}

export async function login(

    req: Request,

    res: Response

){

    try{

        const{

            email,

            senha

        } = req.body;

        const resultado = await fazerLogin(

            email,

            senha

        );

        if(!resultado){

            return res.status(401).json({

                erro:"Email ou senha inválidos"

            });

        }

        // ===========================
        // TRIAL EXPIRADO
        // ===========================

        if("bloqueado" in resultado){

            return res.status(403).json({

                erro:"Seu período de teste expirou. Assine um plano para continuar.",

                motivo:resultado.motivo

            });

        }

        // ===========================

        return res.json(resultado);

    }

    catch(erro){

        console.log(erro);

        return res.status(500).json({

            erro:"Erro interno"

        });

    }

}