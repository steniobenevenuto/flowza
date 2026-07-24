import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";


interface Empresa {

    nome:string;
    segmento:string;
    telefoneWhatsapp:string;

    logo?:string | null;

    corPrimaria:string;

    mensagemInicial?:string | null;

    promptIA?:string | null;

    endereco?:string | null;

    horarioFuncionamento?:string | null;

    instagram?:string | null;

    site?:string | null;

}



export default function Configuracoes(){


const [empresa,setEmpresa] =
useState<Empresa | null>(null);


const [salvando,setSalvando] =
useState(false);



useEffect(()=>{


carregar();


},[]);





async function carregar(){


try{


const resposta =
await api.get("/configuracao");


setEmpresa(
resposta.data
);



}catch(error){


console.log(error);

toast.error(
"Erro ao carregar configurações"
);


}



}






function alterar(
campo:keyof Empresa,
valor:string
){


if(!empresa) return;


setEmpresa({

...empresa,

[campo]:valor

});


}








async function salvar(){


if(!empresa) return;


try{


setSalvando(true);



await api.put(
"/configuracao",
empresa
);



toast.success(
"Configurações salvas 🚀"
);



}catch(error){


toast.error(
"Erro ao salvar"
);


}finally{


setSalvando(false);


}



}





if(!empresa){


return (

<Layout>

<p>
Carregando configurações...
</p>

</Layout>

)

}







return (

<Layout>


<div className="max-w-5xl">


<h1 className="
text-4xl
font-bold
text-white
">

⚙️ Configurações

</h1>


<p className="
text-zinc-400
mt-2
mb-8
">

Configure sua empresa e sua inteligência artificial

</p>





<div className="grid gap-6">





<div className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-lg
p-6
">


<h2 className="text-xl font-bold mb-5">

🏢 Empresa

</h2>



<input

className="
w-full
bg-zinc-900
border
border-zinc-700
rounded-xl
p-3
mb-3
text-white
outline-none
focus:border-blue-500
"

placeholder="Nome"

value={empresa.nome}

onChange={
e=>alterar(
"nome",
e.target.value
)
}

/>




<input

className="
w-full
bg-zinc-900
border
border-zinc-700
rounded-xl
p-3
mb-3
text-white
outline-none
focus:border-blue-500
"

placeholder="Segmento"

value={empresa.segmento}

onChange={
e=>alterar(
"segmento",
e.target.value
)
}

/>




<input

className="w-full border rounded-xl p-3"

placeholder="WhatsApp"

value={empresa.telefoneWhatsapp}

onChange={
e=>alterar(
"telefoneWhatsapp",
e.target.value
)
}

/>


</div>







<div className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-lg
p-6
">


<h2 className="text-xl font-bold mb-5">

🤖 Inteligência Artificial

</h2>




<textarea

className="w-full border rounded-xl p-3 h-40"

placeholder="Digite como a IA deve agir..."

value={
empresa.promptIA || ""
}


onChange={
e=>alterar(
"promptIA",
e.target.value
)
}


/>



</div>







<div className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-lg
p-6
">


<h2 className="text-xl font-bold mb-5">

📞 Atendimento

</h2>




<textarea

className="w-full border rounded-xl p-3 h-32"

placeholder="Mensagem inicial..."

value={
empresa.mensagemInicial || ""
}


onChange={
e=>alterar(
"mensagemInicial",
e.target.value
)
}


/>



</div>







<div className="
bg-zinc-800
border
border-zinc-700
rounded-2xl
shadow-lg
p-6
">


<h2 className="text-xl font-bold mb-5">

🌎 Informações

</h2>



<input

className="
w-full
bg-zinc-900
border
border-zinc-700
rounded-xl
p-3
mb-3
text-white
outline-none
focus:border-blue-500
"

placeholder="Endereço"

value={
empresa.endereco || ""
}

onChange={
e=>alterar(
"endereco",
e.target.value
)
}

/>



<input

className="
w-full
bg-zinc-900
border
border-zinc-700
rounded-xl
p-3
mb-3
text-white
outline-none
focus:border-blue-500
"

placeholder="Instagram"

value={
empresa.instagram || ""
}

onChange={
e=>alterar(
"instagram",
e.target.value
)
}

/>




<input

className="w-full border rounded-xl p-3"

placeholder="Site"

value={
empresa.site || ""
}

onChange={
e=>alterar(
"site",
e.target.value
)
}

/>



</div>






<button

onClick={salvar}

disabled={salvando}

className="
bg-blue-600
text-white
px-8
py-3
rounded-xl
font-bold
hover:bg-blue-700
transition
"


>

{

salvando
?
"Salvando..."
:
"Salvar alterações"

}


</button>




</div>


</div>


</Layout>

);


}