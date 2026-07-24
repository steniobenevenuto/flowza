import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";
import prisma from "../lib/prisma";

export function planoMiddleware(planosPermitidos: string[]) {

    return async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const empresaId = req.usuario?.empresaId;

            if (!empresaId) {

                return res.status(401).json({
                    erro: "Empresa não encontrada"
                });

            }

            const empresa = await prisma.empresa.findUnique({

                where: {
                    id: empresaId
                },

                select: {
                    plano: true,
                    ativo: true
                }

            });

            if (!empresa) {

                return res.status(404).json({
                    erro: "Empresa não encontrada"
                });

            }

            if (!empresa.ativo) {

                return res.status(403).json({
                    erro: "Empresa desativada"
                });

            }

            const planoAtual = empresa.plano.toLowerCase();

            const permitido = planosPermitidos
                .map(p => p.toLowerCase())
                .includes(planoAtual);

            if (!permitido) {

                return res.status(403).json({

                    erro: "Seu plano não permite acessar este recurso.",

                    planoAtual: empresa.plano,

                    planosPermitidos

                });

            }

            next();

        } catch (error) {

            console.log(error);

            return res.status(500).json({

                erro: "Erro ao validar plano"

            });

        }

    };

}