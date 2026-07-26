import "dotenv/config";

import express from "express";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";


// ======================
// ROTAS
// ======================

import leadRoutes from "./routes/lead.routes";
import empresaRoutes from "./routes/empresa.routes";
import conversaRoutes from "./routes/conversa.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import authRoutes from "./routes/auth.routes";
import envioRoutes from "./routes/envio.routes";
import configuracaoRoutes from "./routes/configuracao.routes";
import fluxoRoutes from "./routes/fluxo.routes";
import planoRoutes from "./routes/plano.routes";
import pagamentoRoutes from "./routes/pagamento.routes";


// ======================
// SERVIÇOS
// ======================

import { iniciarWhatsApp } from "./services/whatsapp.service";
import { iniciarSocket } from "./services/socket.service";


// ======================
// APP
// ======================

const app = express();



// ======================
// CORS
// ======================

const FRONTEND_URL =
process.env.FRONTEND_URL || "https://www.flowza.sbs";



app.use(

cors({

origin:[

"http://localhost:5173",

FRONTEND_URL

],

credentials:true,

methods:[

"GET",

"POST",

"PUT",

"PATCH",

"DELETE"

],

allowedHeaders:[

"Content-Type",

"Authorization"

]

})

);



// ======================
// MIDDLEWARES
// ======================


app.use(express.json());

app.use(
express.urlencoded({
extended:true
})
);



// ======================
// TESTE
// ======================


app.get("/",(req,res)=>{


res.json({

status:"online",

mensagem:"Flowza SaaS funcionando 🚀"

});


});



// ======================
// ROTAS API
// ======================


app.use("/auth",authRoutes);

app.use("/dashboard",dashboardRoutes);

app.use("/leads",leadRoutes);

app.use("/conversas",conversaRoutes);

app.use("/enviar",envioRoutes);

app.use("/empresa",empresaRoutes);

app.use("/configuracao",configuracaoRoutes);

app.use("/fluxo",fluxoRoutes);

app.use("/planos",planoRoutes);

app.use("/pagamento",pagamentoRoutes);



// ======================
// SOCKET.IO
// ======================


const httpServer =
createServer(app);



const io =
new Server(httpServer,{

cors:{

origin:[

"http://localhost:5173",

FRONTEND_URL

],

credentials:true,

methods:[

"GET",

"POST"

]

}

});



iniciarSocket(io);





io.on(
"connection",
(socket)=>{


console.log(
"Painel conectado:",
socket.id
);




socket.on(
"entrar_empresa",
(empresaId)=>{


console.log(
"Empresa socket:",
empresaId
);



socket.join(
`empresa_${empresaId}`
);



console.log(
"Socket entrou:",
`empresa_${empresaId}`
);




});





socket.on(
"conectar_whatsapp",
(empresaId)=>{


console.log(
"Iniciando WhatsApp empresa:",
empresaId
);



iniciarWhatsApp(
empresaId
);



});






socket.on(
"disconnect",
()=>{


console.log(
"Painel desconectado:",
socket.id
);



}

);



}

);




// ======================
// START
// ======================


const PORT =
process.env.PORT || 3000;



httpServer.listen(
PORT,
()=>{


console.log(
`Flowza rodando na porta ${PORT} 🚀`
);



console.log(
"WhatsApp será iniciado pelo painel."
);



});