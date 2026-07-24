// ======================
// MIDDLEWARES
// ======================

app.use(
    cors({

        origin:[
            "http://localhost:5173",
            "https://adequate-endurance-production-ac72.up.railway.app"
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
        ],

        credentials:true

    })
);


app.use(express.json());



app.options(
    "/*splat",
    cors()
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

                "https://adequate-endurance-production-ac72.up.railway.app"

            ],

            methods:[

                "GET",
                "POST"

            ],

            credentials:true

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