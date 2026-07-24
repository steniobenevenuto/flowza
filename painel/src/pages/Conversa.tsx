import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import Layout from "../components/Layout";
import api from "../services/api";


interface Lead{

    id:number;
    nome:string;
    telefone:string;
    cidade:string|null;
    bairro:string|null;
    status:string;
    etapa:number;

}



interface Mensagem{

    id:number;
    texto:string;
    tipo:string;
    data:string;

}



interface ConversaResponse{

    lead:Lead;

    mensagens:Mensagem[];

}




const socket = io(
    "http://localhost:3000",
    {

        auth:{

            token:
            localStorage.getItem("token")

        }

    }
);





export default function Conversa(){


const {leadId}=useParams();



const [lead,setLead]=useState<Lead|null>(null);


const [mensagens,setMensagens]=useState<Mensagem[]>([]);


const [texto,setTexto]=useState("");



const mensagensRef =
useRef<HTMLDivElement>(null);






useEffect(()=>{


const empresaId =
localStorage.getItem(
"empresaId"
);



console.log(
"Entrando empresa:",
empresaId
);



if(empresaId){

socket.emit(

"entrar_empresa",

Number(empresaId)

);

}



carregar();





socket.on(

"nova-mensagem",

(msg)=>{


console.log(
"SOCKET RECEBIDO:",
msg
);



if(
String(msg.leadId) === leadId
){


setTimeout(()=>{


carregar();


},300);



}


}



);





return()=>{


socket.off(
"nova-mensagem"
);


};



},[leadId]);







useEffect(()=>{


if(mensagensRef.current){


mensagensRef.current.scrollTo({

top:
mensagensRef.current.scrollHeight,

behavior:
"smooth"

});


}


},[mensagens]);









async function carregar(){


try{


const resposta =

await api.get<ConversaResponse>(

`/conversas/${leadId}`

);



setLead(

resposta.data.lead

);



setMensagens(

resposta.data.mensagens

);



}catch(erro){


console.log(
erro
);


}



}










async function enviar(){


if(!texto.trim())
return;



try{


await api.post(

`/enviar/${leadId}`,

{

texto

}

);



setTexto("");



}catch(erro){


console.log(
erro
);


}



}









return(


<Layout>


<div className="bg-white rounded-xl shadow h-[80vh] flex flex-col overflow-hidden">





<div className="border-b p-5 flex items-center gap-4">


<div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">


{
lead?.nome
?.charAt(0)
.toUpperCase()
}


</div>




<div>


<h2 className="text-xl font-bold">

{lead?.nome}

</h2>



<p className="text-gray-500">

📞 {lead?.telefone}

</p>



<p className="text-gray-500">

📍 {lead?.cidade || "-"} • {lead?.bairro || "-"}

</p>


</div>


</div>









<div

ref={mensagensRef}

className="flex-1 overflow-y-auto bg-gray-100 p-6 space-y-4"

>



{mensagens.map((msg)=>(


<div

key={msg.id}

className={`flex ${
msg.tipo==="cliente"
?
"justify-end"
:
"justify-start"
}`}

>


<div

className={`max-w-[70%] px-4 py-3 rounded-2xl shadow ${
msg.tipo==="cliente"
?
"bg-green-500 text-white"
:
"bg-white"
}`}

>


<p className="whitespace-pre-wrap">

{msg.texto}

</p>



<p className="text-[11px] mt-2 opacity-70 text-right">

{
new Date(msg.data)
.toLocaleTimeString()
}

</p>


</div>


</div>


))}


</div>









<div className="border-t p-4 flex gap-3 bg-white">


<input

className="flex-1 border rounded-full px-5 py-3"

placeholder="Digite uma mensagem..."

value={texto}

onChange={(e)=>
setTexto(e.target.value)
}


onKeyDown={(e)=>{

if(e.key==="Enter"){

enviar();

}

}}


/>




<button

onClick={enviar}

className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-full"

>

Enviar

</button>



</div>





</div>


</Layout>


);


}