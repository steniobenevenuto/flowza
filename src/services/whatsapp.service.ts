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

    return message.from;

}



let iniciando = false;



const client = new Client({

    authStrategy:new LocalAuth({

        clientId:"flowza"

    }),


    puppeteer:{

        headless:true,


        // Railway Linux
        executablePath:
        "/usr/bin/chromium",


        args:[

            "--no-sandbox",

            "--disable-setuid-sandbox",

            "--disable-dev-shm-usage",

            "--disable-gpu",

            "--disable-extensions",

            "--no-first-run",

            "--no-zygote"

        ],


        timeout:60000

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
"WhatsApp sem empresa"
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







const saudacoes=[

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


etapaAtual=1;


}







const perguntaAtual =
await buscarPerguntaAtual(

empresa.id,

etapaAtual

);





let resposta="";








if(perguntaAtual){



if(

etapaAtual===1 &&

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







}catch(error){


console.log(

"Erro WhatsApp:",

error

);


}



});









export function iniciarWhatsApp(){


if(iniciando){

console.log(
"WhatsApp já iniciando..."
);

return;

}





iniciando=true;





console.log(
"Iniciando WhatsApp..."
);






client.initialize()

.catch(err=>{


console.log(

"Erro inicializando WhatsApp:",

err

);



iniciando=false;


});


}








export function getWhatsAppClient(){

return client;

}