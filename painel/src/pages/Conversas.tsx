import { useEffect, useRef, useState } from "react";

import socket from "../services/socket";

import Layout from "../components/Layout";
import api from "../services/api";


interface ConversaLista {

    id:number;
    nome:string;
    telefone:string;
    status:string;
    cidade:string|null;
    bairro:string|null;
    etapa:number;
    ultimaMensagem:string;
    tipo:string;
    data:string;

}


interface Lead {

    id:number;
    nome:string;
    telefone:string;
    cidade:string|null;
    bairro:string|null;
    status:string;
    etapa:number;

}


interface Mensagem {

    id:number;
    texto:string;
    tipo:string;
    data:string;

}


interface ConversaResponse {

    lead:Lead;
    mensagens:Mensagem[];

}








export default function Conversas(){


const [conversas,setConversas] =
useState<ConversaLista[]>([]);


const [selecionada,setSelecionada] =
useState<number|null>(null);


const [lead,setLead] =
useState<Lead|null>(null);


const [mensagens,setMensagens] =
useState<Mensagem[]>([]);


const [texto,setTexto] =
useState("");


const [busca,setBusca] =
useState("");



const mensagensRef =
useRef<HTMLDivElement>(null);





useEffect(()=>{


const empresaId =
localStorage.getItem("empresaId");


if(empresaId){

socket.emit(
"entrar_empresa",
Number(empresaId)
);

}


carregarConversas();



socket.on(
"nova-mensagem",
()=>{

carregarConversas();


if(selecionada){

carregarConversa(selecionada);

}


}

);



return()=>{

socket.off(
"nova-mensagem"
);

};


},[selecionada]);






useEffect(()=>{


if(mensagensRef.current){

mensagensRef.current.scrollTo({

top:
mensagensRef.current.scrollHeight,

behavior:"smooth"

});


}


},[mensagens]);







async function carregarConversas(){


try{


const resposta =
await api.get("/conversas");


setConversas(
resposta.data
);


}catch(erro){

console.log(
"Erro conversas:",
erro
);

}


}







async function carregarConversa(id:number){


try{


const resposta =
await api.get<ConversaResponse>(
`/conversas/${id}`
);



setLead(
resposta.data.lead
);



setMensagens(
resposta.data.mensagens
);



}catch(erro){

console.log(erro);

}


}






function abrirConversa(id:number){


setSelecionada(id);


carregarConversa(id);


}







async function enviar(){


if(!texto.trim() || !selecionada)

return;



try{


await api.post(

`/enviar/${selecionada}`,

{
texto
}

);



setTexto("");



}catch(erro){

console.log(erro);

}


}






const filtradas = conversas.filter((c)=>


c.nome
?.toLowerCase()
.includes(
busca.toLowerCase()
)


||

c.telefone.includes(busca)


);




return (

<Layout>


<div

className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-xl
h-[82vh]
flex
overflow-hidden
"


>


{/* LISTA */}


<div

className="
w-80
bg-zinc-900
border-r
border-zinc-700
flex
flex-col
"


>


<div

className="
p-5
border-b
border-zinc-700
"


>


<h1

className="
text-2xl
font-bold
text-white
"

>

💬 Conversas

</h1>



<input


className="
mt-4
w-full
bg-zinc-800
border
border-zinc-700
text-white
rounded-xl
px-4
py-3
outline-none
focus:border-blue-500
"


placeholder="Buscar cliente..."


value={busca}


onChange={(e)=>
setBusca(e.target.value)
}


/>


</div>

<div
className="
flex-1
overflow-y-auto
"
>


{

filtradas.map((conversa)=>(


<button

key={conversa.id}

onClick={()=>
abrirConversa(conversa.id)
}


className={`

w-full

text-left

p-4

border-b

border-zinc-800

transition

hover:bg-zinc-800


${
selecionada === conversa.id

?

"bg-blue-600/20"

:

""

}


`}


>


<div

className="
flex
items-center
gap-3
"

>


<div

className="
w-12
h-12
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
font-bold
text-xl
"

>


{
conversa.nome
?.charAt(0)
.toUpperCase()
}


</div>




<div

className="
overflow-hidden
"

>


<p

className="
font-bold
text-white
truncate
"

>

{conversa.nome}

</p>



<p

className="
text-sm
text-zinc-400
truncate
"

>

{conversa.ultimaMensagem}

</p>



</div>


</div>



</button>



))

}


</div>


</div>









{/* CHAT */}



<div

className="
flex-1
flex
flex-col
bg-zinc-800
"

>



{

!lead ?


(


<div

className="
flex-1
flex
items-center
justify-center
text-zinc-500
text-xl
"

>


Selecione uma conversa 💬


</div>



)



:



(



<>



{/* CABEÇALHO */}



<div

className="
p-5
border-b
border-zinc-700
flex
items-center
gap-4
"

>



<div

className="
w-14
h-14
rounded-full
bg-blue-600
text-white
flex
items-center
justify-center
text-2xl
font-bold
"

>


{
lead.nome
?.charAt(0)
.toUpperCase()
}



</div>





<div>


<h2

className="
text-xl
font-bold
text-white
"

>

{lead.nome}

</h2>




<p

className="
text-zinc-400
"

>

📞 {lead.telefone}

</p>


</div>


</div>









{/* MENSAGENS */}



<div


ref={mensagensRef}


className="
flex-1
overflow-y-auto
bg-zinc-900
p-6
space-y-4
"


>



{


mensagens.map((msg)=>(



<div

key={msg.id}

className={`

flex


${
msg.tipo==="cliente"

?

"justify-end"

:

"justify-start"

}


`}


>


<div

className={`

max-w-[70%]

px-4

py-3

rounded-2xl

shadow


${
msg.tipo==="cliente"

?

"bg-blue-600 text-white"

:

"bg-zinc-700 text-white"

}



`}


>



<p

className="
whitespace-pre-wrap
"

>

{msg.texto}

</p>




<p

className="
text-[11px]
mt-2
opacity-70
text-right
"

>


{

new Date(msg.data)

.toLocaleTimeString()

}


</p>



</div>



</div>



))


}




</div>









{/* ENVIO */}



<div

className="
border-t
border-zinc-700
p-4
flex
gap-3
"


>



<input


className="
flex-1
bg-zinc-900
border
border-zinc-700
text-white
rounded-full
px-5
py-3
outline-none
focus:border-blue-500
"


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


className="
bg-blue-600
hover:bg-blue-700
text-white
px-7
rounded-full
transition
"


>


Enviar


</button>



</div>





</>


)


}



</div>





</div>


</Layout>

);


}