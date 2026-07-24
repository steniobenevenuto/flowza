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

import {
    iniciarWhatsApp
} from "./services/whatsapp.service";


import {
    iniciarSocket
} from "./services/socket.service";





const app = express();




// ======================
// MIDDLEWARES
// ======================


app.use(

    cors({

        origin:[

            "http://localhost:5173",

            process.env.FRONTEND_URL || ""

        ],

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



app.use(
    express.json()
);





app.options(
    "/*splat",
    cors()
);







// ======================
// TESTE
// ======================


app.get(

    "/",

    (req,res)=>{


        res.json({

            status:"online",

            mensagem:
            "Flowza SaaS funcionando 🚀"

        });


    }

);









// ======================
// API ROUTES
// ======================



app.use(

    "/auth",

    authRoutes

);



app.use(

    "/dashboard",

    dashboardRoutes

);



app.use(

    "/leads",

    leadRoutes

);



app.use(

    "/conversas",

    conversaRoutes

);



app.use(

    "/enviar",

    envioRoutes

);



app.use(

    "/empresa",

    empresaRoutes

);



app.use(

    "/configuracao",

    configuracaoRoutes

);



app.use(

    "/fluxo",

    fluxoRoutes

);



app.use(

    "/planos",

    planoRoutes

);



app.use(

    "/pagamento",

    pagamentoRoutes

);









// ======================
// SOCKET SERVER
// ======================


const httpServer = createServer(app);




const io = new Server(

    httpServer,

    {

        cors:{

            origin:[

                "http://localhost:5173",

                process.env.FRONTEND_URL || ""

            ],

            methods:[

                "GET",
                "POST"

            ]

        }

    }

);





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


            }

        );








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
// START FLOWZA
// ======================

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Flowza rodando na porta ${PORT} 🚀`);

    if (process.env.INICIAR_WHATSAPP === "true") {
        try {
            iniciarWhatsApp();

            console.log("WhatsApp iniciado com sucesso.");
        } catch (error) {
            console.error("Erro ao iniciar WhatsApp:", error);
        }
    } else {
        console.log("WhatsApp desabilitado nesta instância.");
    }
});