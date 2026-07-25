import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../database";

import {
    JWT_SECRET
} from "../config/jwt";

export async function criarUsuario(
    nome: string,
    email: string,
    senha: string
) {

    const existe = await prisma.usuario.findUnique({
        where: {
            email
        }
    });

    if (existe) {
        throw new Error("EMAIL_EXISTE");
    }

    const senhaHash = await bcrypt.hash(
        senha,
        10
    );

    return await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: senhaHash
        }
    });

}

export async function login(
    email: string,
    senha: string
) {

    const usuario = await prisma.usuario.findUnique({

        where: {
            email
        },

        include: {
            empresa: true
        }

    });

    if (!usuario) {
        return null;
    }

    const valido = await bcrypt.compare(
        senha,
        usuario.senha
    );

    if (!valido) {
        return null;
    }

    // Usuário sem empresa
    if (!usuario.empresa) {

        const token = jwt.sign(
            {
                id: usuario.id,
                empresaId: null
            },
            JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        return {

            token,

            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },

            precisaCriarEmpresa: true

        };

    }

    // Trial expirado
    if (
        usuario.empresa.trial &&
        usuario.empresa.trialExpiraEm &&
        new Date() > usuario.empresa.trialExpiraEm
    ) {

        return {
            bloqueado: true,
            motivo: "trial"
        };

    }

    const usuarioAtualizado = await prisma.usuario.findUnique({

        where: {
            id: usuario.id
        },

        include: {
            empresa: true
        }

    });

    const token = jwt.sign(

        {
            id: usuarioAtualizado!.id,
            empresaId: usuarioAtualizado!.empresa!.id
        },

        JWT_SECRET,

        {
            expiresIn: "7d"
        }

    );

    return {

        token,

        usuario: {
            id: usuarioAtualizado!.id,
            nome: usuarioAtualizado!.nome,
            email: usuarioAtualizado!.email
        },

        empresa: {
            id: usuarioAtualizado!.empresa!.id,
            nome: usuarioAtualizado!.empresa!.nome,
            segmento: usuarioAtualizado!.empresa!.segmento,
            plano: usuarioAtualizado!.empresa!.plano,
            trial: usuarioAtualizado!.empresa!.trial,
            trialExpiraEm: usuarioAtualizado!.empresa!.trialExpiraEm
        },

        precisaCriarEmpresa: false

    };

}