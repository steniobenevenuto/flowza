import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QRCode from "react-qr-code";
import toast from "react-hot-toast";


const SOCKET_URL =
import.meta.env.VITE_API_URL ||
"https://flowza-production-9b03.up.railway.app";





export default function WhatsAppConnect(){


    const [qr,setQr] =
    useState("");



    const [status,setStatus] =
    useState(
        "disconnected"
    );



    const [socketAtual,setSocketAtual] =
    useState<any>(null);




    const empresaId =
    Number(
        localStorage.getItem("empresaId")
    );






    useEffect(()=>{


        const socket =
        io(
            SOCKET_URL,
            {
                transports:[
                    "websocket"
                ]
            }
        );



        setSocketAtual(socket);






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


                setQr(
                    codigo
                );


                toast(
                    "Escaneie o QR Code"
                );


            }
        );








        socket.on(
            "whatsapp_status",
            (data)=>{


                console.log(
                    "Status WhatsApp:",
                    data
                );



                if(
                    data.status === "connected"
                ){


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


        };



    },[]);









    function conectar(){


        if(!socketAtual){


            toast.error(
                "Socket ainda não conectado"
            );


            return;

        }






        console.log(
            "Solicitando conexão WhatsApp:",
            empresaId
        );





        socketAtual.emit(

            "conectar_whatsapp",

            empresaId

        );


    }









return (

<div
className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-lg
p-6
text-white
"
>


<h2
className="
text-xl
font-bold
mb-2
"
>

📱 WhatsApp

</h2>



<p
className="
text-zinc-400
text-sm
mb-5
"
>

Conecte o WhatsApp da sua empresa para iniciar os atendimentos automáticos.

</p>







{

status==="connected"

?

(


<div
className="
bg-green-500/10
border
border-green-500/30
rounded-xl
p-4
"
>

<p
className="
text-green-400
font-semibold
"
>

✅ WhatsApp conectado

</p>


</div>


)


:


(


<>


<button

onClick={conectar}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-3
rounded-xl
font-semibold
transition
"

>

🔗 Conectar WhatsApp

</button>








{

qr && (


<div
className="
mt-6
bg-zinc-900
border
border-zinc-700
rounded-xl
p-5
"
>


<p
className="
text-zinc-300
mb-4
font-medium
"
>

Escaneie o QR Code pelo WhatsApp:

</p>






<div
className="
bg-white
p-4
rounded-xl
inline-block
"
>


<QRCode

value={qr}

size={220}

/>


</div>





<p
className="
text-zinc-500
text-sm
mt-4
"
>

Abra WhatsApp → Dispositivos conectados → Conectar dispositivo

</p>





</div>


)


}



</>


)


}



</div>


);


}