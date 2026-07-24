import { PrismaClient } from "../generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
    url: "file:./prisma/bot.sqlite"
});

const prisma = new PrismaClient({
    adapter
});

export async function buscarConfiguracao(empresaId:number){

    return await prisma.empresa.findUnique({

        where:{
            id:empresaId
        },

        select:{

            id:true,

            nome:true,

            segmento:true,

            telefoneWhatsapp:true,

            plano:true,

            ativo:true,

            logo:true,

            corPrimaria:true,

            mensagemInicial:true,

            promptIA:true,

            endereco:true,

            horarioFuncionamento:true,

            instagram:true,

            site:true

        }

    });

}

export async function atualizarConfiguracao(

    empresaId:number,

    dados:any

){

    return await prisma.empresa.update({

        where:{
            id:empresaId
        },

        data:{

            nome:dados.nome,

            segmento:dados.segmento,

            telefoneWhatsapp:dados.telefoneWhatsapp,

            logo:dados.logo,

            corPrimaria:dados.corPrimaria,

            mensagemInicial:dados.mensagemInicial,

            promptIA:dados.promptIA,

            endereco:dados.endereco,

            horarioFuncionamento:dados.horarioFuncionamento,

            instagram:dados.instagram,

            site:dados.site

        }

    });

}