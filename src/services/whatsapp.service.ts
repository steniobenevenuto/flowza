import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;


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

        return message.from.replace("@c.us","");

    }

    return message.from;

}



let iniciando = false;


let empresaConectandoId:number | null = null;




const chromePath =
process.env.CHROME_BIN ??
process.env.CHROME_PATH ??
"/usr/bin/chromium";



console.log(
    "Chrome usado:",
    chromePath
);





const client = new Client({

    authStrategy:new LocalAuth({

        clientId:"flowza",

        dataPath:"./.wwebjs_auth"

    }),


    puppeteer:{

        headless:true,

        executablePath:chromePath,


        args:[

            "--no-sandbox",

            "--disable-setuid-sandbox",

            "--disable-dev-shm-usage",

            "--disable-gpu",

            "--disable-software-rasterizer",

            "--disable-extensions",

            "--no-first-run",

            "--no-zygote",

            "--single-process"

        ],


        timeout:120000

    }

});







client.on("loading_screen",(percent,message)=>{

    console.log(
        "Carregando WhatsApp:",
        percent,
        message
    );

});







client.on("qr",(qr)=>{


    console.log(
        "QR Code gerado"
    );



    if(empresaConectandoId){


        emitirParaEmpresa(

            empresaConectandoId,

            "whatsapp_qr",

            qr

        );


    }


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



    if(empresaConectandoId){


        emitirParaEmpresa(

            empresaConectandoId,

            "whatsapp_status",

            {
                status:"connected"
            }

        );


    }


});







client.on("auth_failure",(msg)=>{


    console.log(
        "Falha autenticação:",
        msg
    );


});







client.on("disconnected",(reason)=>{


    console.log(
        "WhatsApp desconectado:",
        reason
    );


    if(empresaConectandoId){


        emitirParaEmpresa(

            empresaConectandoId,

            "whatsapp_status",

            {
                status:"disconnected"
            }

        );


    }


});








client.on(
"message",
async(message)=>{


try{


if(message.from.includes("@g.us"))
return;


if(message.from==="status@broadcast")
return;


if(message.from.includes("@newsletter"))
return;


if(!message.body?.trim())
return;




console.log(
"Mensagem recebida:",
message.body
);






const contato =
await message.getContact();




const telefone =
normalizarTelefone(message);






const empresa =
await buscarEmpresaPorWhatsapp(

client.info.wid.user

);





if(!empresa){


console.log(
"WhatsApp sem empresa configurada"
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








let etapaAtual =
lead.etapa || 1;






const texto =
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








if(saudacoes.includes(texto)){


await atualizarEtapa(

telefone,

1,

empresa.id

);


etapaAtual = 1;


}








const perguntaAtual =
await buscarPerguntaAtual(

empresa.id,

etapaAtual

);






let resposta = "";







if(perguntaAtual){



if(

etapaAtual === 1 &&

saudacoes.includes(texto)

){


resposta =
perguntaAtual.pergunta;


}



else{



if(perguntaAtual.campo){


await salvarCampoLead(

telefone,

perguntaAtual.campo,

message.body,

empresa.id

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








const proxima =
await buscarProximaPergunta(

empresa.id,

novaEtapa

);






if(proxima){


resposta =
proxima.pergunta;


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


resposta =
await processarMensagem(

client.info.wid.user,

telefone,

message.body

);


}








if(!resposta){


resposta =
"Estou analisando suas informações 😊";


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

catch(error){


console.log(

"Erro WhatsApp:",

error

);


}


});









export async function iniciarWhatsApp(
    empresaId:number
){

    empresaConectandoId = empresaId;


    console.log(
        "Empresa conectando WhatsApp:",
        empresaId
    );



    if(iniciando){

        console.log(
            "WhatsApp já iniciando..."
        );

        return;

    }



    iniciando = true;



    console.log(
        "Iniciando WhatsApp..."
    );



    try{


        await client.initialize();



        console.log(
            "WhatsApp initialize chamado com sucesso"
        );


    }

    catch(error){


        console.log(
            "Erro inicializando WhatsApp:",
            error
        );


        iniciando = false;


    }


}





export function getWhatsAppClient(){


    return client;


}