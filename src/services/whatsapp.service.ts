import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

import qrcode from "qrcode-terminal";


import {
    salvarLead,
    buscarLead,
    atualizarEtapa,
    registrarResposta,
    salvarCampoLead
} from "./lead.service";


import {
    buscarProximaPergunta,
    buscarPerguntaAtual
} from "./fluxo.service";


import {
    buscarEmpresaPorWhatsapp
} from "./empresa.service";


import {
    processarMensagem
} from "./motor.service";


import {
    salvarMensagemCliente,
    salvarMensagemBot
} from "./mensagem.service";


import {
    emitirParaEmpresa
} from "./socket.service";







function normalizarTelefone(message:any){

    if(message.from.includes("@c.us")){

        return message.from.replace(
            "@c.us",
            ""
        );

    }


    if(message.from.includes("@lid")){

        return message.from;

    }


    return message.from;

}








const client = new Client({

    authStrategy:new LocalAuth(),


    puppeteer:{


        headless:true,


        executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",


        args:[

            "--no-sandbox",

            "--disable-setuid-sandbox",

            "--disable-dev-shm-usage",

            "--disable-gpu"

        ]

    }

});









client.on("qr",(qr)=>{


    console.log(
        "Escaneie o QR Code:"
    );


    qrcode.generate(qr,{

        small:true

    });


});









client.on("authenticated",()=>{


    console.log(
        "WhatsApp autenticado ✅"
    );


});








client.on("ready",()=>{


    console.log(
        "WhatsApp conectado 🚀"
    );


    console.log(
        "Número:",
        client.info.wid.user
    );


});








client.on(
"message",
async(message)=>{


    if(message.from.includes("@g.us"))
        return;


    if(message.from==="status@broadcast")
        return;


    if(message.from.includes("@newsletter"))
        return;


    if(!message.body?.trim())
        return;



    try{


        const contato =
        await message.getContact();



        const telefone =
        normalizarTelefone(message);



        console.log(
            "Mensagem recebida:",
            message.body
        );




        const empresa =
        await buscarEmpresaPorWhatsapp(

            client.info.wid.user

        );



        if(!empresa){


            console.log(
                "WhatsApp sem empresa cadastrada"
            );


            return;

        }




        await salvarLead(

            {

                nome:
                contato.pushname || "Sem nome",


                telefone,


                ultimaMensagem:
                message.body,


                data:
                new Date()

            },

            empresa.id

        );





        let lead =
        await buscarLead(

            telefone,

            empresa.id

        );




        if(!lead)
            return;


        // GARANTE ETAPA INICIAL

        if(!lead.etapa){


            await atualizarEtapa(

                telefone,

                1,

                empresa.id

            );


            lead.etapa = 1;


        }





        // RECARREGA DO BANCO

        lead =

        await buscarLead(

            telefone,

            empresa.id

        );



        if(!lead)
            return;





        await salvarMensagemCliente(

            lead.id,

            message.body

        );






        emitirParaEmpresa(

            empresa.id,

            "nova-mensagem",

            {

                leadId:lead.id,

                texto:message.body,

                tipo:"cliente",

                data:new Date()

            }

        );







        console.log(

            "FLUXO LEAD:",

            lead.id,

            "ETAPA:",

            lead.etapa

        );






        let etapaAtual =

        lead.etapa || 1;





        const textoNormalizado =

        message.body

        .toLowerCase()

        .trim();





        const saudacoes = [


            "oi",

            "olá",

            "ola",

            "bom dia",

            "boa tarde",

            "boa noite"


        ];






        // SE FOR UMA NOVA CONVERSA, COMEÇA O FLUXO

        if(

            saudacoes.includes(textoNormalizado)

        ){



            await atualizarEtapa(

                telefone,

                1,

                empresa.id

            );



            etapaAtual = 1;


            lead.etapa = 1;



            console.log(

                "Fluxo reiniciado na etapa 1"

            );


        }






        let resposta = "";





        const perguntaAtual =

        await buscarPerguntaAtual(

            empresa.id,

            etapaAtual

        );








        if(perguntaAtual){


    console.log(

        "Pergunta atual:",

        perguntaAtual.pergunta

    );



    // PRIMEIRA MENSAGEM NÃO É RESPOSTA

    if(

        etapaAtual === 1 &&

        saudacoes.includes(textoNormalizado)

    ){


        resposta = perguntaAtual.pergunta;



    }

    else{


        if(perguntaAtual.campo){


            await salvarCampoLead(

                telefone,

                perguntaAtual.campo,

                message.body,

                empresa.id

            );


            console.log(

                "Campo salvo:",

                perguntaAtual.campo

            );


        }





        await registrarResposta(

            telefone,

            message.body,

            empresa.id

        );





        const novaEtapa =

        etapaAtual + 1;




        await atualizarEtapa(

            telefone,

            novaEtapa,

            empresa.id

        );





        console.log(

            "Etapa atualizada para:",

            novaEtapa

        );







        const proximaPergunta =

        await buscarProximaPergunta(

            empresa.id,

            novaEtapa

        );





        if(proximaPergunta){


            resposta =

            proximaPergunta.pergunta;


        }

        else{


            resposta =

            await processarMensagem(

                client.info.wid.user,

                telefone,

                message.body

            );


        }


    }


}


        else{


            console.log(

                "Sem pergunta no fluxo, chamando motor"

            );



            resposta =

            await processarMensagem(

                client.info.wid.user,

                telefone,

                message.body

            );


        }


        if(!resposta){


            resposta =

            "Estou verificando suas informações 😊";


        }






        await salvarMensagemBot(

            lead.id,

            resposta

        );








        await message.reply(

            resposta

        );








        emitirParaEmpresa(

            empresa.id,

            "nova-mensagem",

            {

                leadId:lead.id,

                texto:resposta,

                tipo:"bot",

                data:new Date()

            }

        );






    }

    catch(erro){


        console.log(

            "Erro WhatsApp:",

            erro

        );


    }



});









export function iniciarWhatsApp(){


    console.log(

        "Iniciando WhatsApp..."

    );


    client.initialize();


}











export function getWhatsAppClient(){


    return client;


}
