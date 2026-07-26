import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import WhatsAppConnect from "../components/WhatsAppConnect";


interface Conversa {

  id:number;
  nome:string;
  telefone:string;
  ultimaMensagem:string;
  data:string;
  status:string;

}


interface DashboardData {

  empresa:string;
  totalLeads:number;
  novos:number;
  emAtendimento:number;
  fechados:number;
  ultimasConversas:Conversa[];

}



export default function Dashboard(){


const [dados,setDados]=
useState<DashboardData|null>(null);



useEffect(()=>{


async function carregar(){


try{


const resposta =
await api.get("/dashboard");


setDados(resposta.data);



}catch(erro){


console.log(
"Erro dashboard:",
erro
);


}



}


carregar();


},[]);





return(


<Layout>


<div>



<div className="mb-10">


<h1
className="
text-4xl
font-bold
text-white
"
>

Olá, seja bem-vindo 👋

</h1>



<p
className="
text-zinc-400
mt-2
"
>

Gerencie seus atendimentos pelo WhatsApp em um só lugar.

</p>



</div>




{

!dados ?


(


<div
className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
p-8
text-white
"
>

Carregando painel...

</div>


)


:


(


<>



{/* EMPRESA */}


<div
className="
bg-gradient-to-r
from-blue-700
to-blue-500
rounded-2xl
p-8
text-white
mb-8
shadow-xl
"
>


<div
className="
flex
justify-between
items-center
"
>


<div>


<p className="text-blue-100">

Empresa conectada

</p>


<h2
className="
text-3xl
font-bold
mt-2
"
>

{dados.empresa}

</h2>


</div>




<div
className="
bg-white/20
px-5
py-3
rounded-xl
flex
items-center
gap-2
"
>

🔵 WhatsApp Online


</div>



</div>


</div>





{/* CONEXÃO WHATSAPP */}


<div className="mb-8">

<WhatsAppConnect />

</div>







{/* CARDS */}


<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
"
>


<Card
titulo="Total de Leads"
valor={dados.totalLeads}
icone="👥"
/>


<Card
titulo="Novos"
valor={dados.novos}
icone="🔥"
/>


<Card
titulo="Em Atendimento"
valor={dados.emAtendimento}
icone="💬"
/>


<Card
titulo="Fechados"
valor={dados.fechados}
icone="✅"
/>



</div>








<div
className="
mt-8
grid
grid-cols-1
xl:grid-cols-2
gap-6
"
>





{/* CONVERSAS */}



<div
className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-lg
p-8
"
>



<h2
className="
text-xl
font-bold
text-white
mb-5
"
>

Últimas Conversas

</h2>



<div className="space-y-4">



{


dados.ultimasConversas.length===0 ?


(


<p className="text-zinc-400">

Nenhuma conversa ainda.

</p>


)


:


(


dados.ultimasConversas.map((lead)=>(



<div
key={lead.id}
className="
flex
justify-between
items-center
border-b
border-zinc-700
pb-4
"
>



<div>


<h3
className="
font-semibold
text-white
"
>

{lead.nome}

</h3>



<p
className="
text-sm
text-zinc-400
truncate
max-w-sm
"
>

{lead.ultimaMensagem}

</p>


</div>



<span
className="
text-xs
text-zinc-500
"
>


{

new Date(
lead.data
).toLocaleDateString("pt-BR")

}


</span>



</div>



))


)



}



</div>


</div>









{/* RESUMO */}



<div
className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-lg
p-8
"
>


<h2
className="
text-xl
font-bold
text-white
mb-4
"
>

Resumo rápido

</h2>




<div
className="
flex
gap-4
flex-wrap
"
>



<span
className="
bg-blue-500/20
border
border-blue-500/30
text-blue-400
px-4
py-2
rounded-full
"
>

📈 Leads ativos

</span>





<span
className="
bg-blue-500/20
border
border-blue-500/30
text-blue-400
px-4
py-2
rounded-full
"
>

🚀 Sistema funcionando

</span>





<span
className="
bg-zinc-700
border
border-zinc-600
text-zinc-300
px-4
py-2
rounded-full
"
>

🤖 IA preparada

</span>



</div>



</div>





</div>



</>


)


}



</div>


</Layout>


);



}










function Card({

titulo,

valor,

icone


}:{

titulo:string;

valor:number;

icone:string;


}){


return(


<div
className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
p-6
shadow-lg
hover:border-blue-500
hover:shadow-blue-500/10
transition
"
>


<div
className="
flex
justify-between
items-center
"
>



<div>


<p
className="
text-zinc-400
text-sm
"
>

{titulo}

</p>



<h2
className="
text-4xl
font-bold
mt-3
text-white
"
>

{valor}

</h2>



</div>





<div
className="
text-3xl
bg-blue-600/20
border
border-blue-500/30
rounded-xl
p-4
"
>

{icone}


</div>



</div>



</div>


);


}