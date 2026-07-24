import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../services/api";


interface Lead{

    id:number;

    nome:string;

    telefone:string;

    cidade:string|null;

    bairro:string|null;

    status:string;

}



export default function Leads(){


const navigate = useNavigate();


const [leads,setLeads]=useState<Lead[]>([]);

const [busca,setBusca]=useState("");




useEffect(()=>{

carregar();

},[]);




async function carregar(){


try{


const resposta =
await api.get("/conversas");


setLeads(resposta.data);



}catch(erro){


console.log(erro);


}



}




const filtrados = leads.filter((lead)=>


lead.nome?.toLowerCase()
.includes(busca.toLowerCase())


||


lead.telefone?.includes(busca)



);



const novos = leads.filter(
(l)=>l.status==="novo"
).length;


const atendimento = leads.filter(
(l)=>l.status==="atendimento"
).length;



return(



<Layout>



<div>


{/* CABEÇALHO */}


<div
className="
flex
justify-between
items-center
mb-8
"
>


<div>


<h1
className="
text-4xl
font-bold
text-white
"
>

Leads

</h1>


<p
className="
text-zinc-400
mt-2
"
>

Gerencie seus contatos e oportunidades.

</p>



</div>





<input

className="
bg-zinc-800
border
border-zinc-700
text-white
placeholder-zinc-500
rounded-xl
px-4
py-3
w-72
outline-none
focus:border-blue-500
"

placeholder="Pesquisar lead..."

value={busca}

onChange={(e)=>
setBusca(e.target.value)
}

/>



</div>







{/* CARDS */}



<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mb-8
"
>



<CardResumo

titulo="Total de Leads"

valor={leads.length}

icone="👥"

/>



<CardResumo

titulo="Novos"

valor={novos}

icone="🔥"

/>




<CardResumo

titulo="Em Atendimento"

valor={atendimento}

icone="💬"

/>



</div>








{/* TABELA */}



<div
className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
overflow-hidden
shadow-lg
"
>



<table
className="
w-full
"
>



<thead
className="
bg-zinc-900
text-zinc-400
"
>


<tr>


<th className="text-left p-4">

Nome

</th>


<th className="text-left p-4">

Telefone

</th>


<th className="text-left p-4">

Cidade

</th>


<th className="text-left p-4">

Status

</th>


<th className="text-center p-4">

Ações

</th>


</tr>


</thead>





<tbody>


{


filtrados.map((lead)=>(



<tr

key={lead.id}

className="
border-t
border-zinc-700
hover:bg-zinc-700/40
transition
"

>



<td
className="
p-4
text-white
font-medium
"
>

{lead.nome}

</td>




<td
className="
p-4
text-zinc-300
"
>

{lead.telefone}

</td>




<td
className="
p-4
text-zinc-400
"
>

{lead.cidade || "-"}

</td>





<td className="p-4">


<span

className={`
px-3
py-1
rounded-full
text-xs
font-semibold

${
lead.status==="fechado"

?

"bg-green-500/20 text-green-400"

:

lead.status==="atendimento"

?

"bg-yellow-500/20 text-yellow-400"

:

"bg-blue-500/20 text-blue-400"

}

`}

>


{lead.status}


</span>


</td>






<td
className="
p-4
text-center
"
>


<button


onClick={()=>navigate(`/conversas/${lead.id}`)}


className="
bg-blue-600
hover:bg-blue-700
text-white
px-4
py-2
rounded-lg
text-sm
transition
"

>


Abrir


</button>



</td>




</tr>



))



}



</tbody>





</table>



</div>



</div>



</Layout>



);


}








function CardResumo({


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
text-3xl
font-bold
text-white
mt-2
"
>

{valor}

</h2>


</div>




<div
className="
bg-blue-600/20
border
border-blue-500/30
rounded-xl
p-3
text-2xl
"
>

{icone}


</div>



</div>


</div>


);


}