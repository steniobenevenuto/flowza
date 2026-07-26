import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";


const SOCKET_URL =
import.meta.env.VITE_API_URL || 
"https://flowza-production-9b03.up.railway.app";



export default function WhatsAppConnect(){

    const [qr,setQr] = useState("");

    const [status,setStatus] = useState(
        "disconnected"
    );


    const empresaId =
Number(localStorage.getItem("empresaId")); 



    useEffect(()=>{


        const socket = io(
            SOCKET_URL,
            {
                transports:[
                    "websocket"
                ]
            }
        );



        socket.on(
            "connect",
            ()=>{


                console.log(
                    "Socket conectado"
                );


                socket.emit(
                    "entrar_empresa",
                    empresaId
                );


            }
        );



        socket.on(
            "whatsapp_qr",
            (codigo)=>{


                console.log(
                    "QR recebido"
                );


                setQr(codigo);


                toast(
                    "Escaneie o QR Code"
                );


            }
        );



        socket.on(
            "whatsapp_status",
            (data)=>{


                if(data.status==="connected"){


                    setStatus(
                        "connected"
                    );


                    setQr("");


                    toast.success(
                        "WhatsApp conectado!"
                    );


                }


            }
        );




        return ()=>{


            socket.disconnect();


        }



    },[]);





    function conectar(){


        const socket =
        io(
            SOCKET_URL
        );


        socket.emit(

            "conectar_whatsapp",

            empresaId

        );


    }





return (

<div className="
bg-white
rounded-xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
">

WhatsApp

</h2>



{
status==="connected" ?

(

<p className="
text-green-600
mt-4
">

✅ WhatsApp conectado

</p>

)

:

(

<>


<button

onClick={conectar}

className="
bg-black
text-white
px-5
py-3
rounded-lg
mt-4
"

>

Conectar WhatsApp

</button>



{
qr && (

<div className="
mt-6
">

<p className="
mb-3
">

Escaneie no WhatsApp:

</p>


<QRCode

value={qr}

size={220}

/>


</div>

)

}


</>

)

}



</div>


);


}