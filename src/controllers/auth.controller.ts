import { Request, Response } from "express";

import {
    login as fazerLogin,
    criarUsuario
} from "../services/auth.service";

export async function register(
    req: Request,
    res: Response
) {

    console.log("========== REGISTER ==========");
    console.log("Headers:", req.headers);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    console.log("==============================");

    try {

        const { nome, email, senha } = req.body || {};

        console.log("Dados recebidos:", {
            nome,
            email,
            senha
        });

        if (!nome || !email || !senha) {
            return res.status(400).json({
                erro: "Dados inválidos",
                body: req.body
            });
        }

        const usuario = await criarUsuario(
            nome,
            email,
            senha
        );

        return res.status(201).json(usuario);

    } catch (erro: any) {

        console.log("ERRO REGISTER:");
        console.log(erro);

        if (erro.message === "EMAIL_EXISTE") {

            return res.status(400).json({
                erro: "Este e-mail já está cadastrado."
            });

        }

        return res.status(500).json({
            erro: "Erro ao criar usuário"
        });

    }

}

export async function login(
    req: Request,
    res: Response
) {

    console.log("========== LOGIN ==========");
    console.log("Headers:", req.headers);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    console.log("===========================");

    try {

        const { email, senha } = req.body || {};

        if (!email || !senha) {

            return res.status(400).json({
                erro: "Dados inválidos",
                body: req.body
            });

        }

        const resultado = await fazerLogin(
            email,
            senha
        );

        if (!resultado) {

            return res.status(401).json({
                erro: "Email ou senha inválidos"
            });

        }

        if ("bloqueado" in resultado) {

            return res.status(403).json({
                erro: "Seu período de teste expirou. Assine um plano para continuar.",
                motivo: resultado.motivo
            });

        }

        return res.json(resultado);

    } catch (erro) {

        console.log("ERRO LOGIN:");
        console.log(erro);

        return res.status(500).json({
            erro: "Erro interno"
        });

    }

}